/**
 * @file
 * Task: Generate TWIG based pages.
 */

var path = require('path');
var fs = require('fs');
var glob = require('glob');

 module.exports = function (gulp, plugins, options,twigHelpers) {
  'use strict';

   gulp.task('twigPages:dev-guide', function (cb) {

     // Pages.
     let pageList = [];
     let pageListFiles = glob.sync(options.twigPages.pagesSrc);
     pageListFiles.forEach(function(file){
       pageList.push(path.basename(path.dirname(file)));
     });

     // Components.
     let componentList = [];
     let componentListFiles = glob.sync(options.twigPages.componentsSrc);
     componentListFiles.forEach(function(file){
       componentList.push({filename:path.basename(file,'.twig'), dirname:path.dirname(file).replace(options.twigPages.paths.componentsSrc, '')});
     });

     // Component blocks.
     let componentBlocksList = [];
     let componentBlocksListFiles = glob.sync(options.twigPages.componentBlocksSrc);
     componentBlocksListFiles.forEach(function(file){
       componentBlocksList.push({filename:path.basename(file,'.twig'), dirname:path.dirname(file).replace(options.twigPages.paths.componentBlocksSrc, '')});
     });

     var devGuideFile = path.join(options.twigPages.devGuideTemplateSrc);
     if (!fs.existsSync(devGuideFile)){
       console.log('DEV_GUIDE not found');
     }
     return gulp.src([devGuideFile],{allowEmpty:true})
      .pipe(plugins.data(function(file){
        return {
          pages:pageList,
          components: componentList,
          componentBlocks: componentBlocksList
        }
      }))
      .pipe(plugins.twig(twigHelpers.twigConfigs))
      .on('error', function (err) {
        process.stderr.write(err.message + '\n');
        this.emit('end');
      })
      .pipe(plugins.rename(function (path) {
        path.dirname = '';
        path.basename = 'index';
      }))
      .pipe(gulp.dest(options.twigPages.destination));

   });

  };
