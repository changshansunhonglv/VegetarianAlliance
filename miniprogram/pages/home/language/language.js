// pages/home/language/language.js
const app = getApp();
const regeneratorRuntime = app.regeneratorRuntime;
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment:'',
    resultData: {},
    pageSize:10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    const db = wx.cloud.database()
    const forum = db.collection('forum')
    console.log(forum)
    try {
      const todo = db.collection('forum').doc(options.id).get().then(res => {
        console.log(res.data)
        that.setData({
          resultData: res.data
        })
      })
    } catch (e) {

    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //添加评论
  submitForm: function(e) {
    if (e.detail.value.comment == "") {
      return
    }
    console.log(e)
    var that = this;

    const db = wx.cloud.database();
    db.collection('comment').add({
      data: {
        forumId: that.data.resultData._id, //id
        recipient: that.data.resultData._openid,
        content: e.detail.value.comment,
        pubdate: util.formatTime(new Date()),
        senderName:'',
        senderImg:''
      }
    }).then(res=>{
      console.log(res);
      wx.showToast({
        title: '评论成功！',
        mask:true,
        success:res=>{
        console.log(res)
        that.setData({
          comment:''
        })
        }
      })
    }).catch(res=>{

      console.log(res)

    })
  },
  /** * 获取列表数据 * */
  getData: function (page) {
    var that = this;
    const db = wx.cloud.database();
    // 获取总数 
    db.collection('comment').count({
      success: function (res) {
        that.data.totalCount = res.total;
      }
    }) // 获取前十条 
    try {
      db.collection('comment').limit(that.data.pageSize) // 限制返回数量为 10 条 
        .orderBy('pubdate', 'desc')
        .get({
          success: function (res) {
            // res.data 是包含以上定义的两条记录的数组
            console.log(res)
            that.data.resultData = res.data;
            that.setData({
              resultData: that.data.resultData,
            })
            wx.hideNavigationBarLoading();
            //隐藏加载 
            wx.stopPullDownRefresh();
          },
          fail: function (event) {
            wx.hideNavigationBarLoading(); //隐藏加载 
            wx.stopPullDownRefresh();
          }
        })
    } catch (e) {
      wx.hideNavigationBarLoading(); //隐藏加载 
      wx.stopPullDownRefresh();
      console.error(e);
    }
  },
})