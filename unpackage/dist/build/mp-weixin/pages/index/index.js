(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"0c6c":function(o,t,e){},"15de":function(o,t,e){"use strict";var n;e.d(t,"b",(function(){return i})),e.d(t,"c",(function(){return c})),e.d(t,"a",(function(){return n}));var i=function(){var o=this,t=o.$createElement;o._self._c},c=[]},6538:function(o,t,e){"use strict";(function(o){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={data:function(){return{coinImgFront:"",coinImgBack:"",isStatusText:"薛定谔的硬币",bgCoverImg:"",record:{}}},onLoad:function(){o.showShareMenu({withShareTicket:!0}),o.showModal({title:"",content:"抛硬币，并不是因为硬币能帮你决定什么，而是因为在硬币抛出的那一刻，答案便会出现在你心里。",showCancel:!1,confirmText:"开始",confirmColor:"#fd746c",success:function(o){o.confirm?console.log("用户点击确定"):o.cancel&&console.log("用户点击取消")}})},onShow:function(){this.getBgImg(),this.getCoinImg(),this.getCoinRecord(),this.getAudio(),this.record.result="薛定谔的硬币",this.isStatusText="薛定谔的硬币"},methods:{getBgImg:function(){var t=o.getStorageSync("bgCoverImg")||"bg_4";this.bgCoverImg="https://746f-tosscoin-whstu-1259588940.tcb.qcloud.la/img/".concat(t,".jpg"),this.bgCoverImg="https://tosscoin-1256354221.file.myqcloud.com/img/".concat(t,".jpg")},getCoinImg:function(){var t=o.getStorageSync("coinName")||"2020shu";this.coinImgFront="https://tosscoin-1256354221.file.myqcloud.com/img/".concat(t,"_front.png"),this.coinImgBack="https://tosscoin-1256354221.file.myqcloud.com/img/".concat(t,"_back.png")},getAudio:function(){var t=o.getStorageSync("coinAuidoID")||"filpCoin1";this.audioSrc="wu"===t?null:"/static/audio/".concat(t,".mp3")},getCoinRecord:function(){var t=this.isStatusText,e=o.getStorageSync("recordFacadeCount")||0,n=o.getStorageSync("recordReverseCount")||0,i=e+n,c=i<=0?"0%":Math.round(e/i*1e4)/100+"%",r=i<=0?"0%":Math.round(n/i*1e4)/100+"%";this.record={result:t,totalCount:i,facadeCount:e,reverseCount:n,facadeProportion:c,reverseProportion:r},520===i&&o.showModal({title:"",content:"最好的都是即将发生的",showCancel:!1,confirmText:"喜欢你",confirmColor:"#fd746c",success:function(t){t.confirm?(console.log("用户点击确定"),o.navigateTo({url:"/pages/easteregg/easteregg"})):t.cancel&&console.log("用户点击取消")}})},toCoinSkin:function(){o.navigateTo({url:"/pages/setting/coinskin"})},tossCoin:function(){this.audioSrc?this.loadAudio():this.filpCoin()},loadAudio:function(){var t=this,e=o.createInnerAudioContext();e.autoplay=!0,e.src=this.audioSrc,e.onPlay((function(){console.log("开始播放"),t.filpCoin()})),e.onError((function(o){console.log(o.errMsg),console.log(o.errCode),t.filpCoin()}))},filpCoin:function(){var t=this;this.record.result="量子力学中...",this.isStatusText="量子",this.timerCoinFilp=setTimeout((function(){var e=1,n=10,i=Math.floor(Math.random()*(n-e+1))+e;if(i<=5){t.isStatusText="正面";var c=t.record.facadeCount+1;o.setStorageSync("recordFacadeCount",c)}else{t.isStatusText="反面";var r=t.record.reverseCount+1;o.setStorageSync("recordReverseCount",r)}t.timerCoinRecord=setTimeout((function(){t.getCoinRecord()}),1e3)}),0)},clearTimerCoinFilp:function(){clearTimeout(this.timerCoinFilp),this.timerCoinFilp=null,console.log("timerCoinFilp",this.timerCoinFilp)},clearTimerCoinRecord:function(){clearTimeout(this.timerCoinRecord),this.timerCoinRecord=null,console.log("timerCoinRecord",this.timerCoinRecord)}},onHide:function(){this.timerCoinFilp&&this.clearTimerCoinFilp(),this.timerCoinRecord&&this.clearTimerCoinRecord()}};t.default=e}).call(this,e("543d")["default"])},9512:function(o,t,e){"use strict";(function(o){e("9b5a");n(e("66fd"));var t=n(e("ef53"));function n(o){return o&&o.__esModule?o:{default:o}}o(t.default)}).call(this,e("543d")["createPage"])},bba6:function(o,t,e){"use strict";var n=e("0c6c"),i=e.n(n);i.a},c2af:function(o,t,e){"use strict";e.r(t);var n=e("6538"),i=e.n(n);for(var c in n)"default"!==c&&function(o){e.d(t,o,(function(){return n[o]}))}(c);t["default"]=i.a},ef53:function(o,t,e){"use strict";e.r(t);var n=e("15de"),i=e("c2af");for(var c in i)"default"!==c&&function(o){e.d(t,o,(function(){return i[o]}))}(c);e("bba6");var r,a=e("f0c5"),s=Object(a["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],r);t["default"]=s.exports}},[["9512","common/runtime","common/vendor"]]]);