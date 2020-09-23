export const axios=(params)=>{
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
    })
  })
}