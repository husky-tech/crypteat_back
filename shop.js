var mysql = require("mysql");
var express = require('express');
var router = express.Router();

var table_name = 'shops'
var table_name_pass = 'user'

router.get('/', function (req, res, next) {
  var data = [];
  pool.query('select * from ' + table_name, function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
    //res.status(200).send(rows);
    //取得したgenre_idとplace_idをもとにgenreとplaceを引っ張りたい
    var test = rows.place_id
    console.log(test);
    console.log("おはよう");
  });
});

router.get('/:id', function (req, res, next) {
  const id = req.params.id;
  console.log("id dayo:" + id);
  pool.query('select * from ' + table_name + ' where id = ?', id, function (err, rows, fields) {
    res.json(rows);
  });
});

//create new shop
router.post('/', function (req, res, next) {

  const id = "admin"
  const pass = req.body.password_admin;

  pool.query('select * from ' + table_name_pass + ' where id = ?', id, function (err, rows, fields) {
    //パスワードは一致するか？
    //DB攻撃されてパスワードが流出しても問題ないのでハッシュ化は省略
    //またそのうちやろう
    //https://qiita.com/isishizuka/items/fb1c981f78a206eab3b3
    if (err) throw err;
    if (rows[0].pass === pass) {
      //res.json({ status: "OK" });

      const body1 = req.body.name;
      const body2 = req.body.detail_short;
      const body3 = req.body.detail_long;
      const body4 = req.body.price_lunch;
      const body5 = req.body.price_dinner;
      const body6 = req.body.address;
      const body7 = req.body.station;
      const body8 = req.body.takestime;
      const body9 = req.body.genre;
      const body10 = req.body.tell;
      const body11 = req.body.businesshour;
      const body12 = req.body.holiday;
      const body13 = req.body.remark;
      const body14 = req.body.url_pc;
      const body15 = req.body.url_mobile;
      const body16 = req.body.availablemenu;
      const body17 = req.body.images;
      const body18 = req.body.password_post;

      const column_name = ["id", "name", "detail_short", "detail_long", "price_lunch", "price_dinner", "address", "station", "takestime", "genre", "tell", "businesshour", "holiday", "remark", "url_pc", "url_mobile", "availablemenu", "images", "password"];
      const column_value = [null, body1, body2, body3, body4, body5, body6, body7, body8, body9, body10, body11, body12, body13, body14, body15, body16, body17, body18];
      var columns = column_name.concat(column_value);

      var query = "INSERT INTO ??(??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
      var table = [table_name].concat(columns);//md5(req.body.password)

      query = mysql.format(query, table);
      console.log(query);

      pool.query(query, function (err, rows, fields) {
        if (err) throw err;
        res.json(rows);
      });

    }
    else {
      res.json({ status: "NG" });
    }

  });
});

//update shop information
router.put('/:id', function (req, res, next) {

  const id = req.params.id;
  const pass = req.body.password;

  console.log("id dayo:" + id);
  pool.query('select password from ' + table_name + ' where id = ?', id, function (err, rows, fields) {
    //パスワードは一致するか？
    //DB攻撃されてパスワードが流出しても問題ないのでハッシュ化は省略
    //またそのうちやろう
    console.log("test:"+rows[0].password);

    //https://qiita.com/isishizuka/items/fb1c981f78a206eab3b3
    if (err) throw err;
    if (rows[0].password === pass) {
      //res.json({ status: "OK" });

      const body1 = req.body.name;
      const body2 = req.body.detail_short;
      const body3 = req.body.detail_long;
      const body4 = req.body.price_lunch;
      const body5 = req.body.price_dinner;
      const body6 = req.body.address;
      const body7 = req.body.station;
      const body8 = req.body.takestime;
      const body9 = req.body.genre;
      const body10 = req.body.tell;
      const body11 = req.body.businesshour;
      const body12 = req.body.holiday;
      const body13 = req.body.remark;
      const body14 = req.body.url_pc;
      const body15 = req.body.url_mobile;
      const body16 = req.body.availablemenu;
      const body17 = req.body.images;

      var query = "UPDATE ?? SET ?? = ?,?? = ?,?? = ?,?? = ?,?? = ?,?? = ?,?? = ?,?? = ?,?? = ?,?? = ?,?? = ?,?? = ?,?? = ?,?? = ?,?? = ?,?? = ?,?? = ? WHERE ?? = ?";
      var table = [table_name, "name", body1, "detail_short", body2, "detail_long", body3, "price_lunch", body4, "price_dinner", body5, "address", body6, "station", body7, "takestime", body8, "genre", body9, "tell", body10, "businesshour", body11, "holiday", body12, "remark", body13, "url_pc", body14, "url_mobile", body15, "availablemenu", body16, "images", body17, "id", id];//md5(req.body.password)
      query = mysql.format(query, table);
      pool.query(query, function (err, rows, fields) {
        if (err) throw err;
        res.json(rows);
      });

    }
    else {
      res.json({ status: "NG" });
    }

  });
});

router.delete('/:id/:password', function (req, res, next) {
  const id = req.params.id;
  const pass = req.params.password;
  //const pass = req.body.password;
  //console.log(req.body);

  pool.query('select password from ' + table_name + ' where id = ?', id, function (err, rows, fields) {

    //console.log(rows[0].password);
    //console.log(pass);

    if (err) throw err;
    if (rows[0].password === pass) {

      pool.query('delete from ' + table_name + ' where id = ?', id, function (err, rows, fields) {
        res.json(rows);
      });

    }
    else {
      res.json({ status: "NG" });
    }

  });
});

module.exports = router;
