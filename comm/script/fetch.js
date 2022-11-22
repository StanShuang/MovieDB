var config = require('./config.js')
var message = require('../../component/message/message')
var utils = require('./utils')

//获取popular电影列表
function fetchPopularFilm(url, page, count, cb, fail_cb) {
  var that = this
  message.hide.call(that)
  if (that.data.hasMore) {
    wx.request({
      url: url,
      data: {
        api_key: config.apiKey,
        language: config.language,
        page: page
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        if (page == 1) {
          var totalData = res.data.results
          var bannerListRandom = []
          for (var i = 0; i < totalData.length; i++) {
            if (i % 4 == 0) {
              if (bannerListRandom.length <= 5) {
                bannerListRandom.push(totalData[i])
              }
            }
          }
          that.setData({
            bannerList: bannerListRandom
          })
        }
        if (page == res.data.total_pages) {
          that.setData({
            hasMore: false
          })
        } else {
          that.setData({
            films: that.data.films.concat(res.data.results),
            showLoading: false,
            page: page + 1
          })
        }
        wx.stopPullDownRefresh()
        typeof cb == 'function' && cb(res.data)
      },
      fail: function (e) {
        console.log(e)
        that.setData({
          showLoading: false
        })
        message.show.call(that, {
          content: '网络开小差了',
          icon: 'offline',
          duration: 3000
        })
        wx.stopPullDownRefresh()
        typeof fail_cb == 'function' && fail_cb()
      }

    })
  }
}

//获取popular剧集列表
function fetchTvPopularFilm(url, page, count, cb, fail_cb) {
  var that = this
  message.hide.call(that)
  if (that.data.hasMoreTv) {
    wx.request({
      url: url,
      data: {
        api_key: config.apiKey,
        language: config.language,
        page: page,
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        if (page == 1) {
          var totalData = res.data.results
          var bannerListRandom = []
          for (var i = 0; i < totalData.length; i++) {
            if (i % 4 == 0) {
              if (bannerListRandom.length <= 5) {
                bannerListRandom.push(totalData[i])
              }
            }
          }
          that.setData({
            bannerListTv: bannerListRandom
          })
        }
        if (page == res.data.total_pages) {
          that.setData({
            hasMoreTv: false
          })
        } else {
          that.setData({
            filmsTv: that.data.filmsTv.concat(res.data.results),
            showLoading: false,
            pageTv: page + 1
          })
        }
        wx.stopPullDownRefresh()
        typeof cb == 'function' && cb(res.data)

      },
      fail: function (e) {
        console.log(e)
        that.setData({
          showLoading: false
        })
        message.show.call(that, {
          content: '网络开小差了',
          icon: 'offline',
          duration: 3000
        })
        wx.stopPullDownRefresh()
        typeof fail_cb == 'function' && fail_cb()
      }
    })
  }

}

//获取即将上映的影片
function getComingMovie(url, page, cb, fail_cb) {
  var that = this
  message.hide.call(that)
  if (that.data.hasMore) {
    wx.request({
      url: url,
      data: {
        api_key: config.apiKey,
        language: config.language,
        page: page
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        if (page == res.data.total_pages) {
          that.setData({
            hasMore: false
          })
        }
        var dataList = that.data.comingList.concat(res.data.results)
        dataList.sort(utils.checkDate('release_date'))
        that.setData({
          comingList: dataList,
          showLoading: false,
          page: page + 1
        })
        wx.stopPullDownRefresh()
        typeof cb == 'function' && cb(res.data)
      },
      fail: function (e) {
        console.log(e)
        that.setData({
          showLoading: false
        })
        message.show.call(that, {
          content: '网络开小差了',
          icon: 'offline',
          duration: 3000
        })
        wx.stopPullDownRefresh()
        typeof fail_cb == 'function' && fail_cb()
      }
    })
  }
}

//获取高分电影
function getTopMovieData(url, page, cb, fail_cb) {
  var that = this
  message.hide.call(that)
  if (that.data.hasMore) {
    wx.request({
      url: url,
      data: {
        api_key: config.apiKey,
        language: config.language,
        page: page
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        if (page == res.data.total_pages) {
          that.setData({
            hasMore: false
          })
        }
        var dataList = that.data.topMovieList.concat(res.data.results)
        that.setData({
          topMovieList: dataList,
          showLoading: false,
          page: page + 1
        })
        wx.stopPullDownRefresh()
        typeof cb == 'function' && cb(res.data)
      },
      fail: function (e) {
        console.log(e)
        that.setData({
          showLoading: false
        })
        message.show.call(that, {
          content: '网络开小差了',
          icon: 'offline',
          duration: 3000
        })
        wx.stopPullDownRefresh()
        typeof fail_cb == 'function' && fail_cb()
      }
    })
  }
}

//获取趋势列表
function fetchSectionsFilm(url, time, cb, fail_cb) {
  var that = this
  wx.request({
    url: url + time,
    data: {
      api_key: config.apiKey,
      language: config.language,
    },
    method: 'GET',
    success: function (res) {
      console.log(res)
      if (time == 'day') {
        that.setData({
          sectionDay: that.data.sectionDay.concat(res.data.results)
        })
      } else {
        that.setData({
          sectionWeek: that.data.sectionWeek.concat(res.data.results)
        })
      }
      that.setData({
        sections: that.data.sections.concat(res.data.results),
        showLoading: false,
      })
      typeof cb == 'function' && cb(res.data)
    },
    fail: function (e) {
      console.log(e)
      that.setData({
        showLoading: false
      })
      typeof fail_cb == 'function' && fail_cb()
    }
  })
}

