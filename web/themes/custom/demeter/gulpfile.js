const path = require('path');
const gulp = require('gulp');

const plugins = require('gulp-load-plugins')({
  pattern: '*',
  rename: {
    'node-sass-import-once': 'importOnce',
    'gulp-sass-glob': 'sassGlob',
    'run-sequence': 'runSequence',
    'gulp-clean-css': 'cleanCSS',
    'gulp-stylelint': 'gulpStylelint',
    'gulp-eslint': 'gulpEslint',
    'gulp-babel': 'babel',
    'gulp-util': 'gutil',
    'gulp-notify': 'notify',
    'gulp-concat': 'concat',
    'gulp-uglify': 'uglify',
    'gulp-imagemin': 'imagemin',
    'gulp-twig' : 'twig',
    'gulp-data' : 'data',
    'glob': 'glob',
    'flatten': 'gulp-flatten',
    'gulp-svg-sprite': 'svgsprite',
    'gulp-append-prepend': 'gap'
  }
});

// Default paths.
const paths = {
  styles: {
    source: 'src/ui-kit/',
    destination: 'build/assets/css/',
  },
  scripts: {
    source: 'src/ui-kit/',
    destination: 'build/assets/js',

  },
  scriptsVendorFiles: [
    'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
    'node_modules/imagesloaded/imagesloaded.pkgd.js',
    'node_modules/clamp-js/clamp.js',
  ],
  images: {
    source: 'src/assets/images/',
    destination: 'build/assets/images/',
  },
  fonts: {
    source: 'src/assets/fonts/',
    destination: 'build/assets/fonts/',
  },
  styleGuide: 'styleguide',
  twigPages: {

    src: 'src/ui-kit/',
    destination: 'build/pages/',

    baseSrc: 'src/ui-kit/00-base/',

    componentsSrc: 'src/ui-kit/06-components/',
    componentsDestination: 'build/pages/components',

    componentBlocksSrc: 'src/ui-kit/07-component-blocks/',
    componentBlocksDestination: 'build/pages/component-blocks',

    pagesSrc: 'src/ui-kit/08-pages/',
    pagesDestination: 'build/pages/pages',

    componentTemplateSrc: 'src/ui-kit/00-base/twigs/dev-guide/component-template.twig',
    componentBlockTemplateSrc: 'src/ui-kit/00-base/twigs/dev-guide/component-block-template.twig',
    componentListTemplateSrc: 'src/ui-kit/00-base/twigs/dev-guide/component-list-template.twig',
    devGuideTemplateSrc: 'src/ui-kit/00-base/twigs/dev-guide/dev-guide.twig'

  },
  svg: {
    source: 'src/assets/svgs',
    destination: 'build/assets/svgs',
  },
  static: {
    source: 'src/static/',
    destination: 'build',
  }
};

