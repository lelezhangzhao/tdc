// tdc/search/search.js
var app = getApp();
var utilRequest = require("../util/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchHistory:[],
    searchHot:[],
    searchResult:[],
    searchText:"",

    roleTypeRange: [],
    roleType: 0,


    angle_image: "",

    hasSearch:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this;
    that.setData({
      hasSearch: false,
      roleTypeRange: ["全部", "机构", "老师"],
      roleType: 0,
      angle_image: "../image/search/angle.png",
    });

    //获取搜索历史、热点
    utilRequest.NetRequest({
      url: "search/getinitializesearch",
      success: function(res){
        if(res.code == "ERROR_STATUS_SUCCESS"){
          var jsoncontent = JSON.parse(res.jsoncontent);

          var historyList = jsoncontent.history[0];
          var hotList = jsoncontent.hot;

          console.log(historyList);
          
          that.setData({
            searchHistory: historyList.searchhistory.split(";"),
            searchHot: hotList,
          })
        }
      },
      fail: function(res){

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
  searchByHistory:function(e){
    var historyKeyWords = e.currentTarget.dataset.keywords;

    utilRequest.NetRequest({
      url: "../search/searchbykeywords",
      data:{
        keywords: historyKeyWords,
      },
      success:function(res){
        if(res.code == "ERROR_STATUS_SUCCESS"){
          var jsoncontent = res.jsoncontent;
        }
      },
      fail:function(res){

      }
    })

  },
  searchByHot:function(e){

  },
  search:function(e){
    var that = this;
    utilRequest.NetRequest({
      url: "search/searchbykeywords",
      data:{
        keywords: that.data.searchText,
      },
      success:function(res){
        console.log(res);
        if(res.code == "ERROR_STATUS_SUCCESS"){
          var jsoncontent = JSON.parse(res.jsoncontent);
          that.setData({ 
            searchResult: jsoncontent,
            hasSearch: true,
          });
        }
      }, 
      fail:function(res){

      }
    })

  },
  searchTextChange:function(e){
    var that = this;
    that.setData({searchText: e.detail.value})
  },
  searchInfo:function(e){
    var that = this;
    var publishId = e.currentTarget.dataset.publishid;

    var role = e.currentTarget.dataset.role;

    var teacher = role == 0 ? true : false;
    var school = !teacher;

    wx.navigateTo({
      url: '../info/info?teacher=' + teacher + '&school=' + school + '&publishId=' + publishId,
    })
  }
})