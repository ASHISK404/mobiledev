// pages/my/my.js
var app = getApp();
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    userData: null,
    list:[ ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    console.log(app.globalData.user)
    if (app.globalData.user&&app.globalData.user!=='') {
      this.setData({
        userData: app.globalData.user
      })
    } else {
      this.setData({
        userData: null
      })
    }
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
    var app = getApp();
    console.log(app.globalData.user)
    if(app.globalData.user&&app.globalData.user!==''){
      let db = wx.cloud.database() 
      let userCollection = db.collection('user')
      userCollection.where({username: app.globalData.user}).get().then(res => {
        console.log('数据查询成功',res)
        this.setData({
          list: res.data
        })
      }).catch(err => {
        console.log('查询失败',err)
      })
    }
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
  Tologin: function (e) {
    var app = getApp();
    console.log(app.globalData.user)
    if(app.globalData.user&&app.globalData.user!==''){
      getApp().globalData.user = null;
      this.setData({
        list: null
      })
      this.onLoad()
    }else{
      wx.navigateTo({
        url: '../my/login/login',
      })
    }
  },
})