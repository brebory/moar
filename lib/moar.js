/*
 * moar
 * https://github.com/broberto/moar
 *
 * Copyright (c) 2013 brebory
 * Licensed under the MIT license.
 */

'use strict';
var https = require('https'),
    _ = require('lodash');

function Moar() {
  this.defaults = {
    "board": "b",
    "threadCount": 10,
    "sage": true,
  };
}

Moar.prototype.get = function(options, callback) {
  if (arguments.length > 2 || arguments.length < 1) {
    throw new Error("ArgumentError: Wrong number of arguments: " + arguments.length + " for [1 - 2].");
  }
  var request;
  function sendRequest(reqText, cb) {
    https.get(reqText, function(res) {
      var data = [];
      res.on('data', function(d) {
        data.push(d);
      });
      res.on('end', function() {
        cb(JSON.parse(data.join("")));
      });
    }).on('error', function(e) {
      cb({ "error": "could not get json response from api.4chan.org, error: " + e });
    });
  }
  if (_.isFunction(options)) {
    callback = options;
    request = "https://api.4chan.org/boards.json";
  } else {
    _.defaults(options, this.defaults);
    request = "https://api.4chan.org/" + options.board + "/threads.json";
  }
  if (!(callback instanceof Function)) {
    throw new Error("ArgumentError: Must provide a callback function.");
  }
  sendRequest(request, callback);
};

Moar.prototype.search = function(options, callback) {
  options = _.defaults({}, options, this.defaults);
  https.get("https://api.4chan.org/" + options.board + "/threads.json", function(res) {
    var data = [];
    res.on('data', function(d) {
      data.push(d); 
      // implement the rest
    });
    res.on('end', function() {
      callback(JSON.parse(data.join("")));
    });
  }).on('error', function(e) {
    callback({"error": "could not get json response from api.4chan.org, error: " + e });
  });
};

module.exports = new Moar();
