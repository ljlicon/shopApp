// pages/goods_list/index.js
import {axios} from "../../request/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[{
      id:0,
      value:'综合',
      isActive:true,
    },{
      id:1,
      value:'销量',
      isActive:false,
    },
    {
      id:0,
      value:'价格',
      isActive:false,
    }],
    currentNum:0,
    pagenum:1,//页码
    pagesize:10,//页容量
    goodsList:[],//商品列表数据
  },
  // 子组件传递过来的方法
  handleTabsChange(e){
    const {item}=e.detail
    this.setData({
      currentNum:item
    })
  },
  async getGoodsList(val){
    const res= await axios({url:'/goods/search',cid:val,pagesize:this.data.pagesize,pagenum:this.data.pagenum})
    this.setData({
      goodsList:res.message.goods
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.cid)
    this.getGoodsList(options.cid)
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