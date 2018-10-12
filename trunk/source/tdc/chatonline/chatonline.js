var utilRequest = require("../util/request.js");

var app = getApp();
var message = '';
var text = '';
var user = {};
var length;
var zx_info_id;
var openid_talk;
Page({
  data: {
    news: '',
    scrollTop: 0,
    text: text,
    contentData: '',
    nickName: '',
    avatarUrl: '',
    tabdata: '',
    theOtherUserId:null,
    userid:null,
    loadDataInterval:null,
  },
  bindChange: function (e) {
    message = e.detail.value
  },
  //事件处理函数
  add: function (e) {
    var that = this
    var sendTime = Date.parse(new Date());

    utilRequest.NetRequest({
      url:"chat/addchatinfo",
      data:{
        content: message,
        theOtherUserId: that.data.theOtherUserId,
        sendTime:sendTime,
      },
      success:function(res) {
        that.setData({
          message: ""
        });
        var row = {};
        row.content = message;
        row.fromuserid = that.data.userid;
        that.data.contentData.push(row);

        that.setData({ contentData: that.data.contentData});        
      },
      fail:function(res){
        wx.showToast({
          title: '网络错误,请稍后',
        })
      }
    });
  },
  onLoad: function (options) {
    var that = this;
    // openid_talk = options.openid_talk;
    // zx_info_id = options.zx_info_id;
    that.setData({userid:app.globalData.userid});
    that.setData({ theOtherUserId: options.theOtherUserId});

    that.loadHistoryData()
  },
  loadHistoryData: function(){
    var that = this;
    utilRequest.NetRequest({
      url: "chat/gethistoryinfo",
      data: {
        theOtherUserId: that.data.theOtherUserId
      },
      success: function (res) {
        if(res.code == "ERROR_STATUS_SUCCESS"){
          var jsoncontent = JSON.parse(res.jsoncontent);
          that.setData({ contentData: jsoncontent });
        }
      },
      fail: function (res) {

      }
    });
    that.bottom();
    that.data.loadDataInterval = setInterval(function () {
      that.loadUnReadData()
    }, 1000);
  },
  // 页面加载  
  loadUnReadData: function () {
    
    var that = this;
    var is_img = true;
    utilRequest.NetRequest({
      url: "chat/getunreadinfo",
      data: {

        theOtherUserId: that.data.theOtherUserId
      },
      success: function (res) {
        if(res.code == "ERROR_STATUS_SUCCESS"){
          var jsoncontent = JSON.parse(res.jsoncontent);
          for(var i = 0; i < jsoncontent.length; ++i){
            that.data.contentData.push(jsoncontent[i]);
          }
          that.setData({ contentData: that.data.contentData });

          that.bottom();
        }
        
        // if (res.data.k1) {
        //   res.data.k1.time_agree = util.js_date_time(res.data.k1.time_agree)
        // }
        // for (var i = 0; i < res.data.k2.length; i++) {
        //   res.data.k2[i].time = util.js_date_time(res.data.k2[i].time)
        //   var n = res.data.k2[i].content.charAt(res.data.k2[i].content.length - 1);
        //   switch (n) {
        //     case 'g':
        //       res.data.k2[i].is_img = is_img
        //       break;
        //     default:
        //   }
        // }
        // that.setData({
        //   tabdata: res.data.k1,
        //   contentData: res.data.k2.reverse()
        // })
        // wx.setNavigationBarTitle({
        //   title: that.data.tabdata.nickname
        // });
        // if (a) {
        //   setTimeout(function() {
        //     that.bottom()
        //   }, 500);
        // }
      },
      fail: function (res) {

      }
    });
    
  },
  // 获取hei的id节点然后屏幕焦点调转到这个节点
  bottom: function() {
    var query = wx.createSelectorQuery();
    query.select('#hei').boundingClientRect(); 
    query.selectViewport().scrollOffset(), 
    query.exec(function(res) {
      wx.pageScrollTo({
        scrollTop: res[0].bottom
        // #the-id节点的下边界坐标
      }),
      res[1].scrollTop
      // 显示区域的竖直滚动位置
    })
  },
  // 选择图片并把图片保存
  // upimg1: function() {
  //   var that = this;
  //   wx.chooseImage({
  //     success: function(res) {
  //       var data = {
  //         program_id: app.jtappid,
  //         openid: app._openid,
  //         zx_info_id: zx_info_id,
  //       }
  //       var tempFilePaths = res.tempFilePaths;
  //       wx.uploadFile({
  //         url: 'pg.php/ZXinfo/session_submit',
  //         //提交信息至后台
  //         filePath: tempFilePaths[0],
  //         name: 'content',
  //         //文件对应的参数名字(key)
  //         formData: data,
  //         //其它的表单信息
  //         success: function(res) {
  //           var a = true;
  //           that.loadUnReadData(a);
  //           message = ''
  //         }
  //       });
  //     }
  //   });
  // }
})