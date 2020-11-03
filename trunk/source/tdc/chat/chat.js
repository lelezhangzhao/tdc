var utilRequest = require("../util/request.js");
var globalData = require("../util/globaldata.js");
var pubSub = require("../util/watch.js")

var intervalId = 0;

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
    that.loadChatList();


    // utilRequest.NetRequest({
    //   url: "chat/getchatlist",
    //   success: function (res) {
    //     console.log(res);
    //     if (res.code == "ERROR_STATUS_SUCCESS") {
    //       var jsoncontent = JSON.parse(res.jsoncontent);

    //       utilRequest.NetRequest({
    //         url: "publish_info/gettelpermissioninfo",
    //         success: function(res){
    //           if(res.code == "ERROR_STATUS_SUCCESS"){
    //             var jsoncontent = JSON.parse(res.jsoncontent);
    //             var toMe = JSON.parse(jsoncontent.tome);
    //             var fromMe = JSON.parse(jsoncontent.fromme);
    //             var applyForTelPermissionList = [];
    //             applyForTelPermissionList.concat(toMe).concat(fromMe);
    //             that.setData({
    //               applyForTelPermissionList: applyForTelPermissionList,
    //             })

    //           }
    //         },
    //         fail: function(res){

    //         }
    //       })

    //       that.setData({ chatList: jsoncontent });
    //     }
    //   },
    //   fail: function (res) {

    //   }
    // }); 

  },
  onShow:function(options){
    var that = this;
    that.getChatListAndPermission();


    // wx.onSocketMessage(function (data) {
    //   console.log("chat onsocketmessage");
    //   var that = this;

    //   var data = JSON.parse(data.data);
    //   var type = data.type;
    //   if (type == 1) { //消息
    //     //如果chatList有该未读消息，则更新，否则添加到第一项
    //     var chatList = that.data.chatList;
    //     for (var i = 0; i < chatList.length; ++i){
    //       if ((chatList[i].fromuserid == data.fromuserid && chatList[i].touserid == data.touserid) || 
    //       (chatList[i].fromuserid == data.touserid && chatList[i].touserid == data.fromuserid)){
    //         chatList[i].briefcontent = data.msg;
    //         that.setData({
    //           chatList: chatList,
    //         })
    //         return;
    //       }
    //     }

    //     //更新
    //     //a.fromuserid, a.touserid, a.fromuserid as otherid, a.lastsendtime, a.hasunreadmsg, a.briefcontent, b.name as othername

    //     var chatItem = new array;
    //     chatItem["fromuserid"] = data.fromuserid;
    //     chatItem["touserid"] = that.data.userid;
    //     chatItem["otherid"] = data.fromuserid;
    //     chatItem["lastsendtime"] = data.sendtime;
    //     chatItem["hasunreadmsg"] = true;
    //     chatItem["briefcontent"] = data.msg;
    //     utilRequest.NetRequest({
    //       url: "global_data/getname",
    //       data:{
    //         userid: data.fromuserid,
    //       },
    //       success:function(res){
    //         if(res.code == "ERROR_STATUS_SUCCESS"){
    //           var jsoncontent = res.jsoncontent;
    //           chatItem["othername"] = jsoncontent;
    //           chatList.unshift(chatItem);
    //           that.setData({
    //             chatList: chatList,
    //           })

    //         }
    //       },
    //       fail: function(res){

    //       }
    //     })
    //   }else if(type == 2){ //电话访问请求
    //     //直接添加到applyForTelPermissionList第一项
    //     var applyForTelPermissionList = that.data.applyForTelPermissionList;
    //     var permissionItem = new array();
    //     //select a.*, b.name, b.role from tdc_telpermission as a join tdc_user as b on a.touserid = b.id where a.touserid = $userid and a.status = 1
    //     permission["id"]  = data.id;
    //     permissioin["fromuserid"] = data.fromuserid;
    //     permission["touserid"] = that.data.userid;
    //     permission["permissiontime"] = data.sendtime;
    //     permission["status"] = data.status;
    //     permission["publishid"] = data.publishId;
    //     permission["role"] = app.globalData.role;
        
    //     utilRequest.NetRequest({
    //       url: "global_data/getname",
    //       data:{
    //         userid: userid,
    //       },
    //       success: function(res){
    //         if(res.code == 'ERROR_STATUS_SUCCESS'){
    //           var jsoncontent = JSON.parse(res.jsoncontent);
    //           permission["name"] = jsoncontent;

    //           applyForTelPermissionList.unshift(permission);
    //           that.setData({
    //             applyForTelPermissionList: applyForTelPermissioinList,
    //           })
    //         }
    //       },
    //       fail: function(res){

    //       }
    //     })
    //   }

    // })



  },
  onHide: function(e){
    var that = this;
    that.unLoadChatList();
  },
  onUnload: function(e){
    var that = this;
    that.unLoadChatList();
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

        that.data.applyForTelPermissionList.splice(index, 1);
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
                url: '../info/info?teacher=' + teacher + '&school=' + !teacher + '&publishId=' + publishid,
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
                permissionid: permission.id,
                status: 4,
              },
              success: function(res){
                console.log(res);
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
        that.data.applyForTelPermissionList.splice(index,1);
        that.setData({
          applyForTelPermissionList: that.data.applyForTelPermissionList,
        })

      }
    }
  },
  loadChatList: function(e){
    var that = this;
    pubSub.subscribe("msg", that.processMsg);
    // intervalId = setInterval(that.getChatListAndPermission, 10000);
  },
  unLoadChatList: function(e){
    var that = this;
    pubSub.off("msg");

    // clearInterval(intervalId);
  },
  getChatListAndPermission: function(e){
    var that = this;
    utilRequest.NetRequest({
      url: "chat/getchatlist",
      success: function (res) {
        if (res.code == "ERROR_STATUS_SUCCESS") {
          var jsoncontent = JSON.parse(res.jsoncontent);
          var chatList = JSON.parse(jsoncontent.chatList);
          var permission = JSON.parse(jsoncontent.permission);
          console.log(jsoncontent);
          that.setData({
            chatList: chatList,
            applyForTelPermissionList: permission,
          })
        }
      },
      fail: function (res) { }
    })

  },
  processMsg: function(content){
    var that = this;
    //重新拉聊天内容
    that.getChatListAndPermission();
  //   //当前存在聊天块，则把聊天块提前
  //   var jsoncontent = JSON.parse(content);
  //   var fromuserid = jsoncontent.fromuserid;
  //   for(i = 0;i < chatList.length(); ++i){
  //     if(chatList[i].fromuserid == fromuserid || chatList[i].touserid == fromuserid){
  //       if(i != 0){
  //         var item = chatList[i];
  //         chatList[i] = chatList[0];
  //         chatList[0] = item;
  //       }
  //       return;
  //     }
  //   }

  //   //当前不存在聊天块，则构造一个
  //   utilRequest.NetRequest({
  //     url: "chat/getuserinfobyid",
  //     data:{
  //       id: fromuserid,
  //     },
  //     success: function (res) {
  //       if (res.code == "ERROR_STATUS_SUCCESS") {
  //         var jsoncontent = JSON.parse(res.jsoncontent);
  //         console.log(jsoncontent);
  //         var item;
  //         item.otherid = fromuserid;
  //         item.otherlogo = jsoncontent.logo;
  //         item.othername = jsoncontent.name;
  //         item.hasunreadmsg = true;
  //         item.briefcontent = 
  //           },
  //     fail: function (res) { }
  //   })

  }

})


