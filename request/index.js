export const axios=(params)=>{
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
    })
  }).then(res=>res.data)
}