//获取token
function getToken(url, cb, fail_cb) {
  var that = this
  wx.request({
    url: url,
    data: {
      api_key: config.apiKey,
    },
    method: 'GET',
    success: function (res) {
      console.log(res)
      wx.setStorageSync('token', res.data)
      wx.navigateTo({
        url: '../login/login',
      })
      typeof cb == 'function' && cb(res.data)
    },
    fail: function (e) {
      typeof fail_cb == 'function' && fail_cb()
    }
  })

}

//获取session
function getSession(url, token, cb, fail_cb) {
  var that = this
  wx.request({
    url: url + "?api_key=" + config.apiKey,
    data: {
      request_token: token
    },
    header: { 'content-type': 'application/json' },
    method: 'POST',
    success: function (res) {
      console.log(res)
      if (res.data.success == false) {
        wx.navigateTo({
          url: '../../pages/loginAuthorize/loginAuthorize',
        })
      } else {
        that.setData({
          showLoading: false,
          userInfo: {
            session: res.data.session_id,
            userState: 1
          }
        }, function () {
          console.log(that.data.userInfo)
          wx.setStorageSync('userInfo', that.data.userInfo)
          wx.navigateBack({
            delta: 0,
          })
        })

      }

    },
    fail: function (e) {
      console.log(e)
      that.setData({
        showLoading: false
      })
      typeof fail_cb == 'function' && fail_cb()
    }
  })
}

//获取游客session
function getGuestSession(url, cb, fail_cb) {
  var that = this
  wx.request({
    url: url,
    data: {
      api_key: config.apiKey,
    },
    method: 'GET',
    success: function (res) {
      console.log(res)
      that.setData({
        showLoading: false,
        userInfo: {
          session: res.data.guest_session_id,
          userState: 0
        }
      }, function () {
        console.log(that.data.userInfo)
        wx.setStorageSync('userInfo', that.data.userInfo)
        wx.navigateBack({
          delta: 0,
        })
      })
      typeof cb == 'function' && cb(res.data)
    },
    fail: function (e) {
      that.setData({
        showLoading: false
      })
      typeof fail_cb == 'function' && fail_cb()
    }
  })
}

//获取用户信息
function getUserInfo(url, sessionId, userInfo, cb, fail_cb) {
  var that = this
  wx.request({
    url: url,
    data: {
      api_key: config.apiKey,
      session_id: sessionId,
    },
    method: 'GET',
    success: function (res) {
      userInfo.user = res.data
      wx.setStorageSync('userInfo', userInfo)
      that.setData({
        user: res.data
      })

      typeof cb == 'function' && cb(res.data)
    },
    fail: function (e) {
      typeof fail_cb == 'function' && fail_cb()
    }
  })
}

//首页搜索
function searchKeyword(url, keyword, page, cb, fail_cb) {
  var that = this
  wx.request({
    url: url,
    data: {
      api_key: config.apiKey,
      query: keyword,
      language: config.language,
      page: page,
      include_adult: false
    },
    method: 'GET',
    success: function (res) {
      console.log(res)
      if (page == res.data.total_pages) {
        that.setData({
          hasMore: false
        })
      }
      that.setData({
        showLoading: false,
        showSearchList: that.data.showSearchList.concat(res.data.results),
        page: page + 1
      })

      typeof cb == 'function' && cb(res.data)
    },
    fail: function (e) {
      that.setData({
        showLoading: false
      })
      typeof fail_cb == 'function' && fail_cb()
    }
  })
}

//获取单个电影或者TV详情
function getMovieorTVDetail(url, id, cb, fail_cb) {
  var that = this
  var requestUrl = url + id
  wx.request({
    url: requestUrl,
    data: {
      api_key: config.apiKey,
      language: config.language
    },
    method: 'GET',
    success: function (res) {
      console.log(res)
      that.setData({
        dateDetail: res.data
      })
      typeof cb == 'function' && cb(res.data)
    },
    fail: function (e) {
      typeof fail_cb == 'function' && fail_cb()
    }
  })
}

//寻找一部电影的演员和工作人员。
function getCredits(url, id, cb, fail_cb){
  var that = this
  var requestUrl = url + id + '/credits'
  wx.request({
    url: requestUrl,
    data: {
      api_key: config.apiKey,
      language: config.language
    },
    method: 'GET',
    success: function(res){
      console.log(res)
      that.setData({
        credits: res.data,
        credits_cast: that.data.credits_cast.concat(res.data.cast)
      })
      typeof cb == 'function' && cb(res.data)
    },
    fail: function(e){
      typeof fail_cb == 'function' && fail_cb()
    }
  })
}

module.exports = {
  fetchPopularFilm: fetchPopularFilm,
  fetchSectionsFilm: fetchSectionsFilm,
  getToken: getToken,
  getSession: getSession,
  getGuestSession: getGuestSession,
  getUserInfo: getUserInfo,
  searchKeyword: searchKeyword,
  fetchTvPopularFilm: fetchTvPopularFilm,
  getComingMovie: getComingMovie,
  getTopMovieData: getTopMovieData,
  getMovieorTVDetail: getMovieorTVDetail,
  getCredits : getCredits
}