// var app = getApp();
// var socketOpen = false;
// var frameBuffer_Data, session, SocketTask;
// var url = 'ws://localhost:2346';
// var upload_url ='请填写您的图片上传接口地址'
// Page({
//   data: {
//     user_input_text: '',//用户输入文字
//     inputValue: '',
//     returnValue: '',
//     addImg: false,
//     //格式示例数据，可为空
//     allContentList: [],
//     num: 0
//   },
//   // 页面加载
//   onLoad: function () {
//     this.bottom();
//   },
//   onShow: function (e) {
//     if (!socketOpen) {
//       this.webSocket()
//     }
//   },
//   // 页面加载完成
//   onReady: function () {
//     var that = this;
//     SocketTask.onOpen(res => {
//       socketOpen = true;
//       console.log('监听 WebSocket 连接打开事件。', res)
//     })
//     SocketTask.onClose(onClose => {
//       console.log('监听 WebSocket 连接关闭事件。', onClose)
//       socketOpen = false;
//       this.webSocket()
//     })
//     SocketTask.onError(onError => {
//       console.log('监听 WebSocket 错误。错误信息', onError)
//       socketOpen = false
//     })
//     SocketTask.onMessage(onMessage => {
//       console.log('监听WebSocket接受到服务器的消息事件。服务器返回的消息', JSON.parse(onMessage.data))
//       var onMessage_data = JSON.parse(onMessage.data)
//       if (onMessage_data.cmd == 1) {
//         that.setData({
//           link_list: text
//         })
//         console.log(text, text instanceof Array)
//         // 是否为数组
//         if (text instanceof Array) {
//           for (var i = 0; i < text.length; i++) {
//             text[i]
//           }
//         } else {
 
