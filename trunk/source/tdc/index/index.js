Page({
  data:{
    imgUrls: ["../image/1.png", "../image/2.png", "../image/3.png"],
    indicatorDots:true,
    autoplay:true,
    circular:true,
    displayMultiipleItems:3,
    hiEvalList:[],
    hiEvalTeacher:"高评教师",
    hiEvalSchool:"高评机构"
  },
  onShow: function(){
    //获取高评用户
    wx.request({
      url:"https://localtdc.com/index.php/index/index/GetHighEvalList",
      success:function(res){
        res = JSON.parse(res);
        for(var i = 0; i < res.length; ++i){
          var item = res[i];
          item.tag = item.tag.split(";");
        }
        this.setData(hiEvalList, res);
      },
      fail:function(res){

      }
    });
  }
})