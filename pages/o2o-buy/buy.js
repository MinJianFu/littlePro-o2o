
const app = getApp();
let { o2oAjax } = app;

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
        good_pcier:""
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
    //修改商品内容文字事件
    changeGoodDetail : function (e) {
        this.setData({
            goodsval : e.detail.value
        })
    },
    
    //拿默认地址
    getDefaultAddress : function () {
        var session = wx.getStorageSync('session_key');
        var nowLocalAddr = wx.getStorageSync('nowLocalAddr');
        var nowShoppingAddr = wx.getStorageSync('shoppingAddrvalue');
        if(nowLocalAddr){
            this.setData({
                addrObj : nowLocalAddr
            })
            // wx.removeStorage({
            //     key: 'nowLocalAddr',
            //     success: function(res) {
            //         console.log(res)
            //     }
            // })
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
        this.setData({
            nowShoppingAddr : nowShoppingAddr
        })
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
                console.log(result);
            },
            fail : (a, b, c)=>{
                console.log("支付失败");
                console.log(a,b,c);
            }
        })
    },
    //调后台支付接口
    goPayForBackendFn : function () {
        o2oAjax({
            url: 'https://www.pcclub.top/Home/WxPay/pay',
            method: "POST",
            success: (result)=> {
                console.log(result);
                this.goPayFn(result.obj);
                // that.setData({
                //     addrObj : result.data.obj
                // })
            }
        })
    },
    
    //下单按钮s事件
    goOrderFn : function () {
        // o2oAjax({
        //     url: 'https://www.pcclub.top/Home/Order/index',
        //     method: "POST",
        //     data : {
        //         order_type : "1",
        //         goods_name : this.data.goodsval,
        //         goods_price : this.data.good_pcier,
        //         phone : this.data.addrObj.phone,
        //         name : this.data.addrObj.name,
        //         address : this.data.addrObj.address,
        //         s_time : this.data.peiS_time[this.data.PS_index],
        //         rmark : this.data.rmark,
        //         amount : this.data.PS_price,
        //         tip : this.data.XF_index,
        //     },
        //
        //     success: (result)=> {
        //         console.log(result);
        //         // that.setData({
        //         //     addrObj : result.data.obj
        //         // })
        //     }
        // })
        this.goPayForBackendFn();
    }
    
    
    
    
    
})