var express = require('express');
var router = express.Router();

router.get('*', function(req, res, next) {
  var path = require("path")
  var html = __dirname+"/../../client/dist/index.html"
  html = path.normalize(html)
  res.sendFile(html)
});

module.exports = router;
