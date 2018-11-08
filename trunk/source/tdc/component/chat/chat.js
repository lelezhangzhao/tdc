// tdc/component/chat/chat.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name:{
      type: String,
    },
    newtag_image:{
      type: String,
      default: "../../image/chat/newtag_image.png"
    },
    content:{
      type: String,
    },
    newtag_label:{
      type:String,
      default: "new",
    },
    hasNewMsg:{
      type: Boolean,
      default: false,
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

  }
})
