var utilRequest = require("../util/request.js");
var utilMd5 = require("../util/md5.js");
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
    hasInitialized: false,

  },
  onLoad:function(){
    var that = this;

    var time = 3;

    //三秒后跳转到主页
    that.data.intervalId = setInterval(function () {
      if (time == 0) {
        clearInterval(that.data.intervalId);
        that.setData({
          hasInitialized: true,
        })
      } else {
        --time;
      }
    }, 1000)



    that.setData({
      address: "天河区",
      address_logo: "../image/main/address.png",
      school_logo: "../image/main/school.png",
      teacher_logo: "../image/main/teacher.png",
      image: "../image/begin/begin.gif",
      image_width: app.globalData.windowWidth * app.globalData.pixelRatio - 100,
      image_height: app.globalData.windowHeight * app.globalData.pixelRatio,
      hasInitialized: false,
    })

    // //临时登录
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
    //     // wx.navigateTo({
    //     //   url: '../admin/admin',
    //     // })

    //   },
    //   fail: function (res) {

    //   }
    // });

    //暂时在这里开启服务器聊天系统
    // utilRequest.NetRequest({
    //   url: "index/startchatserver",
    //   success: function(res){

    //   },
    //   fail: function(res){}

    // })


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

    // wx.navigateTo({
    //   url: '../login/login',
    // })
  },
  onShow: function(){

    var that = this;
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

    wx.navigateTo({
      url: '../searchItem/searchItem?searchtype=0',
    })
  },
  findSchool:function(e){
    var that = this;
    wx.navigateTo({
      url: '../searchItem/searchItem?searchtype=1',
    })
  },
  searchTap:function(e){
    var that = this;

    wx.navigateTo({
      url: '../search/search',
    })
  },
  searchByMap: function(e){
    wx.navigateTo({
      url: '../map/map',
    })
  }
})