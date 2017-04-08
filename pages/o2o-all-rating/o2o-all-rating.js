
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';
let app = getApp();
Page({
  data:{
    ratingStar:4.5,
    resultArr:[],
    ShopNews:app.globalData.ShopNews,          //店铺数据
    ratingTab:app.globalData.ratingTab         //评论数据
  },
  onLoad:function () {
  },
  showStar: function (e) {
  }
});