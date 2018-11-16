let Mcaptcha = require('../util/mcaptcha.js');
let utilMd5 = require('../util/md5.js');
var utilRequest = require("../util/request.js");


var app = getApp();

// tdc/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    login_bk: null,
    login_input: null,
    wx_logo: null,
    captcha: 0,

    userInfo: {},

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      login_bk: "../image/login/login_bk.png",
      login_input: "../image/login/login_input.png",
      wx_logo: "../image/login/wx_logo.png",
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this;
    var num = that.getRanNum();
    // console.log(num)
    that.setData({
      captcha: num
    });
    new Mcaptcha({
      el: 'canvas',
      width: 80, //对图形的宽高进行控制
      height: 30,
      code: num
    });
  },

  getRanNum: function() {
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var pwd = '';
    for (var i = 0; i < 4; i++) {
      if (Math.random() < 48) {
        pwd += chars.charAt(Math.random() * 48 - 1);
      }
    }
    return pwd;
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  loginSubmit: function(e){
    let that = this;
    let username = e.detail.value.username;
    let password = e.detail.value.password;
    let captcha = e.detail.value.captcha;

    var warn = null;

    //username 
    if (username === null || username.trim().length === 0) {
      warn = "用户名不能为空";
    } else if (username.trim().length < 5) {
      warn = "用户名至少5个字符";
    } else if (username.trim().length > 30) {
      warn = "用户名最多30个字符";
    }

    //password
    if(password === null || password.trim().length === 0){
      warn = "密码不能为空";
    }else if(password.trim().length < 5){
      warn = "密码至少5个字符";
    }else if(password.trim().length > 30){
      warn = "密码最多30个字符";
    }
    password = utilMd5.hexMD5(password);

    //captcha
    if(captcha === null || captcha.trim().length === 0){
      warn = "验证码不能为空";
    } else if (captcha.toLowerCase() !== that.data.captcha.toLowerCase()){
      that.onReady();
      warn = "验证码有误";
    }
    if(warn !== null){
      wx.showModal({title:warn, icon:"none"});
      return;
    }
    
    utilRequest.NetRequest({
      url: "login/login",
      data: {
        username: username,
        password: password,
      },
      success: function (res) {
        var title = null;
        
        if (res.code == "ERROR_STATUS_SUCCESS") {
        var jsoncontent = JSON.parse(res.jsoncontent);
          app.globalData.userid = jsoncontent.userid;
          app.globalData.role = jsoncontent.role;
          if(jsoncontent.role == 0 || jsoncontent.role == 1){
            wx.switchTab({
              url: '../index/index',
            });
          }else if(jsoncontent.role == 2){
            wx.navigateTo({
              url: '../admin/admin',
            })
          }
        } else if (res.code == "ERROR_STATUS_USERNAMEFORMATERROR") {
          title = "用户名格式错误";
        } else if (res.code == "ERROR_STATUS_USERNAMEORPASSWORDERROR") {
          title = "用户名或密码错误";
        }
        if (title !== null) {
          wx.showToast({ title: title, icon: "none" });
        }
      },
      fail: function (res) {
        wx.showToast({ title: "服务器繁忙，请稍后重试", icon: "none" });
      }
    });
  },
  toRegister:function(e){
    wx.navigateTo({
      url: '../register/register',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  forgetPassword:function(e){
    wx.navigateTo({
      url: '../forgetPassword/forgetPassword',
    })
  },
  login_by_wx: function(e){
    var that = this;
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              that.data.userInfo = res.userInfo;
              //微信登录
              utilRequest.NetRequest({
                url: "login/loginbywx",
                data:{
                  userInfo: res.userInfo,
                },
                success: function(res){
                  if(res.code == "ERROR_STATUS_SUCCESS"){
                    
                  }
                },
                fail: function(res){

                }
              })
            }
          })
        }
      }
    });
  }


})