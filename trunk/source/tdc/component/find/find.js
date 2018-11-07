// tdc/component/find/find.js
var globalData = require("../../util/globaldata.js");
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String
    },

    content: {
      type: String
    },

    logo_photo: {
      type: String,
      default: "../../image/global/user_logo.png",
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

    serverHttps: globalData.GetServerHttps(),

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
