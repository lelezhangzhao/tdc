var utilRequest = require("../util/request.js");

var app = getApp();

Page({
  data: {
    chatList:[],
    theOtherUserId:null
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
    utilRequest.NetRequest({
      url: "chat/getchatlist",
      success: function (res) {
        
        if (res.code == "ERROR_STATUS_SUCCESS") {
          var jsoncontent = JSON.parse(res.jsoncontent);
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
    var theOtherUserId = e.currentTarget.dataset.otherId;
    that.setData({ theOtherUserId: chatid});
    wx.navigateTo({
      url:"../chatonline/chatonline?theOtherUserId=" + that.data.theOtherUserId
    })
  }

})