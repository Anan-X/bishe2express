const db = require('../until/dbconfig')
const jwk = require('../until/jwk')

// 判断数据库里是否已经存在该用户名方法
let isUsernamefun = async (username) =>{
  let sql =  `select * from users where username  = ?`
  let sqlArr = [username]
  let flag = await db.SySqlConnect(sql, sqlArr)
  .then(data => {
    if(data.length ===0){
      return true
    }
    return false
  })
  return flag
 
}
// 判断数据库里是否已经存在该用户名接口
let isUsername = async function(req, res) {
  let username = req.query.username
  console.log(isUsernamefun(username))
  if(await isUsernamefun(username)){
    res.send({
      code: 200,
      msg: '用户名可用'
    })
  } else {
    res.send({
      code: 400,
      msg: '用户名已存在'
    })
  }
}

// 登录接口
let login = function (req, res) {
  let username = req.body.username
  let password = req.body.password

  console.log(username,password)
  let sql = "select * from users where username=? and password=?"
  let sqlArr = [username,password]
  db.SySqlConnect(sql,sqlArr)
  .then(data => {
    if(data.length){
      let uid = data[0].uid
      jwk.sendToken(uid).then(token => {
        res.send({
          code:200,
          userinfo: data[0],
          token,
          msg: '登录成功'
        })
      })
    }else{
      res.send({
        code:400,
        msg: '账号和密码不匹配'
      })
    }
  })
}
// 注册接口
let register = function (req, res) {
  let {username, password} = req.body
  // console.log(username, password)
  let sql = `insert into users(username,password) values(?,?)`
  let sqlArr = [username, password]
  db.SySqlConnect(sql, sqlArr)
  .then(data => {
    if(data.affectedRows===1){
      res.send({
        code: 200,
        msg: '注册成功'
      })
    }else {
      res.send({
        code: 400,
        msg: '注册失败'
      })
    }
  })
}

module.exports = {
  login,
  register,
  isUsername
}