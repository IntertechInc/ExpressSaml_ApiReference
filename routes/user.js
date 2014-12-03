var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send({
    name: req.user.commonName,
    email: req.user.emailAddress
  });
});



module.exports = router;