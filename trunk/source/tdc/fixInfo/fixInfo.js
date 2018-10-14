// tdc/fixTeacherInfo/fixTeacherInfo.js
var utilRequest = require("../util/request.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logo:null,
    name:null,
    nickName:null,
    tel:null,
    sex:null,
    birthday:null,
    address:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(app.globalData.role == 0){
      utilRequest.NetRequest({
        url: "mine_teacher/getteacherinfo",
        success: function (res) {
          var jsoncontent = JSON.parse(res.jsoncontent);
          that.setData({ logo: jsoncontent.logo });
          that.setData({ name: jsoncontent.name });
          that.setData({ nickName: jsoncontent.nickName });
          that.setData({ tel: jsoncontent.tel });
          that.setData({ sex: jsoncontent.sex });
          that.setData({ birthday: jsoncontent.birthday });
          that.setData({address:jsoncontent.address});
        },
        fail: function (res) {

        }
      });
    }else if(app.globalData.role == 1){
      utilRequest.NetRequest({
        url:"mine_school/getschoolinfo",
        success:function(res){
          var jsoncontent = JSON.parse(res.jsoncontent);
          
        },
        fail:function(res){

        }
      })
    }

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

  fixLogo:function(e){

  },
  fixName:function(e){

  },
  fixNickName:function(e){

  },
  fixTel:function(e){

  },
  fixSex:function(e){

  },
  fixBirthday:function(e){

  },
  fixAddress:function(e){
    
  }
})