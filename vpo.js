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

	function getPathByMatchingValue( obj, value) {
		var finalPath = '';
		var trace = [];
		var iterator = function iterator( obj, value ) {
			// find all object keys
			for( var key in obj ) {
				// add it to the stack
				trace.push( key );
				if( typeof obj[key] === 'object') {
					// call the recursive function
					iterator( obj[key], value );
					trace.pop();
				} else {
					if( obj[key] !== value ){
						// remove it from the stack
						trace.pop();
					} else {
						// yay, found him. print the stack to finalPath
						// trace.pop();
						finalPath = trace.join('.');
					}
				}
			}
		}
		iterator( obj, value);
		return finalPath;
	}

	vpo.setValueByPath = setValueByPath;
	vpo.getValueByPath = getValueByPath;
	vpo.getPathByMatchingValue = getPathByMatchingValue
    
	vpo.setOnObjectPrototype = function () {
		Object.prototype.setValueByPath = function (path, value) {
			setValueByPath(this, path, value);
		}

		Object.prototype.getValueByPath = function (path) {
			return getValueByPath(this, path);
		}
	};
})(typeof exports === 'undefined' ? this['vpo'] = {} : exports);