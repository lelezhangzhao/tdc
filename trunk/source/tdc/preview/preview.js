// tdc/teacherPreview/teacherPreview.js

var app = getApp();
var utilRequest = require("../util/request.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    logo:null,
    name:null,
    nickName:null,
    tel:null,
    tags:[],
    workAddress:null,
    introduction:null,
    role:null,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var role = app.globalData.role;
    that.setData({ role: role});

    //获取个人信息
    if(role == 0){
      utilRequest.NetRequest({
        url: "mine_teacher/getpreviewinfo",
        success:function(res){
          if(res.code == "ERROR_STATUS_SUCCESS"){
            var jsoncontent = JSON.parse(res.jsoncontent)[0];
            console.log(jsoncontent);
            var tags = jsoncontent.tag.split(";");
            that.setData({
              logo: jsoncontent.logo,
              name: jsoncontent.name,
              nickName: jsoncontent.nickname,
              tel: jsoncontent.tel,
              tags: tags,
              workAddress: jsoncontent.workaddress,
              introduction: jsoncontent.introduction,
            });
          }
        },
        fail:function(res){

        }
      });
    }else if(role == 1){
      utilRequest.NetRequest({
        url:"mine_teacher/getpreviewinfo",
        success:function(res){

        },
        fail:function(res){

        }
      });
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

  editInfo:function(e){
    var that = this;
    wx.navigateTo({
      url: '../fixInfo/fixInfo',
    })
  },

  logout:function(e){

  },

  publish:function(e){

  },

  editTag:function(e){

  }
})