// Default options.
const options = {
  browserSync: {
    server: {baseDir: ['build']},
    startPath: '/pages',
    port: 3005,
    online: false,
    open: true,
    ghostMode: false,
    logConnections: true,
  },
  css: {
    files: path.join(paths.styles.destination, '**/*.css'),
    file: path.join(paths.styles.destination, '/styles.css'),
    destination: path.join(paths.styles.destination),
  },
  sass: {
    files: path.join(paths.styles.source, '/**/*.scss'),
    file: path.join(paths.styles.source, 'styles.scss'),
    destination: path.join(paths.styles.destination),
    AUTOPREFIXER_BROWSERS: [
      'ie >= 10',
      'ie_mob >= 10',
      'ff >= 30',
      'chrome >= 34',
      'safari >= 9',
      'opera >= 23',
      'ios >= 8',
      'android >= 4.4',
      'bb >= 10',
    ],
  },
  js: {
    files: path.join(paths.scripts.source, '**/*.js'),
    compiledFiles: path.join(paths.scripts.destination, '**/*.js'),
    vendorFiles: paths.scriptsVendorFiles,
    destination: path.join(paths.scripts.destination),
    vendorDestination: path.join(paths.scripts.destination, 'vendors'),
  },
  fonts: {
    files: paths.fonts.source + '**/*.{ttf,woff,otf,eot,svg,woff2}',
    destination: paths.fonts.destination,
  },
  images: {
    files: paths.images.source + '**/*.{png,gif,jpg,svg,xml,webmanifest}',
    destination: paths.images.destination,
  },
  twigPages: {
    paths: paths.twigPages,
    baseSrc: path.join(paths.twigPages.src),
    src: path.join(paths.twigPages.src, '/*.twig'),
    componentsSrc: path.join(paths.twigPages.componentsSrc, '/*/*.twig'),
    componentBlocksSrc: path.join(paths.twigPages.componentBlocksSrc,'/*/*.twig'),
    pagesSrc: path.join(paths.twigPages.pagesSrc, '/*/*.twig'),
    allSrc: path.join(paths.twigPages.src, '/**/*'), // Needed for watch task
    destination: path.join(paths.twigPages.destination),
    componentsDestination: path.join(paths.twigPages.componentsDestination),
    componentBlocksDestination: path.join(paths.twigPages.componentBlocksDestination),
    pagesDestination: path.join(paths.twigPages.pagesDestination),
    componentTemplateSrc: path.join(paths.twigPages.componentTemplateSrc),
    componentBlockTemplateSrc: path.join(paths.twigPages.componentBlockTemplateSrc),
    componentListTemplateSrc: path.join(paths.twigPages.componentListTemplateSrc),
    devGuideTemplateSrc: path.join(paths.twigPages.devGuideTemplateSrc)
  },
  svg: {
    files: path.join(paths.svg.source, '**/*.svg'),
    destination: path.join(paths.svg.destination),
    mode: {
      inline: true,
      symbol: { // symbol mode to build the SVG
        render: {
          css: true, // CSS output option for icon sizing
          scss: true, // SCSS output option for icon sizing
        },
        dest: 'sprite', // destination folder
        prefix: '.svg--%s', // BEM-style prefix if styles rendered
        sprite: 'sprite.svg', //generated sprite name
        example: {
          template: path.join(__dirname,
              '/gulp-tasks/svg-sprite-dev-template/svg-symbols.tmpl'),
        },
      },
    },
    prefix: paths.svg.prefix,
  },
  static: {
    files: path.join(paths.static.source, '**/*'),
    destination: path.join(paths.static.destination),
  },
};

// Gulp plugins loading.
require('./gulp-tasks/static')(gulp, plugins, options);
require('./gulp-tasks/svg')(gulp, plugins, options);
require('./gulp-tasks/twigpages')(gulp, plugins, options);
require('./gulp-tasks/browser-sync')(gulp, plugins, options);
require('./gulp-tasks/images')(gulp, plugins, options);
require('./gulp-tasks/clean-css')(gulp, plugins, options);
require('./gulp-tasks/clean-js')(gulp, plugins, options);
require('./gulp-tasks/clean-styleguide')(gulp, plugins, options);
require('./gulp-tasks/clean-twigpages')(gulp, plugins, options);
require('./gulp-tasks/clean')(gulp, plugins, options);
require('./gulp-tasks/compile-sass')(gulp, plugins, options);
require('./gulp-tasks/compile-js')(gulp, plugins, options);
require('./gulp-tasks/compile-styleguide')(gulp, plugins, options);
require('./gulp-tasks/jekyll')(gulp, plugins, options);
require('./gulp-tasks/lint-js')(gulp, plugins, options);
require('./gulp-tasks/lint-css')(gulp, plugins, options);
require('./gulp-tasks/minify-css')(gulp, plugins, options);
require('./gulp-tasks/minify-js')(gulp, plugins, options);
require('./gulp-tasks/fonts')(gulp, plugins, options);
require('./gulp-tasks/drupal-libraries')(gulp, plugins, options);
require('./gulp-tasks/build')(gulp, plugins, options);
require('./gulp-tasks/watch')(gulp, plugins, options);
require('./gulp-tasks/serve')(gulp, plugins, options);
require('./gulp-tasks/default')(gulp, plugins, options);
require('./gulp-tasks/drupal-dev')(gulp, plugins, options);
require('./gulp-tasks/menu')(gulp, plugins, options);

