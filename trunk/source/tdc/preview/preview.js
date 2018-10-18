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
    tagDanceType:[],
    tagWorkType:[],
    tagTeacherType:[],
    tagWelfare:[],
    workAddress:null,
    introduction:null,
    role:null,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // if (app.globalData.userid == null) {
    //   wx.navigateTo({
    //     url: '../login/login',
    //   })
    // }
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
    var that = this;
    if(app.globalData.userid == null){
      wx.navigateTo({
        url: '../login/login',
      })
      return;
    }
    var role = app.globalData.role;
    that.setData({ role: role });
    //获取个人信息
    if (role == 0) {
      utilRequest.NetRequest({
        url: "mine_teacher/getpreviewinfo",
        success: function (res) {
          if (res.code == "ERROR_STATUS_SUCCESS") {
            var jsoncontent = JSON.parse(res.jsoncontent)[0];
            var tags = jsoncontent.tag.split(";");
            var tagDanceType = tags[0].split(",");
            var tagWorkType = tags[1].split(",");
            var tagTeacherType = tags[2].split(",");
            var tagWelfare = tags[3].split(",");

            that.setData({
              logo: jsoncontent.logo,
              name: jsoncontent.name,
              nickName: jsoncontent.nickname,
              tel: jsoncontent.tel,
              tagDanceType: tagDanceType,
              tagWorkType: tagWorkType,
              tagTeacherType: tagTeacherType,
              tagWelfare: tagWelfare,
              workAddress: jsoncontent.workaddress,
              introduction: jsoncontent.introduction,
            });
          }
        },
        fail: function (res) {

        }
      });
    } else if (role == 1) {
      utilRequest.NetRequest({
        url: "mine_teacher/getpreviewinfo",
        success: function (res) {

        },
        fail: function (res) {

        }
      });
    }
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
    var that = this;
    var role = that.data.role;
    var url = null;
    var tagDanceType = that.data.tagDanceType.join(","); 
    var tagWorkType = that.data.tagWorkType.join(","); 
    var tagTeacherType = that.data.tagTeacherType.join(","); 
    var tagWelfare = that.data.tagWelfare.join(","); 
    var tag = tagDanceType + ";" + tagWorkType + ";" + tagTeacherType + ";" + tagWelfare;
    if(role == 0){
      utilRequest.NetRequest({
        url: "mine_teacher/publishteacherinfo",
        data:{
          tag: tag,
          workaddress: that.data.workaddress,
          introduction: that.data.introduction,
        },
        success:function(res){
          console.log(res);
        },
        fail:function(res){

        }
      });
    }else if(role == 1){
      utilRequest.NetRequest({
        url: "mine_school/publishschoolinfo",
        data:{

        },
        success:function(res){

        },
        fail:function(res){

        }
      })
    }
  },

  editTag:function(e){

  }
})