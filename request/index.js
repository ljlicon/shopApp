let ajaxTimes=0
export const axios=(params)=>{
  ajaxTimes++
  wx.showLoading({
    title: '加载中',
    mask:true
  })
  return new Promise((resolve,reject)=>{
    const baseUrl="https://api-hmugo-web.itheima.net/api/public/v1"
    wx.request({
      ...params,
      url:baseUrl+params.url,
      success: (result) => {
        resolve(result.data)
      },
      fail: (err) => {
        reject(err)
      },
      complete:()=>{
        ajaxTimes--
        if(ajaxTimes===0){
          wx.hideLoading()
        }
      }
    })
  })
}