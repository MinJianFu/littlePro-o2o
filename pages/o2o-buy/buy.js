
const app = getApp();

Page({
    data:{
        peiS_time:[],
        PS_index:0,
        XiaoFei:['0元','1元','2元','3元','4元','5元'],
        XF_index:0,
        PS_price:12,
        goodsval:'',
        addrObj : null,
        nowShoppingAddr : "",
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
            console.log(this.data.peiS_time);
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
        console.log(this.data.addrObj);
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
  
    //跳去选择购物地址
    jumpToShoppingAddr : function () {
        wx.navigateTo({
            url: '../o2o-addressquery?type=1'
        })
    },
    
    //拿默认地址
    getDefaultAddress : function () {
        let that = this;
        var session = wx.getStorageSync('session_key');
        var nowLocalAddr = wx.getStorageSync('nowLocalAddr');
        var nowShoppingAddr = wx.getStorageSync('shoppingAddrvalue');
        if(nowLocalAddr){
            that.setData({
                addrObj : nowLocalAddr
            })
            console.log(this.data.addrObj);
            // wx.removeStorage({
            //     key: 'nowLocalAddr',
            //     success: function(res) {
            //         console.log(res)
            //     }
            // })
        }else{
            wx.request({
                url: 'https://www.pcclub.top/Home/Address/getDefaultList', //仅为示例，并非真实的接口地址
                method: "POST",
                header: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'token' : session
                },
                success: function(result) {
                    console.log(result);
                    that.setData({
                        addrObj : result.data.obj
                    })
                }
            })
        }
        that.setData({
            nowShoppingAddr : nowShoppingAddr
        })
    },
    
    //下单按钮时间
    goOrderFn : function () {
        let that = this;
        var session = wx.getStorageSync('session_key');
        wx.request({
            url: 'https://www.pcclub.top/Home/Order/index', //仅为示例，并非真实的接口地址
            method: "POST",
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'token' : session
            },
            data : {
                order_type : "1",
                address_id : this.data.addrObj.addressid,
                name : this.data.addrObj.name,
                phone : this.data.addrObj.phone,
                goods_name : this.data.goodsval,
                s_address : this.data.nowShoppingAddr,
                r_address : this.data.addrObj.address,
                s_time : this.data.peiS_time[this.data.PS_index],
                rmark : this.data.rmark,
                amount : this.data.PS_price,
                goods_price : this.data.good_pcier,
                tip : this.data.XF_index,
            },
            
            success: (result)=> {
                if(result.data.status == 8888){
                    app.wxLogin();
                    return;
                }
                if(result.data.status != 0){
                    this.wetoast.toast({
                        title: result.data.msg,
                        duration: 1500
                    })
                    return;
                }
                console.log(this.data.addrObj)
                console.log(result);
                // that.setData({
                //     addrObj : result.data.obj
                // })
            }
        })
    }
    
    
    
    
    
})