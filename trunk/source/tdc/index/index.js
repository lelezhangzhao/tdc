var utilRequest = require("../util/request.js");


Page({
  data:{
    imgUrls: ["../image/main/banner_1.png", "../image/main/banner_2.png", "../image/main/banner_3.png", "../image/main/banner_4.png", "../image/main/banner_5.png"],
    indicatorDots:true,
    autoplay:true,
    circular:true,
    displayMultiipleItems:5,
    hiEvalList:[],
    hiEvalTeacher:"高评教师",
    hiEvalSchool:"高评机构",
    begin:0,

    address:null,
    address_logo: null,
    school_logo: null,
    teacher_logo: null,
  },
  onLoad:function(){
    var that = this;
    that.setData({
      address: "天河区",
      address_logo: "../image/main/address.png",
      school_logo: "../image/main/school.png",
      teacher_logo: "../image/main/teacher.png",
    })
    // wx.navigateTo({
    //   url: '../login/login',
    // })
  },
  onShow: function(){

    var that = this;
    //获取高评用户
    utilRequest.NetRequest({
      url:"index/gethighevallist",
      data:{
        begin: that.data.begin
      },
      success:function(res){
        var jsoncontent = JSON.parse(res.jsoncontent);
        for (var i = 0; i < jsoncontent.length; ++i){
          var item = jsoncontent[i];
          item.tag = item.tag.split(";");
        }
        that.setData({ hiEvalList: jsoncontent});
      },
      fail:function(res){

      }
    });
  },
  publishInfo:function(e){
    var that = this;
    var publishId = e.currentTarget.id;
    var publishObject = null;
    
    for(var i = 0; i < that.data.hiEvalList.length; ++i){
      if(that.data.hiEvalList[i].id == publishId){
        publishObject = that.data.hiEvalList[i].publishobject;
        break;
      }
    }
    if(publishObject == null){
      return;
    }
    var teacher = publishObject == 0 ? true : false;
    var school = !teacher;
    wx.navigateTo({
      url: '../info/info?teacher=' + teacher + '&school=' + school + '&publishId=' + publishId,
    })
  },
  findTeacher:function(e){
    var that = this;

    wx.navigateTo({
      url: '../searchItem/searchItem?searchtype=0',
    })
  },
  findSchool:function(e){
    var that = this;
    wx.navigateTo({
      url: '../searchItem/searchItem?searchtype=1',
    })
  },
  searchTap:function(e){
    var that = this;

    wx.navigateTo({
      url: '../search/search',
    })
  }
})