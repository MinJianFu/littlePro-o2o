/**
 * Created by Administrator on 2017/3/15.
 */

let app = getApp();
Page({
  data:{
    remarksB:app.globalData.remarksB,   //备注信息数据
    remarkArr:[],     //选好的数据
    Value:''    //写好的备注的数据
  },
  //    选好的数据方法
  seleRema:function (e) {
    let remark = this.data.remarksB
    let remarkArr = this.data.remarkArr
    for(let i =0; i < remark.length;i++){
      if(e.target.dataset.rema == remark[i].remaId) {
        if(remark[i].isSle){   
          remark[i].isSle = 0
          for(let j = 0;j<remarkArr.length;j++){
            if(remarkArr[j] == e.target.dataset.content){
              remarkArr.splice(j,1)
            }
            break
          }
          this.setData({
            remarksB:remark
          })
        }else{
          remark[i].isSle = 1
          this.setData({
            remarksB:remark
          })
          remarkArr.push(remark[i].remarksBname)
        }
        }
        wx.setStorage({
          key:"make",
          data:remarkArr
        })
      }
    },
  //写好的备注的方法
  bindTextAreaBlur:function (e) {
    let value = e.detail.value
    wx.setStorage({
      key:"Value",
      data:value
    })
  }
});