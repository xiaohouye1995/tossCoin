# tossCoin 抛硬币

抛硬币，并不是因为硬币能帮你决定什么，而是因为在硬币抛出的那一刻，答案便会出现在你心里。

## 框架/工具
- uni-app
- 耳聆网（音效） https://www.ear0.com/search/word-%E7%A1%AC%E5%B8%81
- 中国金币网（硬币图片）http://www.chngc.net/

## 问题
### 问题1

现象：第二次抛掷结果和上一次相同时，没有发生旋转效果

原因：animation 没能重复触发

解决：使用 setTimeout 方法，先移除 class 在添加新的 class 重新触发 animation

### 问题2

现象：硬币扫光效果，在移动端会超出硬币范围显示

原因：transform 使 border-radius 失效

解决：使用 mask-image: radial-gradient(white, black);

### 问题3
现象：rotateX() 为90deg 时，不能显示

原因： 目标旋转90度后，成平行状态，以默认角度无法观测到

解决：使用 perspective(100px) 调整角度

### 问题4
现象：小程序真机运行下，硬币反面不断镜像翻转直到停下

原因：rotateY(180deg) 方法使图片进行翻转，但是每次运行时，被不断触发

解决：将图片翻转放在该目标的子元素上

### 问题5
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


## 功能
- [ ] 抛掷方式选择（二期）
- [x] 硬币扫光
- [x] 硬币3D旋转
- [x] 硬币阴影
- [ ] 硬币种类选择
- [ ] 自定义硬币（二期）
- [x] 音效
- [ ] 音效选择
- [ ] 提示语，抛硬币的意义
- [x] 抛掷统计
- [x] 抛掷次数
- [x] 字次数，占比
- [x] 人头次数，占比
- [ ] 清空数据
- [ ] 报警监控
- [ ] APP端