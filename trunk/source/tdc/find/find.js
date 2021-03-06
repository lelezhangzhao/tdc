// tdc/find/find.js

var utilRequest = require("../util/request.js");
var utilGloabl = require("../util/globaldata.js");
var pubSub = require("../util/watch.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsList:null,
    serverHttps: "",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    utilRequest.NetRequest({
      url:"find/getfindlist",
      success:function(res){
        if(res.code == "ERROR_STATUS_SUCCESS"){
          console.log(res);
          var jsoncontent = JSON.parse(res.jsoncontent);
          that.setData({
             newsList: jsoncontent,
            serverHttps: utilGloabl.GetServerHttps(),

              });
        } else if (res.code == "ERROR_STATUS_LISTISNULL"){
          
        }
      },
      fail:function(res){

      }
    });
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
  newsinfo: function(e){
    var that = this;
    var id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: '../findinfo/findinfo?newsId=' + id,
    })
  }
})