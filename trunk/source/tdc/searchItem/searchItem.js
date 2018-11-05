// tdc/searchTeacher/searchTeacher.js
var app = getApp();
var utilRequest = require("../util/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search:null,
    region:[],
    danceTypeRange:[],
    danceType:0,
    welfareRange:[],
    welfare:0,
    otherRange:[],
    other:0,
    teacherTypeRange:[],
    teacherType: 0,

    angle_image: "",


    itemList:null,
    
    searchType:0, //0->teacher 1->school
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this;
    var searchType = options.searchtype;
    var data = that.data;
    that.setData({
      search:"",
      danceType: 0,
      welfare: 0,
      other: 0,
      teacherType: 0,
      searchType: searchType,
      angle_image: "../image/search/angle.png",
    });

    //区域
    utilRequest.NetRequest({
      url: "search/getmyregion",
      success:function(res){
        if(res.code == "ERROR_STATUS_SUCCESS"){
          var jsoncontent = JSON.parse(res.jsoncontent)[0];
          that.setData({region: jsoncontent.address.split("-")})
        }
      },
      fail:function(res){

      }
    })

    //标签
    utilRequest.NetRequest({
      url: "search/getdefaulttaglist",
      success:function(res){
        if(res.code == "ERROR_STATUS_SUCCESS"){
          var jsoncontent = JSON.parse(res.jsoncontent)[0];

          var danceTypeArray = jsoncontent.dancetype.split(",");
          var workTypeArray = jsoncontent.worktype.split(",");
          var teacherTypeArray = jsoncontent.teachertype.split(",");
          var welfareTypeArray = jsoncontent.welfare.split(",");

          that.setData({
            danceTypeRange: danceTypeArray,
            welfareRange: welfareTypeArray,
            otherRange: workTypeArray,
            teacherTypeRange: teacherTypeArray,
          });
        }
      },
      fail:function(res){

      }
    });

    that.keyWordChange();

    // var url = "";
    // if (searchType == 0){
    //   //默认老师
    //   url = "search_teacher/getdefaultteacherlist";

    // }else if(searchType == 1){
    //   //默认学校
    //   url = "search_school/getdefaultschoollist";
    // }
    // utilRequest.NetRequest({
    //   url: url,
    //   success: function (res) {
    //     if (res.code == "ERROR_STATUS_SUCCESS") {
    //       var jsoncontent = JSON.parse(res.jsoncontent);
    //       that.setData({
    //         itemList: jsoncontent,
    //       });
    //     }
    //   },
    //   fail: function (res) {

    //   }
    // })
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
  reginonChange:function(e){
    var that = this;
    var region = e.detail.value;
    that.setData({region: region});
    that.keyWordChange();
  },
  danceTypeChange: function(e){
    var that = this;
    var danceTypeArray = that.data.danceTypeRange;
    that.setData({
      danceType: e.detail.value
    });
    that.keyWordChange();
    
  },
  welfareChange: function(e){
    var that = this;
    var welfareArray = that.data.welfareRange;
    that.setData({ 
      welfare: e.detail.value
    });
    that.keyWordChange();
    
    
  },
  otherChange: function(e){
    var that = this;
    var workTypeArray = that.data.otherRange;
    that.setData({ 
      other: e.detail.value 
    });
    that.keyWordChange();
    
  },
  teacherTypeChange: function(e){
    var that = this;
    var teacherTypeArray = that.data.teacherTypeRange;
    that.setData({
      teacherType: e.detail.value,
    })
    
    that.keyWordChange();
  },
  keyWordChange: function(e){
    var that = this;
    var url = "";
    if (that.data.searchType == 0){
      url = "search_teacher/getteacherlistbycondition";
    }else if(that.data.searchType == 1){
      url = "search_school/getschoollistbycondition";
    }
    utilRequest.NetRequest({
      url: url,
      data: {
        region: that.data.region,
        danceType: that.data.danceTypeRange[that.data.danceType],
        welfare: that.data.welfareRange[that.data.welfare],
        other: that.data.otherRange[that.data.other],
        teacherType: that.data.teacherTypeRange[that.data.teacherType],
      },
      success: function (res) {
        var jsoncontent = [];
        if(res.code == "ERROR_STATUS_SUCCESS"){
          jsoncontent = JSON.parse(res.jsoncontent);
        }else if(res.code == "ERROR_STATUS_LISTISNULL"){
          jsoncontent = [];
        }

        that.setData({
          itemList: jsoncontent,
        })

      },
      fail: function (res) {

      }
    })


  },
  publishInfo:function(e){
    var that = this;
    var publishId = e.currentTarget.dataset.id;
    var teacher = that.data.searchType == 0;
    var school = !teacher;
    wx.navigateTo({
      url: '../info/info?teacher=' + teacher + '&school=' + school + '&publishId=' + publishId,
    })
  }
})