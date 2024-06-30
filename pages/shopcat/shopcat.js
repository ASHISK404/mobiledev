// pages/info/info.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    icons: ["../img/plus2.png", "../img/des2.png"],
    check:true,
    update:0,
    totalfee:0,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let db = wx.cloud.database() 
    const _ = db.command
    let app = getApp();
    let idCountMap = {};
    let userCollection = db.collection('user')
    if(app.globalData.user){
      userCollection.where({username: app.globalData.user})
      .get()
      .then(res => {
        console.log('数据查询成功', res)
        let firstItem = res.data[0];
        let firstlist = firstItem ? firstItem.cart : null;
        idCountMap = firstlist.reduce((acc, curr) => {
          acc[curr] = (acc[curr] || 0) + 1;
          return acc;
        }, {});
        const uniqueList = firstlist ? [...new Set(firstlist)] : [];
        console.log("这是购物车", uniqueList)
        return db.collection('goods')
          .where({gid: _.in(uniqueList)})
          .get()
      })
      .then(res => {
        console.log("我是map",idCountMap)
        const resultList = res.data.map(item => {
          return {
            ...item,
            count: idCountMap[item.gid] || 0,
          };
        });
        console.log('www数据查询成功', resultList)
        const totalAmount = resultList.reduce((total, item) => {
          return total + (item.count * item.price);
        }, 0).toFixed(2);
        this.setData({
          totalfee: totalAmount
        })
        this.setData({
          list: resultList
        })
      })
      .catch(err => {
        console.error('获取数据失败:', err)
      })
    }else{
      wx.showToast({
        icon:'none',
        title: '请先登录',
      })
      wx.navigateTo({
        url: '../my/login/login',
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
    let app = getApp();
    if(app.globalData.user){

    }else{
      wx.showToast({
        icon:'none',
        title: '请先登录',
      })
      wx.navigateTo({
        url: '../my/login/login',
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
  toDetail:function(e){
    console.log(e.currentTarget.dataset.obj._id)
    wx.navigateTo({
      url: '../detail/detail?id='+e.currentTarget.dataset.obj._id,
    })
  },
  plus: function (e) {
    let items=this.data.list; 
    let id = e.currentTarget.dataset.id;
    let db = wx.cloud.database() 
    const _ = db.command
    let app = getApp();
    let idCountMap = {};
    let userCollection = db.collection('user')
    userCollection.where({username: app.globalData.user}).
    get().then(res => {
      if (res.data.length > 0) {
        let userData = res.data[0]
        userData.cart.push(id)
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
            this.onLoad()
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
          title: '用户不存在',
          icon: 'none'
        })
      }
  })
  },
  des: function (e) {
    let items=this.data.list; 
    let id = e.currentTarget.dataset.id;
    let db = wx.cloud.database() 
    const _ = db.command
    let app = getApp();
    let idCountMap = {};
    let userCollection = db.collection('user')
    userCollection.where({username: app.globalData.user}).
    get().then(res => {
      if (res.data.length > 0) {
        let userData = res.data[0]
        let indexToRemove = userData.cart.indexOf(id);
        if (indexToRemove !== -1) {
           userData.cart.splice(indexToRemove, 1);
        }
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
              title: '已减少一件',
            })
            this.onLoad()
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
          title: '用户不存在',
          icon: 'none'
        })
      }
  })
},
  topay: function(e){
    wx.showToast({
      title: '已支付',
      icon: 'none'
    })
    let items=this.data.list; 
    let id = e.currentTarget.dataset.id;
    let db = wx.cloud.database() 
    const _ = db.command
    let app = getApp();
    let idCountMap = {};
    let userCollection = db.collection('user')
    userCollection.where({username: app.globalData.user}).
    get().then(res => {
      if (res.data.length > 0) {
        let userData = res.data[0]
        userData.cart=[]
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
            this.onLoad()
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
          title: '用户不存在',
          icon: 'none'
        })
      }
  })
  }
})