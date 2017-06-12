const date = new Date();

let app = getApp();

Page({
	data: {
		shopNews: wx.getStorageSync("shopData"),//店铺信息数据
		foodsData: [],
		onlinepay: 10, //在线减免的价格
		deliever_price: parseInt(wx.getStorageSync("shopData").deliever_price),   //配送费
		shopGoodsAddress: null,  //配送地址信息
		time: [],    //显示时间状态
		song_index: 0,   //显示时间状态
		onlineArr: ['微信支付'],    //显示支付方式状态
		online_index: 0,   //显示支付方式状态
		superaddition: [],   //获取选中商品信息
		mare: '口味、编好等',    //选备注状态
		Value: '',   //写备注状态
		redbad: '10',   //红包
		catmoney: '0'
	},

	onLoad: function (e) {
		console.log(app.globalData.foodsData)
		let that = this
		that.ready_time()   //显示选择时间方法
	},
	onShow: function (e) {
		let that = this
		that.setData({
			foodsData: wx.getStorageSync("foodsData"),
			shopGoodsAddress: wx.getStorageSync("shopGoodsAddress")
		})
		that.addmark()    //选择的备注
		that.SetAllmoney()
		that.addValue()   //写备注的value
	},
	addmark: function (e) {
		let that = this
		wx.getStorage({
			key: 'make',
			success: function (res) {
				let remarkArr
				console.log(res.data)
				remarkArr = res.data
				that.setData({
					mare: remarkArr
				})
			}
		})
	},
	addValue: function (e) {
		let that = this
		wx.getStorage({
			key: 'Value',
			success: function (res) {
				let remarkArr
				remarkArr = res.data
				that.setData({
					Value: remarkArr
				})
			}
		})
	},
	//选择时间方法
	ready_time: function () {
		let hour = date.getHours()
		let sele_time = ['尽快送达']
		for (hour; hour < 25; hour++) {
			sele_time.push(hour)
		}
		this.setData({
			time: sele_time
		})
	},
	bindTimeChange: function (e) {
		this.setData({
			song_index: e.detail.value
		})
	},
	bindPickerChange: function (e) {
		this.setData({
			index: e.detail.value
		})
	},
	SetAllmoney: function (e) {
		let foods = this.data.foodsData
		let catmoney = 0
		for (let i = 0; i < foods.length; i++) {
			if (foods[i].foodsCount > 0) {
				catmoney = catmoney + (foods[i].foodsCount * foods[i].price)
			}
		}
		this.setData({
			catmoney: catmoney,
		})
	}
});