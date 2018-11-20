// tdc/fixItem/fixItem.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    caption: "",
    value: "",

    /*
    1 teacher-name
    2 teacher-nickname
    3 teacher-tel

    11 school-name
    12 school-tel
    
     */
    type: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var caption = options.caption;
    var value = options.value;
    var type = options.type;

    wx.setNavigationBarTitle({
      title: options.caption,
    })

    that.setData({
      caption: caption,
      value: value,
      type: type,
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
  fixValue: function(e){
    var that = this;
    var value = e.detail.value;
    that.setData({
      value: value,
    })
  },
  save: function(){
    var that = this;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    switch(that.data.type){
      case "1":
      prevPage.changeTeacherName(that.data.value);
      break;
      case "2":
      prevPage.changeTeacherNickName(that.data.value);
      break;
      case "3":
      prevPage.changeTeacherTel(that.data.value);
      break;
      case "11":
      prevPage.changeSchoolName(that.data.value);
      break;
      case "12":
      prevPage.changeSchollTel(that.data.value);
      break;
    }
    wx.navigateBack({
      delta: 1,
    })
  }
})