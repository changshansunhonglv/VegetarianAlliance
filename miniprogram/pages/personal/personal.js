// pages/myPage/myPage.js
import pageState from '../../utils/pageState.js'
const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    animationData: {},
    animationData2: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    const page = pageState(that);
    page.finish()
  },
  getUserInfo: function(e) {
    var that = this;
    const page = pageState(that);
    page.finish()
    console.log(e)
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      console.log('/用户按了允许授权按钮')
      console.log(e.detail.userInfo)
      wx.login({
        success(res) {
          if (res.code) {
            // 发起网络请求
            app.httpGet(`${app.appUrl}weixin/getOpenId/${res.code}`).then((res) => {
              console.log('登录')
              console.log(res)
              //正常显示
              if (false) {
                page.empty()
                return;
              } else {
                page.finish()
                app.globalData.userInfo = e.detail.userInfo
                app.appToken = res.data.resultData.token
                wx.setStorageSync('userId', res.data.resultData.userId)
                wx.setStorageSync('openId', res.data.resultData.openId)
                that.setData({
                  userInfo: e.detail.userInfo,
                  hasUserInfo: true
                })
              }
  //             var animation = wx.createAnimation({
  //               //持续时间800ms 
  //               duration: 100,
  //               timingFunction: 'ease',
  //             });
  //             animation.opacity(0.1).scale(0.2).step()
  //             animation.opacity(0.3).scale(0.4).step()
  //             animation.opacity(0.5).scale(0.5).step()
  //             animation.opacity(0.7).scale(0.7).step()
  //             animation.opacity(0.9).scale(0.9).step()
  //             animation.opacity(1).scale(1).step()
  //             setTimeout(function() {
  //               that.setData({
  //                 animationData: animation.export()
  //               })
  //             }.bind(that), 500);

            

            }, (res) => {
              console.log(res)
              page.error();
            })

          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    } else {
      //用户按了拒绝按钮
      console.log('//用户按了拒绝按钮')
      wx.showModal({
        title: '提示',
        content: '未授权，无法体验预约功能',
        showCancel: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  onShow: function () {
    let hasUserInfo = app.globalData.userInfo == null || app.appToken == null?false:true;
      this.setData({
        userInfo:app.globalData.userInfo,
        hasUserInfo
    })
    console.log(hasUserInfo)
    console.log(app.globalData.userInfo)
    setTimeout(function () {
      app.slideupshow(this, 'slide_up0', 0, 1)
    }.bind(this), 200);
    setTimeout(function () {
      app.slideupshow(this, 'slide_up1', 0, 1)
    }.bind(this), 400);
  
  },
  onHide: function () {
    app.slideupshow(this, 'slide_up0', 200, 0)
    app.slideupshow(this, 'slide_up1', 200, 0)
  },

  /**
   * 跳转消息页面
   */
  goXiaoxiPage: function() {
    console.log(wx.getStorageSync('userId'))
    if (wx.getStorageSync('userId') == null || wx.getStorageSync('userId') == "") {
      wx.showModal({
        title: '提示',
        content: '请先授权登录',
        showCancel: false
      })

      return;
    } else if (app.appToken == null || app.appToken == "") {
      wx.showModal({
        title: '提示',
        content: '登录凭证已过期，请重新登录',
        showCancel: false
      })
      return;
    } else {
      wx.showLoading({
        title: '加载中...',
      })
      wx.navigateTo({
        url: '../../pages/personal/message/message',
        complete: function() {
          setTimeout(function() {
            wx.hideLoading()
          }, 2000)
        }
      })

    }
  },
  showOrder: function(e) {
    if (wx.getStorageSync('userId') == null || wx.getStorageSync('userId') == "") {
      wx.showModal({
        title: '提示',
        content: '您未授权登录，无法查看订单',
        success: (res) => {
          if (res.confirm) {
            console.log('用户点击确定')

          } else if (res.cancel) {
            console.log('用户点击取消')
            page.empty()
          }
        }
      })
    } else {
      if (e.currentTarget.id == 0) {
        wx.switchTab({
          url: '../../pages/order/order',
        })
      } else if (e.currentTarget.id == 1) {
        wx.navigateTo({
          url: '../../pages/personal/order/order?id=' + e.currentTarget.id,
        })
      } else {
        wx.navigateTo({
          url: '../../pages/personal/order/order?id=' + e.currentTarget.id,
        })
      }
    }

  },
  /**
   * 常用信息页面
   */
  goInformationPage: function() {
    console.log(wx.getStorageSync('userId'))
    if (wx.getStorageSync('userId') == null || wx.getStorageSync('userId') == "") {
      wx.showModal({
        title: '提示',
        content: '请先授权登录',
        showCancel: false
      })

      return;
    } else if (app.appToken == null || app.appToken == "") {
      wx.showModal({
        title: '提示',
        content: '登录凭证已过期，请重新登录',
        showCancel: false
      })
      return;
    } else {
      wx.showLoading({
        title: '加载中...',
      })
      wx.navigateTo({
        url: '../../pages/personal/commondata/commondata',
        complete: function() {
          setTimeout(function() {
            wx.hideLoading()
          }, 2000)
        }
      })
    }
  },
  /**
   * 跳转问题页面
   */
  goMeassagePage: function() {
    console.log(wx.getStorageSync('userId'))
    if (wx.getStorageSync('userId') == null || wx.getStorageSync('userId') == "") {
      wx.showModal({
        title: '提示',
        content: '请先授权登录',
        showCancel: false
      })

      return;
    } else if (app.appToken == null || app.appToken == "") {
      wx.showModal({
        title: '提示',
        content: '登录凭证已过期，请重新登录',
        showCancel: false
      })
      return;
    } else {
      wx.showLoading({
        title: '加载中...',
      })
      wx.navigateTo({
        url: '../../pages/personal/commonproblem/commonproblem',
        complete: function() {
          setTimeout(function() {
            wx.hideLoading()
          }, 2000)
        }
      })
    }

  },
  bindViewTap: function() {
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease',
    });
    animation.rotate(5).step()
    animation.rotate(-5).step()
    animation.rotate(10).step()
    animation.rotate(-10).step()
    animation.rotate(10).step()
    animation.rotate(-10).step()
    animation.rotate(5).step()
    animation.rotate(0).step()
    setTimeout(function() {
      this.setData({
        animationData2: animation.export()
      })
    }.bind(this), 500);
  }
})