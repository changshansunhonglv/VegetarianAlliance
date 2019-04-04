//app.js
App({

  appUrl: "https://wxapp.lyysaas.com/book-web-applet/",
  appToken: null,
  globalData: {
    userInfo: null,
    fileID: null,
    cloudPath: null,
    imagePath: null
  },
  onLaunch: function() {
    // 展示本地存储能力 
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync("logs", logs)
    // 登录
  },

  //渐入，渐出实现 
  show: function(that, param, opacity) {
    var animation = wx.createAnimation({
      //持续时间800ms 
      duration: 800,
      timingFunction: 'ease',
    });
    //var animation = this.animation 
    animation.opacity(opacity).step() //将param转换为key
    var json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画 
    that.setData(json)
  },
  //滑动渐入渐出
  slideupshow: function(that, param, px, opacity) {
    var animation = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease',
    });
    animation.translateY(px).opacity(opacity).step()
    //将param转换为key
    var json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画
    that.setData(json)
  },
  //向右滑动渐入渐出
  sliderightshow: function(that, param, px, opacity) {
    var animation = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease',
    });
    animation.translateX(px).opacity(opacity).step() //将param转换为key 
    var json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export() //设置动画
    that.setData(json)
  },


  //get请求
  httpGet: function(url, params) {
    wx.showLoading({
      title: '加载中...',
    })
    let promise = new Promise(function(resolve, reject) {
      wx.request({
        url: url,
        data: params,
        method: 'GET',
        success: function(res) {
          resolve(res);
        },
        fail: function(res) {

          reject(res);
        },
        complete: function(res) {
          setTimeout(function() {
            wx.hideLoading()
          }, 500)
        }
      })
    });
    return promise;
  },
  //post请求
  httpPost: function(url, params) {
    wx.showLoading({
      title: '加载中...',
    })
    let promise = new Promise(function(resolve, reject) {
      wx.request({
        url: url,
        data: params,
        method: 'POST',
        header: {
          "Content-Type": "application/json", //post
        },
        success: function(res) {
          resolve(res);
        },
        fail: function(res) {
          reject(res);
        },
        complete: function(res) {
          setTimeout(function() {
            wx.hideLoading()
          }, 500)
        }
      })
    });
    return promise;
  },

  //网络监测
  networkMonitoring: function() {
    let promise = new Promise(function(resolve, reject) {
      wx.getNetworkType({
        success: function(res) {
          resolve(res)
        },
        fail: function(res) {
          reject(res)
          wx.showModal({
            title: '提示',
            content: '网络错误！',
          })
        }
      })
    })
    return promise;
  }

})