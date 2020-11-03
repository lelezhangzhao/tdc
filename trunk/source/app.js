//app.js
var globalData = require("tdc/util/globaldata.js");
var utilRequest = require("tdc/util/request.js");
var utilMd5 = require("tdc/util/md5.js");
var pubSub = require("tdc/util/watch.js");

App({
  globalData: {
    userInfo: null, //使用微信登录时才会用此属性
    loginType: 0, //0->账号密码 1->微信
    // userid:"zhangzhao",
    userid:null,
    role:null,
    //server: "http://10.8.78.132/public",
    windowHeight: null,
    windowWidth: null,
    pixelRatio: null,
    ws:"ws://127.0.0.1:2346",
    callback: function () {},
    lockReconnect: false,
    timer: null,
    limit: 0, //断线后的重连次数
    timeoutObj: null,
    serverTimeoutObj: null,
    timeout: 10000,
  },
  onLaunch: function () {
    var that = this;
    //获取屏幕信息
    wx.getSystemInfo({
      success:function(res){
        console.log(res);
        that.globalData.windowHeight = res.windowHeight;
        that.globalData.windowWidth = res.windowWidth;
        that.globalData.pixelRatio = res.pixelRatio;
      },
      fail:function(res){

      }
    });
    that.linkSocket();
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo
    //           console.log(res.userInfo);

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // });

    //暂时在这里开启服务器聊天系统
    // utilRequest.NetRequest({
    //   url: "index/startchatserver",
    //   success: function (res) {
    //     console.log(res);
    //   },
    //   fail: function (res) {
    //     console.log(res);
    //   }
    // })

    // wx.navigateTo({
    //   url: 'tdc/begin/begin',
    // })

  },
  //建立websocket连接
  linkSocket(){
    var that = this;
    wx.connectSocket({
      url: that.globalData.ws,
      success(){
        that.initEventHandle();
      }
    })
  },
  initEventHandle(){
    var that = this;
    wx.onSocketMessage((res) => {
      // console.log(res.data);
      if(res.data == "pong"){
        that.reset();
        that.start();
      }else{
        var jsoncontent = JSON.parse(res.data);
        pubSub.publish("msg", jsoncontent);
        // that.globalData.callback(res);
      }
    })
    wx.onSocketOpen(() => {
      console.log("webSocket open successful");
      that.reset();
      that.start();
    })
    wx.onSocketError((res) => {
      console.log("webSocket open failed");
      that.reconnect();
    })
    wx.onSocketClose((res) => {
      console.log("webSocket closed");
      that.reconnect();
    })
  },
  //重新连接
  reconnect(){
    var that = this;
    if(that.lockReconnect) return;
    that.lockReconnect = true;
    clearTimeout(that.timer);
    if(that.globalData.limit < 100000){
      that.timer = setTimeout(() => {
        that.linkSocket();
        that.lockReconnect = false;
        console.log("reconnect times is: " + that.globalData.limit)
      }, 5000);
      that.globalData.limit += 1;
    }
  },
  //心跳包开始
  reset(){
    var that = this;
    clearTimeout(that.globalData.timeoutObj);
    clearTimeout(that.globalData.serverTimeoutObj);
    return that;
  },
  start(){
    var that = this;
    var randomNum = that.randomWord(false, 16);
    that.globalData.timeoutObj = setTimeout(() => {
      // console.log("send ping");
      wx.sendSocketMessage({
        data: JSON.stringify({'type': 'ping'}),
        success(){
          console.log("send ping success");
        }
      });
      that.globalData.serverTimeoutObj = setTimeout(() => {
        wx.closeSocket();
      }, that.globalData.timeout);
    }, that.globalData.timeout);
  },
  randomWord: function(randomFlag, min, max){
    var str = "";
    var range = min;
    var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    if(randomFlag){
      range = Math.round(Math.random() * (max - min)) + min;
    }
    for(var i = 0; i < range; ++i){
      var pos = Math.round(Math.random() * (arr.length - 1));
      str += arr[pos];
    }
    return str;
  }

})