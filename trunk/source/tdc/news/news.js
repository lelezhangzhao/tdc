// tdc/news/news.js
var utilRequest = require("../util/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsId:null,
    news:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var newsId = options.newsId;
    that.setData({ newsId: newsId});

    utilRequest.NetRequest({
      url:"find/getfindinfo",
      data:{
        newsId: that.data.newsId
      },
      success:function(res){
        if(res.code == "ERROR_STATUS_SUCCESS"){
          var jsoncontent = res.jsoncontent;
          that.setData({news: jsoncontent});
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

  }
})