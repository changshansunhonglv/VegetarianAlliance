// pages/personal/message/message.js


import pageState from '../../../utils/pageState.js'
const util = require('../../../utils/util.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    resultData: {},
    showSkeleton: true   //骨架屏显示隐藏
  },
  onRetry: function () {
    var that = this;
    const page = pageState(that);
    app.networkMonitoring().then((res) => {
      if (res.networkType == "none") {
        page.error();
        return;
      } else {
        that.shujuload(that, page);
      }
    })
  },
  //加载请求
  shujuload: function (that, page) {
    app.httpGet(`${app.appUrl}noticeInfo/page`, {
      tenantId: "1019869693820678115",
      pageCurrent:1,
      pageSize: 10
    }).then((res) => {
      console.log(res);
      //正常显示
      if (false) {
        page.empty()
        return;
      } else {
        page.finish()
        that.setData({
          resultData: res.data.resultData
        })
      }
     

    }, (res) => {
      console.log(res)
      page.error();
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    // setTimeout(() => {     //3S后隐藏骨架屏
    //   that.setData({
    //     showSkeleton: false
    //   })
    // }, 3000)
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    that.onRetry();
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
  messageDetails:function(){
    wx.navigateTo({
      url: '../../../pages/personal/message/messagedetails/messagedetails',
    })
  }
})