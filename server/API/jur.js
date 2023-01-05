let db = require('../db/index')


exports.update = (req, res) => {        //通过id更新数据
    var sql = 'update user set username = ?, password = ?, sex = ?, age = ?, email = ?, phone = ?, jur = ? where id = ?'
    db.query(sql, [req.query.username, req.query.password, req.query.sex, req.query.age, req.query.email ,req.query.phone,req.query.jur, req.query.id], (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send({
            status: 200,
            message: '修改成功'
        })
    })
}
