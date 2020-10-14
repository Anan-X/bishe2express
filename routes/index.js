var express = require('express');
var router = express.Router();
const db = require('../until/dbconfig')
const jwk = require('../until/jwk')
const controUser = require('../controllers/controUser')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 登录
router.post('/login',controUser.login );
// 注册
router.post('/register',controUser.register );
// 判读用户名是否可用
router.get('/isusername',controUser.isUsername );


module.exports = router;
