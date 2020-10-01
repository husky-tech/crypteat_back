var mysql = require("mysql");
var express = require('express');
var router = express.Router();

var table_name = 'user'

router.post('/', function (req, res, next) {
  const id = req.body.id;
  const pass = req.body.pass;

  pool.query('select * from ' + table_name + ' where id = ?', id, function (err, rows, fields) {
    //パスワードは一致するか？
    //DB攻撃されてパスワードが流出しても問題ないのでハッシュ化は省略
    //またそのうちやろう
    //https://qiita.com/isishizuka/items/fb1c981f78a206eab3b3
    if (err) throw err;
    if (rows[0].pass === pass) {
      res.json({ status: "OK" });
    }
    else {
      res.json({ status: "NG" });
    }
  });

});

module.exports = router;
