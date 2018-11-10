// tdc/begin/begin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image:"",
    image_width: "",
    image_height: "",

    intervalId: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      image: "../image/begin/begin.gif"
    })
    var time = 3;

    //获取屏幕信息
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          image_height: res.windowHeight * res.pixelRatio,
          image_width: res.windowWidth * res.pixelRatio,
        })
      },
      fail: function (res) {

      }
    })


    //三秒后跳转到主页
    that.data.intervalId = setInterval(function(){
      if(time == 0){
        clearInterval(that.data.intervalId);
        wx.switchTab({
          url: '../index/index',
        })
      }else{
        --time;
      }
    }, 1000)
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