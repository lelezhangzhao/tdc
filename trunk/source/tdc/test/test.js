//index.js
//获取应用实例
let app = getApp();
Page({
  data: {
    device: true,
    tempImagePath: "", // 拍照的临时图片地址
    tempThumbPath: "", // 录制视频的临时缩略图地址
    tempVideoPath: "", // 录制视频的临时视频地址
    camera: false,
    ctx: {},
    type: "takePhoto",
    startRecord: false,
    time: 0,
    timeLoop: "",
  },
  onLoad() {
    this.setData({
      ctx: wx.createCameraContext()
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
          wechat.uploadFile("https://xx.xxxxxx.cn/api/upload", res.tempImagePath, "upload")
            .then(d => {
              console.log(d);
            })
            .catch(e => {
              console.log(e);
            })
        },
        fail: (e) => {
          console.log(e);
        }
      })
    }
  },
  // 打开模拟的相机界面
  openPhoto(e) {
    let { type } = e.target.dataset;
    console.log("开启相机准备", type == "takePhoto" ? "拍照" : "录视频");
    this.setData({
      camera: true,
      type
    })
  },
  // 关闭模拟的相机界面
  close:function() {
    console.log("关闭相机");
    this.setData({
      camera: false
    })
  }
})
