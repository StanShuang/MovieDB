// pages/search/search.js
const fetch = require('../../comm/script/fetch');
const config = require('../../comm/script/config');
var searchStr = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showLoading: true,
    showSearchList : [],
    hasMore : true,
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    searchStr = options.searchStr
    fetch.searchKeyword.call(this,config.apiList.multi,searchStr,this.data.page)
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
      var that = this
      if(!that.data.showLoading && that.data.hasMore){
        fetch.searchKeyword.call(that,config.apiList.multi,searchStr,that.data.page)
      }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})