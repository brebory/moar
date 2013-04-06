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
  var defaults = {
    "board": "b",
    "threadCount": 10,
    "sage": true,
  };

	var sendRequest = function(request, options, callback) {
		setTimeout(function() {
			callback(new Error("Error: Connection timed out."));
		}, 5000);
    https.get(request, function(res) {
      var data = [];
      res.on('data', function(d) {
        data.push(d);
      });
      res.on('end', function() {
        callback(null, JSON.parse(data.join("")));
      });
    }).on('error', function(e) {
      callback(e);
    });
  };

	var checkArguments = function(request, options, callback, len) {
		if (len < 1 || len > 2) {
			throw new Error("ArgumentError: Wrong number of arguments: " + len + " for [1 - 2].");
		}
		if (_.isFunction(options) && len === 1) {
			callback = options;
			options = defaults;
			request = "https://api.4chan.org/boards.json";
		} else {
			_.defaults(options, defaults);
			request = "https://api.4chan.org/" + options.board + "/threads.json";
		}
		if (!(_.isFunction(callback)) || _.isFunction(options)) {
			throw new Error("ArgumentError: Incorrect usage.");
		}
	};

	function get(options, callback) {
		var request, len = arguments.length;
		checkArguments(request, options, callback, len);
		sendRequest(request, options, callback);
	}

	function search(options, callback) {
		var request, len = arguments.length;	
		checkArguments(options, callback, len);
		sendRequest(request, options, callback);
	}

	this.get = get;
	this.search = search;
}

module.exports = new Moar();
