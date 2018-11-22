//app.js
var utilRequest = require("tdc/util/request.js");
var utilMd5 = require("tdc/util/md5.js");
App({
  onLaunch: function () {
    var that = this;
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
    utilRequest.NetRequest({
      url: "index/startchatserver",
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {
        console.log(res);
      }
    })

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
    })
    // wx.navigateTo({
    //   url: 'tdc/begin/begin',
    // })

  },
  globalData: {
    userInfo: null, //使用微信登录时才会此属性
    loginType: 0, //0->账号密码 1->微信
    userid:null,
    role:null,
    server: "https://localtdc.com/",
    windowHeight: null,
    windowWidth: null,
    pixelRatio: null,
  }
})