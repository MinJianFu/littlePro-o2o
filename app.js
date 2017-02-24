//app.js
App({
    onLaunch: function () {
    //调用API从本地缓存中获取数据
        let logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
    },
    getUserInfo:function(cb){
        let that = this
        if(this.globalData.userInfo){
            typeof cb == "function" && cb(this.globalData.userInfo)
        }else{
            //调用登录接口
            wx.login({
                success: function () {
                     wx.getUserInfo({
                            success: function (res) {
                            that.globalData.userInfo = res.userInfo
                            typeof cb == "function" && cb(that.globalData.userInfo)
                        }
                    })
                }
            })
        }
    },
    globalData : {
        userInfo : null,

        //模拟菜单数据
        menuData : [
            {
                "name" : "今日主推",
                "menuId" : "1",
                "active" : "1",
            },
            {
                "name" : "扒类",
                "menuId" : "2"
            },
            {
                "name" : "主食",
                "menuId" : "3"
            },
            {
                "name" : "面食",
                "menuId" : "4"
            },
            {
                "name" : "沙拉",
                "menuId" : "5"
            },
            {
                "name" : "甜点",
                "menuId" : "6"
            },
            {
                "name" : "饮料",
                "menuId" : "7"
            },
            {
                "name" : "小炒",
                "menuId" : "8"
            }
        ],

        //模拟菜品数据
        foodData : [
            {
                "foodName" : "今日主推--1",
                "typeId" : 1,
                "foodId" : 1001,
                "monthSaleNum" : 666,
                "zan" : 131,
                "price" : 35,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "今日主推--2",
                "typeId" : 1,
                "foodId" : 1002,
                "monthSaleNum" : 666,
                "zan" : 131,
                "price" : 35,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "今日主推--3",
                "typeId" : 1,
                "foodId" : 1003,
                "monthSaleNum" : 666,
                "zan" : 131,
                "price" : 35,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "今日主推--4",
                "typeId" : 1,
                "foodId" : 1004,
                "monthSaleNum" : 666,
                "zan" : 131,
                "price" : 35,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "今日主推--5",
                "typeId" : 1,
                "foodId" : 1005,
                "monthSaleNum" : 666,
                "zan" : 131,
                "price" : 35,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "今日主推--6",
                "typeId" : 1,
                "foodId" : 1006,
                "monthSaleNum" : 666,
                "zan" : 131,
                "price" : 35,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "主食类--1",
                "typeId" : 3,
                "foodId" : 3001,
                "monthSaleNum" : 306,
                "zan" : 41,
                "price" : 27,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "主食类--2",
                "typeId" : 3,
                "foodId" : 3002,
                "monthSaleNum" : 306,
                "zan" : 41,
                "price" : 27,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "主食类--3",
                "typeId" : 3,
                "foodId" : 3003,
                "monthSaleNum" : 306,
                "zan" : 41,
                "price" : 27,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "主食类--4",
                "typeId" : 3,
                "foodId" : 3004,
                "monthSaleNum" : 306,
                "zan" : 41,
                "price" : 27,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "主食类--5",
                "typeId" : 3,
                "foodId" : 3005,
                "monthSaleNum" : 306,
                "zan" : 41,
                "price" : 27,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "主食类--6",
                "typeId" : 3,
                "foodId" : 3006,
                "monthSaleNum" : 306,
                "zan" : 41,
                "price" : 27,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "主食类--7",
                "typeId" : 3,
                "foodId" : 3007,
                "monthSaleNum" : 306,
                "zan" : 41,
                "price" : 27,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "主食类--8",
                "typeId" : 3,
                "foodId" : 3008,
                "monthSaleNum" : 306,
                "zan" : 41,
                "price" : 27,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "主食类--9",
                "typeId" : 3,
                "foodId" : 3009,
                "monthSaleNum" : 306,
                "zan" : 41,
                "price" : 27,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "扒类--1",
                "typeId" : 2,
                "foodId" : 2001,
                "monthSaleNum" : 226,
                "zan" : 55,
                "price" : 43,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "扒类--2",
                "typeId" : 2,
                "foodId" : 2002,
                "monthSaleNum" : 226,
                "zan" : 55,
                "price" : 43,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "扒类--3",
                "typeId" : 2,
                "foodId" : 2003,
                "monthSaleNum" : 226,
                "zan" : 55,
                "price" : 43,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "扒类--4",
                "typeId" : 2,
                "foodId" : 2004,
                "monthSaleNum" : 226,
                "zan" : 55,
                "price" : 43,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "扒类--5",
                "typeId" : 2,
                "foodId" : 2005,
                "monthSaleNum" : 226,
                "zan" : 55,
                "price" : 43,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "扒类--6",
                "typeId" : 2,
                "foodId" : 2006,
                "monthSaleNum" : 226,
                "zan" : 55,
                "price" : 43,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "扒类--7",
                "typeId" : 2,
                "foodId" : 2007,
                "monthSaleNum" : 226,
                "zan" : 55,
                "price" : 43,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "扒类--8",
                "typeId" : 2,
                "foodId" : 2008,
                "monthSaleNum" : 226,
                "zan" : 55,
                "price" : 43,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "扒类--9",
                "typeId" : 2,
                "foodId" : 2009,
                "monthSaleNum" : 226,
                "zan" : 55,
                "price" : 43,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "面食--1",
                "typeId" : 4,
                "foodId" : 4001,
                "monthSaleNum" : 67,
                "zan" : 66,
                "price" : 30,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "面食--2",
                "typeId" : 4,
                "foodId" : 4002,
                "monthSaleNum" : 67,
                "zan" : 66,
                "price" : 30,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "面食--3",
                "typeId" : 4,
                "foodId" : 4003,
                "monthSaleNum" : 67,
                "zan" : 66,
                "price" : 30,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "面食--4",
                "typeId" : 4,
                "foodId" : 4004,
                "monthSaleNum" : 67,
                "zan" : 66,
                "price" : 30,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "面食--5",
                "typeId" : 4,
                "foodId" : 4005,
                "monthSaleNum" : 67,
                "zan" : 66,
                "price" : 30,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "沙拉--1",
                "typeId" : 5,
                "foodId" : 5001,
                "monthSaleNum" : 88,
                "zan" : 47,
                "price" : 24,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "沙拉--2",
                "typeId" : 5,
                "foodId" : 5002,
                "monthSaleNum" : 88,
                "zan" : 47,
                "price" : 24,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "沙拉--3",
                "typeId" : 5,
                "foodId" : 5003,
                "monthSaleNum" : 88,
                "zan" : 47,
                "price" : 24,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "沙拉--4",
                "typeId" : 5,
                "foodId" : 5004,
                "monthSaleNum" : 88,
                "zan" : 47,
                "price" : 24,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "沙拉--5",
                "typeId" : 5,
                "foodId" : 5005,
                "monthSaleNum" : 88,
                "zan" : 47,
                "price" : 24,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "沙拉--6",
                "typeId" : 5,
                "foodId" : 5006,
                "monthSaleNum" : 88,
                "zan" : 47,
                "price" : 24,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "沙拉--7",
                "typeId" : 5,
                "foodId" : 5007,
                "monthSaleNum" : 88,
                "zan" : 47,
                "price" : 24,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "沙拉--8",
                "typeId" : 5,
                "foodId" : 5008,
                "monthSaleNum" : 88,
                "zan" : 47,
                "price" : 24,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "甜点--1",
                "typeId" : 6,
                "foodId" : 6001,
                "monthSaleNum" : 144,
                "zan" : 90,
                "price" : 15,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "甜点--2",
                "typeId" : 6,
                "foodId" : 6002,
                "monthSaleNum" : 144,
                "zan" : 90,
                "price" : 15,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "甜点--3",
                "typeId" : 6,
                "foodId" : 6003,
                "monthSaleNum" : 144,
                "zan" : 90,
                "price" : 15,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "甜点--4",
                "typeId" : 6,
                "foodId" : 6004,
                "monthSaleNum" : 144,
                "zan" : 90,
                "price" : 15,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "甜点--5",
                "typeId" : 6,
                "foodId" : 6005,
                "monthSaleNum" : 144,
                "zan" : 90,
                "price" : 15,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "甜点--6",
                "typeId" : 6,
                "foodId" : 6006,
                "monthSaleNum" : 144,
                "zan" : 90,
                "price" : 15,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "饮料--1",
                "typeId" : 7,
                "foodId" : 7001,
                "monthSaleNum" : 79,
                "zan" : 42,
                "price" : 10,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "饮料--2",
                "typeId" : 7,
                "foodId" : 7002,
                "monthSaleNum" : 79,
                "zan" : 42,
                "price" : 10,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "饮料--3",
                "typeId" : 7,
                "foodId" : 7003,
                "monthSaleNum" : 79,
                "zan" : 42,
                "price" : 10,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "饮料--4",
                "typeId" : 7,
                "foodId" : 7004,
                "monthSaleNum" : 79,
                "zan" : 42,
                "price" : 10,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "饮料--5",
                "typeId" : 7,
                "foodId" : 7005,
                "monthSaleNum" : 79,
                "zan" : 42,
                "price" : 10,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "小炒--1",
                "typeId" : 8,
                "foodId" : 8001,
                "monthSaleNum" : 98,
                "zan" : 76,
                "price" : 20,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "小炒--2",
                "typeId" : 8,
                "foodId" : 8002,
                "monthSaleNum" : 98,
                "zan" : 76,
                "price" : 20,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "小炒--3",
                "typeId" : 8,
                "foodId" : 8003,
                "monthSaleNum" : 98,
                "zan" : 76,
                "price" : 20,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "小炒--4",
                "typeId" : 8,
                "foodId" : 8004,
                "monthSaleNum" : 98,
                "zan" : 76,
                "price" : 20,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "小炒--5",
                "typeId" : 8,
                "foodId" : 8005,
                "monthSaleNum" : 98,
                "zan" : 76,
                "price" : 20,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "小炒--6",
                "typeId" : 8,
                "foodId" : 8006,
                "monthSaleNum" : 98,
                "zan" : 76,
                "price" : 20,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "小炒--7",
                "typeId" : 8,
                "foodId" : 8007,
                "monthSaleNum" : 98,
                "zan" : 76,
                "price" : 20,
                "imageUrl" : "./img/caishi1.png"
            },
            {
                "foodName" : "小炒--8",
                "typeId" : 8,
                "foodId" : 8008,
                "monthSaleNum" : 98,
                "zan" : 76,
                "price" : 20,
                "imageUrl" : "./img/caishi1.png"
            }


        ],

        //购物车商品数量
        shoppingCartCount : 0,

        //购物车商品总价
        shoppingCartMoney : 0,

        //当前选中的菜品数据
        nowFoodDetail : {
            id : null,
            name : "",
            price : 0,
            sleCount : 0,
        },

        //购物车商品类型数量
        foodTypeCount : 0

    },

})