// tdc/newsinfo/newsinfo.js
var utilRequest = require("../util/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    abstract_content: "",
    title_one: "",
    content_one: "",
    photo_one: "",
    title_two: "",
    content_two: "",
    photo_two: "",
    title_three: "",
    content_three: "",
    photo_three: "",


    hasPhotoOne: false,
    hasPhotoTwo: false,
    hasPhotoThree: false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    var ispublish = options.ispublish;
    if(ispublish){
      var newsid = options.newsId;
      utilRequest.NetRequest({
        url: "find/getfindinfo",
        data: {
          newsId: newsid,
        },
        success: function(res){
          if(res.code == "ERROR_STATUS_SUCCESS"){
            var jsoncontent = JSON.parse(res.jsoncontent)[0];
            that.setData({
              title: jsoncontent.title,
              abstract_content: jsoncontent.content,
              title_one: jsoncontent.titleone,
              content_one: jsoncontent.contentone,
              photo_one: jsoncontent.photoone,
              title_two: jsoncontent.titletwo,
              content_two: jsoncontent.contenttwo,
              photo_two: jsoncontent.phototwo,
              title_three: jsoncontent.titlethree,
              content_three: jsoncontent.contentthree,
              photo_three: jsoncontent.photothree,
              hasPhotoOne: jsoncontent.photoone != null,
              hasPhotoTwo: jsoncontent.phototwo != null,
              hasPhotoThree: jsoncontent.photothree != null,

          })
          }
        },
        fail: function(res){

        }
      })

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

  },
  publish:function(e){
    var that = this;
    utilRequest.NetRequest({
      url: "admin/publishnews",
      data:{
        title: that.data.title,
        abstract: that.data.abstract,
        title_one: that.data.title_one,
        content_one: that.data.content_one,
        photo_one: that.data.photo_one,
        title_two: that.data.title_two,
        content_two: that.data.content_two,
        photo_two: that.data.photo_two,
        title_three: that.data.title_three,
        content_three: that.data.content_three,
        photo_three: that.data.photo_three,
      },
      success: function(res){
        if(res.code == "ERROR_STATUS_SUCCESS"){
          wx.showToast({
            title: '发布成功',
            icon: "none",
          })
        }
      },  
      fail:function(res){

      }
    })
  },
  titleChange: function(e){
    var that = this;
    var title = e.detail.value;
    that.setData({
      title: title,
    })
  },
  abstractChange: function(e){
    var that = this;
    var abstract = e.detail.value;
    that.setData({
      abstract: abstract,
    })
  },
  titleOneChange: function(e){
    var that = this;
    var title_one = e.detail.value;
    that.setData({
      title_one: title_one,
    })
  },
  contentOneChange: function(e){
    var that = this;
    var content_one = e.detail.value;
    that.setData({
      content_one: content_one,
    })
  },
  titleTwoChange: function(e){
    var that = this;
    var title_two = e.detail.value;
    that.setData({
      title_two: title_two,
    })
  },
  contentTwoChange: function(e){
    var that = this;
    var content_two = e.detail.value;
    that.setData({
      content_two: content_two,
    })
  },
  titleThreeChange: function(e){
    var that = this;
    var title_three = e.detail.value;
    that.setData({
      title_three: title_three,
    })
  },
  contentThreeChange: function(e){
    var that = this;
    var content_three = e.detail.value;
    that.setData({
      content_three: content_three,
    })
  },
  // previewImage: function (e) {
  //   var photo = [e.target.id];
  //   wx.previewImage({
  //     current: e.target.id, // 当前显示图片的http链接
  //     urls: photo // 需要预览的图片http链接列表
  //   })
  // },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var newPhotoItem = res.tempFilePaths[0];        
        if(e.currentTarget.id == "1"){
          that.setData({
            photo_one: newPhotoItem,
            hasPhotoOne: true,
          })
        }else if(e.currentTarget.id == "2"){
          that.setData({
            photo_two: newPhotoItem,
            hasPhotoTwo: true,
            
          })
        }else if(e.currentTarget.id == "3"){
          that.setData({
            photo_three: newPhotoItem,
            hasPhotoThree: true,
            
          })
        }
        var session_id = wx.getStorageSync('PHPSESSID');//本地取存储的sessionID
        var header = {
          'content-type': 'multipart/form-data', 'Cookie': session_id };

        var url = "";
        if (that.data.role == 0) {
          url = globalData.GetServerHttps() + "index.php/tdc/mine_teacher/uploadphoto";
        } else if (that.data.role == 1) {
          url = globalData.GetServerHttps() + "index.php/tdc/mine_school/uploadphoto";
        }
        wx.uploadFile({
          url: url,
          filePath: newPhotoItem,
          name: newPhotoItem.substr(60, 10),
          header: header,
          success(res) {
            console.log(res);
          },
          fail(res) {
            console.log(res);
          }
        })
      }
    })
  },
  deleteImage: function(e){
    var that = this;
    var id = e.currentTarget.id;
    if(id == "1"){
      that.setData({
        photo_one: "",
        hasPhotoOne: false,
      })
    }else if(id == "2"){
      that.setData({
        photo_two: "",
        hasPhotoTwo: false,
      })
    }else if(id == "3"){
      that.setData({
        photo_three: "",
        hasPhotoThree: false,
      })
    }
  }


})