// tdc/info/info.js
var utilRequest = require("../util/request.js");
var globalData = require("../util/globaldata.js");

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
    evaluateList:[],
    introduction_title:null,
    logo: null,
    hasPermission: false,

    collection_image:null,
    share_image:null,
    seperator_image: null,
    evaluate_image: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;

    that.setData({
      collection_image: "../image/info/collection.png",
      share_image: "../image/info/share.png",
      seperator_image: "../image/info/seperator.png",
      evaluate_sel_image: "../image/info/evaluate_sel.png",
      evaluate_unsel_image: "../image/info/evaluate_unsel.png",
    })

    that.setData({teacher:options.teacher == "true"});
    that.setData({school:options.school == "true"});
    that.setData({publishId:options.publishId});

    if(that.data.teacher){
      that.setData({introduction_title:"个人简介"});
    }else if(that.data.school){
      that.setData({introduction_title:"机构简介"});
    }


    //获取老师或机构信息
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
            that.setData({ 
              publishUserId: jsoncontent.publishuserid,
              name: jsoncontent.name,
              nickName: jsoncontent.nickname,
              tel: jsoncontent.tel,
              hasPermission: jsoncontent.tel.indexOf("*") == -1,
              publishId: jsoncontent.id,
              workaddress: jsoncontent.workaddress,
              introduction: jsoncontent.introduction,
              evaluateList: jsoncontent.evaluatelist,
              logo: globalData.GetServerHttps() + "static/image/logo/" + jsoncontent.logo,
            });
          } else if (res.code == "ERROR_STATUS_PUBLISHALREADYDELETE"){
            
          }
        },
        fail: function (res) {

        }
      });
    }else if(that.data.school){

    }

    //获取老师或机构电话



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

  },
  applyForPermission:function(e){
    var that = this;
    
  }
})