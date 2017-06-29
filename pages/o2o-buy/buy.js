
const app = getApp();
let { o2oAjax, WeToast, alertBox } = app;

Page({
    data:{
        peiS_time:[],
        PS_index:0,
        XiaoFei:['0元','1元','2元','3元','4元','5元'],
        XF_index:0,
        PS_price:12,
        goodsval:'',
        addrObj : null,
        rmark:"",
        good_pcier:"",
        orderData : null,

        amountHideBoxStatus : 0,    //是否显示运费说明弹窗
    },
    //获取配送时间
    ReadyPS_time:function(){
        let date = new Date(),
            Hours = date.getHours()+1,
            timearr = ['立即配送'];
        for(Hours;Hours<25;Hours++){
            timearr.push(Hours+':00');
        }
        this.setData({
            peiS_time:timearr
        })
    },
    
    //提交订单事件
    place_order:function () {
        
    },
    //修改备注
    change_rmark : function (e) {
        this.setData({
            rmark : e.detail.value
        })
    },
    //修改商品费用
    change_good_pcier : function (e) {
        this.setData({
            good_pcier : e.detail.value
        })
    },

    //弹出配送费说明弹窗
    showAlert : function(e){
        alertBox().alert({
            title : '配送费说明',
            text : '配送费为市区基础配送价格，若需配送城镇或跨区远距离配送请和骑手咨询'
        })
    },

    //配送时间、代金券、小费的change事件
    PS_change:function(e){
        this.setData({
            [e.currentTarget.dataset.key]:e.detail.value-0
        })
    },
    onLoad:function(options){
        // 页面初始化 options为页面跳转所带来的参数
        this.ReadyPS_time();
        if(options.goodsval){
            this.setData({
                goodsval:options.goodsval
            })
        }
        this.getFreight();
    },
    onReady:function(){
        // 页面渲染完成

    },
    onShow:function(){
        // 页面显示
        this.getDefaultAddress();
    },
    onHide:function(){
        // 页面隐藏
    },
    onUnload:function(){
        // 页面关闭
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
    //获取配送费接口
    getFreight : function(){
        o2oAjax({
            url: 'https://www.pcclub.top/Home/Order/getPrice',
            method: "POST",
            data : {
                type : 2
            },
            success : (result)=>{
                this.setData({
                    PS_price : parseFloat(result.obj.price)
                })
            }
        })
    },
    
    //修改商品内容文字事件
    changeGoodDetail : function (e) {
        this.setData({
            goodsval : e.detail.value
        })
    },
    
    //拿默认地址
    getDefaultAddress : function () {
        var nowLocalAddr = wx.getStorageSync('nowLocalAddr');
        if(nowLocalAddr){
            this.setData({
                addrObj : nowLocalAddr
            })
        }else{
            o2oAjax({
                url: 'https://www.pcclub.top/Home/Address/getDefaultList', //仅为示例，并非真实的接口地址
                method: "POST",
                success: result=>{
                    console.log(result);
                    this.setData({
                        addrObj : result.obj
                    })
                }
            })
        }
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
                let orderData = this.data.orderData;
                orderData.is_pay = 2;
                wx.setStorageSync("orderData", orderData);
                wx.redirectTo({
                    url: '../o2o-orderdetails/orderdetails'
                })
            },
            fail : (a, b, c)=>{
                console.log("支付失败");
                let orderData = this.data.orderData;
                orderData.is_pay = 1;
                wx.setStorageSync("orderData", orderData);
                wx.redirectTo({
                    url: '../o2o-orderdetails/orderdetails'
                })
            }
        })
    },
    //调后台支付接口
    goPayForBackendFn : function (order_sn) {
        o2oAjax({
            url: 'https://www.pcclub.top/Home/WxPay/pay',
            method: "POST",
            data : {
                order_sn : order_sn
            },
            success: (result)=> {
                this.goPayFn(result.obj);
                
            }
        })
    },
    
    //下单按钮s事件
    goOrderFn : function (e) {
        console.log(e.detail )
        if(!!!this.data.addrObj){
            WeToast().toast({
                title: '请选择地址',
                duration: 1500
            })
            return;
        }
        o2oAjax({
            url: 'https://www.pcclub.top/Home/Order/index',
            method: "POST",
            data : {
                order_type : "1",
                goods_name : this.data.goodsval,
                goods_price : this.data.good_pcier,
                phone : this.data.addrObj.phone,
                name : this.data.addrObj.name,
                address : this.data.addrObj.address + " " + this.data.addrObj.addrDetail,
                s_time : this.data.peiS_time[this.data.PS_index],
                rmark : this.data.rmark,
                amount : this.data.PS_price,
                tip : this.data.XF_index,
                fromId:e.detail.formId,
            },

            success: (result)=> {
                let orderData = {
                    order_type : 1,
                    is_pay : 1,
                    address : this.data.addrObj.address,
                    name : this.data.addrObj.name,
                    phone : this.data.addrObj.phone,
                    order_sn : result.obj.order_sn,
                    goods_name :  this.data.goodsval,
                    goods_price :  this.data.good_pcier,
                    amount : this.data.PS_price,
                    rmark : this.data.rmark,
                    tip : this.data.XF_index
                }
                this.setData({
                    orderData : orderData
                });
                this.goPayForBackendFn(result.obj.order_sn);
            }
        })
    }
    
    
    
    
    
})