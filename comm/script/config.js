//静态地址
//正式
var staticUrl = 'https://api.themoviedb.org/3'
//测试
// var staticUrl = '../../dist'
module.exports = {
  city : '',
  imgUrlList: ['https://image.tmdb.org/t/p/w500','https://image.tmdb.org/t/p/original','https://image.tmdb.org/t/p/w300'],
  apiKey : '03f63d020f6cde9aae3cf0d51021b2a4',
  language : 'zh-CN',
  baiduAK: 'jUCN9AGqH4DQSpFnGOOwGN9luCTEWA4x',
  apiList: {
    baiduMap : 'https://api.map.baidu.com/geocoder/v2/',
    popluar : staticUrl + '/movie/popular',
    popluarTv : staticUrl + '/tv/popular',
    upcoming : staticUrl + '/movie/upcoming',
    topmovie : staticUrl + '/movie/top_rated',
    toptv : staticUrl + '/tv/top_rated',
    section : staticUrl + '/trending/all/',
    token : staticUrl + '/authentication/token/new',
    session : staticUrl + '/authentication/session/new',
    guestSession : staticUrl +'/authentication/guest_session/new',
    userinfo : staticUrl + '/account',
    keyword : staticUrl + '/search/keyword',
    multi : staticUrl + '/search/multi',
    movieDetail : staticUrl + '/movie/',
    tvDetail : staticUrl + '/tv/'
  },
  bannerList :[
    {type:'film',id:'26683290',imgUrl:staticUrl + '/images/banner_1.jpg'},
    {type:'film', id: '25793398', imgUrl: staticUrl + '/images/banner_2.jpg'},
    {type:'film', id: '26630781', imgUrl: staticUrl + '/images/banner_3.jpg'},
    {type:'film', id: '26415200', imgUrl: staticUrl + '/images/banner_4.jpg'},
    {type:'film', id: '3025375', imgUrl: staticUrl + '/images/banner_5.jpg'}
  ],

  testDetailData: [
    {id:'1',title:'雷神4：爱与雷霆',rating:{average:7.6},genres:['动作','冒险','奇幻'],images:{large:staticUrl +'/images/test_1.jpg'}},
    {id:'2',title:'侏罗纪世界3',rating:{average:7.3},genres:['动作','冒险','科幻'],images:{large:staticUrl +'/images/test_2.jpg'}},
    {id:'3',title:'小黄人大眼萌2：格鲁的崛起',rating:{average:8.6},genres:['家庭','动画','喜剧','奇幻'],images:{large:staticUrl +'/images/test_3.jpg'}}
  ],

  skinList: [
    {title: '公路', imgUrl: '../../dist/images/skin_default.png'},
],

}