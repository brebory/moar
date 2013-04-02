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

Moar.prototype.get = function(options) {
  // If we were supplied options, merge with the defaults, then make the request.
  if(options) {
    _.defaults(options, this.defaults);
    https.get("https://api.4chan.org/" + options.board + "/threads.json", function(res) {
      res.on('data', function(d) {
        return d;
      });
    }).on('error', function(e) {
      return { "error": "could not get json response from api.4chan.org, error: " + e };
    });
  } else {
    // If get() has no arguments, return the first 10 threads from all boards.
    https.get("https://api.4chan.org/boards.json", function(res) {
      res.on('data', function(d) {
       // implement 
       // there are going to be problems with rate limiting here if we make a bunch of requests...
      });
    }).on('error', function(e) {
      return { "error": "could not get json response from api.4chan.org, error: " + e };
    });
  }
};

Moar.prototype.search = function(options) {
  options = _.defaults({}, options, this.defaults);
  https.get("https://api.4chan.org/" + options.board + "/threads.json", function(res) {
    res.on('data', function(d) {
      // implement
    });
  }).on('error', function(e) {
    console.log("\ncould not get json response from api.4chan.org, error: " + e + "\n");
    return {"error": "could not get json response from api.4chan.org, error: " + e };
  });
};
module.exports = new Moar();

