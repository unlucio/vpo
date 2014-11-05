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
			},
			key3: {
				foo1: {
					bar1: 'bao',
					bar2: 'bao'
				},
				foo2: {
					bar2: 'bao12'
				},
				foo3: {
					bar3: 'bao'
				}
			}
		};
	});

	it('Doesn\'t crash setting random key', function () {
		vpo.set(testObj, 'key1.blah.bar2', 'resetBao');
	});

	it('Doesn\'t crash getting random key', function () {
		vpo.get(testObj, 'key1.blah.bar2');
	});

	describe('Alone functions', function () {
		it('Can set a value', function () {
			vpo.set(testObj, 'key1.foo2.bar2', 'resetBao');
			assert.equal("resetBao", testObj.key1.foo2.bar2, "Cannot set value!");
		});

		it('Can get a value', function () {
			var value = vpo.get(testObj, 'key1.foo2.bar2');
			assert.equal("bao", value, "Cannot read value!");
		});
		
		it('Returns a fallback value if provided and it cannot find the object path', function () {
			var value = vpo.get(testObj, 'AGH', 11);
			assert.equal(11, value, "Cannot read value!");
		});
		
		it('Returns a fallback value if provided and it cannot find a deep object path', function () {
			var value = vpo.get(testObj, 'AGH.some.Error', 11);
			assert.equal(11, value, "Cannot read value!");
		});
		
		it('Can find a path by matching a value', function () {
			var value = vpo.getByValue(testObj, 'bao12');
			assert.equal("key3.foo2.bar2", value, "Cannot find path by  matching value!");
		});		
	});

	describe('Attaching to Object.prototype', function () {
		it('Can set a value', function () {
			vpo.setOnObjectPrototype();
			testObj.set('key1.foo2.bar2', 'resetBao');
			assert.equal('resetBao', testObj.key1.foo2.bar2, "Cannot set value!");
		});

		it('Can get a value', function () {
			vpo.setOnObjectPrototype();
			var value = testObj.get('key1.foo2.bar2');
			assert.equal("bao", value, "Cannot read value!");
		});
		
		it('Supports fallbacks while looking up a value', function () {
			vpo.setOnObjectPrototype();
			var value = testObj.get('oops.some.non.existing.property', 11);
			assert.equal(11, value, "Cannot read value!");
		});
	});

});