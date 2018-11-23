// tdc/findinfo/findinfo.js
var utilRequest = require("../util/request.js");
var globalData = require("../util/globaldata.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",

    title_one_title: "",
    title_one_content: "",
    title_one_image: "",

    title_two_title: "",
    title_two_content: "",
    title_two_image: "",

    title_three_title: "",
    title_three_content: "",
    title_three_image: "",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var newsId = options.newsId;
    that.setData({ newsId: newsId });

    utilRequest.NetRequest({
      url: "find/getfindinfo",
      data: {
        newsId: that.data.newsId
      },
      success: function (res) {
        console.log(res);
        if (res.code == "ERROR_STATUS_SUCCESS") {
          var jsoncontent = JSON.parse(res.jsoncontent)[0];
          var serverHttps = globalData.GetServerHttps();
          that.setData({ 
            title: jsoncontent.title,
            title_one_title: jsoncontent.titleone,
            title_one_content: jsoncontent.contentone,
            title_one_image: serverHttps + jsoncontent.photoone,
            title_two_title: jsoncontent.titletwo,
            title_two_content: jsoncontent.contenttwo,
            title_two_image: serverHttps + jsoncontent.phototwo,
            title_three_title: jsoncontent.titlethree,
            title_three_content: jsoncontent.contenttwo,
            title_three_image: serverHttps + jsoncontent.photothree,
          });
        }
      },
      fail: function (res) {

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

  }
})