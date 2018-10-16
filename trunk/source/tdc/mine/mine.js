// tdc/mineteacher/mineteacher.js
var app = getApp();
var utilRequest = require("../util/request.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    publishList:null,
    collectionList:null,
    footerList:null,

    isPublishList:false,
    isCollectionList:false,
    isFooterList:false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app);
    if (app.globalData.userid == null){
      wx.navigateTo({
        url: '../login/login',
      })
    }
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
    utilRequest.NetRequest({
      url:"mine_teacher/getpublishlist",
      success:function(res){
        console.log(res);
        if(res.code == "ERROR_STATUS_SUCCESS"){
          that.resizeData();
          var jsoncontent = JSON.parse(res.jsoncontent);
          that.setData({
            isPublishList: true,
            publishList: jsoncontent,
          });
        }
      },
      fail:function(res){

      }
    });
  },
  collectionRecord:function(e){
    var that = this;
    utilRequest.NetRequest({
      url: "mine_teacher/getcollectionlist",
      success: function (res) {
        if (res.code == "ERROR_STATUS_SUCCESS") {
          console.log(res);
          that.resizeData();
          var jsoncontent = JSON.parse(res.jsoncontent);
          that.setData({
            collectionList: jsoncontent,
            isCollectionList: true,
          });
        }
      },
      fail: function (res) {

      }
    });
  },
  footerRecord:function(e){
    var that = this;
    utilRequest.NetRequest({
      url: "mine_teacher/getfooterlist",
      success: function (res) {
        if (res.code == "ERROR_STATUS_SUCCESS") {
          that.resizeData();
          var jsoncontent = JSON.parse(res.jsoncontent);
          that.setData({
            footerList: jsoncontent,
            isFooterList: true,
          });
        }
      },
      fail: function (res) {

      }
    });
  },
  resizeData:function(){
    var that = this;
    that.setData({
      isPublishList:false,
      isCollectionList:false,
      isFooterList:false,
    });
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