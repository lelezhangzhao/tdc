// tdc/newsinfo/newsinfo.js
var utilRequest = require("../util/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    abstrace: "",
    title_one: "",
    content_one: "",
    photo_one: "",
    title_two: "",
    content_two: "",
    photo_two: "",
    title_three: "",
    content_three: "",
    photo_three: "",
    title_four: "",
    content_four: "",
    photo_four: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
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
  publish:function(e){
    var that = this;
    utilRequest.NetRequest({
      url: "admin/publishnews",
      data:{
        title: that.data.title,
        abstract: that.data.abstract,
        title_one: that.data.title_one,
        content_one: that.data.content_one,
        photo_one: that.data.photo_one,
        title_two: that.data.title_two,
        content_two: that.data.content_two,
        photo_two: that.data.photo_two,
        title_three: that.data.title_three,
        content_three: that.data.content_three,
        photo_three: that.data.photo_three,
        title_four: that.data.title_four,
        content_four: that.data.content_four,
        photo_four: that.data.photo_four,
      },
      success: function(res){
        if(res.code == "ERROR_STATUS_SUCCESS"){
          wx.showToast({
            title: '发布成功',
            icon: "none",
          })
        }
      },  
      fail:function(res){

      }
    })
  },
  titleChange: function(e){
    var that = this;
    var title = e.detail.value;
    that.setData({
      title: title,
    })
  },
  abstractChange: function(e){
    var that = this;
    var abstract = e.detail.value;
    that.setData({
      abstract: abstract,
    })
  },
  titleOneChange: function(e){
    var that = this;
    var title_one = e.detail.value;
    that.setData({
      title_one: title_one,
    })
  },
  contentOneChange: function(e){
    var that = this;
    var content_one = e.detail.value;
    that.setData({
      content_one: content_one,
    })
  },
  titleTwoChange: function(e){
    var that = this;
    var title_two = e.detail.value;
    that.setData({
      title_two: title_two,
    })
  },
  contentTwoChange: function(e){
    var that = this;
    var content_two = e.detail.value;
    that.setData({
      content_two: content_two,
    })
  },
  titleThreeChange: function(e){
    var that = this;
    var title_three = e.detail.value;
    that.setData({
      title_three: title_three,
    })
  },
  contentThreeChange: function(e){
    var that = this;
    var content_three = e.detail.value;
    that.setData({
      content_three: content_three,
    })
  },
  titleFourChange: function(e){
    var that = this;
    var title_four = e.detail.value;
    that.setData({
      title_four: title_four,
    })
  },
  contentFourChange: function(e){
    var that = this;
    var content_four = e.detail.value;
    that.setData({
      content_four: content_four,
    })
  }
})