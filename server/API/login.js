//编写sql语句对注册登录进行操作
let db = require('../db/index')

exports.login = (req, res) => {
  var sql = 'select * from user where username = ? and password = ?'
  db.query(sql, [req.body.params.username, req.body.params.password], (err, data) => {
      if(err) {
          return res.send({
            status: 400,
            message: "登录失败"
          })
      }
      
      if(data.length > 0) {
        res.send({
          status: 200,
          message: "登录成功",
          username:req.body.params.username
        })
      }else{
        res.send({
          status: 202,
          message: '用户名或密码错误'
        })
      }
  })
}

exports.register = (req, res) => {
  const sql1 = 'select * from user where username = ?'
  const sql2 = 'insert into user (username,password,sex,age,email,phone) values (?,?,?,?,?,?)'
  db.query(sql1, [req.body.params.username], (err, data) => {
    if(err) {
      return res.send({
        status: 400,
        message: "操作失败"
      })
    }
    if(data.length > 0) {
      return res.send({
        status: 202,
        message: "用户名已存在"
      })
    }else{
      db.query(sql2, [req.body.params.username, req.body.params.password, req.body.params.sex, req.body.params.age, req.body.params.email ,req.body.params.phone], (err, data) => {
        if(err) {
            return res.send({
              status: 400,
              message: "注册失败"
            })
        }
        res.send({
          status: 200,
          message: "注册成功"
        })
      })
    }
  })
}

