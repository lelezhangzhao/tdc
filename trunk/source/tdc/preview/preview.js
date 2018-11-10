// tdc/teacherPreview/teacherPreview.js

var app = getApp();
var utilRequest = require("../util/request.js");
var globalData = require("../util/globaldata.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    logo:null,
    name:null,
    nickName:null,
    tel:null,
    address:null,
    tagDanceType:[],
    tagWorkType:[],
    tagTeacherType:[],
    tagWelfare:[],
    parsedTags:[],
    introduction_title: null,
    introduction:null,
    role:null,
    region:[],
    photos:[],

    danceTypes: ["拉丁", "摩登"],
    workTypes: ["全职", "兼职"],
    teacherTypes: ["毕业", "现役", "在校"],
    counts: [1,2,3,4,5,6,7,8,9,10],    
    danceType: "",
    workType: "",
    teacherType: "",
    count: 0,
    wagesbymonthmin: 0,
    wagesbymonthmax: 0,
    wagesbymonth: false,
    wagesbyclassmin: 0,
    wagesbyclassmax: 0,
    wagesbyclass: false,
    wagesfacetoface: 0,


    fix_image: null,
    exit_image: null,
    publish_image: null,
    workaddress_angle_image: null,
    hire_info_image: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this;
    //加载本地图片 
    that.setData({
      fix_image: "../image/preview/fix.png",
      exit_image: "../image/preview/exit.png",
      publish_image: "../image/preview/publish.png",
      hire_info_image: "../image/preview/hireinfoview.png",
    })

    if (app.globalData.userid == null) {
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
            var parsedTags = tagDanceType.concat(tagWorkType).concat(tagTeacherType).concat(tagWelfare);
            for (var i = 0; i < parsedTags.length; ++i) {
              if (parsedTags[i] == "") {
                parsedTags.splice(i, 1);
              }
            }
            var region = jsoncontent.workaddress.split("-");
            that.setData({
              logo: globalData.GetServerHttps() + jsoncontent.logo,
              name: jsoncontent.name,
              nickName: jsoncontent.nickname,
              tel: jsoncontent.tel,
              tagDanceType: tagDanceType,
              tagWorkType: tagWorkType,
              tagTeacherType: tagTeacherType,
              tagWelfare: tagWelfare,
              region: region,
              introduction: jsoncontent.introduction,
              parsedTags: parsedTags,
              introduction_title: "个人简介",
            });
          }
        },
        fail: function (res) {

        }
      });
    } else if (role == 1) {
      utilRequest.NetRequest({
        url: "mine_school/getpreviewinfo",
        success: function (res) {
          if (res.code == "ERROR_STATUS_SUCCESS") {
            var jsoncontent = JSON.parse(res.jsoncontent)[0];
            var tags = jsoncontent.tag.split(";");
            var tagWelfare = tags[3].split(",");
            var parsedTags = tagWelfare;
            if (parsedTags[0] == "") {
              parsedTags.splice(0, 1);
            }
            var region = jsoncontent.workaddress.split("-");
            that.setData({
              logo: globalData.GetServerHttps() + jsoncontent.logo,
              name: jsoncontent.name,
              tel: jsoncontent.tel,
              tagWelfare: tagWelfare,
              region: region,
              introduction: jsoncontent.introduction,
              parsedTags: parsedTags,
              introduction_title: "机构简介",
              danceType: jsoncontent.dancetype,
              workType: jsoncontent.worktype,
              teacherType: jsoncontent.requireinfo,
              count: jsoncontent.hirecount,
              wagesbymonthmin: jsoncontent.wagesbymonthmin,
              wagesbymonthmax: jsoncontent.wagesbymonthmax,
              wagesbymonth: jsoncontent.wagesbymonth,
              wagesbyclassmin: jsoncontent.wagesbyclassmin,
              wagesbyclassmax: jsoncontent.wagesbyclassmax,
              wagesbyclass: jsoncontent.wagesbyclass,
              wagesfacetoface: jsoncontent.wagesfacetoface,
            });
          }
        },
        fail: function (res) {

        }
      });
    }

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
    var that = this;
    //删除socket
    // utilRequest.NetRequest({
    //   url: "index/deletesocket",
    //   success: function(res){
    //     console.log(res);
    //   },
    //   fail: function(res){

    //   }
    // })


    //退出
    utilRequest.NetRequest({
      url: "login/logout",
      success: function(res){
        //返回登录界面
        wx.redirectTo({
          url: "../login/login",
        })
      },
      fail: function(res){

      }
    })
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
    var workAddress = that.data.region[0] + "-" + that.data.region[1] + "-" + that.data.region[2];
    if(role == 0){
      utilRequest.NetRequest({
        url: "mine_teacher/publishteacherinfo",
        data:{
          tag: tag,
          workAddress: workAddress,
          introduction: that.data.introduction,
        },
        success:function(res){
          var title = "";
          if(res.code == "ERROR_STATUS_SUCCESS"){
            title = '发布成功';
          } else if (res.code == "ERROR_STATUS_PUBLISHLISTISFULL"){
            title = "发布列表已满";
          }

          if(title != ""){
            wx.showToast({
              title: title,
              icon: "none",
            })

          }
        },
        fail:function(res){

        }
      });
    }else if(role == 1){
      utilRequest.NetRequest({
        url: "mine_school/publishschoolinfo",
        data:{
          wagesbymonth: that.data.wagesbymonth ? 1 : 0,
          wagesbymonthmin: that.data.wagesbymonthmin,
          wagesbymonthmax: that.data.wagesbymonthmax,
          wagesbyclass: that.data.wagesbyclass ? 1 : 0,
          wagesbyclassmin: that.data.wagesbyclassmin,
          wagesbyclassmax: that.data.wagesbyclassmax,
          wagesfacetoface: that.data.wagesfacetoface ? 1 : 0,
          introduction: that.data.introduction,

          tag: tag,
          danceType: that.data.danceType,
          workType: that.data.workType,
          teacherType: that.data.teacherType,
          count: that.data.count,

          workAddress: workAddress,
        },
        success:function(res){
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
    }
  },

  editTag:function(e){
    var that = this;
    var tagDanceType = that.data.tagDanceType.join(",");
    var tagWorkType = that.data.tagWorkType.join(",");
    var tagTeacherType = that.data.tagTeacherType.join(",");
    var tagWelfare = that.data.tagWelfare.join(",");
    var tag = tagDanceType + ";" + tagWorkType + ";" + tagTeacherType + ";" + tagWelfare;

    wx.navigateTo({
      url: '../tag/tag?tag=' + tag,
    })
  },
  buildTagParsed: function(){
    var that = this;
    var tagDanceType = that.data.tagDanceType;
    var tagWorkType = that.data.tagWorkType;
    var tagTeacherType = that.data.tagTeacherType;
    var tagWelfare = that.data.tagWelfare;
    var parsedTags = tagDanceType.concat(tagWorkType).concat(tagTeacherType).concat(tagWelfare);

    that.setData({
      parsedTags: parsedTags,
    })
  },
  changeWorkAddress:function(e){
    var that = this;
    that.setData({
      region: e.detail.value
    });
  },
  danceTypeChange: function(e){
    var that = this;
    that.setData({
      danceType: that.data.danceTypes[e.detail.value]
    });
  },
  workTypeChange: function(e){
    var that = this;
    that.setData({
      workType: that.data.workTypes[e.detail.value]
    });
  },
  teacherTypeChange: function(e){
    var that = this;
    that.setData({
      teacherType: that.data.teacherTypes[e.detail.value]
    });
  },
  countChange: function(e){
    var that = this;
    that.setData({
      count: that.data.counts[e.detail.value]
    });
  },
  wagesbymonth: function(e){
    var that = this;
    var wagesbymonth = e.detail.value.length == 1;
    that.setData({
      wagesbymonth: wagesbymonth,
    })
  },
  wagesbyclass: function(e){
    var that = this;
    var wagesbyclass = e.detail.value.length == 1;
    
    that.setData({
      wagesbyclass: wagesbyclass,
    })
  },
  wagesfacetoface: function(e){
    var that = this;
    var wagesfacetoface = e.detail.value.length == 1;


    that.setData({
      wagesfacetoface: wagesfacetoface,
    })
  },
  wagesbymonthminchange: function(e){
    var that = this;

    that.setData({
      wagesbymonthmin: e.detail.value
    })

  },
  wagesbymonthmaxchange: function(e){
    var that = this;

    that.setData({
      wagesbymonthmax: e.detail.value
    })

  },
  wagesbyclassminchange: function(e){
    var that = this;

    that.setData({
      wagesbyclassmin: e.detail.value
    })

  },
  wagesbyclassmaxchange: function(e){
    var that = this;

    that.setData({
      wagesbyclassmax: e.detail.value
    })

  },
  chooseImage: function(e){
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var newPhotoItem = res.tempFilePaths[0];
        that.setData({
          photos: that.data.photos.concat(newPhotoItem),
        });

        var session_id = wx.getStorageSync('PHPSESSID');//本地取存储的sessionID
        var header = { 'content-type': 'application/x-www-form-urlencoded', 'Cookie': session_id };

        var url = "";
        if(that.data.role == 0){
          url = globalData.GetServerHttps() + "index.php/tdc/mine_teacher/uploadphoto";
        }else if(that.data.role == 1){
          url = globalData.GetServerHttps() + "index.php/tdc/mine_school/uploadphoto";
        }
        wx.uploadFile({
          url: url,
          filePath: newPhotoItem,
          name: newPhotoItem.substr(60,10),
          header: header,
          success(res) {
            console.log(res);
          },
          fail(res){
            console.log(res);
          }
        })
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.photos // 需要预览的图片http链接列表
    })
  }

})