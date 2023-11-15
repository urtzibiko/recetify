module.exports = function (gulp, plugins, options) {
  'use strict';

  gulp.task('static', function () {
    return gulp.src(options.static.files)
    .pipe(gulp.dest(options.static.destination))
  });
};
