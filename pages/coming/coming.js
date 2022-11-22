// pages/coming/coming.js
const config = require('../../comm/script/config')
const fetch = require('../../comm/script/fetch')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showLoading : true,
    comingList : [],
    page : 1,
    hasMore: true,
    index: 0,//用以分辨是电影数据还是电视数据 0：电影 1：剧集
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getComingListData()
  },

  getComingListData: function(){
    fetch.getComingMovie.call(this,config.apiList.upcoming,this.data.page)
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
    var that = this
    that.setData({
      comingList: [],
      showLoading: true,
      hasMore: true,
      page: true
    })
    this.getComingListData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    var that = this
    if(!that.data.showLoading){
      this.getComingListData()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})