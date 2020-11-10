// pages/goods_detail/index.js
import { axios } from "../../request/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_id: "",
    goods_data: {
      pics: [],
      goods_price: '',
      goods_name: '',
      goods_introduce: '',
    },
  },
  goodsData: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { goods_id } = options
    this.getDatailData(goods_id)
  },
  async getDatailData(goods_id) {
    const res = await axios({ url: "/goods/detail", data: { goods_id } })
    this.goodsData = res.message
    this.setData({
      goods_data: {
        pics: res.message.pics,
        goods_price: res.message.goods_price,
        goods_name: res.message.goods_name,
        // webp苹果可能不支持需要后端改为.jpg格式 goods_introduce:res.message.goods_introduce.replce(/\.webp/,.jpg)。
        goods_introduce: res.message.goods_introduce,
      }
    })

  },
  handlePreview(e) {
    const pics = this.goodsData.pics.map(v => v.pics_mid)
    // 点的第几张图片
    const { item } = e.currentTarget.dataset
    wx.previewImage({
      current: pics[item], // 当前显示图片的http链接
      urls: pics // 需要预览的图片http链接列表
    })
  },
  handleCartAdd() {
    //点击加入购物车把整个详情的数据存入storyge中，并且存一个个数
    //点击之前得先获取一下内存中是否有初始数据（因为没有这样的一个接口存车）

    let carts = wx.getStorageSync('carts') || [];
    //  如果这个数据中有这个goods_id的数据那就让num++,没有的话就新增一个数组
    let index = carts.findIndex(v => v.goods_id === this.goodsData.goods_id)
    if (index === -1) {
      this.goodsData.num = 1
      this.goodsData.check=true
      carts.push(this.goodsData)
    } else {
      carts[index].num++
    }

    wx.setStorageSync('carts', carts)
    wx.showToast({
      title: '加入成功',
      icon: "success",
      mask: true,//防抖
    })
  }
})