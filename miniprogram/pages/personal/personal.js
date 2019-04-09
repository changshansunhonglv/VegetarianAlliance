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
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    animationData: {},
    animationData2: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    const page = pageState(that);
    page.finish()
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },
  getUserInfo: function(e) {
    var that = this;
    const page = pageState(that);
    page.finish()
    if (!this.logged && e.detail.userInfo) {
      console.log(e.detail.userInfo)
      wx.setStorageSync('userInfo', e.detail.userInfo)
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },
  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
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