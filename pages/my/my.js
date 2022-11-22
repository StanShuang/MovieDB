// pages/my/my.js
const config = require('../../comm/script/config');
var userInfo = wx.getStorageSync('userInfo');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gridList: [
      { enName: 'favorite', zhName: '收藏' },
      { enName: 'rate', zhName: '评分' },
      { enName: 'watchlist', zhName: '关注' },
      { enName: 'created', zhName: '创建列表' },
      { enName: 'setting', zhName: '设置' }
    ],
    skin: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      userInfo: userInfo
    })
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
    var that = this
    wx.getStorage({
      key: 'skin',
      success: function (res) {
        if (res.data == "") {
          that.setData({
            skin: config.skinList[0].imgUrl
          })
        } else {
          that.setData({
            skin: res.data
          })
        }
      },
      fail: function (e) {
        that.setData({
          skin: config.skinList[0].imgUrl
        })
      }
    })
  },

  vireGridDetail: function (e) {
    var data = e.currentTarget.dataset
    wx.navigateTo({
      url: "../personal/" + data.url + '/' + data.url,
    })

  },

  viewSkin: function(){
    console.log("viewSkin..")
    wx.navigateTo({
      url: "../personal/skin/skin",
    })
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