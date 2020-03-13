//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    title: '抛硬币了',
    coinimg: '../../static/coin1.png',
    coinimg2: '../../static/coin2.png'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
  }
})
