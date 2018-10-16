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
    publishUserId:null,
    name:null,
    nickName:null,
    tel:null,
    address:null,
    workaddress:null,
    introduction:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    
    that.setData({teacher:options.teacher == "true"});
    that.setData({school:options.school == "true"});
    that.setData({publishId:options.publishId});

    if(that.data.teacher){
      utilRequest.NetRequest({
        url: "publish_info/getpublishteacherinfo",
        data: {
          publishId: that.data.publishId
        },
        success: function (res) {
          if(res.code == "ERROR_STATUS_SUCCESS"){
            console.log(res);
            var jsoncontent = JSON.parse(res.jsoncontent)[0];
            that.setData({ publishUserId: jsoncontent.publishUserId });
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
      path: "tdc/info/info?teacher=" + that.data.teacher + "&school=" + that.data.school + "&publishId=" + that.data.publishId
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
      url: "../chatonline/chatonline?theOtherUserId=" + that.data.publishUserId,
    });
  },
  tel:function(e){

  }
})