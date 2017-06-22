// pages/o2o-homePage/o2o-homePage.js

const app = getApp();
let { o2oAjax } = app;

Page({
    data: {
        swiperOff: true,
        swiperHight: 0,
        swiperInfo: {

            itemUrls: [
                "img/LB1.jpg",
                "img/LB2.jpg",
                "img/LB3.jpg"
            ]
        },
        salerList: [],

        search_text: ["木桶饭", "肯德基", "麦当劳", "啤酒", "香烟", "杜蕾斯"],


    },
    //设置swiper的高度
    swiperonLoad: function (e) {
        wx.getSystemInfo({
            success:(res) => {
                if(this.data.swiperOff){
                    let swiperImageW = e.detail.width,
                        swiperImageH = e.detail.height,
                        swiperImageT = swiperImageW/swiperImageH,
                        swiperH = res.windowWidth/swiperImageT;
                    this.setData({
                        swiperOff:false,
                        swiperHight:swiperH
                    })
                }
            }
        })

    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        //   document.getElementById('search-text').onkeyup = function(e){
        //     console.log(1);
        //   }
        this.getSalerList();


    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    },
    getSalerList: function () {     //获取商家列表信息
        let newSalerData = JSON.parse(JSON.stringify(this.data.salerList));
        o2oAjax({
            url: 'https://www.pcclub.top/Home/Seller/sellerList',
            method: "POST",
            success: result => {
                newSalerData = newSalerData.concat(result.list);
                this.setData({
                    salerList: newSalerData
                })
            }
        })
    }

})