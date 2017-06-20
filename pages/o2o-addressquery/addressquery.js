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
        aabb:'',
        comeInType : 0,
        isEditType : 0,     
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
    onLoad: function(option) {
        var that = this;
        if(option.type){
            this.setData({
                comeInType : option.type,
                isEditType : option.edit
            })
        }

    },
    onShow:function(e){
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
        var comeInType = this.data.comeInType;
        wx.setStorageSync("addrvalue", e.currentTarget.dataset.addrvalue);
        if(this.data.comeInType == 31){
            let stData = wx.getStorageSync("beEditAddrData") || {};
                stData.address = e.currentTarget.dataset.addrvalue;
            wx.setStorageSync("beEditAddrData", stData)
            wx.redirectTo({
                url: '../o2o-changeaddress/changeaddress?type=31&edit='+ this.data.isEditType
            })
        }else{
            wx.navigateBack({
                delta: 1
            })
        }
    }

 })
