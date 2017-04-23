Page({
    data:{
        addressList : [],
    },
  
    onLoad:function(options){
        // 页面初始化 options为页面跳转所带来的参数
   
    },
    onReady:function(){
        // 页面渲染完成
        
    },
    onShow:function(){
        // 页面显示
        this.getUserAddressList();
    },
    onHide:function(){
        // 页面隐藏
    },
    onUnload:function(){
        // 页面关闭
    },
    
    //拿地址列表信息
    getUserAddressList : function () {
        let that = this;
        wx.getStorage({
            key: 'session_key',
            success: function(res) {
                let session = res.data;
                wx.request({
                    url: 'https://www.pcclub.top/Home/Address/getList', //仅为示例，并非真实的接口地址
                    method: "POST",
                    header: {
                        'content-type': 'application/x-www-form-urlencoded',
                        'token' : session
                    },
                    success: function(result) {
                        console.log(result)
                        that.setData({
                            addressList : result.data.list
                        })
                    }
                })
            }
        })
    },
    
    //点击某条地址信息返回上一页事件
    choseAddrFn : function (e) {
        wx.setStorageSync( "nowLocalAddr", {
                name : e.currentTarget.dataset.name,
                phone : e.currentTarget.dataset.phone,
                address : e.currentTarget.dataset.address,
            })
        wx.navigateBack({
            delta: 1
        })
        
    }
    
    
    
})