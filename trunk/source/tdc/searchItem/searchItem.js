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
    danceType:null,
    welfareRange:[],
    welfare:null,
    otherRange:[],
    other:null,


    itemList:null,
    
    searchType:0, //0->teacher 1->school
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var searchType = options.searchtype;
    that.setData({
      search:"",
      danceType:"舞种",
      welfare:"福利",
      other:"其他",
      searchType: searchType,
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
          });
        }
      },
      fail:function(res){

      }
    });

    var url = null;
    if (searchType == 0){
      //默认老师
      url = "search_teacher/getdefaultteacherlist";

    }else if(searchType == 1){
      //默认学校
      url = "search_school/getdefaultschoollist";
    }
    utilRequest.NetRequest({
      url: url,
      success: function (res) {
        if (res.code == "ERROR_STATUS_SUCCESS") {
          var jsoncontent = JSON.parse(res.jsoncontent);
          that.setData({
            itemList: jsoncontent,
          });
        }
      },
      fail: function (res) {

      }
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
  reginonChange:function(e){
    var that = this;
    var region = e.detail.value;
    that.setData({region: region});

  },
  danceTypeChange: function(e){
    var that = this;
    var danceTypeArray = that.data.danceTypeRange;
    that.setData({danceType: danceTypeArray[e.detail.value]});
  },
  welfareChange: function(e){
    var that = this;
    var welfareArray = that.data.welfareRange;
    that.setData({ welfare: welfareArray[e.detail.value] });
    
  },
  otherChange: function(e){
    var that = this;
    var workTypeArray = that.data.otherRange;
    that.setData({ other: workTypeArray[e.detail.value] });
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