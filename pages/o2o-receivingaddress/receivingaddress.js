
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
        //type 31 代表帮商家店铺进来的收货地址
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
    
    //转发事件
    onShareAppMessage: function (res) {
        return {
            title: '雷霆快送',
            path: 'pages/o2o-homePage/o2o-homePage',
            success: function(res) {
                console.log('转发成功', res)
                // 转发成功
            },
            fail: function(res) {
                console.log('转发失败', res)
                // 转发失败
            }
        }
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

    //跳转到添加地址的页面
    nvaToMakeNewAddr : function(){
        wx.removeStorageSync("beEditAddrData");
        wx.navigateTo({
            url: '../o2o-changeaddress/changeaddress?type=' + this.data.selectType
        })
    },

    //跳去编辑地址
    nvaToEditAddr : function(e){
        wx.setStorageSync("beEditAddrData", {
            id : e.currentTarget.dataset.addressid,
            name : e.currentTarget.dataset.name,
            phone : e.currentTarget.dataset.phone,
            address : e.currentTarget.dataset.address,
            addrDetail : e.currentTarget.dataset.detail,
        })
        wx.navigateTo({
            url: '../o2o-changeaddress/changeaddress?type=' + this.data.selectType + '&edit=1'
        })
    },
    
    //点击某条地址信息返回上一页事件
    choseAddrFn : function (e) {
        if(this.data.selectType == 1){
            wx.setStorageSync( "nowLocalAddr", {
                name : e.currentTarget.dataset.name,
                phone : e.currentTarget.dataset.phone,
                address : e.currentTarget.dataset.address,
                addressid : e.currentTarget.dataset.addressid,
                addrDetail : e.currentTarget.dataset.detail,
            })
        }
        
        if(this.data.selectType == 21){
            wx.setStorageSync( "getGoodsAddress", {
                name : e.currentTarget.dataset.name,
                phone : e.currentTarget.dataset.phone,
                address : e.currentTarget.dataset.address,
                addressid : e.currentTarget.dataset.addressid,
                addrDetail : e.currentTarget.dataset.detail,
            })
        }
        
        if(this.data.selectType == 22){
            wx.setStorageSync( "sendGoodsAddress", {
                name : e.currentTarget.dataset.name,
                phone : e.currentTarget.dataset.phone,
                address : e.currentTarget.dataset.address,
                addressid : e.currentTarget.dataset.addressid,
                addrDetail : e.currentTarget.dataset.detail,
            })
        }
        if(this.data.selectType == 31){
            wx.setStorageSync( "shopGoodsAddress", {
                name : e.currentTarget.dataset.name,
                phone : e.currentTarget.dataset.phone,
                address : e.currentTarget.dataset.address,
                addressid : e.currentTarget.dataset.addressid,
                addrDetail : e.currentTarget.dataset.detail,
            })
        }
        wx.navigateBack({
            delta: 1
        })
        
    }
    
    
    
})