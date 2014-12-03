var express = require('express');
var router = express.Router();
var saml = require('saml20');
var config = require('config');
var jwt = require('jsonwebtoken');
var authentication = require('../authentication');
var bodyParser = require('body-parser');
var camelcaseKeys = require('camelcase-keys');

/* Get auth token using a SAML token */
router.post('/saml', authentication.unpackSaml2, function(req, res) {
  var token = {
    samlToken: req.samlToken.token,
    commonName: req.samlToken.claims['http://schemas.xmlsoap.org/claims/CommonName'],
    emailAddress: req.samlToken.claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
  };

  var signedToken = jwt.sign(token, config.get('jwtKey'));

  var response = {
    access_token: signedToken,
    token_type: 'bearer',
    common_name: token.commonName,
    email: token.emailAddress
  };

  res.send(response);
});

module.exports = router;