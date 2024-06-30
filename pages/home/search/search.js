// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    indicatorDots: true,
    indicatorColor: "#000000",
    indicatorActiveColor: "#e91e56",
    autoplay: true,
    interval: 3000,
    duration: 500,
    circular: true,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var searchname=options.name
    let db = wx.cloud.database() 
    let userCollection = db.collection('goods')
    userCollection.where({name: db.RegExp({
      regexp: '.*' + searchname + '.*',
      options: 'i'
    })}).get().then(res => {
      console.log('数据查询成功',res)
      this.setData({
        list: res.data
      })
      if(res.data.length<1){
        wx.navigateTo({
          url: "../searchno/searchno",
        })
      }
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;
    let arr = [
      {
        id: 0,
        title: '红裙子',
        money: '￥200',
        imgUrl: '../../img/shop1.jpg',
        sale: '￥199',
        evaluation: '23',
        sell: '33',
        abstract: '红裙子，物美价廉！'
      },
      {
        id: 1,
        title: '柠檬汁',
        money: '￥10',
        imgUrl: '../../img/shop2.jpg',
        sale: '￥8',
        evaluation: '239',
        sell: '33334',
        abstract: '好喝的柠檬汁，还包邮哦亲'
      },
      {
        id: 2,
        title: '白衣服',
        money: '￥200',
        imgUrl: '../../img/shop3.jpg',
        sale: '￥199',
        evaluation: '20',
        sell: '234',
        abstract: '这是一件白衣服，很普通的那种'
      },
      {
        id: 3,
        title: '抽纸',
        money: '￥27',
        imgUrl: '../../img/shop4.jpg',
        sale: '￥19',
        evaluation: '2300',
        sell: '590',
        abstract: '买抽纸送抽盒了！买抽纸送抽盒了！买抽纸送抽盒了！买抽纸送抽盒了！买抽纸送抽盒了！'
      },
    ];
    that.setData({
      items: that.data.items.concat(arr)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /***
   * 点击进入详情页
   * ***/
  toDetail: function (e) {
    wx.navigateTo({
      url: '../detail/detail',
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
    wx.navigateTo({
      url: '../detail/detail',
    })

  }
})