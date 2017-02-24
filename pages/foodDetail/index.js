//index.js
//获取应用实例
let app = getApp();
Page({
	data: {
		motto : 'Hello World',
		userInfo : {},

        //菜品数据
        foodData : app.globalData.foodData,

        //当前菜品id
        thisFoodId : app.globalData.nowFoodDetail.id,

        //当前菜品名称
        thisFoodName : app.globalData.nowFoodDetail.name,

        //当前菜品价格
        thisFoodPrice : app.globalData.nowFoodDetail.price,

        //当前菜品在购物车的数量
		thisFoodSleCount : app.globalData.nowFoodDetail.sleCount,

        //购物车数量
        shoppingCartCount : app.globalData.shoppingCartCount,

        //购物车总价
        shoppingCartMoney : app.globalData.shoppingCartMoney
	},


	onLoad: function(e) {
		console.log('onLoad');
		let that = this;
		//调用应用实例的方法获取全局数据
		app.getUserInfo(function(userInfo) {
			//更新数据
			that.setData({
				userInfo: userInfo
			})
		});
		wx.setNavigationBarTitle({
			title: '菜品详情'
		})
	},

    onShow : function () {

        //获取最新数据
        this.setData({
            //菜品数据
            foodData : app.globalData.foodData,

            //当前菜品id
            thisFoodId : app.globalData.nowFoodDetail.id,

            //当前菜品名称
            thisFoodName : app.globalData.nowFoodDetail.name,

            //当前菜品价格
            thisFoodPrice : app.globalData.nowFoodDetail.price,

            //当前菜品在购物车的数量
            thisFoodSleCount : app.globalData.nowFoodDetail.sleCount,

            //购物车数量
            shoppingCartCount : app.globalData.shoppingCartCount,

            //购物车总价
            shoppingCartMoney : app.globalData.shoppingCartMoney
        })
        let foodData = this.data.foodData;
        for(let i =0; i < foodData.length; i++){
            if(foodData[i].foodId == this.data.thisFoodId){
                this.setData({
                    thisFoodSleCount : foodData[i].foodSleCount? foodData[i].foodSleCount: 0
                })
                break;
            }
        }
    },
    
    //增加当前菜品的数量
    addThisFood : function () {
        let newFoodData = this.data.foodData;
        for(let i =0; i < newFoodData.length; i++){
            if(newFoodData[i].foodId == this.data.thisFoodId){
                let newSleCount = newFoodData[i].foodSleCount? newFoodData[i].foodSleCount+1: 1;
                this.setData({
                    thisFoodSleCount : newSleCount
                })
                newFoodData[i].foodSleCount = newSleCount;
                break;
            }
        }

        let newShoppingCartMoney = app.globalData.shoppingCartMoney + parseInt(this.data.thisFoodPrice);
        let newShoppingCartCount = parseInt(app.globalData.shoppingCartCount) + 1;

        app.globalData.foodData = newFoodData;
        app.globalData.shoppingCartCount = newShoppingCartCount;
        app.globalData.shoppingCartMoney = newShoppingCartMoney;

        this.setData({
            shoppingCartCount : newShoppingCartCount,
            shoppingCartMoney : newShoppingCartMoney
        })
    },
    
    //减少当前菜品的数量
    reduceThisFood : function () {
        let newFoodData = this.data.foodData;
        let newShoppingCartMoney = app.globalData.shoppingCartMoney;
        let newShoppingCartCount = app.globalData.shoppingCartCount;
        let newSleCount = null;
        for(let i =0; i < newFoodData.length; i++){
            if(newFoodData[i].foodId == this.data.thisFoodId){
                if(newFoodData[i].foodSleCount > 0){
                    newSleCount = newFoodData[i].foodSleCount-1;
                    newShoppingCartMoney = app.globalData.shoppingCartMoney - parseInt(this.data.thisFoodPrice);
                    newShoppingCartCount = parseInt(app.globalData.shoppingCartCount) - 1;
                }else{
                    newSleCount = 0;
                }
                this.setData({
                    thisFoodSleCount : newSleCount
                })
                newFoodData[i].foodSleCount = newSleCount;
                break;
            }
        }



        app.globalData.foodData = newFoodData;
        app.globalData.shoppingCartCount = newShoppingCartCount;
        app.globalData.shoppingCartMoney = newShoppingCartMoney;

        this.setData({
            shoppingCartCount : newShoppingCartCount,
            shoppingCartMoney : newShoppingCartMoney
        })
    }




});