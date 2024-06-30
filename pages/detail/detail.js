// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[ ],
    id:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id=options.id
    this.setData({
      id:id
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  tobuy: function(e){
    var app = getApp();
    if(app.globalData.user){
      wx.showToast({
        title: '已支付',
        icon: 'none'
      })
    }else{
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
  },
  addcart:function(){
    let db = wx.cloud.database() 
    var app = getApp();
    db.collection('user')
      .where({
        username: app.globalData.user
      })
      .get()
      .then(res => {
        if (res.data.length > 0) {
          let userId = res.data[0]._id
          let userData = res.data[0]
          let firstItem = this.data.list[0];
          let firstGid = firstItem ? firstItem.gid : null;
          console.log("gid为"+firstGid)
          userData.cart.push(firstGid)
          console.log("list为"+userData.cart)
          db.collection('user')
          .where({username: app.globalData.user})
            .update({
              data: {
                cart: userData.cart
              }
            })
            .then(res => {
              console.log('更新成功:', res)
              wx.showToast({
                icon:'none',
                title: '已添加一件',
              })
            })
            .catch(err => {
              console.error('更新失败:', err)
              wx.showToast({
                icon:'none',
                title: '失败',
              })
            })
        } else {
          wx.showToast({
            title: '请先登录',
            icon: 'none'
          })
        }
      })
      .catch(err => {
        console.error('查询用户错误:', err)
      })
  },
})