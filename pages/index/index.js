//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    navs: [],
    foods: [],
    totalPrice: 0,
    currentTypeId: 0
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  changeType: function (e) {
    this.setData({
      currentTypeId: e.currentTarget.dataset.totypeid
    })
  },
  ctrlFood: function (e) {
    var foods = this.data.foods,
      totalPrice = this.data.totalPrice,
      dataset = e.currentTarget.dataset,
      key = dataset.key,
      action = dataset.action;
    if (action && action == 'add') {
      foods[key].quantity += 1;
      totalPrice += foods[key].price;
    } else if (action && action == 'del') {
      foods[key].quantity -= 1;
      totalPrice -= foods[key].price;
    }
    this.setData({
      foods: foods,
      totalPrice: totalPrice
    });
  },
  checkOrder: function (e) {
    var foods = this.data.foods,
      orderLists = [];
    foods.forEach(function (food, idx) {
      if (food.quantity) {
        var newOrder = {
          foodId: food.id,
          foodName: food.name,
          foodQuantity: food.quantity,
          foodPrice: food.price
        };
        orderLists.push(newOrder);
        console.log('eeeeeeeeee');
      }
    })
    wx.removeStorageSync("orderLists");
    wx.setStorage({
      key: "orderLists",
      data: orderLists
    })
  },
  onLoad: function () {
    var that = this;
    this.requestFood(function (retData) {
      that.setData({
        navs: retData.data.navs,
        foods: retData.data.foods,
        totalPrice: retData.data.totalPrice,
        currentTypeId: retData.data.currentTypeId
      });

      //调用应用实例的方法获取全局数据
      app.getUserInfo(function (userInfo) {
        console.log(userInfo);
        //更新数据
        that.setData({
          userInfo: userInfo
        });
        that.update();
      });
    });
  },
  //自定义函数
  //请求餐饮信息
  requestFood: function (callback) {
    var self = this;
    wx.request({
      url: 'http://127.0.0.1:60000/',
      data: {
        noncestr: Date.now()
      },
      success: function (result) {
        //self.data = result.data;
        callback(result.data);
        //console.log('request success', result.data);
      },
      fail: function () {
        callback(null);
      }
    })
  }
})
