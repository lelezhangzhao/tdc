// tdc/component/chat/chat.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name:{
      type: String,
    },
    content:{
      type: String,
    },
    hasNewMsg:{
      type: Boolean,
      default: false,
    },
    otherLogo:{
      type: String,
      default: '',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    newtag_label: "New",
    newtag_image: "../../image/chat/newtag_image.png",
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
