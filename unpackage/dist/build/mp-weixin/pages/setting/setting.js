(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/setting/setting"],{"08ee":function(n,t,e){},"185d":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={data:function(){return{}},onLoad:function(){},methods:{toCoinSkin:function(){n.navigateTo({url:"/pages/setting/coinskin"})},toCoinAudio:function(){n.navigateTo({url:"/pages/setting/coinaudio"})},toCoinBg:function(){n.navigateTo({url:"/pages/setting/bgCover"})},clearRecord:function(){n.showModal({title:"",content:"清空我的统计记录，重新开始",confirmText:"清空",cancelText:"不清空",confirmColor:"#fd746c",success:function(t){t.confirm?(console.log("用户点击确定"),n.setStorageSync("recordTotalCount",0),n.setStorageSync("recordFacadeCount",0),n.setStorageSync("recordReverseCount",0),n.showToast({title:"已清空",duration:2e3})):t.cancel&&console.log("用户点击取消")}})}}};t.default=e}).call(this,e("543d")["default"])},"20aa":function(n,t,e){"use strict";e.r(t);var o=e("185d"),c=e.n(o);for(var a in o)"default"!==a&&function(n){e.d(t,n,(function(){return o[n]}))}(a);t["default"]=c.a},"61e1":function(n,t,e){"use strict";var o,c=function(){var n=this,t=n.$createElement;n._self._c},a=[];e.d(t,"b",(function(){return c})),e.d(t,"c",(function(){return a})),e.d(t,"a",(function(){return o}))},"9dc5":function(n,t,e){"use strict";var o=e("08ee"),c=e.n(o);c.a},d4a5:function(n,t,e){"use strict";e.r(t);var o=e("61e1"),c=e("20aa");for(var a in c)"default"!==a&&function(n){e.d(t,n,(function(){return c[n]}))}(a);e("9dc5");var u,i=e("f0c5"),r=Object(i["a"])(c["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],u);t["default"]=r.exports},f91e:function(n,t,e){"use strict";(function(n){e("9b5a");o(e("66fd"));var t=o(e("d4a5"));function o(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])}},[["f91e","common/runtime","common/vendor"]]]);