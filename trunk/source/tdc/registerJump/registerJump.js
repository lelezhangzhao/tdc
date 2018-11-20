// tdc/registerjump/registerJump.js
var app = getApp();
var utilRequest = require("../util/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    role_school_image: "",
    role_teacher_image: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      role_school_image: "../image/register/school.png",
      role_teacher_image: "../image/register/teacher.png",
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
  imteacher:function(e){
    app.globalData.role = 0;
    
    utilRequest.NetRequest({
      url:"register/registerasteacher",
      success:function(res){
        if(res.code == "ERROR_STATUS_SUCCESS"){
          wx.switchTab({
            url: '../preview/preview',
          });
        }
      },
      fail:function(res){

      }
    })
    
  },
  imschool:function(e){
    app.globalData.role = 1;

    utilRequest.NetRequest({
      url:"register/registerasschool",
      success:function(res){
        if(res.code == "ERROR_STATUS_SUCCESS"){


          wx.switchTab({
            url: '../preview/preview',
          });
        }
      },
      fail:function(res){

      }
    })
    
  }
})