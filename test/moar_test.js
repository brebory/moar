'use strict';

var moar = require('../lib/moar.js');

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
  'requests': function(test) {
    test.expect(2);
    var val1, val2;
    moar.get({"board": "v"}, function(data) { val1 = data; console.log(val1); });
    console.log(val1);
    test.ok(val1, 'should make a request to 4chan\'s api, returning either a json string or an error object.');
    test.ok(val2, 'should make a request to 4chan\'s api, returning either a json string or an error object.');
    test.done();
  }
};
