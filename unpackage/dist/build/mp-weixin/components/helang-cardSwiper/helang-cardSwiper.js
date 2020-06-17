(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/helang-cardSwiper/helang-cardSwiper"],{2087:function(t,n,e){},"3f6c":function(t,n,e){"use strict";var r=e("2087"),i=e.n(r);i.a},"5b9c":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r={props:{swiperList:{type:Array,default:function(){return[]}},imageKey:{type:String,default:"img"},textKey:{type:String,default:"name"}},data:function(){return{listIndex:0,swiperMargin:"150rpx"}},components:{},mounted:function(){},methods:{swiperChange:function(t){this.listIndex=t.detail.current,this.$emit("swiperChange",this.swiperList[t.detail.current])}}};n.default=r},"66a6":function(t,n,e){"use strict";var r,i=function(){var t=this,n=t.$createElement;t._self._c},u=[];e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return r}))},bc80:function(t,n,e){"use strict";e.r(n);var r=e("5b9c"),i=e.n(r);for(var u in r)"default"!==u&&function(t){e.d(n,t,(function(){return r[t]}))}(u);n["default"]=i.a},fc18:function(t,n,e){"use strict";e.r(n);var r=e("66a6"),i=e("bc80");for(var u in i)"default"!==u&&function(t){e.d(n,t,(function(){return i[t]}))}(u);e("3f6c");var a,c=e("f0c5"),f=Object(c["a"])(i["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],a);n["default"]=f.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/helang-cardSwiper/helang-cardSwiper-create-component',
    {
        'components/helang-cardSwiper/helang-cardSwiper-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("fc18"))
        })
    },
    [['components/helang-cardSwiper/helang-cardSwiper-create-component']]
]);
