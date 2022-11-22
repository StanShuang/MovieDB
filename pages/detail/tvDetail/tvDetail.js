// pages/detail/tvDetail/tvDetail.js
const fetch = require('../../../comm/script/fetch');
const config = require('../../../comm/script/config');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isMovie: false,
    dateDetail: [],
    credits: [],
    credits_cast: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    var that = this
    var isMovie_ = true
    var item = JSON.parse(options.itemDetail)
    if (item.media_type == 'tv') {
      isMovie_ = false
    }
    that.setData({
      isMovie: isMovie_,
      dateDetail: item
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    var that = this
    var searchId = that.data.dateDetail.id
    if(that.data.isMovie){
      fetch.getMovieorTVDetail.call(this,config.apiList.movieDetail,searchId)
      fetch.getCredits.call(this,config.apiList.movieDetail,searchId)
    }else{
      fetch.getMovieorTVDetail.call(this,config.apiList.tvDetail,searchId)
    }
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