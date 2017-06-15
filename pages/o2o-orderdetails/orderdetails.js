

const app = getApp();
let { o2oAjax } = app;


Page({
    data:{
        orderData : {},
    },
    
    onShow : function(){
        let orderData = wx.getStorageSync("orderData");
        orderData.sg_name = orderData.goods_name.split("|")[0];
        orderData.sg_weight = orderData.goods_name.split("|")[1];
        this.setData({
            orderData : orderData
        })
    },
    
    onUnload:function(){
        // 页面关闭
        wx.removeStorageSync("orderData");
    },
    
    //调小程序支付接口事件
    goPayFn : function (payData) {
        wx.requestPayment({
            timeStamp : payData.timeStamp,
            nonceStr : payData.nonceStr,
            package : payData.package,
            signType : payData.signType,
            paySign : payData.paySign,
            success : (result)=>{
                let orderData = JSON.parse(JSON.stringify(his.data.orderData));
                orderData.is_pay = 2;
                this.setData({
                    orderData : orderData
                })
            },
            fail : (a, b, c)=>{
                console.log("支付失败");
            }
        })
    },
    //调后台支付接口
    goPayForBackendFn : function () {
        o2oAjax({
            url: 'https://www.pcclub.top/Home/WxPay/pay',
            method: "POST",
            data : {
                order_sn : this.data.orderData.order_sn
            },
            success: (result)=> {
                this.goPayFn(result.obj);
            }
        })
    },
    
})