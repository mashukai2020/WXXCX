// pages/myself/myself.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bthLogin: function(e){
    wx.login({
      success (res) {
        console.log(res)
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://msk.mashukai.top/login/xcx?code='+res.code,
            // header: {
              // 'token': 'resspan.token'
            // },
            data: {
              code: res.code,
            },
            success:function(d){
              //获取登入的token
              wx.setStorage({
                key:"token",
                data:d.data.data.token
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

  },
    /**
   * 处理登录
   */
  login:function(u)
  {
    //获取用户信息
    let userinfo = u.detail.userInfo;
    let token = wx.getStorageSync('token')
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://msk.mashukai.top/api/getuser?code=' + res.code +'&token='+token,
            method: 'post',
            header:{'content-type':'application/json'},
            data: {
              u: userinfo
            },
            success: function(res){
              wx.setStorageSync('token',res.data.data.token)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  getToken:function()
  {
    console.log(wx.getStorageSync('token'))
  }
})