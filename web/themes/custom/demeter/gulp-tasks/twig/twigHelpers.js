const path = require('path');
const fs = require('fs');
const twigFunctions = require('./twigFunctions');
const twigFilters = require('./twigFilters');

const getComponentJSON = function (file) {

  const jsonFileName = file.replace(/\.twig$/, '.json');

  if (fs.existsSync(jsonFileName)) {
    try {
      return JSON.parse(fs.readFileSync(jsonFileName).toString());
    }
    catch (exception) {
      console.error(exception.message);
    }
  }

  return {};

}

const twigConfigs = function (options) {

  return {
    base:path.join(options.twigPages.baseSrc),
    filters: twigFilters,
    functions: twigFunctions,
    namespaces: {
      'base': path.join(process.cwd(), options.twigPages.paths.baseSrc),
      'components': path.join(process.cwd(), options.twigPages.paths.componentsSrc),
      'component-blocks': path.join(process.cwd(), options.twigPages.paths.componentBlocksSrc),
      'pages': path.join(process.cwd(), options.twigPages.paths.pagesSrc)
    },
    useFileContents: true
  }

}

module.exports = function (options) {
  return {
    getComponentJSON: getComponentJSON,
    twigConfigs: twigConfigs(options)
  }
};
