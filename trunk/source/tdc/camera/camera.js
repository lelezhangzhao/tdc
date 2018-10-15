//index.js
//获取应用实例
let app = getApp();
var utilUploadFile = require("../util/upload.js");
Page({
  data: {
    device: true,
    tempImagePath: "", // 拍照的临时图片地址
    camera: false,
    ctx: {},
  },
  onLoad(options) {

    this.setData({
      ctx: wx.createCameraContext(),
      camera: true,
    })
  },
  // 切换相机前后置摄像头
  devicePosition() {
    this.setData({
      device: !this.data.device,
    })
    console.log("当前相机摄像头为:", this.data.device ? "后置" : "前置");
  },
  camera() {
    let { ctx } = this.data;
    // 拍照
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
        // .then(d => {
        //   console.log(d);
        // })
        // .catch(e => {
        //   console.log(e);
        // })
      },
      fail: (e) => {
        console.log(e);
      }
    });
  },
  // 打开模拟的相机界面
  open(e) {
    console.log("开启相机准备", "拍照");
    this.setData({
      camera: true,
    })
  },
  // 关闭模拟的相机界面
  close: function () {
    console.log("关闭相机");
    this.setData({
      camera: false
    })
  },
  confirm:function(e){
    var that = this;
    //上传头像
    var url = null;
    if(app.globalData.role == 0){
      url = "mine_teacher/fixteacherlogo";
    }else if(app.globalData.role == 1){
      url = "mine_school/fixschoollogo";
    }
    utilUploadFile.uploadFile(url, that.data.tempImagePath, "upload");
    
  },
  rephoto:function(e){
    //重拍
    var that = this;
    that.open();
  }
})
