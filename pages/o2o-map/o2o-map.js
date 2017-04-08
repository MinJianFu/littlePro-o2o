/**
 * Created by Administrator on 2017/3/24.
 */
let app = getApp();

let bmap = require('../../libs/bmap-wx.min.js');
Page({
  data:{
    locaAdress:[],
    rgcData: {},
    DetailedAddress:[],
    markers:[]
  },

  onLoad:function () {
    this.positioning()

  },
  onShow:function () {
    if(app.globalData.location==''){
      wx.getLocation({
        type:'gcj02',
        success:(res)=>{
          app.globalData.location = res.longitude+ ','+res.latitude
          console.log(app.globalData.location)
        }
      })
    }
  },

  positioning:function () {
    var that = this;
    // 新建百度地图对象
    var BMap = new bmap.BMapWX({
      ak: 'VYdTAPsUgxelO7lLFoPeNjbR0348y1Np'
    });
    var fail = function(data) {
      console.log(data)
    };
    var success = function(data) {
      var  wxMarkerData = data.wxMarkerData;
      console.log(wxMarkerData)
      var a = wxMarkerData[0].address + '\n'
      var reg = /^[\u4E00-\u9FA5]+省/
      var address  = a.replace(reg,"")
      that.setData({
        rgcData: {
          address: address
        }
      });
    }
    // 发起regeocoding检索请求
    BMap.regeocoding({
      fail: fail,
      success: success,
    });
  },
  bindKeyInput: function(e) {
    var that = this;
    // 新建百度地图对象
    var BMap = new bmap.BMapWX({
      ak: 'VYdTAPsUgxelO7lLFoPeNjbR0348y1Np'
    });
    var fail = function(data) {
      console.log(data)
    };
    var success = function(data) {
      console.log(data)
      let wxMarkerData = data.wxMarkerData;

      that.setData({
        markers: wxMarkerData
      });
    }
    // 发起POI检索请求
    BMap.search({
      "query": e.detail.value,
      fail: fail,
      success: success,
    });
  },
  seleadres:function (e) {
    console.log(e)
    var markers = this.data.markers
    for(var i=0;i<markers.length;i++){
      if(markers[i].id == e.currentTarget.dataset.adid){
        wx.setStorage({
          key:"Adress",
          data:markers[i].address
        })
      }
    }
  }
})