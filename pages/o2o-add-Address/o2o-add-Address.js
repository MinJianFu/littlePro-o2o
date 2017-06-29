/**
 * Created by Administrator on 2017/3/23.
 */
Page({
	data: {
		adressText: '小区/写字楼/学校'
	},
	onShow: function () {
		let that = this
		wx.getStorage({
			key: 'Adress',
			success: function (res) {
				let remarkArr
				console.log(res.data)
				remarkArr = res.data
				that.setData({
					adressText: remarkArr
				})
			}
		})
	},
	
    //转发事件
    onShareAppMessage: function (res) {
        return {
            title: '雷霆快送',
            path: '/page/o2o-homePage/o2o-homePage',
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
})