const bmap = require('../../bmap/bmap-wx');
const qqmap = require('../../qqmap/qqmap-wx-jssdk.min');
const app = getApp();
var wxMarkerData = [];
Page({
    data: {
        markers: [],
        latitude: '',
        longitude: '',
        placeData: {},
        id:'',
        aabb:''
    },
    makertap: function(e) {
        var that = this;
        that.setData({
            id:e.detail.value
        })
        // var id = e.markerId;
        // that.showSearchInfo(wxMarkerData, id);
        // that.changeMarkerColor(wxMarkerData, id);
        var BMap = new bmap.BMapWX({
            ak: 'Z7gFc5DRWLdLjNEGAKQyCtNqx5D4Hd0E'
        });
        var fail = function(data) {
            console.log(data)
        };
        var success = function(data) {
            console.log(data);
            wxMarkerData = data.wxMarkerData;
            that.setData({
                markers: wxMarkerData
            });
//             // that.setData({
//             //     latitude: wxMarkerData[0].latitude
//             // });
//             // that.setData({
//             //     longitude: wxMarkerData[0].longitude
//             // });
        }
//         // 发起POI检索请求
        BMap.search({
            location:app.globalData.location,
            "query": this.data.id,
            fail: fail,
            success: success,
//             // 此处需要在相应路径放置图片文件
//             iconPath: '../../img/marker_red.png',
//             // 此处需要在相应路径放置图片文件
//             iconTapPath: '../../img/marker_red.png'
        });
    },
    onLoad: function() {
        var that = this;
        // 新建百度地图对象

    },
    onShow:function(){
        console.log(app.globalData.location);
        if(app.globalData.location == ''){
            wx.getLocation({
                type:'gcj02',
                success:(res)=>{
                    app.globalData.location = res.latitude+','+res.longitude
                    console.log(app.globalData.location);
                }
            })
        }
    }
//     // showSearchInfo: function(data, i) {
//     //     var that = this;
//     //     that.setData({
//     //         placeData: {
//     //             title: '名称：' + data[i].title + '\n',
//     //             address: '地址：' + data[i].address + '\n',
//     //             telephone: '电话：' + data[i].telephone
//     //         }
//     //     });
//     // },
//     // changeMarkerColor: function(data, i) {
//     //     var that = this;
//     //     var markers = [];
//     //     for (var j = 0; j < data.length; j++) {
//     //         if (j == i) {
//     //             // 此处需要在相应路径放置图片文件
//     //             data[j].iconPath = "../../img/marker_yellow.png";
//     //         } else {
//     //             // 此处需要在相应路径放置图片文件
//     //             data[j].iconPath = "../../img/marker_red.png";
//     //         }
//     //         markers[j](data[j]);
//     //     }
//     //     that.setData({
//     //         markers: markers
//     //     });
//     // }
 })
// Page({
//     data:{
//         id:'',
//         markers:[]
//     },
//     bbb:function (e) {
//         this.setData({
//             id:e.detail.value
//         })
//         // 实例划API核心类
//         var demo = new qqmap({
//             key: 'LAQBZ-EYJRO-NIQWX-SAEAI-PMIGO-5YBTZ' // 必填
//         });
//
// // 调用接口
//         demo.search({
//             keyword: this.data.id,
//             location:app.globalData.location || {},
//             success: (res)=> {
//                 console.log(res);
//                 this.setData({
//                     markers:res.data
//                 })
//             },
//             fail: function(res) {
//                  console.log(res);
//             },
//             complete: function(res) {
//                 // console.log(res);
//             }
//         });
//     },
//     onLoad: function() {
//         if(app.globalData.location=={}){
//             wx.getLocation({
//                 type:'gcj02',
//                 success:(res)=>{
//                     let that= this
//                     let location ={
//                         latitude: that.res.latitude,
//                         longitude: that.res.longitude
//                     }
//                     app.globalData.location = location
//                 }
//             })
//         }
//     },
//     onShow:function(){
//         console.log(app.globalData.location);
//         if(app.globalData.location == ''){
//             wx.getLocation({
//                 type:'gcj02',
//                 success:(res)=>{
//                     let that= this
//                     let location ={
//                         latitude: res.latitude,
//                         longitude:res.longitude
//                     }
//                     app.globalData.location = location
//                     console.log(app.globalData.location);
//                 }
//             })
//         }
//     }
// })

// Page({
//     data: {
//         sugData: ''
//     },
//     // 绑定input输入
//     bindKeyInput: function(e) {
//         var that = this;
//         // 新建百度地图对象
//         var BMap = new bmap.BMapWX({
//             ak: 'Z7gFc5DRWLdLjNEGAKQyCtNqx5D4Hd0E'
//         });
//         var fail = function(data) {
//             console.log(data)
//         };
//         var success = function(data) {
//             var sugData = '';
//             for(var i = 0; i < data.result.length; i++) {
//                 sugData = sugData + data.result[i].name + '\n';
//             }
//             that.setData({
//                 sugData: sugData
//             });
//             console.log(data);
//         }
//         // 发起suggestion检索请求
//         BMap.suggestion({
//             query: e.detail.value,
//             region: '广州',
//             city_limit: true,
//             fail: fail,
//             success: success
//         });
//     },
//
//     onLoad:function(options){
//         // 页面初始化 options为页面跳转所带来的参数
//
//
//     },
//     onReady:function(){
//         // 页面渲染完成
//     },
//     onShow:function(){
//         // 页面显示
//     },
//     onHide:function(){
//         // 页面隐藏
//     },
//     onUnload:function(){
//         // 页面关闭
//     }
// })