// tdc/map/map.js
var mapWx = require("../util/qqmap-wx-jssdk.min.js");
var mapDemo = new mapWx({
  key: "4d02f22cadf62e7ca58a3b9deb842c68"
})

Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 23.099994,
    longitude: 113.324520,
    markers: [{
      id: 1,
      latitude: 23.099994,
      longitude: 113.324520,
      name: 'T.I.T 创意园'
    }],
    covers: [{
      latitude: 23.099994,
      longitude: 113.344520,
      iconPath: '../image/map/location.png'
    }],
    map_address: "",
    map_image: "",

    region:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      map_image: "../image/map/address.png"
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    that.mapCtx = wx.createMapContext('myMap');
    //获取我的位置
    // that.getLocation();
    // that.mapCtx.moveToLocation();
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
  getLocation: function(){
    var that = this;
    wx.getLocation({
      type: "gcj02",
      success:function(res){
        var covers = [{
          longitude: res.longitude,
          latitude: res.latitude,
          iconPath: '../image/map/location.png'

        }]
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude,
          covers: covers,
        })
      },
      fail: function(err){

      }
    })
  },
  mapChange: function(e){

    var that = this;
    that.getCenterLocation();

    that.mapCtx.getCenterLocation({
      success: function (res) {
        var covers = [{
          longitude: res.longitude,
          latitude: res.latitude,
          iconPath: '../image/map/location.png'

        }]
        that.setData({
          covers: covers,
        })
        mapDemo.reverseGeocoder({
          location:{
            latitude: res.latitude,
            longitude: res.longitude,
          },
          success: function(res){
            console.log(res);
          },
          fail: function(res){
            console.log(res);
          }
        })
      },
      fail: function (err) {

      }
    })

  },
  getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: function (res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },

  mapUpdated: function(e){
    console.log(e);
  },
  arroundUser: function(e){
    //省市区
    var that = this;
    // var address = that.region.join("-");
    var address = "广东省-广州市-";

    wx.navigateTo({
      url: '../search/search?tagFrom=map&address=' + address,
    })
  }

})