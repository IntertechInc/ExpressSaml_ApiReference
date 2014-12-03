'use strict';

var saml = require('saml20'),
  config = require('config');

module.exports = {
  unpackSaml2: function(req, res, next) {
    var token = req.body.token;

    if (!token) {
      res.send(401, {
        message: "Please send me a token!"
      });
      return
    };

    /** Validation Code, This verifies the assertion is legit */
    var options = config.get('samlSettings');

    saml.validate(token, options, function(err, profile) {
      if (err) {
        res.send(401, {
          message: err.message
        });
        return;
      }

      req.samlToken = {
        token: token,
        claims: profile.claims
      };
      next();
    });
  },
  ensureSaml2: function(req, res, next) {
    var token = req.user.samlToken;

    var options = config.get('samlSettings');

    saml.validate(token, options, function(err, profile) {
      if (err) {
        res.send(401, {
          message: err.message
        });
        return;
      }

      next();
    });
  }
};