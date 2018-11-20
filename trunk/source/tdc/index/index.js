var utilRequest = require("../util/request.js");
var utilMd5 = require("../util/md5.js");
var utilGloabl = require("../util/globaldata.js");
var app = getApp();

Page({
  data:{
    imgUrls: ["../image/main/banner_1.png", "../image/main/banner_2.png", "../image/main/banner_3.png", "../image/main/banner_4.png", "../image/main/banner_5.png"],
    indicatorDots:true,
    autoplay:true,
    circular:true,
    displayMultiipleItems:5,
    hiEvalList:[],
    hiEvalTeacher:"高评教师",
    hiEvalSchool:"高评机构",
    begin:0,

    address:null,
    address_logo: null,
    school_logo: null,
    teacher_logo: null,

    //begin
    image: "",
    image_width: "",
    image_height: "",

    intervalId: "",
    hasInitialized: true,

    serverHttps: "",

  },
  onLoad:function(){
    var that = this;

    that.setData({
      address: "天河区",
      address_logo: "../image/main/address.png",
      school_logo: "../image/main/school.png",
      teacher_logo: "../image/main/teacher.png",
      image: "../image/begin/begin.gif",
      image_width: app.globalData.windowWidth * app.globalData.pixelRatio - 100,
      image_height: app.globalData.windowHeight * app.globalData.pixelRatio,
      hasInitialized: true,
      serverHttps: utilGloabl.GetServerHttps(),
    })



    // var time = 3;

    // //三秒后跳转到主页
    // that.data.intervalId = setInterval(function () {
    //   if (time == 0) {
    //     clearInterval(that.data.intervalId);
    //     that.setData({
    //       hasInitialized: true,
    //     })

    //     wx.login({
    //       success: res => {
    //         // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //       }
    //     })
    //     // 获取用户信息
    //     wx.getSetting({
    //       success: res => {
    //         if (res.authSetting['scope.userInfo']) {
    //           // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //           wx.getUserInfo({
    //             success: res => {
    //               // 可以将 res 发送给后台解码出 unionId
    //               that.data.userInfo = res.userInfo
    //               console.log(res.userInfo);

    //               // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //               // 所以此处加入 callback 以防止这种情况
    //               if (this.userInfoReadyCallback) {
    //                 this.userInfoReadyCallback(res)
    //               }
    //             }
    //           })
    //         }
    //       }
    //     });

    //     if (app.globalData.userid == null) {
    //       wx.navigateTo({
    //         url: '../login/login',
    //       })
    //     }

    //   } else {
    //     --time;
    //   }
    // }, 1000)



    //临时登录
    // utilRequest.NetRequest({
    //   url: "login/login",
    //   data: {
    //     username: "woshilaoshi",
    //     password: utilMd5.hexMD5("woshilaoshi"),
    //   },
    //   success: function (res) {
    //     var jsoncontent = JSON.parse(res.jsoncontent);
    //     app.globalData.userid = jsoncontent.userid;
    //     app.globalData.role = jsoncontent.role;
    //     if (jsoncontent.role == 0 || jsoncontent.role == 1) {
    //       wx.switchTab({
    //         url: '../index/index',
    //       });
    //     } else if (jsoncontent.role == 2) {
    //       wx.redirectTo({
    //         url: '../admin/admin',
    //       })
    //     }

    //     // wx.navigateTo({
    //     //   url: '../admin/admin',
    //     // })
    //   },
    //   fail: function (res) {

    //   }

    // });

    // if (app.globalData.userid == null) {
    //   wx.redirectTo({
    //     url: '../login/login',
    //   })
    // }

    //暂时在这里开启服务器聊天系统
    utilRequest.NetRequest({
      url: "index/startchatserver",
      success: function(res){
        console.log(res);
      },
      fail: function(res){
        console.log(res);
      }
    })



    // wx.navigateTo({
    //   url: '../login/login',
    // })
  },
  onShow: function(){
    var that = this;


    //获取高评用户
    utilRequest.NetRequest({
      url: "index/gethighevallist",
      data: {
        begin: that.data.begin
      },
      success: function (res) {

        var jsoncontent = JSON.parse(res.jsoncontent);

        that.setData({ hiEvalList: jsoncontent });
      },
      fail: function (res) {

      }
    });

  },

  publishInfo:function(e){
    var that = this;
    var publishId = e.currentTarget.dataset.id;
    var publishObject = null;
    
    for(var i = 0; i < that.data.hiEvalList.length; ++i){
      if(that.data.hiEvalList[i].id == publishId){
        publishObject = that.data.hiEvalList[i].publishobject;
        break;
      }
    }
    if(publishObject == null){
      return;
    }
    var teacher = publishObject == 0 ? true : false;
    var school = !teacher;

    wx.navigateTo({
      url: '../info/info?teacher=' + teacher + '&school=' + school + '&publishId=' + publishId,
    })
  },
  findTeacher:function(e){
    var that = this;
    if (app.globalData.userid == null) {
      wx.navigateTo({
        url: '../login/login',
      })
      return;
    }

    wx.navigateTo({
      url: '../searchItem/searchItem?searchtype=0',
    })
  },
  findSchool:function(e){
    var that = this;

    if (app.globalData.userid == null) {
      wx.navigateTo({
        url: '../login/login',
      })
      return;
    }

    wx.navigateTo({
      url: '../searchItem/searchItem?searchtype=1',
    })
  },
  searchTap:function(e){
    var that = this;
    if (app.globalData.userid == null) {
      wx.navigateTo({
        url: '../login/login',
      })
      return;
    }

    wx.navigateTo({
      url: '../search/search',
    })
  },
  searchByMap: function(e){
    var that = this;
    if (app.globalData.userid == null) {
      wx.navigateTo({
        url: '../login/login',
      })
      return;
    }


    wx.navigateTo({
      url: '../map/map',
    })
  }
})