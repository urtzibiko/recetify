/**
 * @file
 * Task: Watch.
 */

 /* global module */

module.exports = function (gulp, plugins, options) {
  'use strict';



  gulp.task('watch:js'
    , function () {
        return gulp.watch(options.js.files,gulp.series(
              'compile:js',
              'minify:js',
              'browser-sync:reload'
            ));

    });

  gulp.task('watch:sass', function (cb) {
    gulp.watch(
      options.sass.files
    , gulp.series(
        'compile:sass',
        'minify:css',
        'browser-sync:reload'
      ));
      cb();
    });

  gulp.task('watch:images', function () {
    return gulp.watch( options.images.files,gulp.series('images','browser-sync:reload'));
  });
  gulp.task('watch:svgs', function () {
    return gulp.watch( options.svg.files,gulp.series('svg','browser-sync:reload'));
  });
  gulp.task('watch:fonts', function () {
    return gulp.watch( options.fonts.files,gulp.series('fonts','browser-sync:reload'));
  });
  gulp.task('watch:static', function () {
    return gulp.watch( options.static.files,gulp.series('static','browser-sync:reload'));
  });

  gulp.task('watch:styleguide', function () {
    return gulp.watch(options.sass.files,gulp.series('compile:styleguide'));
  });

  gulp.task('watch:jekyll', function () {
    return gulp.watch(options.jekyll.files,gulp.series('jekyll','browser-sync:reload'));
  });


  gulp.task('watch', gulp.parallel('watch:sass', /*'watch:styleguide',*/ 'watch:js', 'watch:fonts', 'watch:static', 'watch:images',/* 'watch:jekyll',*/'watch:twigPages','watch:svgs'));
  gulp.task('watchWithJekyll', gulp.parallel('watch:sass', /*'watch:styleguide',*/ 'watch:js', 'watch:fonts', 'watch:static', 'watch:images'));
};
