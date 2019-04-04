// pages/personal/message/messagedetails/messagedetails.js
import pageState from '../../../../utils/pageState.js'
const util = require('../../../../utils/util.js')
const app = getApp()

Page({
  data: {
    resultData: []
  },//网络监测
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
    app.httpGet(`${app.appUrl}noticeInfo/{id}`, ).then((res) => {
 
      //正常显示
      if (false) {
        page.empty()
        return;
      } else {
        page.finish()
        try{
          that.setData({
            resultData: res.data.resultData
          })
        }
        catch(res){
          console.log(res)
        }

      
      }
      //动态标题
      wx.setNavigationBarTitle({
        title: "消息详情",
      })

    }, (res) => {
      console.log(res)
      page.error();
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.onRetry();
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