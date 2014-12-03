'use strict';

var config = require('config');

module.exports = {
  ensureVersion: function(req, res, next) {
    // Get requested version and remove +json or +xml
    var requestedVersion = req.headers.accept.split('+')[0];

    if (requestedVersion !== config.get('apiVersion')) {
      res.send(400, {
        message: "Please provide a valid api version"
      });
      return;
    }

    next();
  }
};