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
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        wx.showLoading({
          title: '上传中',
        })
        const filePath = res.tempFilePaths[0]
        that.setData({
          imgUrl: filePath
        })
        // 上传图片
        const cloudPath = that.data.count + filePath.match(/\.[^.]+?$/)[0]
        //改写: 数组 多图片 
        // const filePath = res.tempFilePaths, cloudPath = [];
        // filePath.forEach((item, i)=>{
        // cloudPath.push(that.data.count + '_' + i + filePath[i].match(/\.[^.]+?$/)[0]) 
        // }) 
        console.log(cloudPath)
        // filePath.forEach((item, i) => { 
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', cloudPath, res)
            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
        // }) 
      },
      fail: e => {
        console.error(e)
      }
    })
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
  submitForm: async function(e) {
    console.log(e)
    var that = this;

    var promisify = new Promise({

    })
    filePath.forEach((item, i) => {
      cloudPath.push('shl' + '_' + i + filePath[i].match(/\.[^.]+?$/)[0])
    })
    await  filePath.forEach(async (item, i) => {
     var res=  await wx.cloud.uploadFile({
        cloudPath: cloudPath[i],
        filePath: item, // 文件路径
      })  
      console.log(res)
      imgFileId.push(res.fileID)
    })
    console.log(imgFileId)
//添加操作
    // let pudate = new Date();
    // const db =  wx.cloud.database()
    //  db.collection('forum').add({
    //   data: {
    //     content: e.detail.value.textarea,
    //     pubdate: util.formatTime(pudate),
    //     img: imgFileId,
    //     title: e.detail.value.userTitle,
    //     address: that.data.addressObj
    //   }
    // }).then((res) => {
    //   console.log(res)
    //   wx.showToast({
    //     title: "添加成功"
    //   })
    // })
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
    })
  }

})