//         }
//         that.data.allContentList.push({ is_ai: true, text: onMessage_data.body });
//         that.setData({
//           allContentList: that.data.allContentList
//         })
//         that.bottom()
//       }
//     })
//   },
//   webSocket: function () {
//     // 创建Socket
//     SocketTask = wx.connectSocket({
//       url: url,
//       data: 'data',
//       header: {
//         'content-type': 'application/json'
//       },
//       method: 'post',
//       success: function (res) {
//         console.log('WebSocket连接创建', res)
//       },
//       fail: function (err) {
//         wx.showToast({
//           title: '网络异常！',
//         })
//         console.log(err)
//       },
//     })
//   },
 
//   // 提交文字
//   submitTo: function (e) {
//     let that = this;
//     var data = {
//       type: "msg",
//       id: app.globalData.userid,
//       other_id: app.globalData.userid,
//       body: that.data.inputValue,
//     }
//     console.log(socketOpen)
//     if (socketOpen) {
//       // 如果打开了socket就发送数据给服务器
//       sendSocketMessage(data)
//       this.data.allContentList.push({ is_my: { text: this.data.inputValue }});
//       this.setData({
//         allContentList: this.data.allContentList,
//         inputValue: ''
//       })
 
//       that.bottom()
//     }
//   },
//   bindKeyInput: function (e) {
//     this.setData({
//       inputValue: e.detail.value
//     })
//   },
 
//   onHide: function () {
//     SocketTask.close(function (close) {
//       console.log('关闭 WebSocket 连接。', close)
//     })
//   },
//   upimg: function () {
//     var that = this;
//       wx.chooseImage({
//         sizeType: ['original', 'compressed'],
//         success: function (res) {
//           that.setData({
//             img: res.tempFilePaths
//           })
//           wx.uploadFile({
//             url: upload_url,
//             filePath: res.tempFilePaths,
//             name: 'img',
//             success: function (res) {
//               console.log(res)
//                 wx.showToast({
//                   title: '图片发送成功！',
//                   duration: 3000
//                 });
//             }
//           })  
//           that.data.allContentList.push({ is_my: { img: res.tempFilePaths } });
//           that.setData({
//             allContentList: that.data.allContentList,
//           })
//           that.bottom();
//         }
//       })
//   },   
//   addImg: function () {
//     this.setData({
//       addImg: !this.data.addImg
//     })
 
//   },
//   // 获取hei的id节点然后屏幕焦点调转到这个节点  
//   bottom: function () {
//     var that = this;
//     this.setData({
//       scrollTop: 1000000
//     })
//   },
// })
 
// //通过 WebSocket 连接发送数据，需要先 wx.connectSocket，并在 wx.onSocketOpen 回调之后才能发送。
// function sendSocketMessage(msg) {
//   var that = this;
//   console.log('通过 WebSocket 连接发送数据', JSON.stringify(msg))
//   SocketTask.send({
//     data: JSON.stringify(msg)
//   }, function (res) {
//     console.log('已发送', res)
//   })
// } 



