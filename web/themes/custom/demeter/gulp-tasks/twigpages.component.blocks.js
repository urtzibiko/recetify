/**
 * @file
 * Task: Generate TWIG based pages.
 */

const path = require('path');
const fs = require('fs');
const glob = require('glob');

module.exports = function (gulp, plugins, options, twigHelpers) {
  'use strict';
  gulp.task('twigPages:component-blocks', function () {

    return gulp.src([options.twigPages.componentBlocksSrc])

      .pipe(plugins.plumber({
        handleError: function (err) {
          console.log(err);
          this.emit('end');
        }
      }))

      // Render component through a template.
      .pipe(plugins.data(function (file) {

        let filePath = file.path
          .replace(process.cwd(), '')
          .replace('/' + options.twigPages.paths.componentBlocksSrc, '');

        const templatePath = path.join(process.cwd(), options.twigPages.componentBlockTemplateSrc);
        if (!fs.existsSync(templatePath)){
          gulp.emit('error', new PluginError(TASK_NAME, 'Component template "' + templatePath + '" not found!'));
        }
        const template = fs.readFileSync(templatePath).toString();
        file.contents = new Buffer.from(template.replace('FILE_PATH', filePath));

      }))

      // Get component data.
      .pipe(plugins.data(function (file) {
        return twigHelpers.getComponentJSON(file.path);
      }))

      // Render via Twig plugin.
      .pipe(
        plugins.twig(
          twigHelpers.twigConfigs
        )
      )

      // Capture errors.
      .on('error', function (err) {
        process.stderr.write(err.message + '\n');
        this.emit('end');
      })

    // Save files.
    .pipe(gulp.dest(options.twigPages.componentBlocksDestination));

  });

};
