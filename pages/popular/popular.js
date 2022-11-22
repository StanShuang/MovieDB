// pages/popular/popular.js
const config = require('../../comm/script/config')
const fetch = require('../../comm/script/fetch')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    films:[],
    bannerList: config.bannerList,
    hasMore:true,
    page:1,
    filmsTv:[],
    bannerListTv:[],
    pageTv:1,
    hasMoreTv:true,
    showLoading:true,
    sectionList:['电影','剧集'],
    index : 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function() {
    var that = this
    // wx.showNavigationBarLoading()
    this.getPopularData()
    app.getCity(function(){
        wx.hideNavigationBarLoading()
        wx.setNavigationBarTitle({
          title: '正在热映 - ' + config.city
        })
        // that.getPopularData()
   })
        
  },

    /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function(){
    console.log("onPullDownRefresh")
    var that = this
    if(that.data.index == 0){
      that.setData({
        films:[],
        hasMore:true,
        showLoading:true,
        page:1
      })
      this.getPopularData()
    }else{
      that.setData({
        filmsTv: [],
        hasMoreTv: true,
        showLoading: true,
        pageTv: 1
      })
      this.getPopularTvDate()
    }
    
  },

   /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function(){
    var that = this
    if(!that.data.showLoading){
      if(that.data.index == 0){
        this.getPopularData()
      }else{
        this.getPopularTvDate()
      }
      
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
   * 
   * @param {*内容点击} e 
   */
  viewFilmDetail:function(e){

  },

  /**
   * 
   * @param {标签点击} e 
   */
  viewFilmByTag:function(e){

  },

  /**
   * 
   * @param {点击banner} e 
   */
  viewBannerDetail:function(e){

  },

  /**
   * 点击搜索框
   */
  viewSearch:function(){
    wx.navigateTo({
      url: '../search/search',
    })
  },

  /**
   * 获取Popular页面数据
   */
  getPopularData: function(){
    console.log('获取Popular页面数据')
    fetch.fetchPopularFilm.call(this,config.apiList.popluar,this.data.page)
  },

  /**
   * 获取Popular Tv 页面数据
   */
  getPopularTvDate: function(){
    console.log('获取Popular TV页面数据')
    fetch.fetchTvPopularFilm.call(this,config.apiList.popluarTv,this.data.pageTv)
  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var that = this
    wx.setNavigationBarTitle({
      title: '正在热映 - ' + this.data.sectionList[e.detail.value]
    })
    if(e.detail.value == 1 && that.data.filmsTv.length == 0){
      //请求热门tv页面
      this.getPopularTvDate()
      this.setData({
        showLoading: true,
      })
    }
    this.setData({
      index: e.detail.value
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
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})