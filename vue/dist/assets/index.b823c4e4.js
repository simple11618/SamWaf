import{V as r,i as u,p as c,n as d}from"./index.46025505.js";import{T as h}from"./index.3aedcce4.js";import{C as p,a as C,b as _,c as T}from"./index.6b44d315.js";var f=r.extend({name:"ListBase",components:{SearchIcon:u,Trend:h},data(){return{CONTRACT_STATUS:p,CONTRACT_STATUS_OPTIONS:C,CONTRACT_TYPES:_,CONTRACT_PAYMENT_TYPES:T,prefix:c,dataLoading:!1,data:[],selectedRowKeys:[1,2],value:"first",columns:[{colKey:"row-select",type:"multiple",width:64,fixed:"left"},{title:"\u5408\u540C\u540D\u79F0",align:"left",width:250,ellipsis:!0,colKey:"name",fixed:"left"},{title:"\u5408\u540C\u72B6\u6001",colKey:"status",width:200,cell:{col:"status"}},{title:"\u5408\u540C\u7F16\u53F7",width:200,ellipsis:!0,colKey:"no"},{title:"\u5408\u540C\u7C7B\u578B",width:200,ellipsis:!0,colKey:"contractType"},{title:"\u5408\u540C\u6536\u4ED8\u7C7B\u578B",width:200,ellipsis:!0,colKey:"paymentType"},{title:"\u5408\u540C\u91D1\u989D (\u5143)",width:200,ellipsis:!0,colKey:"amount"},{align:"left",fixed:"right",width:200,colKey:"op",title:"\u64CD\u4F5C"}],rowKey:"index",tableLayout:"auto",verticalAlign:"top",hover:!0,rowClassName:e=>`${e}-class`,pagination:{defaultPageSize:20,total:0,defaultCurrent:1},searchValue:"",confirmVisible:!1,deleteIdx:-1}},computed:{confirmBody(){var e;if(this.deleteIdx>-1){const{name:s}=(e=this.data)==null?void 0:e[this.deleteIdx];return`\u5220\u9664\u540E\uFF0C${s}\u7684\u6240\u6709\u5408\u540C\u4FE1\u606F\u5C06\u88AB\u6E05\u7A7A\uFF0C\u4E14\u65E0\u6CD5\u6062\u590D`}return""},offsetTop(){return this.$store.state.setting.isUseTabsRouter?48:0}},mounted(){this.dataLoading=!0,this.$request.get("/api/get-list").then(e=>{if(e.code===0){const{list:s=[]}=e.data;this.data=s,this.pagination={...this.pagination,total:s.length}}}).catch(e=>{console.log(e)}).finally(()=>{this.dataLoading=!1})},methods:{getContainer(){return document.querySelector(".tdesign-starter-layout")},rehandlePageChange(e,s){console.log("\u5206\u9875\u53D8\u5316",e,s)},rehandleSelectChange(e){this.selectedRowKeys=e},rehandleChange(e,s){console.log("\u7EDF\u4E00Change",e,s)},handleClickDetail(){this.$router.push("/detail/base")},handleSetupContract(){this.$router.push("/form/base")},handleClickDelete(e){this.deleteIdx=e.rowIndex,this.confirmVisible=!0},onConfirmDelete(){this.data.splice(this.deleteIdx,1),this.pagination.total=this.data.length;const e=this.selectedRowKeys.indexOf(this.deleteIdx);e>-1&&this.selectedRowKeys.splice(e,1),this.confirmVisible=!1,this.$message.success("\u5220\u9664\u6210\u529F"),this.resetIdx()},onCancel(){this.resetIdx()},resetIdx(){this.deleteIdx=-1}}}),l=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",[t("t-card",{staticClass:"list-card-container"},[t("t-row",{attrs:{justify:"space-between"}},[t("div",{staticClass:"left-operation-container"},[t("t-button",{on:{click:e.handleSetupContract}},[e._v(" \u65B0\u5EFA\u5408\u540C ")]),t("t-button",{attrs:{variant:"base",theme:"default",disabled:!e.selectedRowKeys.length}},[e._v(" \u5BFC\u51FA\u5408\u540C ")]),e.selectedRowKeys.length?t("p",{staticClass:"selected-count"},[e._v("\u5DF2\u9009"+e._s(e.selectedRowKeys.length)+"\u9879")]):e._e()],1),t("t-input",{staticClass:"search-input",attrs:{placeholder:"\u8BF7\u8F93\u5165\u4F60\u9700\u8981\u641C\u7D22\u7684\u5185\u5BB9",clearable:""},scopedSlots:e._u([{key:"suffix-icon",fn:function(){return[t("search-icon",{attrs:{size:"20px"}})]},proxy:!0}]),model:{value:e.searchValue,callback:function(n){e.searchValue=n},expression:"searchValue"}})],1),t("div",{staticClass:"table-container"},[t("t-table",{attrs:{columns:e.columns,data:e.data,rowKey:e.rowKey,verticalAlign:e.verticalAlign,hover:e.hover,pagination:e.pagination,"selected-row-keys":e.selectedRowKeys,loading:e.dataLoading,headerAffixedTop:!0,headerAffixProps:{offsetTop:e.offsetTop,container:e.getContainer}},on:{"page-change":e.rehandlePageChange,change:e.rehandleChange,"select-change":e.rehandleSelectChange},scopedSlots:e._u([{key:"status",fn:function(n){var a=n.row;return[a.status===e.CONTRACT_STATUS.FAIL?t("t-tag",{attrs:{theme:"danger",variant:"light"}},[e._v("\u5BA1\u6838\u5931\u8D25")]):e._e(),a.status===e.CONTRACT_STATUS.AUDIT_PENDING?t("t-tag",{attrs:{theme:"warning",variant:"light"}},[e._v("\u5F85\u5BA1\u6838")]):e._e(),a.status===e.CONTRACT_STATUS.EXEC_PENDING?t("t-tag",{attrs:{theme:"warning",variant:"light"}},[e._v("\u5F85\u5C65\u884C")]):e._e(),a.status===e.CONTRACT_STATUS.EXECUTING?t("t-tag",{attrs:{theme:"success",variant:"light"}},[e._v("\u5C65\u884C\u4E2D")]):e._e(),a.status===e.CONTRACT_STATUS.FINISH?t("t-tag",{attrs:{theme:"success",variant:"light"}},[e._v("\u5DF2\u5B8C\u6210")]):e._e()]}},{key:"contractType",fn:function(n){var a=n.row;return[a.contractType===e.CONTRACT_TYPES.MAIN?t("p",[e._v("\u5BA1\u6838\u5931\u8D25")]):e._e(),a.contractType===e.CONTRACT_TYPES.SUB?t("p",[e._v("\u5F85\u5BA1\u6838")]):e._e(),a.contractType===e.CONTRACT_TYPES.SUPPLEMENT?t("p",[e._v("\u5F85\u5C65\u884C")]):e._e()]}},{key:"paymentType",fn:function(n){var a=n.row;return[a.paymentType===e.CONTRACT_PAYMENT_TYPES.PAYMENT?t("p",{staticClass:"payment-col"},[e._v(" \u4ED8\u6B3E "),t("trend",{staticClass:"dashboard-item-trend",attrs:{type:"up"}})],1):e._e(),a.paymentType===e.CONTRACT_PAYMENT_TYPES.RECIPT?t("p",{staticClass:"payment-col"},[e._v(" \u6536\u6B3E "),t("trend",{staticClass:"dashboard-item-trend",attrs:{type:"down"}})],1):e._e()]}},{key:"op",fn:function(n){return[t("a",{staticClass:"t-button-link",on:{click:function(a){return e.handleClickDetail()}}},[e._v("\u8BE6\u60C5")]),t("a",{staticClass:"t-button-link",on:{click:function(a){return e.handleClickDelete(n)}}},[e._v("\u5220\u9664")])]}}])})],1)],1),t("t-dialog",{attrs:{header:"\u786E\u8BA4\u5220\u9664\u5F53\u524D\u6240\u9009\u5408\u540C\uFF1F",body:e.confirmBody,visible:e.confirmVisible,onCancel:e.onCancel},on:{"update:visible":function(n){e.confirmVisible=n},confirm:e.onConfirmDelete}})],1)},g=[];l._withStripped=!0;const i={};var o=d(f,l,g,!1,y,"cee06a5e",null,null);function y(e){for(let s in i)this[s]=i[s]}o.options.__file="src/pages/list/base/index.vue";var A=function(){return o.exports}();export{A as default};
