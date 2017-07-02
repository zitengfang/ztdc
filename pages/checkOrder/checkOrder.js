Page({
  data: {
    tableNum: ['01', '02', '03', '04'],
    tableIdx: 0,
    discountItems: [{
      key: '优惠金额',
      data: '4'
    },{
      key: "会员折扣",
      data: '10'
    }],
    orderPrice: 0
  },
  bindPickerChange: function(e) {
    console.log(e, e.detail.value)
    this.setData({
      tableIdx: e.detail.value
    })
  },
  onLoad: function() {
    var orderLists = wx.getStorageSync('orderLists'),
        orderPrice = this.data.orderPrice,
        discountItems = this.data.discountItems;
    orderLists.forEach(function(orderList){
      orderPrice += orderList.foodPrice * orderList.foodQuantity;
    })
    discountItems.forEach(function(discountItem){
      orderPrice -= discountItem.data;
    })
    
    this.setData({
      orderLists: orderLists,
      orderPrice: orderPrice
    })
  }
})