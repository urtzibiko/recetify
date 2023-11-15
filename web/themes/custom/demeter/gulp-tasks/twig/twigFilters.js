const twigFunctions = require('./twigFunctions');

let twigFilters = [];

// "Merge deep" filter.
const mergeDeep = function (object1, object2) {

  // object2 comes inside an array in the first call from twig
  if (Array.isArray(object2)) {
    object2 = object2[0];
  }

  if (typeof object1 !== 'object' || typeof object2 !== 'object') {
    throw "merge_deep filter only works with objects!!";
  }

  delete object1['_keys'];
  delete object2['_keys'];

  let mergedObject = Object.assign({}, object1);

  for (let key in object2) {
    if (typeof object2[key] === 'object' && key in mergedObject && typeof mergedObject[key] === 'object') {
      mergedObject[key] = mergeDeep(mergedObject[key], object2[key]);
    }
    else if (typeof object2[key] !== 'undefined') {
      mergedObject[key] = object2[key];
    }
  }

  return mergedObject;

};
twigFilters.push({
  name:'merge_deep',
  func: mergeDeep
});

twigFilters.push({
  name:'render',
  func: function(input) {

    const namespaces = this.template.options.namespaces;
    const chunks = input.type.split('/');
    const namespace = chunks[0];
    const componentName = chunks[1];
    const filename = namespaces[namespace] + componentName + '/' + componentName + '.twig';
    const Twig = require('twig');
    Twig.extendFunction(twigFunctions);
    Twig.extendFilter(twigFilters);
    const twig = Twig.twig;
    let twigOpts = {
      path: filename,
      async: false,
      namespaces: namespaces
    }
    let template = twig(twigOpts);

    return template.render(input.data);

  }
});

module.exports = twigFilters;
