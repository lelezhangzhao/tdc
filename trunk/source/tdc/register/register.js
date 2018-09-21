// tdc/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    password: "",
    confirmPassword: "",
    tel: "",
    getTelIdentify: "获取验证码",
    telIdentify: "",
    loading:false,
    refreshTime: 120,
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
    this.setData({
      tel: e.detail.value
    })
  },

  getTelIdentify: function(e){
    var that = this;
    if (that.data.loading === true){
      return;
    }
    //检测手机号
    var tel = that.data.tel;
    var warn = null;
    if(tel.length === 0){
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
    
    if (that.data.loading === false) {
      that.setData({ loading: true });
      that.data.refreshID = setInterval(that.refreshRemainTime, 1000);
    }


  },

  registerSubmit: function(e){
    var that = this;

    var username = e.detail.value.username;
    var password = e.detail.value.password;
    var confirmPassword = e.detail.value.confirmPassword;
    var telIdentify = eldetail.value.telIdentify;

    //


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
    that.data.refreshTime = 120;
    that.setData({ getTelIdentify: "获取验证码" });
    that.setData({ loading: false });
  }

})