// tdc/freezen/freezen.js
var utilRequest = require("../util/request.js");
var globalData = require("../util/globaldata.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    publishid: "", //publishid


    teacher: false,
    school: false,
    publishId: 0,
    publishUserId: null,
    name: null,
    nickName: null,
    tel: null,
    address: null,
    workaddress: null,
    introduction: null,
    evaluateList: [],
    introduction_title: null,
    logo: null,
    hasPermission: false,


    //school
    hireinfo: null,
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


    seperator_image: null,
    evaluate_image: null,


    has_search: false,
    userid: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    that.setData({
      seperator_image: "../image/info/seperator.png",
      evaluate_sel_image: "../image/info/evaluate_sel.png",
      evaluate_unsel_image: "../image/info/evaluate_unsel.png",
    })

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
  publishIdInput: function(e){
    var that = this;
    var publishid = e.detail.value;
    that.setData({
      publishId: publishid,
    })

  },
  search: function(e){
    var that = this;
    var teacher = false;
    //获取publishid对应的user信息
    utilRequest.NetRequest({
      url: "admin/getuserinfobypublishid",
      data:{
        publishId: that.data.publishId,
      },
      success: function(res){
        if(res.code == "ERROR_STATUS_SUCCESS"){
          var jsoncontent = JSON.parse(res.jsoncontent);
          teacher = jsoncontent.publishobject == "0";

          that.setData({
            teacher: teacher,
            school: !teacher,
            userid: jsoncontent.userid,
          });
          
          if (that.data.teacher) {
            that.setData({ introduction_title: "个人简介" });
          } else if (that.data.school) {
            that.setData({ introduction_title: "机构简介" });
          }


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
                    logo: globalData.GetServerHttps() + "static/image/logo/" + jsoncontent.logo,
                    has_search: true,

                  });


                } else if (res.code == "ERROR_STATUS_PUBLISHALREADYDELETE") {
                  that.setData({
                    has_search: false,
                    
                  })
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
                console.log(res);
                
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
                    has_search: true,

                  });

                  var teacherArr = jsoncontent.requireinfo.split(";");
                  var welfareArr = jsoncontent.tag.split(";")[3].split(",");
                  that.setData({
                    teacherinfo: teacherArr.join("/"),
                    welfareinfo: welfareArr.join("/"),
                  })
                } else if (res.code == "ERROR_STATUS_PUBLISHALREADYDELETE"){
                  that.setData({
                    has_search: false,
                  })
                  console.log(3);
                }
              },
              fail: function (res) {
                that.setData({
                  has_search: false,
                })
                console.log(4);

              }
            })
          }

        } else if (res.code == "ERROR_STATUS_PUBLISHALREADYDELETE"){
          that.setData({
            has_search: false,
          });


          wx.showToast({
            title: '没有找到该用户',
            icon: "none",
          })
        }
      },
      fail:function(res){

      }

    })
  },
  freezen: function(e){
    //封号
    var that = this;
    var warn = "";
    utilRequest.NetRequest({
      url: "admin/freezenuser",
      data:{
        userid: that.data.userid,
      },
      success: function(res){
        if(res.code == "ERROR_STATUS_SUCCESS"){
          warn = "冻结成功";
        }
      },
      fail: function(res){

      }
    })
    if(warn != ""){
      wx.showToast({
        title: warn,
        icon: "none",
      })
    }
  }
})