import {axios} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[],
    naviList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 优化异步请求的promise封装
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (res) => {
    //     console.log(res);
    //     this.setData({
    //       swiperList:res.data.message
    //     });
    //   },
    // })
    this.getSwpList()
    this.getNaviList()
  },
  //获取轮播图数据
  getSwpList(){
    axios({url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata'}).then(res=>{
      if(res.meta.status==200){
        this.setData({
          swiperList:res.message
        });
      }else{
        console.log(res.meta.msg);
      }
    })
  },
  //获取导航栏数据
  getNaviList(){
    axios({url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems'}).then(res=>{
      if(res.meta.status==200){
        this.setData({
          naviList:res.message
        });
      }else{
        console.log(res.meta.msg);
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})