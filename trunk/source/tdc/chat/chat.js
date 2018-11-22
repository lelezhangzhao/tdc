var utilRequest = require("../util/request.js");
var globalData = require("../util/globaldata.js");

var app = getApp();

Page({
  data: {
    chatList:[],
    applyForTelPermissionList: [],
    userid: "",
    serverHttps: "",
  },
  //事件处理函数
  onLoad: function (options) {
    var that = this;
    that.setData({
      serverHttps: globalData.GetServerHttps(),
    })

    if (app.globalData.userid == null) {
      wx.redirectTo({
        url: '../login/login',
      })
      return;
    }

    that.setData({
      userid: app.globalData.userid,
    })



    utilRequest.NetRequest({
      url: "chat/getchatlist",
      success: function (res) {
        console.log(res);
        if (res.code == "ERROR_STATUS_SUCCESS") {
          var jsoncontent = JSON.parse(res.jsoncontent);

          utilRequest.NetRequest({
            url: "publish_info/gettelpermissioninfo",
            success: function(res){
              if(res.code == "ERROR_STATUS_SUCCESS"){
                var jsoncontent = JSON.parse(res.jsoncontent);
                var toMe = JSON.parse(jsoncontent.tome);
                var fromMe = JSON.parse(jsoncontent.fromme);
                var applyForTelPermissionList = [];
                applyForTelPermissionList.concat(toMe).concat(fromMe);
                that.setData({
                  applyForTelPermissionList: applyForTelPermissionList,
                })

              }
            },
            fail: function(res){

            }
          })

          that.setData({ chatList: jsoncontent });
        }
      },
      fail: function (res) {

      }
    }); 

  },
  onShow:function(options){
    var that = this;

    wx.onSocketMessage(function (data) {
      console.log("chat onsocketmessage");
      var that = this;

      var data = JSON.parse(data.data);
      var type = data.type;
      if (type == 1) { //消息
        //如果chatList有该未读消息，则更新，否则添加到第一项
        var chatList = that.data.chatList;
        for (var i = 0; i < chatList.length; ++i){
          if ((chatList[i].fromuserid == data.fromuserid && chatList[i].touserid == data.touserid) || 
          (chatList[i].fromuserid == data.touserid && chatList[i].touserid == data.fromuserid)){
            chatList[i].briefcontent = data.msg;
            that.setData({
              chatList: chatList,
            })
            return;
          }
        }

        //更新
        //a.fromuserid, a.touserid, a.fromuserid as otherid, a.lastsendtime, a.hasunreadmsg, a.briefcontent, b.name as othername

        var chatItem = new array;
        chatItem["fromuserid"] = data.fromuserid;
        chatItem["touserid"] = that.data.userid;
        chatItem["otherid"] = data.fromuserid;
        chatItem["lastsendtime"] = data.sendtime;
        chatItem["hasunreadmsg"] = true;
        chatItem["briefcontent"] = data.msg;
        utilRequest.NetRequest({
          url: "global_data/getname",
          data:{
            userid: data.fromuserid,
          },
          success:function(res){
            if(res.code == "ERROR_STATUS_SUCCESS"){
              var jsoncontent = res.jsoncontent;
              chatItem["othername"] = jsoncontent;
              chatList.unshift(chatItem);
              that.setData({
                chatList: chatList,
              })

            }
          },
          fail: function(res){

          }
        })
      }else if(type == 2){ //电话访问请求
        //直接添加到applyForTelPermissionList第一项
        var applyForTelPermissionList = that.data.applyForTelPermissionList;
        var permissionItem = new array();
        //select a.*, b.name, b.role from tdc_telpermission as a join tdc_user as b on a.touserid = b.id where a.touserid = $userid and a.status = 1
        permission["id"]  = data.id;
        permissioin["fromuserid"] = data.fromuserid;
        permission["touserid"] = that.data.userid;
        permission["permissiontime"] = data.sendtime;
        permission["status"] = data.status;
        permission["publishid"] = data.publishId;
        permission["role"] = app.globalData.role;
        
        utilRequest.NetRequest({
          url: "global_data/getname",
          data:{
            userid: userid,
          },
          success: function(res){
            if(res.code == 'ERROR_STATUS_SUCCESS'){
              var jsoncontent = JSON.parse(res.jsoncontent);
              permission["name"] = jsoncontent;

              applyForTelPermissionList.unshift(permission);
              that.setData({
                applyForTelPermissionList: applyForTelPermissioinList,
              })
            }
          },
          fail: function(res){

          }
        })
      }

    })



  },
  chatInfo:function(e){
    var that = this;
    var theOtherUserId = e.currentTarget.dataset.otherid;
    wx.navigateTo({
      url: "../chatonline/chatonline?theOtherUserId=" + theOtherUserId
    })
  },

  permissionClick:function(e){
    var that = this;
    var index = e.currentTarget.id;

    var permission = that.data.applyForTelPermissionList[index];

    if (permission.fromuserid == that.data.userid){
      if(permission.status == 4){
        var teacher = permission.role == 0;
        var publishid = permission.publishid;

        //我向别人申请的授权通过
        that.data.applyForTelPermissionList.remove(index);
        that.setData({
          applyForTelPermissionList: that.data.applyForTelPermissionList,
        })

        utilRequest.NetRequest({
          url: "publish_info/changepermissionstatus",
          data:{
            permissionid: permission.id,
            status: 0
          },
          success: function(res){
            if (res.code == "ERROR_STATUS_SUCCESS") {
              wx.navigateTo({
                url: '../info/info?teacher=' + teacher + '&school=' + school + '&publishId=' + publishid,
              })
            }
          },
          fail: function(res){

          }
        })

      }
    }else if(permission.touserid == that.data.userid){
      if(permission.status == 1){
        //别人向我申请的授权
        wx.showModal({
          title: '电话授权',
          content: permission.name + '申请访问电话',
          cancelText: "拒绝",
          confirmText: "授权",
          success: function(res){
            utilRequest.NetRequest({
              url: "publish_info/changepermissionstatus",
              data:{
                permissioinid: permission.id,
                status: 4,
              },
              success: function(res){
                if(res.code == "ERROR_STATUS_SUCCESS"){

                }
              },
              fail: function(res){

              }
            })
          },
          fail: function(res){
            utilRequest.NetRequest({
              url: "publish_info/changepermissionstatus",
              data:{
                permissionid: permission.id,
                status: 2,
              },
              success: function(res){
                if(res.code == 'ERROR_STATUS_SUCCESS'){

                }
              },
              fail: function(res){

              }
            })
          }
        })
        that.data.applyForTelPermissionList.remove(index);
        that.setData({
          applyForTelPermissionList: that.data.applyForTelPermissionList,
        })

      }
    }
  }

})