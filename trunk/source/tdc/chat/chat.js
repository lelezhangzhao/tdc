var utilRequest = require("../util/request.js");

var app = getApp();

Page({
  data: {
    chatList:null,

  },
  //事件处理函数
  onLoad: function (options) {
    var that = this;
    utilRequest.NetRequest({
    url:"chat/getchatlist",
    success:function(res){
      if(res.code = "ERROR_STATUS_SUCCESS"){
        var jsoncontent = JSON.parse(res.jsoncontent);
        that.setData({chatList: jsoncontent});
      }
    },
    fail:function(res){

    }
   }); 
  },
  chatInfo:function(e){
    
  }

})