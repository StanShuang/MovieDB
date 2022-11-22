// pages/home/home.js
const config = require('../../comm/script/config');
const fetch = require('../../comm/script/fetch');
const utils = require('../../comm/script/utils');
var userInfo = wx.getStorageSync('userInfo');
var message = require('../../component/message/message')
var myDate = new Date();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clickColor: 'rgb(29, 211, 172)',
    normalColor: '#ffffff',
    sections: [],
    sectionDay: [],
    sectionWeek: [],
    showLoading: true,
    isShowLogingButton: true,
    user: {},
    inputValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  onReady() {
    fetch.fetchSectionsFilm.call(this, config.apiList.section, "day")
  },

  viewSearch: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },


  onSearchBottom: function () {
    if (this.data.inputValue == '') {
      message.show.call(this, {
        content: '请输入关键词',
        icon: 'null',
        duration: 1500
      })
      return
    }
    wx.navigateTo({
      url: '../search/search?searchStr=' + this.data.inputValue,
    })
  },

  onSectionDay: function () {
    this.setData({
      clickColor: 'rgb(29, 211, 172)',
      normalColor: '#ffffff',
      sections: this.data.sectionDay
    })
  },

  onSectionWeek: function () {
    if (this.data.sectionWeek.length == 0) {
      fetch.fetchSectionsFilm.call(this, config.apiList.section, "week")
      this.setData({
        clickColor: '#ffffff',
        normalColor: 'rgb(29, 211, 172)'
      })
    } else {
      this.setData({
        clickColor: '#ffffff',
        normalColor: 'rgb(29, 211, 172)',
        sections: this.data.sectionWeek
      })
    }

  },
  /*
  * 登录page
  */
  onLoginPage: function () {
    //获取Token，并跳转到登录界面
    var token = wx.getStorageSync('token')
    if (token) {
      console.log(token)
      wx.navigateTo({
        url: '../login/login',
      })
      if (myDate.getTime < token.expires_at) {
        //token时效为60分钟，跳转到登录页面
      } else {
        // fetch.getToken.call(this,config.apiList.token)
      }
    } else {
      console.log("getToken")
      fetch.getToken.call(this, config.apiList.token)
    }

  },

  onShow() {
    var sessionId = userInfo.session
    console.log('sessionId:' + sessionId)
    if (!userInfo.user && userInfo.userState == 0) {
      //游客，生成随机名字
      var userName = utils.generateUserName(6)
      userInfo.user = { "username": userName }
    }
    console.log(userName)
    if (sessionId) {
      this.setData({
        isShowLogingButton: false,
        user: userName ? userName : userInfo.user
      })
      if (userInfo.userState == 1) {
        fetch.getUserInfo.call(this, config.apiList.userinfo, sessionId, userInfo)
      }

    }
  },

  viewSectionDetail: function (e) {
    var data = e.currentTarget.dataset
    var item = JSON.stringify(data.item)
    wx.navigateTo({
      url: '../detail/tvDetail/tvDetail?itemDetail=' + item,
    })
  }

})
