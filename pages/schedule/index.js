//index.js
//获取应用实例
let app = getApp();
Page({
	data: {
		motto: 'Hello World',
		userInfo: {},
		swiperData : {
            imgUrls: ['http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'],
            indicatorDots: false,
            autoplay: false,
            interval: 5000,
            duration: 1000
        },
        swiperHeight : 150
	},
	//事件处理函数
	bindViewTap: function() {
		wx.navigateTo({
			url: '../logs/logs'
		})
	},

	onLoad: function(e) {
		console.log('onLoad');
		let that = this;
		//调用应用实例的方法获取全局数据
		app.getUserInfo(function(userInfo) {
			//更新数据
			that.setData({
				userInfo: userInfo
			})
		});
		wx.setNavigationBarTitle({
			title: '团餐预定'
		})
	},

	//初始化首页轮播图
    swipeInit : function(e) {

        wx.getSystemInfo({
            success:  (res) => {
                console.log(res)
                let width = e.detail.width,
                    height = e.detail.height,
                    ratio = height/width,
                    ufHeight = res.windowWidth*ratio;
                this.setData({
                    swiperHeight : ufHeight
                })

            }
        })



    }

});