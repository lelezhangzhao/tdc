// tdc/fixTeacherInfo/fixTeacherInfo.js
var utilRequest = require("../util/request.js");
var app = getApp();

var Server = "https://localtdc.com/"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logo:null,
    name:null,
    nickName:null,
    tel:null,
    sex:null,
    birthday:null,
    region: ["广东省", "广州市", "天河区"],

    camera:false,
    tempImagePath:null,

    fixItem:false,
    caption:null,
    value:null,
    /*fixItemType
    1 teachername
    2 teachernickname
    3 teachertel
    4 schoolname
    5 schoolnickname
    6 schooltel
    */
    fixItemType:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(app.globalData.role == 0){
      utilRequest.NetRequest({
        url: "mine_teacher/getmineteacherinfo",
        success: function (res) {
          if(res.code == "ERROR_STATUS_SUCCESS"){
            var jsoncontent = JSON.parse(res.jsoncontent)[0];
            var ServerLogo = Server + jsoncontent.logo;
            that.setData({ logo: ServerLogo });
            that.setData({ name: jsoncontent.name });
            that.setData({ nickName: jsoncontent.nickname });
            that.setData({ tel: jsoncontent.tel });
            that.setData({ sex: jsoncontent.sex == 0 ? "男" : "女"});
            that.setData({ birthday: jsoncontent.birthday });
            var address = jsoncontent.address;
            var addressArr = address.split("-");
            that.setData({ region: addressArr });
          }
        },
        fail: function (res) {

        }
      });
    }else if(app.globalData.role == 1){
      utilRequest.NetRequest({
        url:"mine_school/getschoolinfo",
        success:function(res){
          var jsoncontent = JSON.parse(res.jsoncontent);
          
        },
        fail:function(res){

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
  // 切换相机前后置摄像头
  devicePosition() {
    this.setData({
      device: !this.data.device,
    })
    console.log("当前相机摄像头为:", this.data.device ? "后置" : "前置");
  },
  camera() {
    let { ctx, type, startRecord } = this.data;
    // 拍照
    if (type == "takePhoto") {
      console.log("拍照");
      ctx.takePhoto({
        quality: "normal",
        success: (res) => {
          // console.log(res);
          this.setData({
            tempImagePath: res.tempImagePath,
            camera: false,
          });
          // wechat.uploadFile("https://xx.xxxxxx.cn/api/upload", res.tempImagePath, "upload")
          //   .then(d => {
          //     console.log(d);
          //   })
          //   .catch(e => {
          //     console.log(e);
          //   })
        },
        fail: (e) => {
          console.log(e);
        }
      })
    }
  },
  fixLogo:function(e){
    var that = this;
    wx.showActionSheet({
      itemList: ["拍摄","相册"],
      success:function(res){
        if(!res.cancel){
          if(res.tapIndex == 0){
            wx.navigateTo({
              url: '../camera/camera',
            });
          }else if(res.tapIndex == 1){

          }
        }
      }
    });
  },
  fixName:function(e){
    var that = this;
    var fixItemType = 0;
    if(app.globalData.role == 0){
      fixItemType = 1;
    }else if(app.globalData.role == 1){
      fixItemType = 4;
    }

    that.setData({ fixItemType: fixItemType});
    that.fixItem();

  },
  fixNickName:function(e){
    var that = this;
    var fixItemType = 0;
    if (app.globalData.role == 0) {
      fixItemType = 2;
    } else if (app.globalData.role == 1) {
      fixItemType = 5;
    }

    that.setData({ fixItemType: fixItemType });
    that.fixItem();
  },
  fixTel:function(e){
    var that = this;
    var fixItemType = 0;
    if (app.globalData.role == 0) {
      fixItemType = 3;
    } else if (app.globalData.role == 1) {
      fixItemType = 6;
    }
    that.setData({ fixItemType: fixItemType });
    that.fixItem();
  },
  fixSex:function(e){
    var that = this;
    wx.showActionSheet({
      itemList: ["男", "女"],
      success:function(res){
        if(!res.cancel){
          if(res.tapIndex == 0){
            that.setData({ sex: "男"})
          }else if(res.tapIndex == 1){
            that.setData({ sex: "女" })
          }
          utilRequest.NetRequest({
            url: "mine_teacher/fixteachersex?sex=" + res.tapIndex,
            success:function(res){

            },
            fail:function(res){

            }
          });
        }
      },
      fail:function(res){

      }
    });
  },
  fixBirthday:function(e){
    var that = this;
    that.setData({birthday: e.detail.value});
    console.log(e.detail.value);
    utilRequest.NetRequest({
      url:"mine_teacher/fixteacherbirthday?birthday=" + that.data.birthday,
      success:function(res){
        console.log(res);
      },
      fail:function(res){

      }
    });
  },
  fixAddress:function(e){
    var that = this;
    that.setData({
      region: e.detail.value
    });

    var address = that.data.region[0] + "-" + that.data.region[1] + "-" + that.data.region[2];
    utilRequest.NetRequest({
      url: "mine_teacher/fixteacheraddress?address=" + address,
      success:function(res){
      },
      fail:function(res){

      }

    })

  },
  fixItem:function(param){
    var that = this;

    switch(that.data.fixItemType){
      case 1:
      case 4:      
        that.setData({
          caption: "修改姓名",
          value: that.data.name
          });
      break;
      case 2:
      case 5:
        that.setData({ 
          caption: "修改昵称",
          value: that.data.nickName 
          });
      break;
      case 3:
      case 6:
        that.setData({ 
          caption: "修改电话",
          value: that.data.tel 
          });
      break;

    }
    
    that.setData({ fixItem: true});

  },
  fixValue: function (e) {
    var that = this;
    switch(that.data.fixItemType){
      case 1:
      case 4:
      that.setData({name: e.detail.value});
      break;
      case 2:
      case 5:
      that.setData({nickName: e.detail.value});
      break;
      case 3:
      case 6:
      that.setData({tel: e.detail.value});
      break;
    }
  },
  save: function (e) {
    var that = this;
    var url = null;
    switch(that.data.fixItemType){
      case 1:
        url = "mine_teacher/fixteachername?name=" + that.data.name;
      break;
      case 2:
        url = "mine_teacher/fixteachernickname?nickname=" + that.data.nickName;
      break;
      case 3:
        url = "mine_teacher/fixteachertel?tel=" + that.data.tel;
      break;
      case 4:
        url = "mine_school/fixschoolname?name=" + that.data.name;
      break;
      case 5:
        url = "mine_school/fixschoolnickname?nickname=" + that.data.nickName;
      break;
      case 6:
        url = "mine_school/fixschooltel?tel=" + that.data.tel;
      break;
    }
    utilRequest.NetRequest({
      url:url,
      success:function(res){
        console.log(res);
      },
      fail:function(res){

      }
    });

    that.setData({
      fixItem: false,
      fixItemType: 0,
      });
  }

})