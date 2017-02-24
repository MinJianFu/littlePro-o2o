//index.js
//获取应用实例
let app = getApp();


Page({
	data: {
		motto : 'Hello World',
		userInfo : {},
        scrollConHeight : 200,
        
        //菜单数据
        menuData : app.globalData.menuData,
        
        //菜品数据
        foodData : app.globalData.foodData,
        
        //当前类别菜品数据
        nowShowData : [],
        
        //当前类别菜品id
        nowSelectTypeId : 1,
        
        //购物车数量
        shoppingCartCount : app.globalData.shoppingCartCount,

        //购物车总价
        shoppingCartMoney : app.globalData.shoppingCartMoney,

        //购物车详情显示与否标识
        isShoppingDetailShow : 0,

        //购物车商品类型数量
        foodTypeCount : app.globalData.foodTypeCount

	},

	onLoad : function(e) {
        console.log('onLoad');
		let that = this;

		//调用应用实例的方法获取全局数据
		app.getUserInfo(function(userInfo) {
			//更新数据
			that.setData({
				userInfo : userInfo
			})
		});

        //设置页头
		wx.setNavigationBarTitle({
			title: '外卖'
		});

        //从本地获取加工过的最新数据
        that.setData({
            foodData : app.globalData.foodData,
            shoppingCartCount : app.globalData.shoppingCartCount,
            shoppingCartMoney : app.globalData.shoppingCartMoney,
            foodTypeCount : app.globalData.foodTypeCount
        })

        //设置滑动区域的包裹层高度
        wx.getSystemInfo({
            success : (res) => {
                let ufHeight = res.windowHeight;
                this.setData({
                    scrollConHeight : ufHeight-224
                });
            }
        });


        //首次获取当前类别的菜品
        this.switchFoodData();
        console.log(app.globalData);


	},

    //切换回此页面时的事件
    onShow : function(){

        //从本地获取加工过的最新数据
        this.setData({
            foodData : app.globalData.foodData,
            shoppingCartCount : app.globalData.shoppingCartCount,
            shoppingCartMoney : app.globalData.shoppingCartMoney
        })
        
    },

    //点击左边菜单按钮事件
    clkLeftMenuFn : function(e){
        let nowMenu = this.data.menuData;
        for(let i = 0; i < nowMenu.length; i++){
            if( nowMenu[i].menuId == e.currentTarget.dataset.typeid ){
                nowMenu[i].active = 1;
                this.setData({
                    nowSelectTypeId : nowMenu[i].menuId
                });
            }else{
                nowMenu[i].active = 0;
            }
        };
        this.setData({
            menuData : nowMenu
        })
        app.globalData.menuData = nowMenu;
    },

    //切换菜品到当前菜品类别的菜品
    switchFoodData : function () {
        let nowSelectTypeId = this.data.nowSelectTypeId;
        let nowTypeFoodMenu = [];
        let foodData = this.data.foodData;
        for(let i = 0; i < foodData.length; i++){
            if( foodData[i].typeId ==nowSelectTypeId ){
                nowTypeFoodMenu.push(foodData[i]);
            }
        }
        this.setData({
            nowShowData : nowTypeFoodMenu
        })
    },

    //跳转到菜品详情页
    jumpToFoodDetail : function (e) {
        let foodId = e.currentTarget.dataset.foodid;
        let foodPrice = e.currentTarget.dataset.price;
        let foodName = e.currentTarget.dataset.foodname;
        app.globalData.nowFoodDetail = {
            id : foodId,
            name : foodName,
            price : foodPrice,
        }
        wx.navigateTo({
            url: '../foodDetail/index'
        })
    },
    
    //添加到购物车事件
    addToShoppingCartFn : function (e) {
        let foodId = e.currentTarget.dataset.foodid;
        let foodPrice = e.currentTarget.dataset.price;
        let newFoodData = this.data.foodData;
        let newShoppingCartMoney = this.data.shoppingCartMoney + parseInt(foodPrice);
        for(let i = 0; i < newFoodData.length; i++){
            if(newFoodData[i].foodId == foodId){
                newFoodData[i].foodSleCount = newFoodData[i].foodSleCount? ++newFoodData[i].foodSleCount: 1;
            }
        }
        let shoppingCartCount = this.data.shoppingCartCount + 1;

        app.globalData.foodData = newFoodData;
        app.globalData.shoppingCartCount = shoppingCartCount;
        app.globalData.shoppingCartMoney = newShoppingCartMoney;


        this.setData({
            shoppingCartCount : shoppingCartCount,
            foodData : newFoodData,
            shoppingCartMoney : newShoppingCartMoney
        })
        this.goodTypeCount();
    },

    //从购物车删减事件
    delFromShoppingCart : function (e) {
        let foodId = e.currentTarget.dataset.foodid;
        let foodPrice = e.currentTarget.dataset.price;
        let newFoodData = this.data.foodData;
        let newShoppingCartMoney = this.data.shoppingCartMoney - parseInt(foodPrice);
        let newNowFoodData = [];
        for(let i = 0; i < newFoodData.length; i++){
            if(newFoodData[i].foodId == foodId){
                newFoodData[i].foodSleCount = newFoodData[i].foodSleCount&& newFoodData[i].foodSleCount> 0? --newFoodData[i].foodSleCount: 0;
            }
        }
        let newShoppingCartCount = this.data.shoppingCartCount;
        newShoppingCartCount = newShoppingCartCount ? --newShoppingCartCount: 0;

        app.globalData.foodData = newFoodData;
        app.globalData.shoppingCartCount = newShoppingCartCount;
        app.globalData.shoppingCartMoney = newShoppingCartMoney;

        this.setData({
            shoppingCartCount : newShoppingCartCount,
            foodData : newFoodData,
            shoppingCartMoney : newShoppingCartMoney
        })
        this.goodTypeCount();
    },

    //显示购物车详情层 
    showShoppingDetail : function(){
        if(this.data.shoppingCartCount){
            this.setData({
                isShoppingDetailShow : 1
            })
        }
    },
    //隐藏购物车详情层 
    hideShoppingDetail : function(){
        this.setData({
            isShoppingDetailShow : 0
        })
    },

    //购物车详情层是否设置高度的方法
    goodTypeCount : function(){
        let foodData = this.data.foodData;
        let foodTypeCount = 0;
        for(let i = 0; i < foodData.length; i++){
            if(foodData[i].foodSleCount){
                foodTypeCount++;
            }
        }
        this.setData({
            foodTypeCount : foodTypeCount
        })
        app.globalData.foodTypeCount = foodTypeCount;
    }

});