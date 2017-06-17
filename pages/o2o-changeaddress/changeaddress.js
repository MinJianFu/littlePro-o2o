
const app = getApp();
let { o2oAjax } = app;
Page({
    data:{
        sexitem:[
            {name:'先生',checked:'true'},
            {name:'女士'}
        ],
        a_name : "",
        a_phone : "",
        a_locAddress : "",
        a_address : "",
        a_resAddress : "",
        toastHidden : true,
        toastText : "",

        selectType : null,
        address_id : null,
        
        usfApi : 'https://www.pcclub.top/Home/Address/index',
    },
    onLoad:function(options){
        //初始化toast组件
        new app.WeToast();
        this.setData({
            selectType : options.type,
            isEditType : options.edit ? 1 : 0
        });
        if(this.data.isEditType){
            let stData = wx.getStorageSync("beEditAddrData");
            this.setData({
                a_name : stData.name,
                a_phone : stData.phone,
                a_locAddress : stData.address,
                a_address : stData.addrDetail,
                address_id : stData.id,
    
                usfApi : 'https://www.pcclub.top/Home/Address/editAddress'
            })
        }
    },
    onReady:function(){
        // 页面渲染完成
        
    },
    onShow:function(){
        // 页面显示
        
        //完整地址拼接
        let that = this;
        wx.getStorage({
            key: 'addrvalue',
            success: function(res) {
                that.setData({
                    a_locAddress : res.data,
                })
            }
        })
       
    },
    onHide:function(){
        // 页面隐藏
    },
    onUnload:function(){
        // 页面关闭
    },
    
    //修改a_name值
    changeName : function (e) {
        this.setData({
            a_name : e.detail.value
        })
    },
    //修改a_phone值
    changePhone : function (e) {
        this.setData({
            a_phone : e.detail.value
        })
    },
    //修改a_phone值
    changeAddress : function (e) {
        this.setData({
            a_address : e.detail.value
        })
    },
    //删除地址
    delAddr : function () {
    
        o2oAjax({
            url: 'https://www.pcclub.top/Home/Address/delAddress',
            method: "POST",
            data: {
                address_id : this.data.address_id
            },
            success: (result) =>{
                wx.navigateBack({
                    delta: 1
                })
            }
        })
    },
    
    //设置地址
    setAddr : function () {
        o2oAjax({
            url: this.data.usfApi,
            method: "POST",
            data: {
                name : this.data.a_name,
                phone : this.data.a_phone,
                address : this.data.a_locAddress,
                detail : this.data.a_address,
                address_id : this.data.address_id
            },
            success: (result) =>{
                if(result.status == 0){
                    let storageMC = "";
                    if(this.data.selectType == 1){
                        storageMC = "nowLocalAddr";
                    }
                    if(this.data.selectType == 21){
                        storageMC = "getGoodsAddress";
                    }
                    
                    if(this.data.selectType == 22){
                        storageMC = "sendGoodsAddress";
                    }
                    if(this.data.selectType == 31){
                        storageMC = "shopGoodsAddress";
                    }
                    wx.setStorageSync(storageMC, {
                        name : this.data.a_name,
                        phone : this.data.a_phone,
                        address : this.data.a_locAddress,
                        address_id : this.data.address_id,
                        addrDetail : this.data.a_address,
                    })
                    wx.navigateBack({
                        delta: 2
                    })
                }else{
                    this.wetoast.toast({
                        title: result.data.msg,
                        duration: 1500
                    })
                }
            }
        })
    }
    
})