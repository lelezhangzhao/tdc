// tdc/testChat/testChat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: "",
    socketTask: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.connectSocket({
      url: 'ws://localhost:9608',
      data: {
        userid: 121,
      },
      success: function (res) {
        console.log(res);
      }

    }),
    


    wx.onSocketOpen(function(){
    })

    wx.onSocketMessage(function(data){
      var data = JSON.parse(data.data);

      that.setData({
        msg: data.msg
      });
    })

    //连接失败
    wx.onSocketError(function () {
      console.log('websocket连接失败！');
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
  connect: function(e){
  },
  send: function(e){
    var msg = {
      fromuserid: 16, 
      touserid: 16, 
      msg: "121235555"
    };

    wx.sendSocketMessage({
      data: JSON.stringify(msg)
    })
    
  },
  receive: function(e){
    var that = this;
    var data = JSON.parse(e);
    that.setData({
      msg: e.msg
    });
  }
})