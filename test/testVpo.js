var assert = require("assert"),
	vpo = require('../vpo');

describe('Vpo tests', function () {
	var testObj = {};
	beforeEach(function () {
		testObj = {
			key1: {
				foo1: {
					bar1: 'bao',
					bar2: 'bao'
				},
				foo2: {
					bar2: 'bao'
				},
				foo3: {
					bar3: 'bao'
				}
			},
			key2: {
				foo1: {
					bar1: 'bao',
					bar2: 'bao'
				},
				foo2: {
					bar2: 'bao'
				},
				foo3: {
					bar3: 'bao'
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
			assert.equal("bao", value, "Cannot read value!");
		});
	});

	describe('Attaching to Object.prototype', function () {
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
	});

});