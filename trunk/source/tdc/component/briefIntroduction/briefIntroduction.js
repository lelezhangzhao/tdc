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
      type: String,
      value: "拉丁,摩登;全职;;五险一金"
    },

    "parsedTags":{
      type: Array,
      value: ["拉丁", "摩登", "全职","五险一金"],
    },

    "briefIntroduction":{
      type: String,
      value: "个人简介",
    },
    "isTeacher":{
      type: Boolean,
      value: false,
    },
    "name":{
      type: String,
      value: "TDC",
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
    splitTag: function(){
      var that = this;
      var tags = that.properties.tags;
      var items = tags.split(";");
      var danceType = items[0].split(",");
      var workType = items[1].split(",");
      var teacherType = items[2].split(",");
      var welfare = items[3].split(",");
      
      var parsedTags = [];
      if (danceType[0] != ""){
        parsedTags = parsedTags.concat(danceType);
      }

      if (workType[0] != ""){
        parsedTags = parsedTags.concat(workType);
      }
      
      if (teacherType[0] != ""){
        parsedTags = parsedTags.concat(teacherType);
      }
      
      if(welfare[0] != ""){
        parsedTags = parsedTags.concat(welfare);
      }
      
      that.setData({ parsedTags: parsedTags});
    }
  },
  ready: function(){
    var that = this;

    that.splitTag();


    var isServerLogo = that.properties.isServerLogo;
    if (isServerLogo){
      var logo = that.properties.logo;
      that.setData({
        logo: GlobalData.GetServerHttps() + "static/image/logo/" + logo,
      })
    }

  }
})
