Page({
    data:{
        orderData : {},
    },
    
    onShow : function(){
        let orderData = wx.getStorageSync("orderData");
        this.setData({
            orderData : orderData
        })
    },
    
    onUnload:function(){
        // 页面关闭
        wx.removeStorageSync("orderData");
    },
})