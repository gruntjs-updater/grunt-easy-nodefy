/*!
 * test/easy-nodefy.js
 * 
 * Copyright (c) 2014
 */

// 3rd party
var grunt = require('grunt');


/* -----------------------------------------------------------------------------
 * expected
 * ---------------------------------------------------------------------------*/

var expectedMap = grunt.file.read('test/fixtures/out/nested/map.js');
var expectedPaths = grunt.file.read('test/fixtures/out/paths.js');


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

exports.nodefy = {

  expanded: function(test) {
    var resultMap = grunt.file.read('tmp/expanded/nested/map.js');
    var resultPaths = grunt.file.read('tmp/expanded/paths.js');

    test.expect(2);
    test.equal(resultMap, expectedMap);
    test.equal(resultPaths, expectedPaths);
    test.done();
  },

  direct: function (test) {
    var resultMap = grunt.file.read('tmp/direct/test/fixtures/in/nested/map.js');
    var resultPaths = grunt.file.read('tmp/direct/test/fixtures/in/paths.js');

    test.expect(2);
    test.equal(resultMap, expectedMap);
    test.equal(resultPaths, expectedPaths);
    test.done();
  }

};
