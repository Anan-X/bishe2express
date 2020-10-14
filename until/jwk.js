const jwt = require('jsonwebtoken')
const fs = require('fs')
// 密钥
const secret = 'zhangnan0122'

// 封装发送token
exports.sendToken = function (uid) {
  // Token 数据
  const payload = {
    users: true,
    uid
  }

  return new Promise((resolve, reject) => {
    const token = jwt.sign(payload, secret, { expiresIn: '1day' })
    resolve(token)
  })
}

// 封装验证token
exports.verifyToken = function (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        // console.log(error.message)
        reject(error)
        return
      }
      // console.log(decoded)
      resolve(decoded)
    })
  })
}
