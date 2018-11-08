// tdc/mineteacher/mineteacher.js
var app = getApp();
var utilRequest = require("../util/request.js");
var globalData = require("../util/globaldata.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {

    role: 0,

    name: "",
    logo: "",
    publishList: [],

    option_image: "",

    /**
     * 1 publish
     * 2 collection
     * 3 history
     */
    type: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (app.globalData.userid == null) {
      wx.navigateTo({
        url: '../login/login',
      })
      return;
    }

    that.setData({
      role: app.globalData.role,
      option_image: "../image/mine/option.png",
    })
    var url = "";
    if(that.data.role == 0){
      url = "mine_teacher/getinitializeinfo";
    }else if(that.data.role == 1){
      url = "mine_school/getinitializeinfo";
    }

    utilRequest.NetRequest({
      url: url,
      success:function(res){
        console.log(res);
        if(res.code == "ERROR_STATUS_SUCCESS"){
          var jsoncontent = JSON.parse(res.jsoncontent)[0];
          that.setData({
            type: 1,
            name: jsoncontent.name,
            logo: globalData.GetServerHttps() + jsoncontent.logo,
            publishList: jsoncontent.publishlist,
          })
          console.log(that.data.publishList);
        }
      },
      fail:function(res){

      }
    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  preview:function(e){
    wx.switchTab({
      url: '../preview/preview',
    });
  },
  publishRecord:function(e){
    var that = this;
    var url = "";
    if (that.data.role == 0) {
      url = "mine_teacher/getpublishlist";
    } else if (that.data.role == 1) {
      url = "mine_school/getpublishlist";
    }
    utilRequest.NetRequest({
      url: url,
      success: function (res) {
        if (res.code == "ERROR_STATUS_SUCCESS") {
          var jsoncontent = JSON.parse(res.jsoncontent);
          that.setData({
            type: 1,
            publishList: jsoncontent,
          })
        }else if(res.code == "ERROR_STATUS_LISTISNULL"){
          that.setData({
            type: 1,
            publishList: [],
          })
        }
      },
      fail: function(res){

      }
    })
  },
  collectionRecord:function(e){
    var that = this;
    var url = "";
    if (that.data.role == 0) {
      url = "mine_teacher/getcollectionlist";
    } else if (that.data.role == 1) {
      url = "mine_school/getcollectionlist";
    }
    utilRequest.NetRequest({
      url: url,
      success: function (res) {
        if (res.code == "ERROR_STATUS_SUCCESS") {
          var jsoncontent = res.jsoncontent;
          that.setData({
            type: 2,
            publishList: jsoncontent,
          })
        } else if (res.code == "ERROR_STATUS_LISTISNULL") {
          that.setData({
            type: 2,
            publishList: [],
          })
        }
      },
      fail: function(res){

      }
    })
  },
  historyRecord:function(e){
    var that = this;
    var url = "";
    if (that.data.role == 0) {
      url = "mine_teacher/gethistorylist";
    } else if (that.data.role == 1) {
      url = "mine_school/gethistorylist";
    }
    utilRequest.NetRequest({
      url: url,
      success: function (res) {
        if (res.code == "ERROR_STATUS_SUCCESS") {
          var jsoncontent = JSON.parse(res.jsoncontent);
          that.setData({
            type: 3,
            publishList: jsoncontent,
          })
        } else if (res.code == "ERROR_STATUS_LISTISNULL") {
          that.setData({
            type: 3,
            publishList: [],
          })
        }
      },
      fail: function (res) {

      }
    })
  },
  publishInfo:function(e){
    var publishId = e.currentTarget.dataset.id;
    var isTeacher = app.globalData.role == 0 ? true : false;

    wx.navigateTo({
      url: '../info/info?teacher=' + isTeacher + '&school=' + !isTeacher + '&publishId=' + publishId,
    });
  },
  collectionInfo:function(e){
    var publishId = e.currentTarget.dataset.id;
    var publishObject = e.currentTarget.dataset.object;

    var isTeacher = publishObject == 0 ? true : false;

    wx.navigateTo({
      url: '../info/info?teacher=' + isTeacher + '&school=' + !isTeacher + '&publishId=' + publishId,
    });
  },
  footerInfo:function(e){
    var publishId = e.currentTarget.dataset.id;
    var publishObject = e.currentTarget.dataset.object;

    var isTeacher = publishObject == 0 ? true : false;

    wx.navigateTo({
      url: '../info/info?teacher=' + isTeacher + '&school=' + !isTeacher + '&publishId=' + publishId,
    });
  }
  
})