'use strict';

var moar = require('../lib/moar.js'),
    _ = require('lodash');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['moar'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'functions': function(test) {
    test.expect(2);
    // tests here
    test.ok(typeof moar.get === "function", 'should define a get function.');
    test.ok(typeof moar.search === "function", 'should define a search function.');
    test.done();
  },
  'get': function(test) {
    test.expect(1);
    moar.get({"board": "v"}, function(data) { 
      test.ok(_(data).some(function(el) { return el.threads; }) || data.error ,"should make a request to 4chan\'s API, sending either a json response or an error object to the callback."); 
      test.done();
    });
  },
  'get exceptions': function(test) {
    test.expect(3);
    try {
      moar.get();
    } catch (err) {
      test.equal(err.message, "ArgumentError: Wrong number of arguments: 0 for [1 - 2].", "should throw errors on incorrect usage. (too few arguments)"); 
    }
    try {
      moar.get("one", "two", "three");
    } catch (err) {
      test.equal(err.message, "ArgumentError: Wrong number of arguments: 3 for [1 - 2].", "should throw errors on incorrect usage. (too many arguments)");
    }
    try {
      moar.get("wrong", "arguments");
    } catch (err) {
      test.equal(err.message, "ArgumentError: Must provide a callback function.", "should throw errors on incorrect usage. (no callback)");
    }
    test.done();
  },
  'search': function(test) {
    test.expect(1);
    moar.search({"board": "v", "term": "pokemon"}, function(data) {
      test.ok(data, "should make a request to 4chan\'s API, sending either a json response or an error object to the callback.");
      test.done();
    });
  }
};
