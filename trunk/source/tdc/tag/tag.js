// tdc/tag/tag.js\
var app = getApp();
var utilRequest = require("../util/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tagDanceType:[][2],
    // tagWorkType:[][2],
    // tagTeacherType:[][2],
    // tagWelfare:[][2],
    tag:{},
    role:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var role = app.globalData.role;
    var tag = {};
    that.setData({ role: role });
    utilRequest.NetRequest({
      url: "global_data/gettag",
      success: function (res) {
        if (res.code == "ERROR_STATUS_SUCCESS") {
          var jsoncontent = JSON.parse(res.jsoncontent)[0];
          var tagDanceTypeArr = jsoncontent.dancetype.split(",");
          var tagWorkTypeArr = jsoncontent.worktype.split(",");
          var tagTeacherTypeArr = jsoncontent.teachertype.split(",");
          var tagWelfareArr = jsoncontent.welfare.split(",");

          var danceTypeArr = [];
          var workTypeArr = [];
          var teacherTypeArr = [];
          var welfareArr = [];

          for(var i = 0; i < tagDanceTypeArr.length; ++i){
            var danceType = {};
            danceType["item"] = tagDanceTypeArr[i];
            danceType["hasItem"] = that.isContains(options.tag, tagDanceTypeArr[i]);
            danceTypeArr.push(danceType);
          }

          for(var i = 0; i < tagWorkTypeArr.length; ++i){
            var workType = {};
            workType["item"] = tagWorkTypeArr[i];
            workType["hasItem"] = that.isContains(options.tag, tagWorkTypeArr[i]);
            workTypeArr.push(workType);
          }

          for(var i = 0; i < tagTeacherTypeArr.length; ++i){
            var teacherType = {};
            teacherType["item"] = tagTeacherTypeArr[i];
            teacherType["hasItem"] = that.isContains(options.tag, tagTeacherTypeArr[i]);
            teacherTypeArr.push(teacherType);
          }
          
          for(var i = 0; i < tagWelfareArr.length; ++i){
            var welfare = {};
            welfare["item"] = tagWelfareArr[i];
            welfare["hasItem"] = that.isContains(options.tag, tagWelfareArr[i]);
            welfareArr.push(welfare);
          }

          tag["danceType"] = danceTypeArr;
          tag["workType"] = workTypeArr;
          tag["teacherType"] = teacherTypeArr;
          tag["welfare"] = welfareArr;

          that.setData({
            tag: tag,
          });

        }
      },
      fail: function (res) {

      }
    });

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
  isContains: function(str, substr){
    return new RegExp(substr).test(str);
  }, 
  confirm:function(e){
    
    var that = this;
    var tag = that.data.tag;

    var tagDanceType = "";
    var tagWorkType = "";
    var tagTeacherType = "";
    var tagWelfare = "";

    for(var i = 0; i < tag.danceType.length; ++i){
        if(tag.danceType[i].hasItem){
          if (tagDanceType == ""){
            tagDanceType = tag.danceType[i].item;
          }else{
            tagDanceType = tagDanceType + "," + tag.danceType[i].item;
          }
        }
    }

    for(var i = 0; i < tag.workType.length; ++i){
      if(tag.workType[i].hasItem){
        if (tagWorkType == ""){
          tagWorkType = tag.workType[i].item;
        }else{
          tagWorkType = tagWorkType + "," + tag.workType[i].item;
        }
      }
    }

    for(var i = 0; i < tag.teacherType.length; ++i){
      if(tag.teacherType[i].hasItem){
        if (tagTeacherType == ""){
          tagTeacherType = tag.teacherType[i].item;
        }else{
          tagTeacherType = tagTeacherType + "," + tag.teacherType[i].item;
        }
      }
    }

    for(var i = 0; i < tag.welfare.length; ++i){
      if(tag.welfare[i].hasItem){
        if(tagWelfare == ""){
          tagWelfare = tag.welfare[i].item;
        }else{
          tagWelfare = tagWelfare + "," + tag.welfare[i].item;
        }
      }
    }
    
    var serverTag = tagDanceType + ";" + tagWorkType + ";" + tagTeacherType + ";" + tagWelfare;

    var url = "";
    if(that.data.role == 0){
      url = "mine_teacher/editteachertag";
    }else if(that.data.role == 1){
      url = "mine_school/editschooltag";
    }

    utilRequest.NetRequest({
      url: url,
      data:{
        tag: serverTag,
      },
      success:function(res){
        console.log(res);
        
        if(res.code == "ERROR_STATUS_SUCCESS"){
        }
      },
      fail:function(res){

      }
    })
  },
  danceTypeChange:function(e){
    var that = this;
    var value = e.detail.value;
    var danceType = that.data.tag.danceType;

    for (var i = 0; i < danceType.length; ++i){
      danceType[i].hasItem = false;
      for(var j = 0; j < value.length; ++j){
        if(danceType[i].item == value[j]){
          danceType[i].hasItem = true;
        }
      }
    }

    that.data.tag.danceType = danceType;

    that.setData({tag: that.data.tag});
  },
  workTypeChange: function(e){
    var that = this;
    var value = e.detail.value;
    var workType = that.data.tag.workType;

    for(var i = 0; i < workType.length; ++i){
      workType[i].hasItem = false;
      for(var j = 0; j < value.length; ++j){
        if(workType[i].item == value[j]){
          workType[i].hasItem = true;
        }
      }
    }
    that.data.tag.workType = workType;
    that.setData({tag: that.data.tag});
  },
  teacherTypeChange: function(e){
    var that = this;
    var value = e.detail.value;
    var teacherType = that.data.tag.teacherType;

    for(var i = 0; i < teacherType.length; ++i){
      teacherType[i].hasItem = false;
      for(var j = 0; j < value.length; ++j){
        if(teacherType[i].item == value[j]){
          teacherType[i].hasItem = true;
        }
      }
    }
    that.data.tag.teacherType = teacherType;
    that.setData({tag: that.data.tag});
  },
  welfareChange: function(e){
    var that = thsi;
    var value = e.detail.value;
    var welfare = that.data.tag.welfare;

    for(var i = 0; i < welfare.length; ++i){
      welfare[i].hasItem = false;
      for(var j = 0; j < value.length; ++j){
        if(welfare[i].item == value[j]){
          welfare[i].hasItem = true;
        }
      }
    }

    that.data.tag.welfae = welfare;
    that.setData({tag: that.data.tag});
  }
})