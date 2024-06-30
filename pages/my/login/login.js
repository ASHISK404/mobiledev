// pages/my/login/login.js
const app = getApp()
 let username=''
 let password=''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    accesscode:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
  username(e){
    username=e.detail.value
  },
  password(e){
    password=e.detail.value
  },
  register(){
    wx.navigateTo({
      url: '../register/register',
    })
  },
  forget(){
    wx.navigateTo({
      url: '../forget/forge',
    })
  },
  getuser(){
    let flag = false
    if(username=='')
    {
      wx.showToast({
        icon:'none',
        title: '账号不能为空',
      })
    }else if(password==''){
      wx.showToast({
        icon:'none',
        title: '密码不能为空',
      })
    }else{
      wx.cloud.database().collection('user')
      .get({
        success:(res)=>{
          console.log(res.data)
          let user=res.data
          for (let i = 0; i < user.length; i++) {
            if (username === user[i].username) {
              flag=true;
              if (password !== user[i].password) {
                wx.showToast({
                  title: '密码错误！！',
                  icon: 'error',
                  duration: 2500
                });
               break;
              } else {
                wx.showToast({
                  title: '登陆成功！！',
                  icon: 'success',
                  duration: 2500
                })
                flag=true;
                wx.setStorageSync('usercode', username)
                var app = getApp();
                getApp().globalData.user = username;
               wx.switchTab({
                 url: '../../home/home',
               })
                break;
              }
            }
          };
          if(flag==false)
          {
            wx.showToast({
              title: '该用户不存在',
              icon: 'error',
              duration: 2500
            })
          }
        }
      })
    }
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