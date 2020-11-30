// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSelectAll: false,
    goodsList:[],
    totalAmount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCartList()
  },


  getCartList: function()
  {
    let _this=this;
    //发起网络请求
    wx.request({
      url: 'http://msk.mashukai.top/api/cart',
      data:{
        page:_this.data.page,   //分页 页号
        size:_this.data.pagesize
      },
      header: {
        'content-type': 'application/json'
      },
      success(res){
        _this.setData({
          data:res.data
        })
      }
    })
  },
  selectAll:function()
  {
    let _this = this;
    let isSelectAll = !_this.data.isSelectAll;
    let list = _this.data.data;
    let total = 0;

    list.forEach((item)=>{
      if(isSelectAll)   //全选
      {
        item.checked = true;
        total += item.buy_number * item.shop_price
      }else{
        item.checked = false;
      }
    })

    _this.setData({
      data:list,
      isSelectAll:isSelectAll,
      totalAmount:total
    })

  },
  //购物车单选
  selectGoods: function (e){
    console.log(e)
    let goods = e.detail.value    //获取checkbox中选中的value
    let list = this.data.data    //获取当前页面中的商品列表
    let total = 0;

    list.forEach((item)=>{
      item.checked = false;
      goods.forEach((item2)=>{
        if(item.goods_id==item2){
          item.checked = true;      //记录选中状态
          total += item.shop_price * item.buy_number   //计算新的总价
        }
      })
    })

    let isSelectAll =  list.every(function(item){   //遍历商品列表 检查是否全部勾选
      return item.checked;
    })

    this.setData({
      totalAmount:total,
      isSelectAll:isSelectAll
    })

  },
  delGoods:function()
  {
    let _this = this;
    let selectGoods = [];
    let list = _this.data.goodsList;
    let token = wx.getStorageSync('token')
    console.log(_this);
    console.log(selectGoods);
    console.log(list);
    console.log(token);
    list.forEach(item=>{
      if(item.checked){   //选中的商品
        selectGoods.push(item.goods_id)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})