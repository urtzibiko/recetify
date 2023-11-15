/**
 * @file
 * Task: Compile: Sass.
 */

/* global module */
var path = require('path');
var fs = require('fs');
var glob = require('glob');


module.exports = function (gulp, plugins, options) {
  'use strict';
  var twigHelpers = require('./twig/twigHelpers')(options)
  gulp.task('menu:sass', function (cb) {
    return gulp.src([
      options.menu.sassFile
    ])
      .pipe(plugins.plumber({ errorHandler: plugins.notify.onError('Error compilando SASS') }))
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

      .pipe(gulp.dest(options.menu.destinationCss))
    cb();
  });
  gulp.task('menu:js', function () {

    return gulp.src(
      options.menu.jsFiles
    )
      .pipe(plugins.plumber({ errorHandler: plugins.notify.onError('Error compilando Js menu') }))
      .pipe(plugins.babel({
        presets: ['es2015']
      }))
      .pipe(plugins.plumber.stop())
      .pipe(plugins.concat('menu.js'))
      .pipe(gulp.dest(options.menu.destinationJs))

  });
  gulp.task('menu:js:vendors', function () {
    if(options.js.vendorFiles.length === 0){

      plugins.notify("Sin VENDORS JS que compilar.");
      return Promise.resolve('Vendors ignored');
    }
    return gulp.src(
      options.js.vendorFiles
    )
      .pipe(plugins.plumber({ errorHandler: plugins.notify.onError('Error compilando VENDORS JS') }))
      .pipe(plugins.concat('vendor.js'))
      .pipe(gulp.dest(options.menu.destinationJs))
  });
  gulp.task('menu:twig', function () {
    return gulp.src([options.menu.twigFile])
      //Stay live and reload on error.
      .pipe(plugins.plumber({
        handleError: function (err) {
          console.log(err);
          this.emit('end');
        }
      }))

      .pipe(plugins.data(function(file){
        var filePath = file.path;
        var componentData = twigHelpers.getComponentJSON(filePath);
        file.data=componentData;
      }))
      //Render via Twig plugin
      .pipe(plugins.twig(twigHelpers.twigConfigs))
      .on('error', function (err) {
        process.stderr.write(err.message + '\n');
        this.emit('end');
      })
      //Save files.
      .pipe(gulp.dest(options.menu.destination));
  });
  gulp.task('menu:twig:index', function () {
    return gulp.src([options.menu.twigFile])
      //Stay live and reload on error.
      .pipe(plugins.plumber({
        handleError: function (err) {
          console.log(err);
          this.emit('end');
        }
      }))

      .pipe(plugins.data(function(file){
        var filePath = file.path;
        var componentData = twigHelpers.getComponentJSON(filePath);
        file.data=componentData;
      }))
      //Render via Twig plugin
      .pipe(plugins.twig(twigHelpers.twigConfigs))
      .on('error', function (err) {
        process.stderr.write(err.message + '\n');
        this.emit('end');
      })
      //Save files.
      .pipe(
        plugins.gap.prependText('<html>\n' +
          '    <head>\n' +
          '        <meta charset="UTF-8">\n' +
          '        <title>Menu de transicion</title>\n' +
          '        <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
          '        <link rel="stylesheet" href="/css/menu-transicion.css">\n' +
          '\n' +
          '\n' +
          '    </head>\n' +
          '    <body>')
      )
      .pipe(
        plugins.gap.appendText('        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js"></script>\n<script type="application/javascript">\n' +
          '            var Drupal = { behaviors: {}};\n' +
          '            (function ($) {\n' +
          '                \'use strict\';\n' +
          '\n' +
          '                $(function() {\n' +
          '\n' +
          '                    for (var key in Drupal.behaviors) {\n' +
          '                        if (Drupal.behaviors.hasOwnProperty(key)) {\n' +
          '                            Drupal.behaviors[key].attach();\n' +
          '                        }\n' +
          '                    }\n' +
          '                });\n' +
          '\n' +
          '            })(jQuery);\n' +
          '\n' +
          '\n' +
          '        </script><script type="text/javascript" src="/js/vendor.js"></script>\n' +
          '        <script type="text/javascript" src="/js/menu.js"></script></body></html>')
      )
      .pipe(plugins.rename(function (path) {
        path.dirname = '';
        path.basename = 'index';
      }))
      .pipe(gulp.dest(options.menu.destination));
  });

  gulp.task('menu:images', function () {
    return gulp.src(options.menu.imageFiles)
      .pipe(plugins.imagemin([
        plugins.imagemin.gifsicle({interlaced: true}),
        plugins.imagemin.jpegtran({progressive: true}),
        plugins.imagemin.optipng({optimizationLevel: 7}),
        plugins.imagemin.svgo({
          plugins: [
            {removeViewBox: true},
            {cleanupIDs: false},
          ]
        })
      ]))
      .pipe(gulp.dest(options.menu.destinationImages))
  });
  gulp.task('menu:svg', function() {
    return gulp.src(options.svg.files)
      .pipe(plugins.svgsprite(options.svg))
      .pipe(gulp.dest(options.menu.destinationSvg));
  });
  gulp.task('menu:fonts', function () {
    return gulp.src(options.fonts.files)
      .pipe(gulp.dest(options.menu.destinationFonts))
  });
  gulp.task('menu', gulp.parallel('menu:sass','menu:twig','menu:twig:index','menu:js','menu:js:vendors','menu:images','menu:svg','menu:fonts'));
};
