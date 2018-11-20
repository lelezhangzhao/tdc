// tdc/news/news.js
var utilRequest = require("../util/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    delete_image: "",

    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      delete_image: "../image/admin/delete.png"
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
    var that = this;
    //获取新闻列表
    utilRequest.NetRequest({
      url: "admin/getnewslist",
      success: function (res) {
        if (res.code == "ERROR_STATUS_SUCCESS") {
          var jsoncontent = JSON.parse(res.jsoncontent);
          that.setData({
            list: jsoncontent,
          })
        }
      },
      fail: function (res) {

      }
    })

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
  publish: function(e){
    var that = this;
    wx.navigateTo({
      url: '../newsinfo/newsinfo?ispublish=false',
    })
  },
  newsInfo: function(e){
    var that = this;
    var newsId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../newsinfo/newsinfo?ispublish=true&newsId=' + newsId,
    })
  },
  deleteNews: function(e){
    var that = this;
    var newsId = e.currentTarget.dataset.id;
    utilRequest.NetRequest({
      url: "admin/deletenews",
      data:{
        newsId: newsId,
      },
      success: function(res){
        if(res.code == "ERROR_STATUS_SUCCESS"){
          var list = that.data.list;
          for(var i = 0; i < list.length; ++i){
            if(list[i].newsId = newsId){
              list.splice(i, 1);
              break;
            }
          }
          that.setData({
            list: list,
          })
        }
      },
      fail: function(res){

      }
    })
  }
})