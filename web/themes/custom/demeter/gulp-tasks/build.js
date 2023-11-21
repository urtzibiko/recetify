/**
 * @file
 * Task: Build.
 */

 /* global module */

module.exports = function (gulp, plugins, options) {
  'use strict';

  gulp.task('build',  gulp.series(
      'compile:sass',
      'compile:js',
      'compile:vendorjs',
      'images',
      'fonts',
      'twigPages',
      'svg',
      'static',
      gulp.series('minify:css', 'minify:js')
    ));

  gulp.task('build:dev', gulp.series(
      'compile:sass',
      'compile:js',
      'compile:vendorjs',
      'twigPages',
      'svg'
      )
  );

  gulp.task('buildWithJekyll',  gulp.series(
    'compile:sass',
    'compile:js',
    'compile:vendorjs',
    'images',
    'fonts',
    'jekyll',
    gulp.series('minify:css', 'minify:js')
  ));

};
