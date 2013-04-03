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
  // If we were supplied options, merge with the defaults, then make the request.
  if(options) {
    _.defaults(options, this.defaults);
    https.get("https://api.4chan.org/" + options.board + "/threads.json", function(res) {
      var data = [];
      res.on('data', function(d) {
        data.push(d);
      });
      res.on('end', function() {
        callback(JSON.parse(data.join("")));
      });
    }).on('error', function(e) {
      callback({ "error": "could not get json response from api.4chan.org, error: " + e });
    });
  } else {
    // If get() has no arguments, return the first 10 threads from all boards.
    https.get("https://api.4chan.org/boards.json", function(res) {
      var data = [];
      res.on('data', function(d) {
        data.push(d);
        // need to do some other stuff here... not sure yet.
      });
      res.on('end', function() {
        callback(JSON.parse(data.join("")));
      });
    }).on('error', function(e) {
      callback({ "error": "could not get json response from api.4chan.org, error: " + e });
    });
  }
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

