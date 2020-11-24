// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl:[
      "https://img13.360buyimg.com/pop/s590x470_jfs/t1/113259/14/17575/86499/5f5acbc0E1d486e94/b925a70d98ebe7f9.jpg.webp",
      "https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1830914723,3154965800&fm=26&gp=0.jpg",
      "https://img13.360buyimg.com/pop/s590x470_jfs/t1/149049/7/14683/69082/5fb479ebE3f79abb4/ea8edcfb5682d4c0.jpg.webp"
    ],
     /*轮播图 配置*/
    indicatorDots: true, // 是否显示面板指示点
    autoplay: true, // 是否自动切换
    interval: 1500, // 自动切换时间间隔
    duration: 500, // 滑动动画时长
    circular: true, // 是否采用衔接滑动
    /*自定义轮播图 配置*/
    swiperCurrent: 0
    },
     
  bthCart:function(e)
  {
    //获取被点击的 商品id
    //切换至 详情页
    wx.redirectTo({
      url: '/pages/cart/cart'
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    let goods_id = options.id;    //获取商品id
    let access_token = wx.getStorageSync('token')
  //获取商品信息
    wx.request({
      url: 'http://msk.mashukai.top/api/list',
      data: {
        goods_id:options.goods_id,
        access_token: access_token
      },
      header: {
        'content-type': 'application/json'
      },
      success(res){
        // console(res);
        console.log(res)
        _this.setData({
          data:res.data

        })
      }
    })

  },
  swiperChange: function (e) {
    //只要把切换后当前的index传给<swiper>组件的current属性即可 
    this.setData({
    swiperCurrent: e.detail.current
    })
    },
    //点击指示点切换 
    chuangEvent: function (e) {
    this.setData({
    swiperCurrent: e.currentTarget.id
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