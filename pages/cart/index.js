
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
  },
  /**
   * 获取收获地址wxwx.chooseAddress
   * 
   * 
   */
  handleGetAdress(){
    
    // wx.openSetting()
    // wx.chooseAddress({
    //   success: (result) => {
    //     console.log(result)
    //   },
    // })
    wx.getSetting({
      success:(res)=> {
        console.log(res.authSetting["scope.address"]);
        if(res.authSetting["scope.address"]){
          //如果他的权限是true那么就调用地址接口
          wx.chooseAddress({
              success: (result) => {
                console.log(result)
              },
            })
        }else{
          console.log('那么就去打开权限')
          // 其实现在在手机上他一直是true 这部已经没有必要了
          wx.openSetting({
            success (res) {
              console.log(res.authSetting)
              // res.authSetting = {
              //   "scope.userInfo": true,
              //   "scope.userLocation": true
              // }
            }
          })
        }
      }
    })
  },
})