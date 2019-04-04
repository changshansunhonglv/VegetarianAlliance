// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData:{},//动画对象
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
  go:function(e){
    // console.log('d')
    // var animation = wx.createAnimation({
    //   duration: 800,
    //   timingFunction: 'ease',
    // });
    // let animation1 = animation
    // let animation2 = animation
    // let animation3 = animation

    // animation1.translateY(-250).step()
    // animation2.translateY(-250).step()
    // animation3.translateY(-250).step()
    // this.setData({
    //   animationData: animation1.export(),
    //   animationData: animation2.export(),
    //   animationData: animation3.export()
    // })
    wx.switchTab({
      url: '../../pages/home/home',
    })
  }
})