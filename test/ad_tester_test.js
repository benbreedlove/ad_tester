/*global require:true */
var nodemock = require("nodemock");
var jQuery = nodemock.mock('jQuery');
var document = nodemock.mock('document');
var ad_tester = require('../lib/ad_tester.js');

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

exports['Ad_Tester' ] = {
  setUp: function(done) {
    done();
  },
  'test url' : function(test) {
      test.expect(1);
      var test_a = new ad_tester.Ad_Tester('testurl_a');
      test.equal(test_a.ad_url() , 'testurl_a', 'should be testurl_a');
      test.done();
  },
  'test objectd do not share' : function(test) {
      test.expect(2);
      var test_b = new ad_tester.Ad_Tester('testurl_b');
      var test_a = new ad_tester.Ad_Tester('testurl_a');
      test.equal(test_b.ad_url() , 'testurl_b', 'should be testurl_b');
      test.equal(test_a.ad_url() , 'testurl_a', 'should be testurl_a');
      test.done();
  },
  'test url can change' : function(test) {
      test.expect(2);
      var test_a = new ad_tester.Ad_Tester('testurl_a');
      test.equal(test_a.ad_url() , 'testurl_a', 'should be testurl_a');
      test_a.ad_url('newurl');
      test.equal(test_a.ad_url() , 'newurl', 'should be newurl');
      test.done();
  },
  'test creates iframe' : function(test) {
      test.expect(2);
      //well, this is useless, everything I want to test should be mocked
      var test_a = new ad_tester.Ad_Tester('testurl_a');
      test.notEqual(test_a.iframe(), true, 'iframe should be empty');
      test_a.make();
      test.equal(typeof(test_a.iframe()) , 'object', 'should be testurl_a');
      test.done();
  }
};
