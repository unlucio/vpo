# VPO

[![Build Status](https://travis-ci.org/unlucio/vpo.svg?branch=master)](https://travis-ci.org/unlucio/vpo)

#### Value/path helper functions for javascript objects

It's a set of simple functions that let you query or set values on your objects by a given string path.

## How to get it:

Either:

```
git clone git://github.com/unlucio/vpo.git
```

or

```
npm install vpo
```

or

```
bower install vpo
```

## Examples:

Given the following dummy object:

```javascript
{
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
}
```

setting a value:

``` javascript
vpo.set(testObj, 'key1.foo2.bar2', 'resetBao');
```

getting a value:

``` javascript
vpo.get(testObj, 'key1.foo2.bar2');
```

getting a value from a list of possible paths:

``` javascript
vpo.getSome(testObj, ['ke5.foo2.bar2', 'key1.foo2.bar2']);
```

## I'm not sure who will ever be so "brave" to use it, but I'll leave it in since a dear friend of mine LOVES it :D

~~For convenince you can attach VPO to Object's prototype and have all your objects with 2 new methods:~~

``` javascript
vpo.setOnObjectPrototype();
```