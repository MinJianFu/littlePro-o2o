
const app = getApp();
let { o2oAjax, WeToast, alertBox } = app;

const date = new Date()
const minute = ['00','15','30','45']
const day = ['今天','明天','后天']
const hour = []
for (let i = 1; i < 25; i++) {
    if(i<10){
        hour.push('0'+i)
    }else{
        hour.push(i);
    }

}

Page({
    data:{
        pageType:'',
        peiS_time:[],
        PS_index:0,
        XiaoFei:['0元','1元','2元','3元','4元','5元'],
        XF_index:0,
        PS_price:12,
        hour:hour,
        minute:minute,
        day:day,
        seletype:false,
        goodsinformation:'',
        rmark : "",
        getGoodsAddress : "",   //取货地址
        sendGoodsAddress : "",  //送货地址
        
        orderData : null,
    },


  onLoad:function(options){
        // 页面初始化 options为页面跳转所带来的参数
        this.setData({
            pageType:options.type
        })
        this.ReadyPS_time();
    },
    onReady:function(){
        // 页面渲染完成
    },
    onShow:function(){
        // 页面显示
        let goodsinformation = wx.getStorageSync('gooodsinformatio');   //拿商品信息
        let getGoodsAddress = wx.getStorageSync('getGoodsAddress');   //拿取货地址
        let sendGoodsAddress = wx.getStorageSync('sendGoodsAddress');   //拿商送货地址
        this.setData({  //从storage拿商品信息
            goodsinformation : goodsinformation,
            getGoodsAddress : getGoodsAddress,
            sendGoodsAddress : sendGoodsAddress
        });
        this.getFreight();
    },
    onHide:function(){
        // 页面隐藏
    },
    onUnload:function(){
        // 页面关闭
    },
    

    bindChange: function(e) {
        const val = e.detail.value
        this.setData({
            year: this.data.years[val[0]],
            month: this.data.months[val[1]],
            day: this.data.days[val[2]]
        })
    },

    //实时设置rmark值
    rmarkInputFn : function(e){
        this.setData({
            rmark : e.detail.value
        })
    },


    //弹出配送费说明弹窗
    showAlert : function(e){
        alertBox().alert({
            title : '配送费说明',
            text : '配送费为市区基础配送价格，若需配送城镇或跨区远距离配送请和骑手咨询'
        })
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
    //配送时间、代金券、小费的change事件
    PS_change:function(e){
        this.setData({
            [e.currentTarget.dataset.key]:e.detail.value-0
        })
    },
  
    //跳去选择购物地址
    jumpToShoppingAddr : function () {
        wx.navigateTo({
            url: '../o2o-receivingaddress/receivingaddress'
        })
    },
    
    //获取配送费接口
    getFreight : function(){
        o2oAjax({
            url: 'https://www.pcclub.top/Home/Order/getPrice',
            method: "POST",
            data : {
                type : 1
            },
            success : (result)=>{
                this.setData({
                    PS_price : parseFloat(result.obj.price)
                })
            }
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
    
    //下单按钮事件
    goOrderFn : function () {
    
        if(!!!this.data.goodsinformation ){
            WeToast().toast({
                title: '请完善货物信息',
                duration: 1500
            })
            return;
        }
        if(!!!this.data.getGoodsAddress){
            WeToast().toast({
                title: '请选择取货地址',
                duration: 1500
            })
            return;
        }
        if(!!!this.data.sendGoodsAddress){
            WeToast().toast({
                title: '请选择送货地址',
                duration: 1500
            })
            return;
        }
        
        o2oAjax({
            url: 'https://www.pcclub.top/Home/Order/index',
            method: "POST",
            data : {
                order_type : "2",
                goods_name : this.data.goodsinformation.goodsname + "|" + this.data.goodsinformation.weight + "|" + this.data.goodsinformation.goodsvalue,
                phone : this.data.sendGoodsAddress.phone,
                name : this.data.sendGoodsAddress.name,
                address : this.data.sendGoodsAddress.address,
    
                s_name :  this.data.getGoodsAddress.name,
                s_phone :  this.data.getGoodsAddress.phone,
                s_address :  this.data.getGoodsAddress.address + ' ' + this.data.getGoodsAddress.addrDetail,
                s_time : this.data.peiS_time[this.data.PS_index],
                rmark : this.data.rmark,
                amount : this.data.PS_price,
                // goods_price : this.data.goodsinformation.goodsvalue,
                tip : this.data.XF_index,
            },
            success: (result)=> {
                let orderData = {
                    order_type : 2,
                    is_pay : 1,
                    s_name : this.data.getGoodsAddress.name,
                    s_phone : this.data.getGoodsAddress.phone,
                    s_address : this.data.getGoodsAddress.address,
                    address : this.data.sendGoodsAddress.address,
                    name : this.data.sendGoodsAddress.name,
                    phone : this.data.sendGoodsAddress.phone,
                    order_sn : result.obj.order_sn,
                    goods_name : this.data.goodsinformation.goodsname + "|" + this.data.goodsinformation.weight + "|" + this.data.goodsinformation.goodsvalue,
                    // goods_price :  this.data.goodsinformation.goodsvalue,
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