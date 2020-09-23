import { axios } from "../../request/index.js"
// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftName: [],//左侧名字列表
    rightData: [],//右侧数据
    currentIndex: 0,//索引
    scrollTop: 0,
  },
  Cates: [],


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 本地存储数据缓存  目标格式{time:Date.now(),data:this.Cates}
    const cates = wx.getStorageSync('cates')
    if (!cates) {
      this.getCates()
    } else {
      if (Date.now() - cates.time > 1000 * 10) {
        this.getCates()
      } else {
        console.log("可以使用旧数据")
        this.Cates = cates.data
        let leftName = this.Cates.map(v => v.cat_name)
        let rightData = this.Cates[this.data.currentIndex].children
        this.setData({
          leftName, rightData
        })
      }
    }

  },
  async getCates() {
    const res = await axios({ url: "/categories" })
    this.Cates = res.message
    wx.setStorageSync('cates', { time: Date.now(), data: this.Cates })
    let leftName = this.Cates.map(v => v.cat_name)
    let rightData = this.Cates[this.data.currentIndex].children
    this.setData({
      leftName, rightData
    })
  },
  // 标题点击事件
  handleTag(e) {
    const { item } = e.currentTarget.dataset
    let rightData = this.Cates[item].children
    this.setData({
      currentIndex: item,
      rightData,
      scrollTop: 0,
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