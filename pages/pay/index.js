import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal,
  showToast
} from "../../utils/asyncWechat.js";
import {axios} from "../../request/index.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    carts: [],
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
    let carts = wx.getStorageSync('carts') || [];
    carts= carts.filter(v=>v.check)
    this.setData({
      address,
    })
    let totalPrice = 0;
    let totalNum = 0;
    carts.forEach(item => {
        totalPrice += item.num * item.goods_price
        totalNum += item.num
    });
    this.setData({
      carts,
      totalPrice,
      totalNum
    })

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
  },
  //支付跳转
  async handleOrderPay(){
    let token=wx.getStorageSync("token")
    console.log(token);
    
    //缓存没有token就需要去授权页面
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index',
      })
      return;
    }
    //创建订单
    // 授权获取token后，就弄一个请求头
    const hearder={Authorization:token}
    const order_price=this.data.totalPrice;
    const consignee_addr=this.data.address.all;
    const carts=this.data.carts;
    let goods=[];
    carts.forEach(v=>
      goods.push({
        goods_id:v.goods_id,
        goods_number:v.num,
        goods_price:v.goods_price
      })
    )
    const orderParams={order_price,consignee_addr,goods};
    //参数准备好了 发请求获取订单编号
    const {order_number}=await axios({url:"/my/orders/create",method:"post",data:orderParams,hearder})
    
  }
})