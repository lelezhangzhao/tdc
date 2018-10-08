// tdc/register/register.js
var utilMd5 = require('../util/md5.js');
var utilRequest = require("../util/request.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: null,
    password: null,
    confirmPassword: null,
    tel: null,
    getTelIdentify: "获取验证码",
    telIdentify: null,
    loading:false,
    refreshTime: 2,
    refreshID:0,

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

  telInput: function(e){
    var that = this;

    that.setData({
      tel: e.detail.value
    })
  },
  getTelIdentify: function(e){

    wx.removeStorageSync("PHPSESSID");

    var that = this;

    
    if (that.data.loading === true){
      return;
    }

    //检测手机号
    var tel = that.data.tel;

    var warn = null;
    if(tel === null || tel.trim().length === 0){
      warn = "号码不能为空";
    } else if (tel.trim().length !== 11 || !/^1\d{10}$/.test(tel)){
      warn = "手机号格式不正确";
    }
    if(warn != null){
      wx.showModal({
        title:"提示",
        content:warn
      })
      return;
    }


    utilRequest.NetRequest({
      url:"register/getTelIdentify",
      data:{
        tel: tel,
      },
      success:function(res){

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
        } else if (code === "ERROR_STATUS_TELISALREADYEXIST") {
          title = "手机号已存在";
        }

        if (title !== null) {
          wx.showToast({ title: title, icon: "none" });

        }
      },
      fail:function(res){
        wx.showToast({ title: "服务器繁忙，请稍后重试" });
      },
    });
    that.setData({ loading: true });
    var refreshID = setInterval(that.refreshRemainTime, 1000);
    that.setData({ refreshID: refreshID})
    that.setData({tel:tel});
    
    this.data.tel = tel;
  },

  registerSubmit: function(e){
    var that = this;


    var username = e.detail.value.username;
    var password = e.detail.value.password;
    var confirmPassword = e.detail.value.confirmPassword;
    var telIdentify = e.detail.value.telIdentify;
    var tel = e.detail.value.tel;

    //username 
    var warn = null;
    if(username === null || username.trim().length === 0){
      warn = "用户名不能为空";
    }else if(username.trim().length < 5){
      warn = "用户名至少5个字符";
    }else if(username.trim().length > 30){
      warn = "用户名最多30个字符";
    } else if (!(/[a-zA-Z]{1}/.test(username))){
      warn = "用户名至少包含一个字母";
    }

    //password
    if(password === null || password.trim().length === 0){
      warn = "密码不能为空";
    }else if(password.trim().length < 5){
      warn = "密码至少5个字符";
    }else if(password.trim().legnth > 30){
      warn = "密码最多30个字符";
    }

    //confirmPassword
    if(confirmPassword === null || confirmPassword !== password){
      warn = "两次密码不一致";
    }

    //两次密码一致，加密密码
    password = utilMd5.hexMD5(password);

    //tel
    if (tel === null || tel.trim().length === 0) {
      warn = "号码不能为空";
    } else if (tel.trim().length !== 11 || !/^1\d{10}$/.test(tel)) {
      warn = "手机号格式不正确";
    }



    //telIdentify
    if(telIdentify === null || telIdentify.trim().length === 0){
      warn = "手机验证码不能为空";
    }

    if(warn !== null){
      wx.showModal({
        title: "提示",
        content: warn,
      })
      return;
    }

    that.setData({username: username});
    that.setData({password: password});
    that.setData({confirmPassword:confirmPassword});
    that.setData({telIdentify:telIdentify});

    utilRequest.NetRequest({
      url:"register/register",
      data:{
        username: username,
        password: password,
        tel:tel,
        telIdentify:telIdentify,
      },
      success:function(res){
        var code = res.code;
        var msg = res.msg;
        var title = null;
        
        if(code === "ERROR_STATUS_SUCCESS"){
          wx.navigateTo({url:"../registerJump/registerJump"});
        } else if (code === "ERROR_STATUS_NOTGETTELIDENTIFY"){
          title = "未获取手机验证码";
        } else if (code === "ERROR_STATUS_TELISNOTEQUAL"){
          title = "两次手机号不同";
        } else if (code === "ERROR_STATUS_TELIDENTIFYERROR"){
          title = "手机验证码错误";
        } else if (code === "ERROR_STATUS_USERNAMEFORMATERROR"){
          title = "用户名格式错误";
        } else if (code === "ERROR_STATUS_USERNAMEISALREADYEXIST"){
          title = "用户名已存在";
        }
        if(title !== null){
          wx.showToast({title:title, icon:"none"});
        }
      },
      fail:function(res){
        wx.showToast({title:"服务器繁忙，请稍后重试", icon:"none"});
      }
    });

  },

  refreshRemainTime: function(){
    var that = this;
    
    var refreshTime = that.data.refreshTime;
    --refreshTime;
    if (refreshTime <= 0){
      that.stopRefreshRemainTime();
    }else{
      that.setData({ getTelIdentify: "验证码已发送(" + refreshTime + "s)"});
      that.data.refreshTime = refreshTime;
    }

  },

  stopRefreshRemainTime:function(){
    var that = this;
    
    clearInterval(that.data.refreshID);
    that.data.refreshTime = 2;
    that.setData({ getTelIdentify: "获取验证码" });
    that.setData({ loading: false });
  }

})