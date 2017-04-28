Page({
    data:{
        orderData : {},
    },
    
    onShow : function(){
        let orderData = wx.getStorageSync("orderData");
        this.setData({
            orderData : orderData
        })
        wx.removeStorageSync("orderData");
    }
})