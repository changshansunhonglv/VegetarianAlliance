// pages/personal/commonproblem/feedback/feedback.js

const app = getApp();
const regeneratorRuntime = app.regeneratorRuntime;
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userTitle: '', //标题
    userInput: '', //输入值
    images: [], //图片
    avatarUrl: "../../images/youke.png",
    nickName: "游客",
    addressObj: {
      address: "",
      errMsg: "",
      latitude: null,
      longitude: null,
      name: "",
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.cloud.init()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  bindWordLimit: function(e) {
    var that = this;
    that.setData({
      userInput: e.detail.value
    })
  },
  doUpload: function() { // 选择图片
    var that = this;
    const filePath = that.data.images
    var cloudPath = [];
    var promiseArry = [];
    filePath.forEach((item, i) => {
      cloudPath.push(util.formatTimestamp(new Date()) + '_' + i + filePath[i].match(/\.[^.]+?$/)[0])
    })
    filePath.forEach((item, i) => {
      let wake = new Promise((resolve, reject) => {
        wx.cloud.uploadFile({
          cloudPath: cloudPath[i],
          filePath: item, // 文件路径
          success: function(res) {
            resolve(res);
          },
          fail: function(res) {
            reject(res);
          }
        })
      })
      promiseArry.push(wake);
    })
    return promiseArry
  },
  submitForm: function(e) {
    var that = this;
    wx.showLoading({
      title: '上传中...',
    })
    if (wx.getStorageSync('userInfo')) {
      console.log(wx.getStorageSync('userInfo'))
      that.setData({
        avatarUrl: wx.getStorageSync('userInfo').avatarUrl,
        nickName: wx.getStorageSync('userInfo').nickName
      })
    }
    var imgFileId = [];
    Promise.all(that.doUpload()).then((res) => {
      console.log(res)
      res.forEach((item, i) => {
        imgFileId.push(item.fileID)
      })
      
      const db = wx.cloud.database()
      db.collection('forum').add({
        data: {
          content: e.detail.value.textarea,
          pubdate: util.formatTime(new Date()),
          img: imgFileId,
          nickName: that.data.nickName,
          avatarUrl: that.data.avatarUrl,
          title: e.detail.value.userTitle,
          address: that.data.addressObj,

        }
      }).then(res => {
        console.log(res)
        setTimeout(function() {
          wx.hideLoading()
        }, 500)
        wx.showModal({
          title: '提示',
          content: '发表成功',
          success: (res) => {
            if (res.confirm) {
              wx.switchTab({
                url: '../../pages/home/home',
              })
            } else if (res.cancel) {
              that.setData({
                userTitle: '', //标题
                userInput: '', //输入值
                images: [], //图片
                addressObj: {
                  address: "",
                  errMsg: "",
                  latitude: null,
                  longitude: null,
                  name: "",
                }
              })
            }
          }
        })
      })
    }).catch((error) => {

    })
    //添加操作

  },
  chooseImage(e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        console.log(res)
        const images = this.data.images.concat(res.tempFilePaths)
        // 限制最多只能留下3张照片
        this.data.images = images.length <= 4 ? images : images.slice(0, 4)
        this.setData({
          images: this.data.images
        })

      }
    })

  },
  /**
   * 预览
   */
  preview(e) {
    const index = e.target.dataset.index
    const images = this.data.images
    wx.previewImage({
      current: images[index], //当前预览的图片
      urls: images,
    })
  },
  /**
   * 删除图片
   */
  deleteImg: function(e) {
    var that = this;
    console.log('移除')
    console.log(e)
    wx.showActionSheet({
      itemList: ['移除图片'],
      success: function(res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          let index = e.target.dataset.index
          that.data.
          images.splice(index, 1)
          that.setData({
            images: that.data.images
          })
        }
      }
    })
  },

  /**
   * 获取地址
   */
  openMap: function() {
    var that = this;
    wx.chooseLocation({
      success: function(res) {
        console.log(res);
        that.setData({
          addressObj: res
        })
      },
      fail: function(res) {
        wx.showModal({
          title: '提示',
          content: '未授权地理位置，请前往设置中授权。',
          showCancel: false
        })
      }
    })
  }

})