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

	vpo.setValueByPath = setValueByPath;
	vpo.getValueByPath = getValueByPath;
    
	vpo.setOnObjectPrototype = function () {
		Object.prototype.setValueByPath = function (path, value) {
			setValueByPath(this, path, value);
		}

		Object.prototype.getValueByPath = function (path) {
			return getValueByPath(this, path);
		}
	};
})(typeof exports === 'undefined' ? this['vpo'] = {} : exports);