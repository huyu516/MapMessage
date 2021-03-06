# 百度地图消息应用DEMO

## 介绍
双击百度地图上发消息，他人也能看到并回复，并且可以通过查询条件过滤消息

比如你可以问"这里饭好不好吃"，别人如果看到就可以告诉你

## 说明
这是2014年8月我同学参加比赛时我给他开发的一个DEMO

当时为了赶时间都写的是内联样式之类的，JS也没格式化好，所以代码不太规范

并且APP没有服务端，所有数据都存在本地`SQLITE`中，默认是`admin`帐号，但是可以注册新用户

## 下载
[APK下载](https://raw.githubusercontent.com/huyu516/MapMessage/master/MapMessage.apk) 

![扫码下载](https://raw.githubusercontent.com/huyu516/MapMessage/master/screenshorts/download.png)

扫码下载

## 实现
- 技术选型: jQuery Mobile + PhonGap + 百度地图
- 开发环境: Eclipse + ADT
- 主要目录：`src/com.lzu.mapmessage`放的是`Activty`和`PhongGap`插件、`assets`是全部的页面和`JS`脚本

## 截图

![登录](https://raw.githubusercontent.com/huyu516/MapMessage/master/screenshorts/login.png)

登录

![消息查询](https://raw.githubusercontent.com/huyu516/MapMessage/master/screenshorts/search.png)

消息查询

![消息列表](https://raw.githubusercontent.com/huyu516/MapMessage/master/screenshorts/list.png)

消息列表

![消息回复](https://raw.githubusercontent.com/huyu516/MapMessage/master/screenshorts/add.png)

消息回复

![地图模式](https://raw.githubusercontent.com/huyu516/MapMessage/master/screenshorts/map.png)

地图模式

