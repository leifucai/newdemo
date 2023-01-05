let db = require('../db/index')

exports.all = (req, res) => {
    var sql = 'select * from user'
    db.query(sql, (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}
exports.get = (req, res) => {        //通过用户名查询数据
    var sql = 'select * from user where username = ?'    //？用于占位
    db.query(sql, [req.query.username], (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}

exports.del = (req, res) => {        //通过id删除数据
    var sql = 'delete from user where id = ?'
    db.query(sql, [req.query.id], (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send({
            status: 200,
            message: '删除成功'
        })
    })
}

exports.add = (req, res) => {        //向user表添加数据
    var sql = 'insert into user (username,password,sex,age,email,phone,jur) values (?,?,?,?,?,?,?)'
    db.query(sql, [req.query.username, req.query.password, req.query.sex, req.query.age, req.query.email ,req.query.phone,req.query.jur], (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send({
            status: 200,
            message: '添加成功'
        })
    })
}

exports.update = (req, res) => {        //通过id更新数据
    var sql = 'update user set username = ?, password = ?, sex = ?, age = ?, email = ?, phone = ? where id = ?'
    db.query(sql, [req.query.username, req.query.password, req.query.sex, req.query.age, req.query.email ,req.query.phone, req.query.id], (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send({
            status: 200,
            message: '修改成功'
        })
    })
}

