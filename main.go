package main

import (
	"SamWaf/enums"
	"SamWaf/global"
	"SamWaf/innerbean"
	"SamWaf/model"
	"SamWaf/model/wafenginmodel"
	"SamWaf/plugin"
	"SamWaf/utils"
	"SamWaf/utils/zlog"
	"SamWaf/wafenginecore"
	"SamWaf/waftask"
	"crypto/tls"
	dlp "github.com/bytedance/godlp"
	"github.com/go-co-op/gocron"
	"go.uber.org/zap"
	"golang.org/x/time/rate"
	"log"
	"net/http"
	"os"
	"runtime"
	"strconv"
	"syscall"
	"time"
)

func main() {
	zlog.Info("初始化系统")
	if !global.GWAF_RELEASE {
		zlog.Info("调试版本")
	}
	global.GWAF_LAST_UPDATE_TIME = time.Now()
	if runtime.GOOS == "linux" {
		println("linux")
	} else if runtime.GOOS == "windows" {
		println("windows")
	}
	pwd, err := os.Getwd()
	syscall.Setenv("ZONEINFO", pwd+"//data//zoneinfo")
	if err != nil {
		log.Fatal(err)
	}
	/*runtime.GOMAXPROCS(1)              // 限制 CPU 使用数，避免过载
	runtime.SetMutexProfileFraction(1) // 开启对锁调用的跟踪
	runtime.SetBlockProfileRate(1)     // 开启对阻塞操作的跟踪
	go func() {

		err2 := http.ListenAndServe("0.0.0.0:16060", nil)
		time.Sleep(10000)
		log.Fatal(err2)
	}()*/

	//初始化本地数据库
	wafenginecore.InitDb()

	//启动waf
	wafEngine := wafenginecore.WafEngine{
		HostTarget: map[string]*wafenginmodel.HostSafe{},
		//主机和code的关系
		HostCode:     map[string]string{},
		ServerOnline: map[int]innerbean.ServerRunTime{},
		//所有证书情况 对应端口 可能多个端口都是https 443，或者其他非标准端口也要实现https证书
		AllCertificate: map[int]map[string]*tls.Certificate{},
		EsHelper:       utils.EsHelper{},

		EngineCurrentStatus: 0, // 当前waf引擎状态
	}
	http.Handle("/", &wafEngine)
	wafEngine.Start_WAF()

	//启动管理界面
	go func() {
		wafenginecore.StartLocalServer()
	}()

	//定时取规则并更新（考虑后期定时拉取公共规则 待定，可能会影响实际生产）

	//定时器
	timezone, _ := time.LoadLocation("Asia/Shanghai")
	s := gocron.NewScheduler(timezone)

	// 每秒执行一次 TODO 改数据成分钟统计
	s.Every(10).Seconds().Do(func() {
		zlog.Debug("i am alive")
		go waftask.TaskCounter()
	})

	// 获取最近token
	s.Every(1).Hour().Do(func() {
		zlog.Debug("获取最新token")
		go waftask.TaskWechatAccessToken()
	})
	s.StartAsync()

	//脱敏处理初始化
	global.GWAF_DLP, _ = dlp.NewEngine("wafDlp")
	global.GWAF_DLP.ApplyConfigDefault()
	for {
		select {
		case msg := <-global.GWAF_CHAN_MSG:
			switch msg.Type {
			case enums.ChanTypeWhiteIP:
				wafEngine.HostTarget[wafEngine.HostCode[msg.HostCode]].IPWhiteLists = msg.Content.([]model.IPWhiteList)
				zlog.Debug("远程配置", zap.Any("IPWhiteLists", msg.Content.([]model.IPWhiteList)))
				break
			case enums.ChanTypeWhiteURL:
				wafEngine.HostTarget[wafEngine.HostCode[msg.HostCode]].UrlWhiteLists = msg.Content.([]model.URLWhiteList)
				zlog.Debug("远程配置", zap.Any("UrlWhiteLists", msg.Content.([]model.URLWhiteList)))
				break
			case enums.ChanTypeBlockIP:
				wafEngine.HostTarget[wafEngine.HostCode[msg.HostCode]].IPBlockLists = msg.Content.([]model.IPBlockList)
				zlog.Debug("远程配置", zap.Any("IPBlockLists", msg))
				break
			case enums.ChanTypeBlockURL:
				wafEngine.HostTarget[wafEngine.HostCode[msg.HostCode]].UrlBlockLists = msg.Content.([]model.URLBlockList)
				zlog.Debug("远程配置", zap.Any("UrlBlockLists", msg.Content.([]model.URLBlockList)))
				break
			case enums.ChanTypeLdp:
				wafEngine.HostTarget[wafEngine.HostCode[msg.HostCode]].LdpUrlLists = msg.Content.([]model.LDPUrl)
				zlog.Debug("远程配置", zap.Any("LdpUrlLists", msg.Content.([]model.LDPUrl)))
				break
			case enums.ChanTypeRule:
				wafEngine.HostTarget[wafEngine.HostCode[msg.HostCode]].RuleData = msg.Content.([]model.Rules)
				wafEngine.HostTarget[wafEngine.HostCode[msg.HostCode]].Rule.LoadRules(msg.Content.([]model.Rules))
				zlog.Debug("远程配置", zap.Any("Rule", msg.Content.([]model.Rules)))
				break
			case enums.ChanTypeAnticc:
				wafEngine.HostTarget[wafEngine.HostCode[msg.HostCode]].PluginIpRateLimiter = plugin.NewIPRateLimiter(rate.Limit(msg.Content.(model.AntiCC).Rate), msg.Content.(model.AntiCC).Limit)
				zlog.Debug("远程配置", zap.Any("Anticc", msg.Content.(model.AntiCC)))
				break

			case enums.ChanTypeHost: //此处待定
				break
			} //end switch
		case engineStatus := <-global.GWAF_CHAN_ENGINE:
			if engineStatus == 1 {
				zlog.Info("准备关闭WAF引擎")
				wafEngine.CLoseWAF()
				zlog.Info("准备启动WAF引擎")
				wafEngine.Start_WAF()

			}
			break
		case host := <-global.GWAF_CHAN_HOST:

			wafEngine.HostTarget[host.Host+":"+strconv.Itoa(host.Port)].Host.GUARD_STATUS = host.GUARD_STATUS
			zlog.Debug("规则", zap.Any("主机", host))
			break
		}

	}
}
