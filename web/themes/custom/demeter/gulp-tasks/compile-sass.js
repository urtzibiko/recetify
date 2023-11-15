/**
 * @file
 * Task: Compile: Sass.
 */

 /* global module */

module.exports = function (gulp, plugins, options) {
  'use strict';

  var glob = require('glob');

  gulp.task('compile:sass', function (cb) {
    return gulp.src(glob.sync(options.sass.file).sort())
      .pipe(plugins.plumber({ errorHandler: plugins.notify.onError('Error compilando SASS') }))
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sassGlob())
      .pipe(plugins.sass({
        errLogToConsole: true,
        includePaths: [ './node_modules/' ],
        outputStyle: 'expanded'
      }).on('error', plugins.sass.logError))
      .pipe(plugins.autoprefixer({
        browsers: options.sass.AUTOPREFIXER_BROWSERS,
        cascade: false
      }))
      .pipe(plugins.sourcemaps.write())
      .pipe(gulp.dest(options.sass.destination));
      cb();
  });
};
