
let app = getApp();

let showStar = require('../star/star.js')

Page({
  data:{
    menuData : app.globalData.menuData,     //左菜单数据
    foodsData:app.globalData.foodsData,     //右商品数据
    ShopNews:app.globalData.ShopNews,       //店铺信息数据
    activity:app.globalData.activity,       //店铺活动信息数据
    foodrating:app.globalData.foodrating,   //评论内容数据
    ratingTab:app.globalData.ratingTab,     //选择评论数据
    winWidth: 0,      //系统宽
    winHeight: 0,     //系统高
    // tab切换
    currentTab: 0,
    indicatorDots:	false,
    autoplay:true,
    interval:3000,
    duration:500,
    vertical:true,
    circular:true,
    isShowCarItem:false,  //当前购物车是否显示
    hasGoodsCount:false,     //有商品的状态
    catnum:0,     //购物车总数量
    catmoney:0,   //购物车总价钱
    nowSelectTypeId:1,    //左菜单选中状态
    nowSeleRatingDataId:1,    //评论选中状态
    ServiceAttitudeStar:[],   //店铺服务态度星星
    SasteStar:[],    //店铺味道星星
    },
    onLoad: function() {
        var that = this;
      that.showStar()   //评论星星方法
      that.ServiceAttitudeStar()   //店铺服务态度星星方法
      that.SasteStar()      //店铺味道星星方法
      /**
       * 获取系统信息
       */
        wx.getSystemInfo( {
            success: function( res ) {
                that.setData( {
                    winWidth: res.windowWidth,
                    winHeight: res.windowHeight
                });
            }
        });
    },

    //tab方法
    bindChange: function( e ) {
        var that = this;
        that.setData( { currentTab: e.detail.current });
    },
    swichNav: function( e ) {
        var that = this;
        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.target.dataset.current
            })
        }
    },
    //星星显示
    showStar:function (e) {
      let foodrating = this.data.foodrating
      for(let i=0;i<foodrating.length;i++){
       let showstararr = showStar.showStar(foodrating[i].star,foodrating[i].starShow)
      }
      this.setData({
        foodrating:foodrating
      })
    },
    ServiceAttitudeStar:function () {
      let ServiceAttitudeStar = this.data.ServiceAttitudeStar
      let ShopNews = this.data.ShopNews
      for(let i=0;i<ShopNews.length;i++){
        let showstararr = showStar.showStar(ShopNews[i].ServiceAttitude,ServiceAttitudeStar)
      }
      this.setData({
        ServiceAttitudeStar:ServiceAttitudeStar
      })
    },
    SasteStar:function () {
      let SasteStar = this.data.SasteStar
      let ShopNews = this.data.ShopNews
      for(let i=0;i<ShopNews.length;i++){
        let showstararr = showStar.showStar(ShopNews[i].Saste,SasteStar)
      }
      this.setData({
        SasteStar:SasteStar
      })
    },
    //购物车加
    ADD:function (e) {
      let that = this;
      let foods = that.data.foodsData;
      for(let i = 0; i< foods.length;i++){
        if (foods[i].foodsId == e.target.dataset.foodsid){
          foods[i].foodsCount++;
          break
        }

      }
      that.setData({
        foodsData:foods,
        hasGoodsCount:true,
      })
      that.SetAllmoney()
    },
    //购物车减
    SUB:function (e) {
      let foods = this.data.foodsData
      for(let i = 0; i< foods.length;i++){
        if (foods[i].foodsId == e.target.dataset.foodsid){
            foods[i].foodsCount --;
            break
        }
      }
      this.setData({
        foodsData:foods,
      })
      this.SetAllmoney()
    },
    //总价钱方法
    SetAllmoney:function (e) {
      let foods = this.data.foodsData
      let catnum = 0
      let catmoney =  0
      for(let i = 0;i<foods.length;i++){
        if(foods[i].foodsCount > 0){
          catnum = catnum + foods[i].foodsCount
          catmoney = catmoney + (foods[i].foodsCount*foods[i].foodsMoney)
        }
      }
      if(catnum <= 0){
        this.setData({
          hasGoodsCount:false,
          isShowCarItem:false
        })
      }
      this.setData({
        catnum:catnum,
        catmoney:catmoney,
      })

    },
    //左菜单方法
    seleMenu:function (e) {
      let menuData = this.data.menuData;
      for(let i=0;i<menuData.length;i++){
        if(e.target.dataset.typeid == menuData[i].menuId){
          menuData[i].active = 1
          this.setData({
            nowSelectTypeId :e.target.dataset.typeid
          })
        }else{
          menuData[i].active = 0
        }
      }
      this.setData({
        menuData:menuData
      })
    },
    //评论显示方法
    seleRating: function (e) {
      let ratingTab = this.data.ratingTab
      for(let i=0;i<ratingTab.length;i++){
        if(e.target.dataset.ratingid == ratingTab[i].tabTypeId){
          ratingTab[i].active = 1
          this.setData({
            nowSeleRatingDataId:e.currentTarget.dataset.ratingid,
          })
        }else{
          ratingTab[i].active = 0
        }
      }
      this.setData({
        ratingTab:ratingTab
      })

    },
    //购物车列表加方法
    CarFoodList:function (e) {
      this.ADD(e)
    },
    //购物车减列表方法
    CarFoodListSub:function (e) {
      this.SUB(e);
    },
    //清空方法
    clearFoodlist:function () {
      this.setData({
        CarFoodList:[]
      });
      let animation = wx.createAnimation({
        duration:300,
        timingFunction:"ease",
      });
      this.animation = animation;
      let CarFoodList = this.data.CarFoodList;

      if (CarFoodList.length == 0){
        animation.translate(0,0).opacity(0).step();
        this.data.ShowAnimation = !this.data.ShowAnimation
      }
      let foods = this.data.foodsData
      for(let i=0;i<foods.length;i++){
        foods[i].foodsCount = 0
      }
      this.setData({
        animationData:animation.export(),
        catnum:0,
        catmoney:0,
        foodsData:foods
      })
    },
    //购物车动画状态显示方法
    showCar:function () {
    if(this.data.hasGoodsCount){
      this.setData({
        isShowCarItem:!this.data.isShowCarItem
      })
    }

    },
    //筛选有count的foods方法
    hasGoods:function (e) {
      let foods = this.data.foodsData
      app.globalData.foodsData = foods
      wx.navigateTo ({
        url: '../o2o-sureOrder/o2o-sureOrder'
      })

    },
    });
