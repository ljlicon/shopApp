// pages/auth/index.js
import {login,showToast} from "../../utils/asyncWechat.js";
import {axios} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  async handleGetUserInfo(e) {
    try {
      const {encryptedData,iv,rawData, signature} = e.detail
      const {code} = await login()
      let loginData={
        encryptedData,iv,rawData, signature,code
      }
      // 这里没有权限需要开通公司给授权
      const res = await axios({url:"/users/wxlogin",data:loginData,method:"post"});
      //给了一个假的数据
      const token=code
      // 得到token后 吧token存入缓存并且跳回到上一个页面
      await showToast({title:"还没有支付功能权限获取不到token"})
      console.log(token);
      wx.setStorageSync('token', token)
      wx.navigateBack({
        delta: 1,
      })
    } catch (error) {
      console.log(error);
      
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },


})