/**
 * @file
 * Task: Optimize images.
 */

module.exports = function (gulp, plugins, options) {
  'use strict';

  gulp.task('fonts', function () {
    return gulp.src(options.fonts.files)
      .pipe(gulp.dest(options.fonts.destination))
  });
};
