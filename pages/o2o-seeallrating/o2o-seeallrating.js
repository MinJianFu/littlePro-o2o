/**
 * Created by Administrator on 2017/3/21.
 */
let app = getApp();

let showStar = require('../star/star.js')

Page({
  data:{
    foodrating:app.globalData.foodrating,    //评论内容数据
    ratingTab:app.globalData.ratingTab,      //选择选中的数据
    nowSeleRatingDataId:1
  },
  seleRating: function (e) {
    let ratingStar = this.data.foodrating
    let result = []
    this.setData({
      nowSeleRatingDataId:e.currentTarget.dataset.ratingid,
    })
  }
})