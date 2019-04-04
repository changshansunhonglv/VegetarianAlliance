// pages/personal/commonproblem/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInput: '', //输入值
    images:[],//问题图片
    contactUser:''//联系人
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  chooseImage(e) {
    wx.chooseImage({
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        console.log(res)
        const images = this.data.images.concat(res.tempFilePaths)
        // 限制最多只能留下3张照片
        this.data.images = images.length <= 4 ? images : images.slice(0, 4)
        this.setData({
          images:this.data.images
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
      current: images[index],  //当前预览的图片
      urls: images,  
    })
  },
  /**
   * 删除图片
   */
  deleteImg: function (e) {
    var that=this;
    console.log('移除')
    console.log(e)
    wx.showActionSheet({
      itemList: ['移除图片'],
      success: function (res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          let index = e.target.dataset.index
          that.data.images.splice(index, 1)
          that.setData({
            images: that.data.images
          })
        }
      }
    })
  },


  submitForm(e) {
    console.log(e)
 
    
  //   if (title && content) {
  //     const arr = []

  //     //将选择的图片组成一个Promise数组，准备进行并行上传
  //     for (let path of this.data.images) {
  //       arr.push(wxUploadFile({
  //         url: config.urls.question + '/image/upload',
  //         filePath: path,
  //         name: 'qimg',
  //       }))
  //     }
  //     wx.showLoading({
  //       title: '正在创建...',
  //       mask: true
  //     })

  //     // 开始并行上传图片
  //     Promise.all(arr).then(res => {
  //       // 上传成功，获取这些图片在服务器上的地址，组成一个数组
  //       return res.map(item => JSON.parse(item.data).url)
  //     }).catch(err => {
  //       console.log(">>>> upload images error:", err)
  //     }).then(urls => {
  //       // 调用保存问题的后端接口
  //       return createQuestion({
  //         title: title,
  //         content: content,
  //         images: urls
  //       })
  //     }).then(res => {
  //       // 保存问题成功，返回上一页（通常是一个问题列表页）
  //       const pages = getCurrentPages();
  //       const currPage = pages[pages.length - 1];
  //       const prevPage = pages[pages.length - 2];

  //       // 将新创建的问题，添加到前一页（问题列表页）第一行
  //       prevPage.data.questions.unshift(res)
  //       $digest(prevPage)

  //       wx.navigateBack()
  //     }).catch(err => {
  //       console.log(">>>> create question error:", err)
  //     }).then(() => {
  //       wx.hideLoading()
  //     })
  //   }
  }

})