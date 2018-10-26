// tdc/component/briefIntroduction/briefIntroduction.js
var GlobalData = require("../../util/globaldata.js");
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    "logo":{
      type: String,
      value: "../../image/global/logo.png",
    },
    "isServerLogo":{
      type: Boolean,
      value: true,
    },

    "tags":{
      type: Array,
      value: ["拉丁","全职"],
    },

    "briefIntroduction":{
      type: String,
      value: "个人简介",
    },
    "isTeacher":{
      type: Boolean,
      value: false,
    }


  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  ready: function(){
    var that = this;
    var isServerLogo = that.properties.isServerLogo;
    if (isServerLogo){
      var logo = that.properties.logo;
      that.setData({
        logo: GlobalData.GetServerHttps() + "static/image/logo/" + logo,
      })
    }

  }
})
