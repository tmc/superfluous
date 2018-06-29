"use strict";

var store = require_core("server/store");
var config = require_core("server/config");
var connect = require('connect');

module.exports = {
  setup_packager: function() {
    // sets up the packager endpoint for react
    require_app("server/react").install();
  },
  setup_app: function() {
    console.log("Main setup stuff, something, something");
  },
  setup_store: function() {
    store.install();
  },
  setup_request: function(req) {
    // Filter out logging packager requests
    if (!req.path.indexOf("/pkg")) {
      return;
    }

    console.log("Handling Request to", req.path, req.query);
  },
  setup_plugins: function(app) {
    // If we are testing, don't install this plugin
  },
  setup_cache: function(app) {
    // setup static helpers
    var oneDay = 1000 * 60 * 60 * 24;
    var oneYear = oneDay * 365;
    var st = require("serve-static");
    app.use(st('react/', { maxAge: oneYear }));
  }
};
