
const app = getApp();
let { o2oAjax } = app;

Page({
    data:{
        addressList : [],
        selectType : null,
    },
  
    onLoad:function(options){
        // 页面初始化 options为页面跳转所带来的参数
        //type 1 代表为帮你买进来的选地址
        //type 21 代表帮你送进来的选取货地址
        //type 22 代表帮你送进来的选送货地址
       this.setData({
           selectType : options.type
       })
   
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
        o2oAjax({
            url: 'https://www.pcclub.top/Home/Address/getList', //仅为示例，并非真实的接口地址
            method: "POST",
            success: (result)=> {
                console.log(result)
                this.setData({
                    addressList : result.list
                })
            }
        })
    },
    
    //点击某条地址信息返回上一页事件
    choseAddrFn : function (e) {
        if(this.data.selectType == 1){
            wx.setStorageSync( "nowLocalAddr", {
                name : e.currentTarget.dataset.name,
                phone : e.currentTarget.dataset.phone,
                address : e.currentTarget.dataset.address,
                addressid : e.currentTarget.dataset.addressid
            })
        }
        
        if(this.data.selectType == 21){
            wx.setStorageSync( "getGoodsAddress", {
                name : e.currentTarget.dataset.name,
                phone : e.currentTarget.dataset.phone,
                address : e.currentTarget.dataset.address,
                addressid : e.currentTarget.dataset.addressid
            })
        }
        
        if(this.data.selectType == 22){
            wx.setStorageSync( "sendGoodsAddress", {
                name : e.currentTarget.dataset.name,
                phone : e.currentTarget.dataset.phone,
                address : e.currentTarget.dataset.address,
                addressid : e.currentTarget.dataset.addressid
            })
        }
        wx.navigateBack({
            delta: 1
        })
        
    }
    
    
    
})