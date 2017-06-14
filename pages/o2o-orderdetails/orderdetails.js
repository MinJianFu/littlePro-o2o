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
})