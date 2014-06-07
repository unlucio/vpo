'use strict';

(function (vpo) {
	function setValueByPath(object, path, value) {
		var nextPath = '';
		var splitPath = path.split('.');

		if (object.hasOwnProperty(splitPath[0])) {
			if (splitPath.length > 1) {
				nextPath = path.replace(splitPath[0] + '.', '');
				setValueByPath(object[splitPath[0]], nextPath, value);
			} else {
				object[splitPath[0]] = value;
			}
		}
	}

	function getValueByPath(object, path) {
		var nextPath = '';
		var splitPath = path.split('.');

		if (object.hasOwnProperty(splitPath[0])) {
			if (splitPath.length > 1) {
				nextPath = path.replace(splitPath[0] + '.', '');
				return getValueByPath(object[splitPath[0]], nextPath);
			} else {
				return object[splitPath[0]];
			}
		}
	}

	function getPathByMatchingValue(object, value, path) {
		path = path || '';
		var keys = Object.keys(object);
		var keysCount = keys.length;

		if (keysCount > 0) {
			for (var index in keys) {
				var key = keys[index];
				 console.log("fun ret: ", (function (key, path) {
				 	path = path + key;
					console.log(path + "> current key: ", key);
					console.log(path + "> current object[key](type: "+typeof object[key]+"): ", object[key]);
					if (typeof object[key] === 'object') {
						return getPathByMatchingValue(object[key], value, path+'.')
					} else {
						if (object[key] === value) {
							console.log(path + ">!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! found value: ", value);
							return path;
						}
					}
				}(key, path)));
			}
		}
	}

	vpo.setValueByPath = setValueByPath;
	vpo.getValueByPath = getValueByPath;
	vpo.getPathByMatchingValue = getPathByMatchingValue;

	vpo.setOnObjectPrototype = function () {
		Object.prototype.setValueByPath = function (path, value) {
			setValueByPath(this, path, value);
		}

		Object.prototype.getValueByPath = function (path) {
			return getValueByPath(this, path);
		}
	};
})(typeof exports === 'undefined' ? this['vpo'] = {} : exports);