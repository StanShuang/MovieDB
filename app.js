// app.js
var config = require('comm/script/config')
App({
  data:{
    isDebug:true
  },
  globalData:{
    userInfo:null
  },
  onLaunch:function(){
    //获取用户信息
    this.getUserInfo()
    //TODO初始化缓存

  },

  getUserInfo:function(cb){
    var that = this
    wx.login({
      success:function(){
        wx.getUserInfo({
          success:function(res){
            that.globalData.userInfo = res.userInfo
            typeof cb == "function" && cb(that.globalData.userInfo) 
          }
        })
      }
    })
  },
  getCity:function(cb){
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success(res){
        var locationParam = res.latitude + ',' + res.longitude + '1'
        wx.request({
          url: config.apiList.baiduMap,
          data:{
            ak:config.baiduAk,
            location: locationParam,
            output:'json',
            pois:'1'
          },
          mothod:'GET',
          success(res){
            console.log(res)
            if(res.data.status == 200){
              console.log(res.data.message)
              config.city = 'unknow'
              typeof cb == "function" && cb(res.data.status)
            }else{
              config.city = res.data.result.addressComponent.city.slice(0,-1)
              typeof cb == "function" && cb(res.data.result.addressComponent.city.slice(0,-1))
            } 
          },
          fail:function(res){
            //重新定位
            console.error('Get Location Fail..')
            that.getCity();
          }
        })
      }
    })
  }

})
