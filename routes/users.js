var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let data = {}
  data.code = 200
  data.msg  = '请求成功'
  data.data = {}
  res.json(data);
});

module.exports = router;
