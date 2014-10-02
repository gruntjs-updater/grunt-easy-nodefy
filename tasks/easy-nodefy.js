/*!
 * easy-nodefy.js
 * 
 * Copyright (c) 2014
 */

// core
var path = require('path');

// 3rd party
var _ = require('underscore');
var async = require('async');
var nodefy = require('easy-nodefy');


/* -----------------------------------------------------------------------------
 * task
 * ---------------------------------------------------------------------------*/

var name = 'nodefy';
var description = 'Convert AMD modules into a CJS formatted modules.';


/* -----------------------------------------------------------------------------
 * task
 * ---------------------------------------------------------------------------*/

module.exports = function(grunt) {

  grunt.registerMultiTask(name, description, function () {
    // async... as always (this should be a default)
    var done = this.async();

    // options/defaults
    var options = this.options({
      baseDir: '',
      paths: {},
      map: {}
    });

    // baseDir needs to be an absolute path of
    // where the baseDir lives.
    options.baseDir = path.join(process.cwd(), options.baseDir);

    // loop over each of the file objects and convert
    var convertFiles = function (files, callback) {
      async.each(files, convertFilesItem, callback);
    };

    // loop over each path in item src array call convert
    // with src/dest
    var convertFilesItem = function (item, callback) {
      // need to know if it is expanded so that I can
      // properly determine correct outputPath
      var isExpanded = item.orig.expand;

      async.each(item.src, function (srcPath, callback) {
        convertFile(srcPath, item.dest, isExpanded, callback);
      }, callback);
    };

    // convert file each file. first need to determine
    // the correct output path.
    var convertFile = function (srcPath, outputPath, isExpanded, callback) {
      if (!isExpanded) {
        outputPath = path.join(outputPath, srcPath);
      }

      var nodefyOptions = _.extend({
        outputPath: outputPath
      }, options);

      nodefy.convertFile(srcPath, nodefyOptions, callback);
    };

    // kick off yo!
    convertFiles(this.files, done);
  });

};
