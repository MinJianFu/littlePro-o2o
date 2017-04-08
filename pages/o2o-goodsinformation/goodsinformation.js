Page({
    data:{
        weight:1,
        goodsinfor:['鲜花','蛋糕','生鲜果蔬','美食','钥匙','文件','电子产品','服饰','其他'],
        goodsinfor_index:-1,
        goodsvalue:['100元以下','100元-200元','200元-300元','300元-400元','400元-500元'],
        goodsvalue_index:0
    },
    //选择重量
    change_weight:function(e){
        if(e.target.dataset.key=='-'){
            if(this.data.weight>1){
                this.setData({
                    weight:--this.data.weight
                })
            }
        }else {
            this.setData({
                weight:++this.data.weight
            })
        }
    },
    //选择物品
    ongoods:function(e){
        this.setData({
            goodsinfor_index:e.target.dataset.key
        })
    },
    //选择物品价值
    ongoodsvalue:function (e) {
      this.setData({
          goodsvalue_index:e.detail.value
      })
    },
    //商品信息保存在give.js使用
    bbb:function () {
        let $ = this.data;
        wx.setStorage({
            key:'gooodsinformatio',
            data:{
                goodsname:$.goodsinfor[$.goodsinfor_index],
                goodsname_index:$.goodsinfor_index,
                weight:$.weight+'kg',
                weight_index:$.weight,
                goodsvalue:$.goodsvalue[$.goodsvalue_index],
                goodsvalue_index:$.goodsvalue_index
            },
            success:function () {
                wx.navigateBack({
                    delta: 1
                })
            }
        })
    },

    onLoad:function(options){

    },
    onReady:function(){
        // 页面渲染完成
    },
    onShow:function(){
        //页面动态的渲染
        wx.getStorage({
            key:'gooodsinformatio',
            success:(res)=>{
                this.setData({
                    weight:res.data.weight_index,
                    goodsinfor_index:res.data.goodsname_index,
                    goodsvalue_index:res.data.goodsvalue_index
                })
            }
        })
        // 页面显示
    },
    onHide:function(){
        // 页面隐藏
    },
    onUnload:function(){
        // 页面关闭
    }
})