(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/setting/setting"],{"08ee":function(n,t,o){},"185d":function(n,t,o){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=null,e={data:function(){return{}},onLoad:function(){wx.createInterstitialAd&&(o=wx.createInterstitialAd({adUnitId:"adunit-3d758662f2d260e2"}),o.onLoad((function(){})),o.onError((function(n){})),o.onClose((function(){})))},onTabItemTap:function(){o&&o.show().catch((function(n){console.error(n)}))},methods:{toCoinSkin:function(){n.navigateTo({url:"/pages/setting/coinskin"})},toCoinAudio:function(){n.navigateTo({url:"/pages/setting/coinaudio"})},toCoinBg:function(){n.navigateTo({url:"/pages/setting/bgCover"})},toMiniProgram:function(t){var o="",e="",c="";switch(t){case"民国":o="wx5f8f090664d3b630",e="民国银元",c="minguo1911";break;case"贪吃龙":o="wx64765b37d8815453",e="西方龙",c="dragon";break}n.navigateToMiniProgram({appId:o,path:"pages/index/index",extraData:{data1:"test"},success:function(t){var o=n.getStorageSync("unlockList")||[];-1===o.findIndex((function(n){return n===c}))&&n.showModal({title:"恭喜您！",content:"".concat(e,"彩蛋硬币获取成功，请前往硬币中心查看"),showCancel:!1,confirmColor:"#fd746c",confirmText:"知道了",success:function(t){t.confirm&&(o.push(c),n.setStorageSync("unlockList",o))}})}})},clearRecord:function(){n.showModal({title:"",content:"清空我的统计记录，重新开始",confirmText:"清空",cancelText:"不清空",confirmColor:"#fd746c",success:function(t){t.confirm?(console.log("用户点击确定"),n.setStorageSync("recordTotalCount",0),n.setStorageSync("recordFacadeCount",0),n.setStorageSync("recordReverseCount",0),n.showToast({title:"已清空",duration:2e3})):t.cancel&&console.log("用户点击取消")}})}}};t.default=e}).call(this,o("543d")["default"])},"20aa":function(n,t,o){"use strict";o.r(t);var e=o("185d"),c=o.n(e);for(var a in e)"default"!==a&&function(n){o.d(t,n,(function(){return e[n]}))}(a);t["default"]=c.a},"9dc5":function(n,t,o){"use strict";var e=o("08ee"),c=o.n(e);c.a},d4a5:function(n,t,o){"use strict";o.r(t);var e=o("f897"),c=o("20aa");for(var a in c)"default"!==a&&function(n){o.d(t,n,(function(){return c[n]}))}(a);o("9dc5");var i,r=o("f0c5"),u=Object(r["a"])(c["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],i);t["default"]=u.exports},f897:function(n,t,o){"use strict";var e;o.d(t,"b",(function(){return c})),o.d(t,"c",(function(){return a})),o.d(t,"a",(function(){return e}));var c=function(){var n=this,t=n.$createElement;n._self._c},a=[]},f91e:function(n,t,o){"use strict";(function(n){o("9b5a");e(o("66fd"));var t=e(o("d4a5"));function e(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,o("543d")["createPage"])}},[["f91e","common/runtime","common/vendor"]]]);