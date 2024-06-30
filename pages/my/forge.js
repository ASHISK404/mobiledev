// pages/my/forget/forge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    phone:'',
    code:'',
    code1:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  phone(e){
    this.setData({
      phone:e.detail.value
    })
  },
  code(e){
    this.setData({
      code1:e.detail.value
    })
  },
  username(e){
    this.setData({
      username:e.detail.value
    })
  },
  password(e){
    this.setData({
      password:e.detail.value
    })
  },
  login(){
    wx.navigateTo({
      url: '../login/login',
    })
  },
  sendCode(){
    if(this.data.phone!=''){
      let phone={
        phone:this.data.phone
      }
      wx.showToast({
        title: '已发送[测试例:114514]',
        icon:'none'
      })
      this.setData({
        code:'114514'
     })
    }else{
      wx.showToast({
        title: '手机号不能为空',
        icon:'none'
      })
    }
  },
  register(){
    if(this.data.phone==''){
      wx.showToast({
        title: '手机号不能为空',
        icon:'none'
      })
    }else if(this.data.code!=this.data.code1){
      wx.showToast({
        title: '验证码错误',
        icon:'none'
      })
    }else{
let db = wx.cloud.database()
let userCollection = db.collection('user')
db.collection('user')
.where({
  username: this.data.username
})
.get()
.then(res => {
  if (res.data.length === 0) {
    wx.showToast({
      title: '未找到该用户',
      icon: 'none'
    })
  } else {
userCollection.where({
  username: this.data.username
}).update({
  data: {
    password: this.data.password
  }
}).then(res => {
  console.log('修改成功',res)
  wx.showToast({
    title: '修改成功',
    icon:'none'
  })
  wx.navigateTo({
    url: '../login/login',
  })
}).catch(err => {
  console.log('修改失败',err)
})
}
})
.catch(err => {
  console.error('检查用户名错误:', err)
})
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})