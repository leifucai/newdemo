let express = require('express')
let router = express.Router()
let login = require('./API/login')
let info = require('./API/list')
let jur = require('./API/jur')

router.post('/login', login.login)
router.post('/register', login.register)

router.get('/list/all', info.all)
router.get('/list/get', info.get)
router.get('/list/add', info.add)
router.get('/list/update', info.update)
router.get('/list/del', info.del)
router.get('/jur', jur.update)

module.exports = router
