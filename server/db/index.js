let mysql = require('mysql')

let db = mysql.createPool({
    host: '127.0.0.1',     //数据库IP地址
    user: 'root',          //数据库登录账号
    password: '123456',      //数据库登录密码
    database: 'user'       //要操作的数据库
})
//测试数据库是否连接成功
// db.getConnection(function(err,connection){
//     if(err){
//         console.log("false");
//     }else{
//         console.log("true");
//         console.log(db._allConnections.length);
//         connection.query('select * from user',function(err,rows){
//             if(err){
//                 console.log("查询失败");
//             }else{
//                 console.log(rows);
//             }
//             console.log(db._allConnections.length);
//         })
//     }
//     db.end();
// })
module.exports = db
