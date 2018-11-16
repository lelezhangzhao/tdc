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

    //是否已收藏 
    hasCollectioned: false,

    //school
    hireinfo:null,
    teacherinfo: null,
    welfareinfo: null,

    wagesbymonth: false,
    wagesbyclass: false,
    wagesfacetoface: false,
    wagesbymonthmin: 0,
    wagesbymonthmax: 0,
    wagesbyclassmin: 0,
    wagesbyclassmax: 0,
    hirecount: 0,


    collection_image:null,
    collectioned_image:null,
    share_image:null,
    share_button:null,
    seperator_image: null,
    evaluate_image: null,

    show_mine_evaluate: false,
    mine_evaluate_content: "",
    mine_item_score: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    that.setData({
      collection_image: "../image/info/collection.png",
      collectioned_image: "../image/info/collection_sel.png",
      share_image: "../image/info/share.png",
      share_button: globalData.GetServerHttps() + "static/image/info/share.png",
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


    that.getInfo();    
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
        if(res.code == "ERROR_STATUS_SUCCESS"){
          that.setData({
            hasCollectioned: true,
          })
        }
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
    utilRequest.NetRequest({
      url: "publish_info/applyforpermission",
      data:{
        touserid: that.data.publishUserId,
      },
      success:function(res){
        if(res.code = "ERROR_STATUS_SUCCESS"){
          wx.showModal({
            title: "申请成功",
            content: '申请成功，等待对方授权',
          })


        }
      },
      fail:function(res){

      }
    })
  },
  evaluate: function(e){
    var that = this;
    that.setData({
      show_mine_evaluate: true,
      mine_evaluate_score: 0,
    })
  },
  mine_evaluate_1: function(e){
    var that = this;
    that.setData({
      mine_item_score: 1,
    })
  },
  mine_evaluate_2: function(e){
    var that = this;
    that.setData({
      mine_item_score: 2,
    })
  },
  mine_evaluate_3: function(e){
    var that = this;
    that.setData({
      mine_item_score: 3,
    })
  },
  mine_evaluate_4: function(e){
    var that = this;
    that.setData({
      mine_item_score: 4,
    })
  },
  mine_evaluate_5: function(e){
    var that = this;
    that.setData({
      mine_item_score: 5,
    })
  },
  publishMineEvaluate: function(e){
    var that = this;
    utilRequest.NetRequest({
      url: "publish_info/addevaluate",
      data:{
        publishId: that.data.publishId,
        evaluateContent: that.data.mine_evaluate_content,
        evaluateScore: that.data.mine_item_score,
      },
      success: function(res){
        if(res.code = "ERROR_STATUS_SUCCESS"){
          that.setData({
            show_mine_evaluate: false,
            mine_evaluate_content: "",
            mine_item_score: 0,
          })
          that.getInfo();
          wx.showToast({
            title: '评价成功',
            icon: "none",
          })
        }
      },
      fail: function(res){

      }
    })

  
  },
  mineEvaluateContent: function(e){
    var that = this;
    that.setData({
      mine_evaluate_content: e.detail.value,
    })
  },
  getInfo: function(){
    var that = this;
    //获取老师或机构信息
    if (that.data.teacher) {
      utilRequest.NetRequest({
        url: "publish_info/getpublishteacherinfo",
        data: {
          publishId: that.data.publishId
        },
        success: function (res) {
          if (res.code == "ERROR_STATUS_SUCCESS") {
            var jsoncontent = JSON.parse(res.jsoncontent)[0];
            that.setData({
              publishUserId: jsoncontent.publishuserid,
              name: jsoncontent.name,
              nickName: jsoncontent.nickname,
              tel: jsoncontent.tel,
              hasPermission: jsoncontent.tel.indexOf("*") == -1,
              workaddress: jsoncontent.workaddress,
              introduction: jsoncontent.introduction,
              evaluateList: jsoncontent.evaluatelist,
              logo: globalData.GetServerHttps() + jsoncontent.logo,
              hasCollectioned: jsoncontent.hascollectioned,
            });


          } else if (res.code == "ERROR_STATUS_PUBLISHALREADYDELETE") {

          }
        },
        fail: function (res) {

        }
      });
    } else if (that.data.school) {
      utilRequest.NetRequest({
        url: "publish_info/getpublishschoolinfo",
        data: {
          publishId: that.data.publishId
        },
        success: function (res) {
          if (res.code == "ERROR_STATUS_SUCCESS") {
            var jsoncontent = JSON.parse(res.jsoncontent)[0];
            that.setData({
              publishUserId: jsoncontent.publishuserid,
              name: jsoncontent.name,
              nickName: jsoncontent.nickname,
              tel: jsoncontent.tel,
              hasPermission: jsoncontent.tel.indexOf("*") == -1,
              workaddress: jsoncontent.workaddress,
              introduction: jsoncontent.introduction,
              evaluateList: jsoncontent.evaluatelist,
              logo: globalData.GetServerHttps() + jsoncontent.logo,
              wagesbymonth: jsoncontent.wagesbymonth,
              wagesbymonthmin: jsoncontent.wagesbymonthmin,
              wagesbymonthmax: jsoncontent.wagesbymonthmax,
              wagesbyclass: jsoncontent.wagesbyclass,
              wagesbyclassmin: jsoncontent.wagesbyclassmin,
              wagesbyclassmax: jsoncontent.wagesbyclassmax,
              wagesfacetoface: jsoncontent.wagesfacetoface,
              hireinfo: jsoncontent.hireinfo,
              hasCollectioned: jsoncontent.hascollectioned,

            });

            var teacherArr = jsoncontent.requireinfo.split(";");
            var welfareArr = jsoncontent.tag.split(";")[3].split(",");
            that.setData({
              teacherinfo: teacherArr.join("/"),
              welfareinfo: welfareArr.join("/"),
            })
          }
        },
        fail: function (res) {

        }
      })
    }
  }
})