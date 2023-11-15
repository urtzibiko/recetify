/**
 * @file
 * Task: Generate TWIG based pages.
 */

var path = require('path');
var fs = require('fs');
var glob = require('glob');

module.exports = function (gulp, plugins, options,twigHelpers) {
  'use strict';

  gulp.task('twigPages:pages', function () {

    // Get all component data.
    var allComponentData = {};
    let componentListFiles = glob.sync(options.twigPages.componentsSrc);
    componentListFiles.forEach(function (file) {
      var componentData = twigHelpers.getComponentJSON(file);
      allComponentData = Object.assign(allComponentData, componentData);
    });

    // Build all pages.
    return gulp.src([options.twigPages.pagesSrc])

      // Stay live and reload on error.
      .pipe(plugins.plumber({
        handleError: function (err) {
          console.log(err);
          this.emit('end');
        }
      }))

      // Set default page data.
      .pipe(plugins.data(function (file) {
        return {
          title:'Default Title',
          pageTitle: "Default Page Title",
        }
      }))

      // Get components JSON data.
      .pipe(plugins.data(function (file) {
        return allComponentData;
      }))

      // Get page JSON data.
      .pipe(plugins.data(function (file) {
        var filePath = file.path;
        file.data = twigHelpers.getComponentJSON(filePath);
      }))

      // Render via Twig plugin.
      .pipe(plugins.gap.prependText('{% extends "@base/twigs/dev-guide/page--dev-guide.twig" %}'))
      .pipe(plugins.twig(twigHelpers.twigConfigs))
      .on('error', function (err) {
        process.stderr.write(err.message + '\n');
        this.emit('end');
      })

      // Save files.
      .pipe(gulp.dest(options.twigPages.pagesDestination));

  });

};
