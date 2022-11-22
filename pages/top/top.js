// pages/top/top.js
const config = require('../../comm/script/config')
const fetch = require('../../comm/script/fetch')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showLoading: true,
    topMovieList: [],
    page: 1,
    hasMore: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.geteTopMovieData()
  },

  geteTopMovieData: function () {
    fetch.getTopMovieData.call(this, config.apiList.topmovie, this.data.page)
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
    this.setData({
      showLoading: true,
      topMovieList: [],
      page: 1,
      hasMore: true,
    })
    this.geteTopMovieData()

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    var that = this
    if(!that.data.showLoading){
      this.geteTopMovieData()
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})