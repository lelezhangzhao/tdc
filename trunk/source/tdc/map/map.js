// tdc/map/map.js
var utilRequest = require("../util/request.js");
var mapWx = require("../util/qqmap-wx-jssdk.min.js");
var mapDemo = new mapWx({
  key: "WRCBZ-KLI36-EB7SE-MN6IW-J47H2-BXFYH"
})

Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 23.099994,
    longitude: 113.324520,
    marker_mine:{
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      iconpath: '../image/map/location.png'
    },
    markers: [{
      id: 1,
      latitude: 23.099994,
      longitude: 113.324520,
      iconPath: '../image/map/location.png'
    }],
    // covers: [{
    //   latitude: 23.099994,
    //   longitude: 113.344520,
    //   iconPath: '../image/map/location.png'
    // }],
    map_keywords: "",
    map_image: "",

    find_mine_image: "",

    region:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      map_image: "../image/map/address.png",
      find_mine_image: "../image/map/mine.png"
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
        var markers = [{
          longitude: res.longitude,
          latitude: res.latitude,
          iconPath: '../image/map/location.png'

        }]
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude,
          markers: markers,
        })
      },
      fail: function(err){

      }
    })
  },
  mapChange: function(e){

    // var that = this;
    // that.getCenterLocation();

    // that.mapCtx.getCenterLocation({
    //   success: function (res) {
    //     var markers = [{
    //       longitude: res.longitude,
    //       latitude: res.latitude,
    //       iconPath: '../image/map/location.png'

    //     }]
    //     that.setData({
    //       markers: markers,
    //     })
    //     mapDemo.reverseGeocoder({
    //       location:{
    //         latitude: res.latitude,
    //         longitude: res.longitude,
    //       },
    //       success: function(res){
    //         var province = res.result.address_component.province;
    //         var city = res.result.address_component.city;
    //         var district = res.result.address_component.district;
    //         var region = province + "-" + city + "-" + district;
    //         utilRequest.NetRequest({
    //           url: "search/SearchByKeyWords",
    //           data:{
    //             region: region,
    //           },
    //           success: function(res){
    //             if(res.code == "ERROR_STATUS_SUCCESS"){
    //               var jsoncontent = JSON.parse(res.jsoncontent);
    //               var usercount = jsoncontent.length;
                  
    //             }
    //           },
    //           fail: function(res){

    //           }
    //         })
    //         var map_address = province + city + district;
    //         that.setData({
    //           map_address: map_address,
    //         })

    //       },
    //       fail: function(res){
    //       }
    //     })
    //   },
    //   fail: function (err) {

    //   }
    // })

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
  // arroundUser: function(e){
  //   //省市区
  //   var that = this;
  //   // var address = that.region.join("-");
  //   var address = "广东省-广州市-";

  //   wx.navigateTo({
  //     url: '../search/search?tagFrom=map&address=' + address,
  //   })
  // },
  minePosition: function(e){
    var that = this;
    var markers = [that.data.marker_mine];

    that.setData({
      markers: markers,
    })
    that.mapCtx.moveToLocation();
  }, 
  showMarkerInfo: function(e){
    var that = this;
    var markerid = e.markerId;
    var teacher = false;
    var school = false;

    utilRequest.NetRequest({
      url: "global_data/getrolebypublishid",
      data:{
        publishid: markerid,
      },
      success: function(res){
        if(res.code == "ERROR_STATUS_SUCCESS"){
          teacher = res.jsoncontent == "0";
          school = res.jsoncontent == "1";

          wx.navigateTo({
            url: '../info/info?teacher=' + teacher + '&school=' + school + '&publishId=' + markerid,
          })

        }
      },
      fail: function(res){

      }
    })
  },
  confirm: function(e){
    var that = this;
    utilRequest.NetRequest({
      url: "search/searchuserbykeywords",
      data: {
        keywords: that.data.map_keywords,
      },
      success: function(res){
        if(res.code == "ERROR_STATUS_SUCCESS"){
          var jsoncontent = JSON.parse(res.jsoncontent);
          var markers = [];
          var points = [];

          var j = 0;
          for(var i = 0; i < jsoncontent.length; ++i){

            mapDemo.geocoder({
              address: jsoncontent[i].detailworkaddress,
              success: function(res){
                var marker={
                  id: jsoncontent[j].id,
                  latitude: res.result.location.lat,
                  longitude: res.result.location.lng,
                  iconpath: '../image/map/location.png',
                  label:{
                    content: jsoncontent[j].name,
                    borderColor: "#AA33AA",
                    bgColor: "#AAAA33",
                    borderRadius: 7,
                    display: "ALWAYS",
                    color: "#343434",
                    padding: 10,
                  }
                }
                ++j;
                markers.push(marker);

                var point = {
                  latitude: res.result.location.lat,
                  longitude: res.result.location.lng,
                }
                points.push(point);

                that.setData({
                  markers: markers,
                })
                that.mapCtx.includePoints({
                  points: points,
                  padding: [10,10,10,10],
                  success: function(res){
                    console.log(res);
                  },
                  fail:function(res){
                    console.log(res);
                  }

                });


              },
              fail: function(res){
                console.log(res);
              }
            })
          }
        }
      },
      fail: function(res){

      }
    })
  },
  searchinputchange: function(e){
    var that = this;
    that.setData({
      map_keywords: e.detail.value,
    })
  }

})