// tdc/arbitrationInfo/arbitrationInfo.js
var utilRequest = require("../util/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arbitrationId: "",

    from_arbitration: "",
    title: "",
    content: "",

    arbitratortel: "",
    arbitratedtel: "",
    checked: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取仲裁信息
    var that = this;
    var arbitrationId = options.id;

    that.setData({
      arbitrationId: arbitrationId,

    })

    utilRequest.NetRequest({
      url: "admin/getarbitrationinfo",
      data:{
        arbitrationId: that.data.arbitrationId,
      },
      success: function(res){
        if(res.code == "ERROR_STATUS_SUCCESS"){
          var jsoncontent = JSON.parse(res.jsoncontent)[0];

          that.setData({
            from_arbitration: jsoncontent.arbitratorname,
            title: jsoncontent.title,
            content: jsoncontent.content,
            arbitratortel: jsoncontent.arbitratortel,
            arbitratedtel: jsoncontent.arbitratedtel,
          })
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
  connectArbitrator: function(e){
    var that = this;
    wx.showModal({
      title: '仲裁人电话：',
      content: that.data.arbitratortel,
    })
  },
  connectArbitrated: function(e){
    var that = this;
    wx.showModal({
      title: '被仲裁人电话：',
      content: that.data.arbitratedtel,
    })
  },
  checked: function(e){
    var that = this;
    var checked = e.detail.value.length == 1;
    that.setData({
      checked: checked,
    })


    utilRequest.NetRequest({
      url: "admin/solvearbitration",
      data:{
        arbitrationId: that.data.arbitrationId,
        checked: checked,
      },
      success: function(res){
        if(res.code == "ERROR_STATUS_SUCCESS"){
          wx.showToast({
            title: '提交成功',
            icon: "none",
          })
        }
      },
      fail: function(res){

      }
    })
  }
})