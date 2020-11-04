import {
  getSetting,
  chooseAddress,
  openSetting
} from "../../utils/asyncWechat.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address:{}
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
    const address = wx.getStorageSync('address');
    this.setData({
      address
    })
  },
  async handleGetAdress() {
    //获取权限状态  看下是不是true 是的话就调用地址的方法不是就打开设置
    const res = await getSetting();
    const scopeAddress=res.authSetting["scope.address"]
    if(!scopeAddress){
     await openSetting()
    }
    const addressInfo =await chooseAddress()
    wx.setStorageSync('address', addressInfo)
    // wx.getSetting({
    //   success: (res) => {
    //     console.log(res.authSetting["scope.address"]);
    //     if (res.authSetting["scope.address"]) {
    //       //如果他的权限是true那么就调用地址接口
    //       wx.chooseAddress({
    //         success: (result) => {
    //           console.log(result)
    //         },
    //       })
    //     } else {
    //       console.log('那么就去打开权限')
    //       // 其实现在在手机上他一直是true 这部已经没有必要了
    //       wx.openSetting({
    //         success(res) {
    //           console.log(res.authSetting)
    //           // res.authSetting = {
    //           //   "scope.userInfo": true,
    //           //   "scope.userLocation": true
    //           // }
    //         }
    //       })
    //     }
    //   }
    // })

  },
})