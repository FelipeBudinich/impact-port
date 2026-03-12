# Class Reference Class

Defined in Module **impact.impact **

## Synopsis

```

// Create a new class "Person"
var Person = ig.Class.extend({
	name: '',
	init: function( name ) {
		this.name = name;
	}
});

// Create another class by extending the "Person" class
var Ninja = Person.extend({
	init: function( name ) {
		this.parent( 'Ninja: ' + name );
	}
});

// Instatinate an object of the first class
var e = new Person('Generic Person');
e.name; // => Generic Person

// Instatinate an object of the second class
var p = new Ninja('John Resig');
p.name; // => Ninja: John Resig

```

## Description

Impact's Class-Object is based on John Resig's [Simple Java Script Inheritance](http://ejohn.org/blog/simple-javascript-inheritance/) code, but extends it with deep copying of properties and static instantiation.

All of Impact's classes are derived from this base Class and you can use it to create your own classes.

## Usage

### .extend( classDefinition )

`.extend() `takes a JavaScript Object, specifying properties and methods of the new class. Inside of methods, `this `refers to the instance of this class.

```

var Foo = ig.Class.extend({
	bar: 'baz',
	setBar: function( bar ) {
		this.bar = bar;
	}
});

var foo1 = new Foo();
foo1.setBar( 'bar1' );
foo1.bar; // => bar1

var foo2 = new Foo();
foo2.setBar( 'bar2' );
foo2.bar; // => bar2

```

All classes that are created with `.extend() `will also have an `.extend() `function, that can be used for further subclassing.

### .inject( classDefinition )

*New in 1.17 *

`.inject() `works similar to `.extend() `but does not create a new Class - instead, it changes the Class *in place *. This is useful if you want to change the behavior of one of Impacts classes without changing the engine's source code, e.g. for plugins.

```

// Overwrite ig.Image's .resize method to provide your
// own scaling algorithm
ig.Image.inject({
	resize: function( scale ) {
		if( scale == 2 ) {
			this.data = awesome2XScalingAlgorithm( this.data );
		}
		else {
			// Call ig.Image's resize function if scale is not 2
			this.parent( scale );
		}
	}
});

// The new resize method will also be used in subclasses of
// ig.Image (e.g. ig.Font)

```

### init: function() {}

The `.init() `method of a class, if present, gets called when a new instance is created.

```

var InitTest = ig.Class.extend({
	init: function( fparam ) {
		console.log( 'Init called with ' + fparam );
	}
});

var t1 = new InitTest( 'ZOMG' ); // => Init called with ZOMG

```

### staticInstantiate: function() {}

If a class has a `staticInstantiate `function, it is called before a new instance of this class is created. When the `staticInstantiate `function returns `null `, a new instance of the class is created and returned. If `staticInstantiate `returns non- `null `, its return value is returned.

This can for instance be used to create a [Singleton](http://en.wikipedia.org/wiki/Singleton_pattern) class – a class that only allows one instance.

```

var MySingleton= ig.Class.extend({
	foo: 'bar',
	staticInstantiate: function( ignoredFoo ) {
		if( MySingleton.instance == null ) {
			return null;
		}
		else {
			return MySingleton.instance;
		}
	},

	init: function( foo ) {
		this.foo = foo;
		MySingleton.instance = this;
	}
});

MySingleton.instance = null;

var s1 = new MySingleton( 'baz' );
var s2 = new MySingleton( 'ignored' );

s1.foo; // baz
s2.foo; // baz

s1 == s2; // true

```

Note that `MySingleton.instance `is not defined as an instance property, but as a class property. You can also attach *"static" *functions to your class this way. This is similar to the `static `keyword in Java or PHP.

### this.parent(…)

Inside a method, `this.parent `always refers to the method with the same name of the super class - if present. I.e. when overwriting a method of a super class, you can still call it from within the sub classes method with `this.parent() `.
