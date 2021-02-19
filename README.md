# tossCoin 抛硬币

抛硬币，并不是因为硬币能帮你决定什么，而是因为在硬币抛出的那一刻，答案便会出现在你心里。

## DEMO
### 演示
![demo](https://github.com/xiaohouye1995/tossCoin/blob/master/readme_img/1.gif)

### 微信小程序码
![微信小程序码](https://github.com/xiaohouye1995/tossCoin/blob/master/readme_img/wxQRcode.jpg)

### 支付宝小程序码
![支付宝小程序码](https://github.com/xiaohouye1995/tossCoin/blob/master/readme_img/zfbQRcode.jpg)

## 运行平台
微信小程序、支付宝小程序、抖音小程序、H5、ios、安卓

使用 uni-app 开发，除微信小程序、支付宝小程序外，其他端未测试

## 框架/工具
- uni-app
- 耳聆网（音效） https://www.ear0.com/search/word-%E7%A1%AC%E5%B8%81
- 中国金币网（硬币图片）http://www.chngc.net/
- 加拿大金币网（十二星座）https://www.mint.ca/store/search/searchResults.jsp?_requestid=510053
- 图片懒加载 https://ext.dcloud.net.cn/plugin?id=1498
- 卡片式轮播图 https://ext.dcloud.net.cn/plugin?id=1674

## 功能需求
- [ ] 抛掷方式选择
- [ ] 转uniCloud
- [ ] 自定义硬币图片
- [ ] 弹出框美化
- [ ] 触摸震动
- [x] 硬币浮光
- [x] 硬币3D旋转
- [x] 硬币阴影
- [x] 硬币种类选择
- [x] 音效
- [x] 音效选择
- [x] 背景皮肤
- [x] 提示语，抛硬币理论
- [x] 抛掷统计
- [x] 抛掷次数
- [x] 字次数，占比
- [x] 人头次数，占比
- [x] 清空数据
- [x] 报警监控
- [x] 我要吐槽-意见反馈
- [x] 彩蛋 （等待你的发现~~）
- [x] 转发分享
- [x] 适配小程序pc（ipad）端
- [x] 支付宝版小程序
- [x] 十二星座系列硬币
- [x] 彩蛋硬币皮肤，在彩蛋页下放置彩蛋码，在硬币皮肤页输入彩蛋码，获得皮肤；
- [x] 视频广告激励
- [x] 插屏广告
- [x] 背景选择界面交互优化，参考起点APP阅读背景选择页面
- [x] 联动古代银钱换算器，民国银元硬币皮肤
- [x] 使用cdn缓存，提高加载速度
- [x] 优化- 图片懒加载
- [x] 修改彩蛋获取方式为进入彩蛋页后自动领取，不需输入彩蛋码
- [x] 连续点击下，存在数据统计错误的bug
- [x] 点击按钮加特效


## 填坑
### animation 没能重复触发

现象：第二次抛掷结果和上一次相同时，没有发生旋转效果

原因：animation 没能重复触发

解决：使用 setTimeout 方法，先移除 class 在添加新的 class 重新触发 animation

### transform 使 border-radius 失效

现象：硬币扫光效果，在移动端会超出硬币范围显示

原因：transform 使 border-radius 失效

解决：使用 mask-image: radial-gradient(white, black);

### 目标旋转90度后，成平行状态，以默认角度无法观测到
现象：rotateX() 为90deg 时，不能显示

原因： 目标旋转90度后，成平行状态，以默认角度无法观测到

解决：使用 perspective(100px) 调整角度

### rotateY(180deg) 方法使图片进行翻转，但是每次运行时，被不断触发
现象：小程序真机运行下，硬币反面不断镜像翻转直到停下

原因：rotateY(180deg) 方法使图片进行翻转，但是每次运行时，被不断触发

解决：将图片翻转放在该目标的子元素上

### 导入字体文件后，报错，影响界面渲染
现象：小程序真机运行下，界面内容显示不全

原因：导入字体文件后，报错，影响界面渲染

解决：修改导入字体方式，如下：
```
把iconfont.css 的全部代码 全部复制到App.vue文件style里
或者（在static目录下创建一个css文件，在main.js引入即可 import "./static/icon-font/iconfont.css"）
然后 删除 src: url('iconfont.eot?t=1562306471309'); / IE9 /
url('iconfont.woff?t=1562306471309') format('woff'),
url('iconfont.ttf?t=1562306471309') format('truetype'), / chrome, firefox, opera, Safari, Android, iOS 4.2+ /
url('iconfont.svg?t=1562306471309#iconfont') format('svg'); / iOS 4.1- /
只保留转为base64的 woff2的即可
```
### 硬币旋转的音效延迟
现象：硬币旋转的音效延迟

原因：音效加载时间长，加上音频文件较大，而且需要网络下载

解决：使用 onPlay() 方法，等待音频加载后再旋转硬币，另外压缩音频文件体积，并放入本地文件中

### 无法修改 button 样式
现象：无法修改 button 样式

原因：uni-app 自带的border

解决：用 button::after{ border: none;} 可以去掉

### "navigationBarTextStyle": "black" 属性在支付宝小程序中无效
现象："navigationBarTextStyle": "black" 属性在支付宝小程序中无效

原因：支付宝小程序文字颜色和标题前景色共用一个属性

解决：navigationBarBackgroundColor属性不在支付宝小程序中使用
```
"globalStyle": {
	"navigationBarTextStyle": "black",
	"navigationBarTitleText": "来抛硬币",
	// #ifdef MP-WEIXIN
	"navigationBarBackgroundColor": "#f8f8f8",
	// #endif
	"backgroundColor": "#f7f8fa"
}
```

### 支付宝小程序页面不能自适应高度
现象：支付宝小程序页面不能自适应高度

原因：支付宝小程序 没有 page 根元素标签

解决：最外层加一个view标签，style=“height:100vh”

### 腾讯云对象存储使用CDN后，CDN监控后台无访问日志
现象：CDN访问域名无访问日志

原因：直接访问COS的域名，是不会经过CDN

解决：修改cos域名地址为CDN地址

### 本地修改json数据
暂时未找到方法，改为使用 setStorageSync 将json中需要修改的数据id存入本地缓存，再进入页面读取json数据时，通过双重循环来修改数据
```
import coinJson from '../../static/json/coin.json'
// 获取硬币列表
getCoinList() {
	this.coins = coinJson.data
	let unlockList = uni.getStorageSync('unlockList') || [];
	for (let item of this.coins[1].list) {
		for (let item2 of unlockList) {
			if (item.value === item2) {
				item.status = true
			}
		}
	}
},
// 解锁硬币皮肤
unlockCoin() {
	let unlockList = uni.getStorageSync('unlockList') || [];
    unlockList.push(this.coinid)
    uni.setStorageSync('unlockList', unlockList);
},
```

### css绝对定位居中
```
.conter{
    width: 600px; height: 400px;
    position: absolute; left: 50%; top: 50%;
    transform: translate(-50%, -50%);    /* 50%为自身尺寸的一半 */
}
```

### css灰度滤镜
```
div {
    filter: grayscale(100%);
}
```