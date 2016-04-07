var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/users/', function(req, res, next) {
  res.json([
    {id: 1, name: "yuta"}
  ])
});

module.exports = router;
