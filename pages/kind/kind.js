// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    list: [ ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    var cid = app.globalData.cid;
    console.log("这是"+app.globalData.cid)
    this.setData({
      currentTab: cid
    })
    console.log("这是"+cid)
    let db = wx.cloud.database() 
    let userCollection = db.collection('goods')
    userCollection.where({_id: options.id}).get().then(res => {
      console.log('数据查询成功',res)
      this.setData({
        list: res.data
      })
    }).catch(err => {
      console.log('查询失败',err)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      currentTab: this.data.currentTab
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.refreshData();
  },
  refreshData() {
    var app = getApp();
    this.setData({
      currentTab: app.globalData.cid
    });
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

  toDetail: function (e) {
    console.log(e.currentTarget.dataset.obj._id)
    wx.navigateTo({
      url: '../detail/detail?id='+e.currentTarget.dataset.obj._id,
    })
  },
  clickTab:function(e){
    let self=this
    let current = e.currentTarget.dataset.current;
    self.setData({
      currentTab: current
    })
  }
})