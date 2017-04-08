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
        pagetype:'',
        peiS_time:[],
        PS_index:0,
        XiaoFei:['0元','1元','2元','3元','4元','5元'],
        XF_index:0,
        PS_price:12,
        hour:hour,
        minute:minute,
        day:day,
        seletype:false,
        goodsinformation:''

    },
    bindChange: function(e) {
        const val = e.detail.value
        this.setData({
            year: this.data.years[val[0]],
            month: this.data.months[val[1]],
            day: this.data.days[val[2]]
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
    onLoad:function(options){
        // 页面初始化 options为页面跳转所带来的参数
        this.setData({
            pagetype:options.type
        })
        this.ReadyPS_time();
        // wx.getStorage({
        //     key:'gooodsinformatio',
        //     success:function(res){
        //         console.log(res);
        //     }
        // })
        // console.log(options);
    },
    onReady:function(){
        // 页面渲染完成

    },
    onShow:function(){
        // 页面显示
        wx.getStorage({
            key:'gooodsinformatio',
            success:(res)=>{
                this.setData({
                    goodsinformation:res.data
                })
            }
        })
    },
    onHide:function(){
        // 页面隐藏
    },
    onUnload:function(){
        // 页面关闭
    }
})