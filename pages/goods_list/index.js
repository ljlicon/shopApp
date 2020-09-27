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
    
    goodsList:[],//商品列表数据
  },
  queryData:{
    query:'',
    cid:'',
    pagesize:10,
    pagenum:1,
  },
  totalNum:0,
  // 子组件传递过来的方法
  handleTabsChange(e){
    const {item}=e.detail
    this.setData({
      currentNum:item,
      goodsList:[]
    })
    this.queryData.pagenum=1
    this.getGoodsList()
  },
  
  async getGoodsList(){
    const res= await axios({url:'/goods/search',data:this.queryData})
    this.totalNum=res.message.total
    this.setData({
      goodsList:[...this.data.goodsList,...res.message.goods]
    })
    wx.stopPullDownRefresh()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryData.cid=options.cid
    this.getGoodsList()
  },
  
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('下拉了')
    this.setData({
      goodsList:[]
    })
    this.queryData.pagenum=1
    this.getGoodsList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('触底了')
    this.queryData.pagenum++
    console.log(this.queryData.pagenum)
    if(Math.ceil(this.totalNum/10)>=this.queryData.pagenum){
      this.getGoodsList()
    }else{
      wx.showToast({
        title: '没有更多了',
      })
    }
  },

  
})