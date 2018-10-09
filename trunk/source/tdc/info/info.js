// tdc/info/info.js
var utilRequest = require("../util/request.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacher:false,
    school:false,
    publishId:0,
    name:null,
    nickName:null,
    tel:null,
    address:null,
    workaddress:null,
    introductioni:null,
    publishId:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    
    that.setData({teacher:options.teacher});
    that.setData({school:options.school});
    that.setData({publishId:options.publishId});

    if(that.data.teacher){
      utilRequest.NetRequest({
        url: "publish_info/getpublishteacherinfo",
        data: {
          publishId: that.data.publishId
        },
        success: function (res) {
          if(res.code == "ERROR_STATUS_SUCCESS"){
            var jsoncontent = JSON.parse(res.jsoncontent)[0];
            that.setData({ name: jsoncontent.name });
            that.setData({ nickName: jsoncontent.nickname });
            that.setData({ tel: jsoncontent.tel });
            that.setData({ publishId: jsoncontent.id });
            that.setData({ workaddress: jsoncontent.workaddress });
            that.setData({ introduction: jsoncontent.introduction });
          } else if (res.code == "ERROR_STATUS_PUBLISHALREADYDELETE"){
            
          }
        },
        fail: function (res) {

        }
      });
    }else if(that.data.school){

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
    var that = this;
    return{
      title:"TDC",
      path:"tdc/info/info?teacher=" + that.data.teacher + "&school=" + that.data.school + "&publishId=" + that.data.publishId
    }
  },
  collection:function(e){
    var that = this;

    utilRequest.NetRequest({
      url:"publish_info/collection",
      data:{
        publishId:that.data.publishId
      },
      success:function(res){
        
      },
      fail:function(res){

      }
    })
  },
  chat:function(e){
    var that = this;
    wx.navigateTo({
      url: '../chat/chat?publishId=' + that.data.publishId,
    })
  },
  tel:function(e){

  }
})