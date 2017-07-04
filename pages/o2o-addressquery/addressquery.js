const bmap = require('../../bmap/bmap-wx');
const QQMapWX = require('../../qqmap/qqmap-wx-jssdk.min');
var qqmapsdk;
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
    
    //转发事件
    onShareAppMessage: function (res) {
        return {
            title: '雷霆快送',
            path: 'pages/o2o-homePage/o2o-homePage',
            success: function(res) {
                console.log('转发成功', res)
                // 转发成功
            },
            fail: function(res) {
                console.log('转发失败', res)
                // 转发失败
            }
        }
    },
    makertap: function(e) {
        var that = this;
        that.setData({
            id:e.detail.value
        })
        var BMap = new bmap.BMapWX({
            ak: 'Z7gFc5DRWLdLjNEGAKQyCtNqx5D4Hd0E'
        });
        var fail = function(data) {
            console.log(data)
        };
        var success = function(data) {
            wxMarkerData = data.wxMarkerData;
            that.setData({
                markers: wxMarkerData
            });
        }
//         // 发起POI检索请求
        BMap.search({
            location: app.globalData.location,
            "query": this.data.id,
            fail: fail,
            success: success,
        });
    },
    onLoad: function(option) {
        var that = this;
        qqmapsdk = new QQMapWX({
            key: 'QYFBZ-D7VHS-3DYOO-6MFPT-7PMYE-6WF6X'
        });
        if(option.type){
            this.setData({
                comeInType : option.type,
                isEditType : option.edit
            })
        }

    },
    onShow:function(e){

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
    },
    getLbsUseingTenc : function(e){
        qqmapsdk.getSuggestion({
            keyword: e.detail.value,
            region: app.globalData.locationCity,
            policy: 1,
            success: (res) => {
                console.log(res);
                this.setData({
                    markers : res.data
                })
            },
            fail: function(res) {
                console.log(res);
            },
            complete: function(res) {
                console.log(res);
            }
        });
    }

 })
