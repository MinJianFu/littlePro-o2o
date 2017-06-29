
const app = getApp();
let { o2oAjax } = app;
let timer = null;
Page({
    data: {
        header: ['已支付', '未支付', '已完成'],
        state: 0,
        stateName: "已支付",
        a: {
            a: 1,
            b: 2
        },
        nowPage: 2,
        nowUrl: "https://www.pcclub.top/Home/Order/list_pay",
        orderData: [],
        
        screenHeight: 677,

        isLoading : 0,
        isReloading : 0,
        noMoreList : 0,
    },
    onShow: function () {
        this.getList();
        this.interValGetList();

        //设置scroll-view固定高
        
        wx.getSystemInfo({
            success: (res) => {
                this.setData({
                    screenHeight: res.windowHeight
                })
            }
        })


    },
    onHide: function () {
        clearInterval(timer);
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
    changestate: function (e) {
        let nowUrl = "";
        let that = this;
        if (e.currentTarget.dataset.name == "未支付") {
            nowUrl = "https://www.pcclub.top/Home/Order/list_nopay";
        }
        if (e.currentTarget.dataset.name == "已支付") {
            nowUrl = "https://www.pcclub.top/Home/Order/list_pay";
        }
        if (e.currentTarget.dataset.name == "已完成") {
            nowUrl = "https://www.pcclub.top/Home/Order/list_access";
        }
        this.setData({
            state: e.currentTarget.dataset.key,
            stateName: e.currentTarget.dataset.name,
            nowUrl: nowUrl
        });

        that.getList();

    },

    //循环发送订单列表请求
    interValGetList: function () {
        let that = this;
        clearInterval(timer);
        timer = setInterval(function () {
            if (that.data.stateName == "已支付") {
                that.getList();
            }
        }, 4000);
    },

    //获取订单列表信息
    getList: 　function () {
        o2oAjax({
            url: "https://www.pcclub.top/Home/Order/order_listen",
            method: "POST",
            success: (result) =>{
                this.setData({
                    orderData: result.list,
                    nowPage : 2,
                    noMoreList : 0
                })
            }
        })
    },
    //上拉获取新的订单列表信息
    getAnotherList: 　function () {
        if(this.data.isLoading == 1 || this.data.noMoreList == 1 || this.data.isReloading == 1){
            return;
        }
        this.setData({
            isLoading : 1,
        })
        o2oAjax({
            url: "https://www.pcclub.top/Home/Order/order_list",
            method: "POST",
            data: {
                page: this.data.nowPage,
            },
            success: (result) => {
                clearInterval(timer);
                let isLast = result.list.length == 0 ? 1 : 0;
                this.setData({
                    orderData: this.data.orderData.concat(result.list),
                    nowPage : this.data.nowPage + 1,
                    noMoreList : isLast
                })
            },
            complete: (a, b, c) =>{
                this.setData({
                    isLoading : 0
                })
            }
        })
    },

    //下拉刷新
    reFecthOrderList : function(){
        
        if(this.data.isLoading == 1 || this.data.isReloading == 1){
            return;
        }
        this.setData({
            isReloading : 1,
        })
        o2oAjax({
            url: "https://www.pcclub.top/Home/Order/order_listen",
            method: "POST",
            success: (result) =>{
                this.setData({
                    orderData: result.list,
                    nowPage : 2,
                    noMoreList : 0,
                    isReloading : 0,
                })
            }
        })
    },

    //进入详情订单详情页
    jumpToOrderDetail: function (e) {
        var orderId = e.currentTarget.dataset.orderid;
        var nowOrderData = this.data.orderData;
        for (var i = 0; i < nowOrderData.length; i++) {
            if (nowOrderData[i].id == orderId) {
                wx.setStorageSync("orderData", nowOrderData[i])
                break;
            }
        }
        wx.navigateTo({
            url: '../o2o-orderdetails/orderdetails'
        })
    }

})