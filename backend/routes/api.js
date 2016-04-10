var express = require('express');
var router = express.Router();
var app = express();

router.get('/', function(req, res, next) {
  console.log( req );
  res.json('respond with a resource');
});

router.get('/protected',function(req, res) {
  if (!req.user) return res.json(401);
  res.json(200);
});

router.get('/users', function(req, res, next) {
  res.json([
    {id: 1, name: "yuta"}
  ])
});

module.exports = router;
