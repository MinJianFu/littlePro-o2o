
let {WeToast} = require('components/toast/toast.js');
let {alertBox} = require('components/alertBox/alertBox.js');
let {o2oAjax, wxLogin} = require("utils/util.js");
const QQMapWX = require('./qqmap/qqmap-wx-jssdk.min');
var qqmapsdk;

//app.js
App({
    o2oAjax,
    WeToast,
    alertBox,
    onLaunch: function () {
    //调用API从本地缓存中获取数据
        let logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
        
        //进app做一次登录
        wxLogin();
        //实例化qq地图
        qqmapsdk = new QQMapWX({
            key: 'QYFBZ-D7VHS-3DYOO-6MFPT-7PMYE-6WF6X'
        });
        
        
        ///获取地址
        if(this.globalData.location == ''){
            wx.getLocation({
                type:'gcj02',
                success:(res)=>{
                    this.globalData.location = res.latitude+','+res.longitude;
                    this.getDetailLocation(res.latitude, res.longitude);
                }
            })
        }

    },
    getDetailLocation : function(lat, lgt){
        qqmapsdk.reverseGeocoder({
            location: {
                latitude: lat,
                longitude: lgt
            },
            success: (res) => {
                this.globalData.locationCity = res.result.ad_info.city;
            },
            fail: function(res) {
                console.log(res);
            }
        });

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
        location:'',
        locationCity : "",

        //模拟菜单数据
        menuData : [
            {
                "name" : "热销榜",
                "menuId" : "1",
                "active" : "1",
                "showIcon": true
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
        foodsData:[
          {
            "foodsName":"[RIO锐澳]伏特加鸡尾酒滨治味",
            "foodsWeight":"275ml/瓶",
            "foodsSellout":"23",
            "foodsPraise":"50%",
            "foodsMoney":"50",
            "foodsCount":"0",
            "foodsId":"1_1",
            "foodsTypeId":"1",
          },
          {
            "foodsName":"[RIO锐澳]伏特加鸡尾酒滨治味",
            "foodsWeight":"800ml/瓶",
            "foodsSellout":"999",
            "foodsPraise":"99%",
            "foodsMoney":"80",
            "foodsCount":"0",
            "foodsId":"1_2",
            "foodsTypeId":"1",
          },
          {
            "foodsName":"[经典]1906香烟",
            "foodsWeight":"200ml/包",
            "foodsSellout":"23",
            "foodsPraise":"50%",
            "foodsMoney":"18",
            "foodsCount":"0",
            "foodsId":"1_3",
            "foodsTypeId":"2",
          },
          {
            "foodsName":"[RIO锐澳]白兰地鸡尾酒滨治味",
            "foodsWeight":"275ml/瓶",
            "foodsSellout":"23",
            "foodsPraise":"50%",
            "foodsMoney":"50",
            "foodsCount":"0",
            "foodsId":"1_4",
            "foodsTypeId":"2",
          },
          {
            "foodsName":"[RIO锐澳]白兰地鸡尾酒滨治味",
            "foodsWeight":"275ml/瓶",
            "foodsSellout":"23",
            "foodsPraise":"50%",
            "foodsMoney":"50",
            "foodsCount":"0",
            "foodsId":"1_5",
            "foodsTypeId":"3",
          },
          {
            "foodsName":"[经典]1906香烟",
            "foodsWeight":"200ml/包",
            "foodsSellout":"23",
            "foodsPraise":"50%",
            "foodsMoney":"18",
            "foodsCount":"0",
            "foodsId":"1_6",
            "foodsTypeId":"4",
          },
          {
            "foodsName":"[RIO锐澳]伏特加鸡尾酒滨治味",
            "foodsWeight":"275ml/瓶",
            "foodsSellout":"23",
            "foodsPraise":"50%",
            "foodsMoney":"50",
            "foodsCount":"0",
            "foodsId":"1_7",
            "foodsTypeId":"5",
          },
          {
            "foodsName":"[经典]1906香烟",
            "foodsWeight":"200ml/包",
            "foodsSellout":"23",
            "foodsPraise":"50%",
            "foodsMoney":"18",
            "foodsCount":"0",
            "foodsId":"1_8",
            "foodsTypeId":"5",
          },
          {
            "foodsName":"[经典]1906香烟",
            "foodsWeight":"200ml/包",
            "foodsSellout":"23",
            "foodsPraise":"50%",
            "foodsMoney":"18",
            "foodsCount":"0",
            "foodsId":"1_9",
            "foodsTypeId":"6",
          },
          {
            "foodsName":"[RIO锐澳]伏特加鸡尾酒滨治味",
            "foodsWeight":"275ml/瓶",
            "foodsSellout":"23",
            "foodsPraise":"50%",
            "foodsMoney":"50",
            "foodsCount":"0",
            "foodsId":"1_9",
            "foodsTypeId":"6",
          },
        ],
        //模拟评论数据
        foodrating:[
          {
            "ratingName":"3*********4",
            "ratingtime":"2018-03-12",
            "star":"3.2",
            "ratingdesc":"40分钟送达",
            "ratingcontent":"超级难吃",
            "ratingava":"./img/ava.png",
            "ratingTypeid":1,
            "starId":1,
            "starShow":[]
          },
          {
            "ratingName":"3*********4",
            "ratingtime":"2018-03-12",
            "star":"4.2",
            "ratingdesc":"40分钟送达",
            "ratingcontent":"超级难吃",
            "ratingava":"./img/ava.png",
            "ratingTypeid":1,
            "starId":2,
            "starShow":[]
          },
          {
            "ratingName":"3*********4",
            "ratingtime":"2018-03-12",
            "star":"4.5",
            "ratingdesc":"40分钟送达",
            "ratingcontent":"超级好吃",
            "ratingava":"./img/ava.png",
            "ratingTypeid":2,
            "starId":5,
            "starShow":[]
          },
          {
            "ratingName":"3*********4",
            "ratingtime":"2018-03-12",
            "star":4.3,
            "ratingdesc":"40分钟送达",
            "ratingcontent":"一般般11111",
            "ratingava":"./img/ava.png",
            "ratingTypeid":3,
            "starId":6,
            "starShow":[]
          },
          {
            "ratingName":"3*********4",
            "ratingtime":"2018-03-12",
            "star":"2",
            "ratingdesc":"40分钟送达",
            "ratingcontent":"一般般",
            "ratingava":"./img/ava.png",
            "ratingTypeid":3,
            "starId":7,
            "starShow":[]
          }
        ],
        ratingTab:[
          {
           "tabText":"可以",
            "tabCount":"3",
            "tabTypeId":1,
            "active":1
          },
          {
            "tabText":"一般",
            "tabCount":"3",
            "tabTypeId":2
          },
          {
            "tabText":"不可以",
            "tabCount":"3",
            "tabTypeId":3
          }
        ],
        //选中菜品数据
        //店铺信息数据
        ShopNews:[
        {
          "ShopTitle":"闪电购便利店(赤岗店)",
          "ShopmsgA":"商家配送",
          "ShopmsgB":"28分钟送达",
          "deliveryCost":"3",    //配送费
          "notice":"公告：1、维权电话400-991-3131，您的1小时送达 2、维权电话400-991-3131，您的1小时送达",
          "ServiceAttitude":"4.5",       //商家服务评分
          "Saste":"4.6",            //商家味道评分
          "deliveryTime":40,         //估计送达时间
          "evaluate":4.7,            //商家总评分
          "exceed":"91",            //比周边商家高 * %
          "allrating":"800",         //全部评论数
          "onlinepay":"5"      //在线支付优惠
        }
      ],
        //活动信息数据
        activity:[
          {
            "activityInfo":"百事可乐1元秒杀",
            "activityIcon":"./img/font-jian.png"
          },
          {
            "activityInfo":"百事可乐11元秒杀",
            "activityIcon":"./img/font-jian.png"
          },
          {
            "activityInfo":"百事可乐111元秒杀",
            "activityIcon":"./img/font-jian.png"
          }
        ],
        //模拟编好数据
        remarksB:[
          {
            "remarksBname":"加奶",
            "remaId":"1",
            "seleState":"0",
            "isSle":""
          },
          {
            "remarksBname":"加珍珠",
            "remaId":"2",
            "seleState":"0"
          },
          {
            "remarksBname":"多点茶",
            "remaId":"3",
            "seleState":"0"
          },
          {
            "remarksBname":"少点水",
            "remaId":"4",
            "seleState":"0"
          }
        ],
        redbag:[{
            "redbagdesc":"不使用红包",
            "redbagnum":"10",
        }],
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