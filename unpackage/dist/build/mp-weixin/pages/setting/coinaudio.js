(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/setting/coinaudio"],{"44f4":function(n,t,o){"use strict";var e,i=function(){var n=this,t=n.$createElement;n._self._c},u=[];o.d(t,"b",(function(){return i})),o.d(t,"c",(function(){return u})),o.d(t,"a",(function(){return e}))},"6a04":function(n,t,o){"use strict";o.r(t);var e=o("dc67"),i=o.n(e);for(var u in e)"default"!==u&&function(n){o.d(t,n,(function(){return e[n]}))}(u);t["default"]=i.a},bd6e:function(n,t,o){"use strict";(function(n){o("9b5a");e(o("66fd"));var t=e(o("ed5f"));function e(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,o("543d")["createPage"])},dc67:function(n,t,o){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o={data:function(){return{audios:[],coinAudio:""}},onLoad:function(){this.getList(),this.getUseAudio()},methods:{getList:function(){var n=[{name:"无",src:"wu"},{name:"经典1",src:"filpCoin1"},{name:"经典2",src:"filpCoin2"}];this.audios=[];for(var t=0,o=n;t<o.length;t++){var e=o[t],i={name:e.name,id:e.src,src:"/static/audio/".concat(e.src,".mp3")};this.audios.push(i)}},getUseAudio:function(){this.coinAudio=n.getStorageSync("coinAuidoID")||"filpCoin1"},selectAudio:function(t,o){n.setStorageSync("coinAuidoID",t.id),n.showToast({title:"设置成功",duration:2e3}),this.getUseAudio(),t.id&&this.loadAudio(t.src)},loadAudio:function(t){var o=n.createInnerAudioContext();o.autoplay=!0,o.src=t,o.onPlay((function(){console.log("开始播放")})),o.onError((function(n){console.log(n.errMsg),console.log(n.errCode)}))}}};t.default=o}).call(this,o("543d")["default"])},ed5f:function(n,t,o){"use strict";o.r(t);var e=o("44f4"),i=o("6a04");for(var u in i)"default"!==u&&function(n){o.d(t,n,(function(){return i[n]}))}(u);var c,a=o("f0c5"),r=Object(a["a"])(i["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],c);t["default"]=r.exports}},[["bd6e","common/runtime","common/vendor"]]]);