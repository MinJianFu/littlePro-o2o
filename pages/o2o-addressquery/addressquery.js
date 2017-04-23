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
    },
    tapLocationFn : function (e) {
        wx.setStorage({
            key : "addrvalue",
            data : e.currentTarget.dataset.addrvalue
        })
        wx.navigateBack({
            delta: 1
        })
    }

 })
