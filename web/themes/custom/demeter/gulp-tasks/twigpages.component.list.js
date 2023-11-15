/**
 * @file
 * Task: Generate TWIG based pages.
 */

var path = require('path');
var glob = require('glob');

module.exports = function (gulp, plugins, options, twigHelpers) {
  'use strict';

  gulp.task('twigPages:components-list', function () {

    let componentList = [];
    var allComponentData = {};

    // Get all component data.
    let componentListFiles = glob.sync(options.twigPages.componentsSrc);
    componentListFiles.forEach(function (file) {
      var componentData = twigHelpers.getComponentJSON(file);
      allComponentData = Object.assign(allComponentData, componentData);
      componentList.push({filename:path.basename(file,'.twig'), dirname:path.dirname(file).replace(options.twigPages.paths.componentsSrc, '')});
    });

    // Build all components.
    return gulp.src(options.twigPages.componentListTemplateSrc)

      // Build component list.
      .pipe(plugins.data(function (file) {
        var componentsString = "";
        componentList.forEach(function (element) {
          var componentInclude = "<div class=\"my-5\"><h2 class=\"titular-maquetas d-block\">" + element.filename + "</h2></div>" + "{% include '@components/" + element.dirname + "/" + element.filename + ".twig' %}";
          componentsString += componentInclude;
        });
        var content = file.contents.toString().replace('COMPONENTS_LIST', componentsString);
        file.contents = new Buffer.from(content);
        return allComponentData;
      }))

      // Render via Twig plugin.
      .pipe(plugins.twig(twigHelpers.twigConfigs))
      .on('error', function (err) {
        process.stderr.write(err.message + '\n');
        this.emit('end');
      })

      // Save files.
      .pipe(gulp.dest(options.twigPages.destination));

  });

};
