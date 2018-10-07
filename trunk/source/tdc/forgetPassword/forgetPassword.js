let utilRequest = require("../util/request.js");
let utilMD5 = require("../util/md5.js");

// tdc/forgetPassword/fotgetPassword.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tel:null,
    loading:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  forgetPasswordSubmit:function(e){
    let that = this;
    let tel = e.detail.value.tel;
    let password = e.detail.value.password;
    let confirmPassword = e.detail.value.confirmPassword;

    if(password !== confirmPassword){
      wx.showModal({
        title: '错误',
        content: '两次密码不同',
      });
      return;
    }

    utilRequest.NetRequest({
      url: "forgetPassword/ForgetPasswordConfirm",
      data: {
        tel: tel,
        password: password,
      },
      success: function (res) {
        var code = res.code;
        var msg = res.msg;

        var title = null;
        if (code === "ERROR_STATUS_SUCCESS") {
          title = "密码重置成功";
        } else if (code === "ERROR_STATUS_TELISNOTEQUAL") {
          title = "再次手机号不同";
        } else if (code === "ERROR_STATUS_TELISNOTEXIST") {
          title = "手机号不存在";
        }

        if (title !== null) {
          wx.showToast({ title: title, icon: "none" });
        }
      },
      fail: function (res) {
        wx.showToast({ title: "服务器繁忙，请稍后重试" });
      },
    })
  },
  getTelIdentify:function(e){
    let that = this;

    if (that.data.loading === true) {
      return;
    }

    //检测手机号
    var tel = that.data.tel;

    var warn = null;
    if (tel === null || tel.trim().length === 0) {
      warn = "号码不能为空";
    } else if (tel.trim().length !== 11 || !/^1\d{10}$/.test(tel)) {
      warn = "手机号格式不正确";
    }
    if (warn != null) {
      wx.showModal({
        title: "提示",
        content: warn
      })
      return;
    }


    utilRequest.NetRequest({
      url: "forgetPassword/getTelIdentify",
      data: {
        tel: tel,
      },
      success: function (res) {

        var code = res.code;
        var msg = res.msg;
        var content = res.content;

        var title = null;
        if (code === "ERROR_STATUS_SUCCESS") {
          title = "验证码发送成功";
        } else if (code === "ERROR_STATUS_FAILED") {
          title = "手机号发送失败，请稍后重试";
        } else if (code === "ERROR_STATUS_TELFORMATERROR") {
          title = "手机号格式有误";
        }

        if (title !== null) {
          wx.showToast({ title: title, icon: "none" });

        }
      },
      fail: function (res) {
        wx.showToast({ title: "服务器繁忙，请稍后重试" });
      },
    });
  },
  telInput:function(e){
    let that = this;
    that.setData({tel:e.detail.value});
  }

})