
const app = getApp();
let { o2oAjax } = app;
let timer = null;
Page({
    data:{
        header:['已支付','未支付','已完成'],
        state:0,
        stateName:"已支付",
        a:{
            a:1,
            b:2
        },
        nowPage : 1,
        nowUrl : "https://www.pcclub.top/Home/Order/list_pay",
        orderData : []
    },
    onShow : function () {
        this.getList();
        this.interValGetList();
    },
    onHide : function(){
        clearInterval(timer);
    },
    changestate:function(e){
        let nowUrl = "";
        let that = this;
        if(e.currentTarget.dataset.name == "未支付"){
            nowUrl = "https://www.pcclub.top/Home/Order/list_nopay";
        }
        if(e.currentTarget.dataset.name == "已支付"){
            nowUrl = "https://www.pcclub.top/Home/Order/list_pay";
        }
        if(e.currentTarget.dataset.name == "已完成"){
            nowUrl = "https://www.pcclub.top/Home/Order/list_access";
        }
        this.setData({
            state:e.currentTarget.dataset.key,
            stateName:e.currentTarget.dataset.name,
            nowUrl : nowUrl
        });

        that.getList();

    },

    //循环发送订单列表请求
    interValGetList : function () {
        let that = this;
        clearInterval(timer);
        timer = setInterval(function () {
            if(that.data.stateName == "已支付"){
                that.getList();
            }
        }, 4000);
    },

    //获取订单列表信息
    getList :　function () {
        let that = this;
        const session = wx.getStorageSync("session_key");
        o2oAjax({
            url: "https://www.pcclub.top/Order/order_listen",
            method: "POST",
            data: {
                page : that.data.nowPage,
            },
            success: function(result) {
                that.setData({
                    orderData : result.data.list
                })
            }
        })
    },
    //上拉获取新的订单列表信息
    getAnotherList :　function () {
        o2oAjax({
            url: "https://www.pcclub.top/Order/order_listen",
            method: "POST",
            data: {
                page : that.data.nowPage,
            },
            success: (result)=> {
                this.setData({
                    orderData : this.data.orderData.concat(result.data.list)
                })
            }
        })
    },

    //进入详情订单详情页
    jumpToOrderDetail : function(e){
        var orderId =  e.currentTarget.dataset.orderid;
        var nowOrderData = this.data.orderData;
        for(var i = 0; i < nowOrderData.length; i++){
            if(nowOrderData[i].id == orderId){
                wx.setStorageSync("orderData", nowOrderData[i])
                break;
            }
        }
        wx.navigateTo({
            url: '../o2o-orderdetails/orderdetails'
        })
    }

})