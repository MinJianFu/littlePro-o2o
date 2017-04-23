let app = getApp();
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
    },
    onLoad:function(options){
        //初始化toast组件
        new app.WeToast();
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
                    a_resAddress : res.data + that.data.a_address
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
    
    //设置新地址
    setAddr : function () {
        let that = this;
        wx.getStorage({
            key: 'session_key',
            success: function(res) {
                console.log(res.data);
                let session = res.data;
                wx.request({
                    url: 'https://www.pcclub.top/Home/Address/index', //仅为示例，并非真实的接口地址
                    //url: 'https://www.pcclub.top/Home/Test/test', //仅为示例，并非真实的接口地址
                    method: "POST",
                    header: {
                        'content-type': 'application/x-www-form-urlencoded',
                        'token' : session
                    },
                    data: {
                        name : that.data.a_name,
                        phone : that.data.a_phone,
                        address : that.data.a_resAddress,
                    },
                    success: function(result) {
                        console.log(result)
                        if(result.data.staus == 0){
                            wx.navigateBack({
                                delta: 1
                            })
                        }else{
                            that.wetoast.toast({
                                title: result.data.msg,
                                duration: 1500
                            })
                        }
                    
                    }
                })
            }
        })
    }
    
    
})