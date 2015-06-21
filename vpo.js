'use strict';

(function(vpo) {
  function setValueByPath(object, path, value) {
    var splitPath = path.split('.');
    var key = splitPath.shift();

    if (splitPath.length > 0) {
      object[key] = object[key] || ((!isNaN(parseInt(splitPath[0], 10))) ? [] : {});
      setValueByPath(object[key], splitPath.join('.'), value);
    } else {
      object[key] = value;
    }
  }

  function getValueByPath(object, path, fallback) {
    fallback = fallback || null;
    var nextPath = '';
    var splitPath = path.split('.');

    if (object.hasOwnProperty(splitPath[0])) {
      if (splitPath.length > 1) {
        nextPath = path.replace(splitPath[0] + '.', '');
        return getValueByPath(object[splitPath[0]], nextPath, fallback);
      } else {
        return object[splitPath[0]];
      }
    }

    return fallback;
  }

  function getPathByMatchingValue(obj, value) {
    var finalPath = '';
    var trace = [];
    var iterator = function iterator(obj, value) {
      // find all object keys
      for (var key in obj) {
        // add it to the stack
        trace.push(key);
        if (typeof obj[key] === 'object') {
          // call the recursive function
          iterator(obj[key], value);
          trace.pop();
        } else {
          if (obj[key] !== value) {
            // remove it from the stack
            trace.pop();
          } else {
            // yay, found him. print the stack to finalPath
            // trace.pop();
            finalPath = trace.join('.');
          }
        }
      }
    };
    iterator(obj, value);
    return finalPath;
  }

  function getSome(object, paths, fallback) {
    var result = null;

    paths.some(function(path) {
      return (result = getValueByPath(object, path));
    });

    return (result !== null) ? result : fallback;
  }

  vpo.set = setValueByPath;
  vpo.get = getValueByPath;
  vpo.getSome = getSome;
  vpo.getByValue = getPathByMatchingValue;

  vpo.setOnObjectPrototype = function() {
    Object.prototype.set = function(path, value) {
      setValueByPath(this, path, value);
    };

    Object.prototype.get = function(path, fallback) {
      return getValueByPath(this, path, fallback);
    };
  };
})( (typeof exports === 'undefined') ? this['vpo'] = {} : exports);
