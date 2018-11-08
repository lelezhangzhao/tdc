var utilRequest = require("../util/request.js");

var app = getApp();

Page({
  data: {
    chatList:[],
    theOtherUserId:null,
    userid: "",
  },
  //事件处理函数
  onLoad: function (options) {
    var that = this;
    if (app.globalData.userid == null) {
      wx.navigateTo({
        url: '../login/login',
      })
      return;
    }

    that.setData({
      userid: app.globalData.userid,
    })

    //开启聊天服务 
    wx.connectSocket({
      url: 'ws://localhost:9612',
      success: function (res) {
        console.log(res);
      }

    })
    wx.onSocketOpen(function () {
    })
    wx.onSocketMessage(function (data) {
      var data = JSON.parse(data.data);
      if(data.key != undefined){
        //把这个key放到服务器
        utilRequest.NetRequest({
          url: "global_data/addchatkey",
          data:{
            userid: that.data.userid,
            key: data.key,
          },
          success: function(res){

          },
          fail: function(res){
            
          }
        })
      }

    })
    //连接失败
    wx.onSocketError(function () {
      console.log('websocket连接失败！');
    })



    utilRequest.NetRequest({
      url: "chat/getchatlist",
      success: function (res) {
        
        if (res.code == "ERROR_STATUS_SUCCESS") {
          var jsoncontent = JSON.parse(res.jsoncontent);
          console.log(jsoncontent);
          that.setData({ chatList: jsoncontent });
        }
      },
      fail: function (res) {

      }
    }); 
  },
  onShow:function(options){
  },
  chatInfo:function(e){
    var that = this;
    var theOtherUserId = e.currentTarget.dataset.otherid;
    that.setData({ 
      theOtherUserId: theOtherUserId
    });
    wx.navigateTo({
      url:"../chatonline/chatonline?theOtherUserId=" + that.data.theOtherUserId
    })
  }

})