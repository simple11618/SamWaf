import{V as h,_ as m,u as y,I as b,a as O,n as g}from"./index.46025505.js";var P=["size"];function a(n,t){var r=Object.keys(n);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(n);t&&(e=e.filter(function(s){return Object.getOwnPropertyDescriptor(n,s).enumerable})),r.push.apply(r,e)}return r}function o(n){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?a(Object(r),!0).forEach(function(e){O(n,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach(function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(r,e))})}return n}var j={tag:"svg",attrs:{fill:"none",viewBox:"0 0 16 16",width:"1em",height:"1em"},children:[{tag:"path",attrs:{fill:"currentColor",d:"M8.5 4v5.5h-1V4h1zM8.6 10.5H7.4v1.2h1.2v-1.2z",fillOpacity:.9}},{tag:"path",attrs:{fill:"currentColor",d:"M15 8A7 7 0 101 8a7 7 0 0014 0zm-1 0A6 6 0 112 8a6 6 0 0112 0z",fillOpacity:.9}}]},C=h.extend({name:"ErrorCircleIcon",functional:!0,props:{size:{type:String},onClick:{type:Function}},render:function(t,r){var e=r.props,s=r.data,p=e.size,f=m(e,P),i=y(p),_=i.className,v=i.style,d=o(o({},f||{}),{},{id:"error-circle",icon:j,staticClass:_,style:v});return s.props=d,t(b,s)}}),l=function(){var n=this,t=this,r=t.$createElement,e=t._self._c||r;return e("div",{staticClass:"result-fail"},[e("error-circle-icon",{staticClass:"result-fail-icon"}),e("div",{staticClass:"result-fail-title"},[t._v("\u521B\u5EFA\u5931\u8D25")]),e("div",{staticClass:"result-fail-describe"},[t._v("\u62B1\u6B49\uFF0C\u60A8\u7684\u9879\u76EE\u521B\u5EFA\u5931\u8D25\uFF0C\u4F01\u4E1A\u5FAE\u4FE1\u8054\u7CFB\u68C0\u67E5\u521B\u5EFA\u8005\u6743\u9650\uFF0C\u6216\u8FD4\u56DE\u4FEE\u6539\u3002")]),e("div",[e("t-button",{on:{click:function(){return n.$router.push("/form/base")}}},[t._v("\u8FD4\u56DE\u4FEE\u6539")]),e("t-button",{attrs:{theme:"default"},on:{click:function(){return n.$router.push("/form/base")}}},[t._v("\u8FD4\u56DE\u9996\u9875")])],1)],1)},z=[];l._withStripped=!0;const w={name:"ResultFail",components:{ErrorCircleIcon:C}},c={};var u=g(w,l,z,!1,x,"bc20b702",null,null);function x(n){for(let t in c)this[t]=c[t]}u.options.__file="src/pages/result/fail/index.vue";var E=function(){return u.exports}();export{E as default};
