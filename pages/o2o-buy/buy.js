Page({
    data:{
        peiS_time:[],
        PS_index:0,
        XiaoFei:['0元','1元','2元','3元','4元','5元'],
        XF_index:0,
        PS_price:12,
        goodsval:''
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
    },
    onHide:function(){
        // 页面隐藏
    },
    onUnload:function(){
        // 页面关闭
    }
})