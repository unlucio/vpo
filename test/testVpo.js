'use strict';

var assert = require("assert"),
	vpo = require('../vpo');

describe('Vpo tests', function () {
	var testObj = {};
	beforeEach(function () {
		testObj = {
			key1: {
				foo1: {
					bar1: 'bao111',
					bar2: 'bao112'
				},
				foo2: {
					bar2: 'bao122'
				},
				foo3: {
					bar3: 'bao133'
				}
			},
			key2: {
				foo1: {
					bar1: 'bao211',
					bar2: 'bao212'
				},
				foo2: {
					bar2: 'bao222'
				},
				foo3: {
					bar3: 'bao233'
				}
			}
		};
	});

	it('Doesn\'t crash setting random key', function () {
		vpo.setValueByPath(testObj, 'key1.blah.bar2', 'resetBao');
	});

	it('Doesn\'t crash getting random key', function () {
		vpo.getValueByPath(testObj, 'key1.blah.bar2');
	});

	describe('Alone functions', function () {
		it('Can set a value', function () {
			vpo.setValueByPath(testObj, 'key1.foo2.bar2', 'resetBao');
			assert.equal("resetBao", testObj.key1.foo2.bar2, "Cannot set value!");
		});

		it('Can get a value', function () {
			var value = vpo.getValueByPath(testObj, 'key1.foo2.bar2')
			assert.equal("bao122", value, "Cannot read value!");
		});

		it('Can find a path by matching a value', function () {
			var value = vpo.getPathByMatchingValue(testObj, 'bao212');
			console.log("=ret=> value:", value);
			assert.equal("key1.foo2.bar2'", value, "Cannot find path by  matching value!");
		});

	});

	/*describe('Attaching to Object.prototype', function () {
		it('Can set a value', function () {
			vpo.setOnObjectPrototype();
			testObj.setValueByPath('key1.foo2.bar2', 'resetBao');
			assert.equal("resetBao", testObj.key1.foo2.bar2, "Cannot set value!");
		});

		it('Can get a value', function () {
			vpo.setOnObjectPrototype();
			var value = testObj.getValueByPath('key1.foo2.bar2')
			assert.equal("bao", value, "Cannot read value!");
		});
	});*/

});