Page({
    data:{
        header:['进心中','已完成','已取消'],
        state:0,
        a:{
            a:1,
            b:2
        }
    },
    changestate:function(e){
        this.setData({
            state:e.currentTarget.dataset.key
        })
    },
    onReady:function(){

    }
})