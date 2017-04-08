/**
 * Created by Administrator on 2017/3/23.
 */
Page({
  data:{
    adressText:'小区/写字楼/学校'
},
  onShow:function () {
    let that = this
    wx.getStorage({
      key: 'Adress',
      success: function(res) {
        let remarkArr
        console.log(res.data)
        remarkArr = res.data
        that.setData({
          adressText:remarkArr
        })
      }
    })
  }
})