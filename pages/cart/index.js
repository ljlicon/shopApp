import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal,
  showToast
} from "../../utils/asyncWechat.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    carts: [],
    checkedAll: false,
    totalPrice: 0,
    totalNum: 0,
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
    const carts = wx.getStorageSync('carts') || [];
    // 为了减少一个循环把这个判断写在foreach里
    // const checkedAll = carts.length?carts.every(v=>v.check):false
    this.setData({
      address,
    })
    this.setCart(carts)

  },
  //获取收获地址
  async handleGetAdress() {
    //获取权限状态  看下是不是true 是的话就调用地址的方法不是就打开设置
    const res = await getSetting();
    const scopeAddress = res.authSetting["scope.address"]
    if (!scopeAddress) {
      await openSetting()
    }
    const addressInfo = await chooseAddress()
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
  //点击选中事件
  handleCheck(e) {
    const goods_id = e.currentTarget.dataset.id
    //找到对应的商品，改变缓存中和页面上data的数据和页面的状态
    const { carts } = this.data
    let index = carts.findIndex(v => v.goods_id === goods_id)
    // 改变对应数据的状态
    carts[index].check = !carts[index].check
    this.setData({
      carts,
    })

    this.setCart(carts)
  },
  //获取商品选中状态并且计算价格和数量
  setCart(carts) {
    let checkedAll = true;
    let totalPrice = 0;
    let totalNum = 0;
    carts.forEach(item => {
      if (item.check) {
        totalPrice += item.num * item.goods_price
        totalNum += item.num
      } else {
        checkedAll = false
      }
    });
    //判断是否为空
    checkedAll = carts.length != 0 ? checkedAll : false
    this.setData({
      carts,
      checkedAll,
      totalPrice,
      totalNum
    })
    wx.setStorageSync('carts', carts)
  },
  //全选与反选事件
  handleClickAll() {
    //获取data中的数据
    let { carts, checkedAll } = this.data
    //改变全选按钮的状态
    checkedAll = !checkedAll
    //改变每一项里面的状态 让他和全选同步
    carts.forEach(v => v.check = checkedAll)
    this.setCart(carts)
  },
  //改变数量
  async changeNum(e) {
    let { carts } = this.data
    //获取点击是哪个商品id和要+1还是减一
    const { action, id } = e.currentTarget.dataset
    console.log(action, id);
    //根据id找到对应的数量
    let indexgoods = carts.findIndex(v => v.goods_id === id)
    //当你减数量减为1的时候再次点击就要提示一下要不要删除
    if (carts[indexgoods].num === 1 && action === -1) {
      const res = await showModal({ content: '确认把商品删除吗' })
      if (res.confirm) {
        // 确认了删除就删除一个
        carts.splice(indexgoods, 1)
        this.setCart(carts)
      } 
    }else{
      carts[indexgoods].num += action
      this.setCart(carts)
    }
  
  },
  //结算
  async handleAccount(){
    //判断购物车是不是为空，是否选择了收获地址
    const {address,totalNum} =this.data
    if(totalNum==0){
      await showToast({title:"请挑选购物商品"})
      return;
    }
    if(!address.userName){
      await showToast({title:"请选择收获地址"})
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    })
  }
})