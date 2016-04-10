var express = require('express');
var router = express.Router();

// ログイン
var jwt = require('jsonwebtoken');
var cert = require("fs").readFileSync('private.key');
router.get('/auth', function(req, res, next) {
  var user = {
    id: 1,
    email: "yuta.nakamura.i7@gmail.com",
  }
  var token = jwt.sign(user, cert);
  console.log( {token: token} );
  res.json(token);
});

// 通常リクエスト
router.get('/*', function(req, res, next) {
  var path = require("path")
  var html = __dirname+"/../../client/dist/index.html"
  html = path.normalize(html)
  res.sendFile(html)
});

module.exports = router;
