package api

import "SamWaf/service/waf_service"

type APIGroup struct {
	WafHostAPi
	WafStatApi
	WafLogAPi
	WafRuleAPi
	WafEngineApi
	WafAllowIpApi
	WafAllowUrlApi
	WafLdpUrlApi
	WafAntiCCApi
	WafBlockIpApi
	WafBlockUrlApi
	WafAccountApi
	WafAccountLogApi
	WafLoginApi
	WafSysLogApi
	WafWebSocketApi
	WafSysInfoApi
	WafSystemConfigApi
	WafCommonApi
	WafOneKeyModApi
	CenterApi
	WafLicenseApi
	WafSensitiveApi
}

var APIGroupAPP = new(APIGroup)
var (
	wafHostService     = waf_service.WafHostServiceApp
	wafLogService      = waf_service.WafLogServiceApp
	wafStatService     = waf_service.WafStatServiceApp
	wafRuleService     = waf_service.WafRuleServiceApp
	wafIpAllowService  = waf_service.WafWhiteIpServiceApp
	wafUrlAllowService = waf_service.WafWhiteUrlServiceApp
	wafLdpUrlService   = waf_service.WafLdpUrlServiceApp
	wafAntiCCService   = waf_service.WafAntiCCServiceApp

	wafIpBlockService  = waf_service.WafBlockIpServiceApp
	wafUrlBlockService = waf_service.WafBlockUrlServiceApp

	wafAccountService    = waf_service.WafAccountServiceApp
	wafAccountLogService = waf_service.WafAccountLogServiceApp
	wafTokenInfoService  = waf_service.WafTokenInfoServiceApp

	wafSysLogService       = waf_service.WafSysLogServiceApp
	wafSystemConfigService = waf_service.WafSystemConfigServiceApp
	wafDelayMsgService     = waf_service.WafDelayMsgServiceApp

	wafShareDbService = waf_service.WafShareDbServiceApp

	wafOneKeyModService = waf_service.WafOneKeyModServiceApp

	CenterService = waf_service.CenterServiceApp

	wafSensitiveService = waf_service.WafSensitiveServiceApp
)
