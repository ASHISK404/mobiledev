// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[ ],
    searchValue:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let db = wx.cloud.database() 
    let userCollection = db.collection('goods')
    userCollection.where({_id: this.data.dataId}).get().then(res => {
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
  //监听页面滑动距离判断搜索栏的背景色
  onPageScroll: function (e) {
    this.setData({
      scrollTop: e.scrollTop
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let db = wx.cloud.database() 
    let userCollection = db.collection('goods')
    userCollection.where({_id: this.data.dataId}).get().then(res => {
      console.log('数据查询成功',res)
      this.setData({
        list: res.data
      })
    }).catch(err => {
      console.log('查询失败',err)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
toType:function(e){
  var app = getApp();
  console.log(e.currentTarget.dataset.id)
  var cid= e.currentTarget.dataset.id
  getApp().globalData.cid = cid;
  wx.switchTab({
    url: '../kind/kind'
  });
},
  toDetail:function(e){
    console.log(e.currentTarget.dataset.obj._id)
    wx.navigateTo({
      url: '../detail/detail?id='+e.currentTarget.dataset.obj._id,
    })
  },
  // 搜索栏input回调
  searchValue: function (res) {

    this.setData({
      searchValue: res.detail.value
    })
  },
  // 搜索栏搜索图标
  search: function (res) {
    console.log(this.data.searchValue)
      var url = '../home/search/search?name='+this.data.searchValue;
    wx.navigateTo({
      url: url,
    })
  }
 
})