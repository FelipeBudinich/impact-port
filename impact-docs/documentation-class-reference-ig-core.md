# Class Reference Ig Core

Defined in Module **impact.impact **

## Description

The `ig `object provides the Module definition and loading capabilities as well as some utility functions. All your code should be wrapped in Modules, so it can be properly loaded and baked.

`ig `is **not **an instance of a ig.Class, but just a simple JavaScript object and thus can't be subclassed.

## Module Definition

```

ig.module(
	'game.my-file'
)
.requires(
	'impact.game',
	'impact.image',
	'game.other-file'
)
.defines(function(){

	// code for this module

});

```

Define a new Module with a `name `, requiring all the specified Modules. As soon as all required Modules are loaded, the function passed to `.defines() `is executed.

If the Module does not require any other Modules, the call to `.requires() `can be omitted, as in

```

ig.module(
	'name'
)
.defines(function(){

	// code

});

```

The name of a Module directly corresponds to its file location and name. E.g. the file `lib/mygame/my-file.js `must define a module with the name `'mygame.my-file' `, so it can be properly loaded from other Modules.

You can put multiple modules into one file, but be advised, that a module that is referenced from an external file **must **have it's own file.

## Properties

### ig.baked

Set to `true `by `bake.php `to skip the "unresolved dependencies" check when loading modules. The default is `false `. See [Baking](documentation-baking.md).

### ig.game

The currently running [ig.Game](documentation-class-reference-game.md) instance, as created by [ig.main()](#main-function) or [system.setGame()](documentation-class-reference-system.md#setgame). If no game has started, `ig.game `is `null `.

### ig.global

The global context object (same as `window `when running in a browser)

### ig.nocache

By default, `ig.nocache `is an empty string. When the site is loaded with `game.html?nocache `or [ig.setNocache( true )](#ig-setnocache) is called, `ig.nocache `is set to a random parameter (like `'?23478976' `) to be appended on URLs to bypass the Browser's cache.

This is used by all of Impact's loading functions: Module loading, Images and Sounds.

### ig.prefix

*New in 1.20 *

The prefix to use for all paths when loading modules files or assets. The default is an empty string.

This value can also be set through the global `ImpactPrefix `variable before loading Impact. This is, for example, useful if you want to run your game on a page that has a URL of `/?page=42 `, while the game is located in `/games/pong/ `.

```

<script>ImpactPrefix='/games/pong/';</script>

<script src="/games/pong/lib/impact/impact.js"></script>
<script src="/games/pong/lib/game/main.js"></script>

```

### ig.version

The version string of the Impact Game Engine in the form of `x.xx `

### ig.ua

Booleans, indicating if the User Agent is one of the following devices:

- `ig.ua.iPhone `- `true `for all iPhone and iPod Touch devices
- `ig.ua.iPhone4 `- `true `for iPhone 4 and 4th gen iPod Touch devices
- `ig.ua.iPad `- `true `for iPad devices
- `ig.ua.iOS `- `true `for all iPhone, iPod Touch or iPad devices
- `ig.ua.android `- `true `for Android devices
- `ig.ua.mobile `- `true `for all iPhone, iPad, Android or WinPhone devices

*New in 1.15 *

- `ig.ua.pixelRatio `- the ratio of CSS pixels to hardware screen pixels. Usually `1 `for Desktop computers, `2 `for the iPhone 4 or similar.
- `ig.ua.screen.width `, `ig.ua.screen.height `- The size of the device' screen in hardware pixels.
- `ig.ua.viewport.width `, `ig.ua.viewport.height `– The size of the current viewport in CSS pixels.

*New in 1.22 *

- `ig.ua.touchDevice `- `true `if the device supports touch events
- `ig.ua.winPhone `- `true `for WinPhone devices

## Main Function

### ig.main( canvas, gameClass, fps, width, height, [scale], [loaderClass] );

Initializes `ig.system `, `ig.input `, `ig.soundManager `and `ig.music `and starts the preloader. When the preloader has finished, an instance of `gameClass `is created at `ig.game `and the run loop is started.

- `canvas `A string with an ID selector for the canvas element in which the game will be drawn. E.g.: `'#myCanvas' `
- gameClass A subclass of [ig.Game](documentation-class-reference-game.md) of which an instance will be created and the `.run() `method called `fps `times per second.
- `fps `Desired frames per second - *Ignored in 1.20 *
- `width `, `height `Size of the game screen
- `scale `Scaling of the game screen. E.g. a `width `of `320 `and a `scale `of `2 `will result in a `640 `pixel wide canvas element. The default is `1 `(no scaling).
- `loaderClass `A subclass of [ig.Loader](documentation-class-reference-loader.md) to act as the preloader. The default is the `ig.Loader `class itself.

Note that as of *1.20 *, the `fps `parameter is ignored in favor of `requestAnimationFrame `. This allows the browser to decide the best drawing interval, based on the display's refresh rate. If the drawing interval drops below `20hz `, the timestep will be capped at 1/20th of a second, essentially slowing the game down. E.g. when only 10 fps can be rendered, an "in game second" takes two "real time seconds". See [ig.Timer.maxStep](documentation-class-reference-timer.md#ig-timer-maxstep).

## Debug Functions

*New in 1.18 *

Impact defines four different functions for debug output: `ig.log() `, `ig.assert() ``ig.show() `and `ig.mark() `. However, these functions only actually do something when the Debug Module is loaded. See [Debug Messages](http://impactjs.com/documentation/debug) for details.

It's always safe to call these functions, even when the Debug Module is not loaded.

## Utility Functions

### ig.$( selector )

Get the DOM-Element(s) from the page according to the given selector. Only element names and IDs are currently supported.

When an Element name is specified (e.g. `'head' `) an Array of matched elements is returned. When an ID is specified as the selector (e.g. `'#canvas' `) the single Element with this ID is returned.

*(This behavior is somewhat inconsistent and might change in future versions) *

### ig.$new( name )

Create a new DOM-Element with the given `name `. E.g.:

```

var audio = ig.$new('Audio');

```

### ig.copy( object )

Returns a deep copy of the given object.

Note that this function can't copy instances of `ig.Class `or subclasses thereof and just returns them uncopied.

### ig.ksort( obj )

Takes an object and returns an Array, sorted by the object properties' keys. E.g.:

```

var unsorted = { z: 'baz', a: 'bar', b: 'foo' };
var sorted = ig.ksort( unsorted );

sorted[0]; // => bar
sorted[1]; // => foo
sorted[2]; // => baz

```

### ig.merge( target, extended )

Merges all the properties of the `extended `object recursively into the `target `object, overwriting existing properties. E.g.:

```

var settings = { width: 256, height: 128 };
var extendedSettings = { width: 512, foo: 'bar' };

ig.merge( settings, extendedSettings );

settings.width; // => 512
settings.height; // => 128
settings.foo; // => bar

```

### ig.setNocache( set )

When `set `is `true `, `ig.nocache `will be set to a random parameter string. When `set `is `false `, `ig.nocache `will be set to an empty string.

## Native JavaScript Object Extensions

Impact extends some of JavaScripts native objects, such as `Number `, `Array `and `Function `. It does **not **extend `Object `so you can still safely use `for…in `loops.

### Number.map( fromMin, fromMax, toMin, toMax )

Map a number from a range of values to another range. Numbers are not clamped.

```

var num = 50;
num.map( 0, 100, 200, 400 ); // => 300

(50).map( 0, 100, 200, 400 ); // => 300
(25).map( 0, 100, 200, 400 ); // => 250
(150).map( 0, 100, 200, 400 ); // => 500

```

### Number.limit( min, max )

Clamp a number to the range of `min `and `max `.

```

(75).limit( 50, 100 ); // => 75
(25).limit( 50, 100 ); // => 50
(150).limit( 50, 100 ); // => 100

```

### Number.round( [precision] )

Round a number to `precision `decimal places (default `0 `).

```

(3.1415).round(); // => 3
(3.1415).round(2); // => 3.14

```

### Number.floor()

Convenience method for `Math.floor() `

### Number.ceil()

Convenience method for `Math.ceil() `

### Number.toInt()

Discard decimal places of a number. For negative numbers, the behavior is different to `Number.floor() `.

```

(2.8).toInt(); // => 2
(-2.8).toInt(); // => -2

(2.8).floor(); // => 2
(-2.8).floor(); // => -3

```

### Number.toDeg()

*New in 1.19 *

Convert radians to degrees

```

(0.7853981633974483).toDeg(); // => 45

```

### Number.toRad()

*New in 1.19 *

Convert degrees to radians

```

(45).toRad(); // => 0.7853981633974483

```

### Array.erase( item )

Find and delete the given `item `in an array. This method manipulates the array in place.

```

var a = [4,8,13,15,16,23,42];
a.erase(13);
a; // => [4,8,15,16,23,42]

```

### Array.random()

Returns a random element from an array.

### Function.bind( bind )

Sets the `this `inside the function to `bind `. `Function.bind() `is useful for maintaining the `this `object for methods used in callbacks.

```

var foo = {
	bar: 100,
	inc: function() {
		this.bar++;
		console.log( this.bar );
	}
};

// Without using bind(), the "this" inside foo.inc() would refer to the
// "window" instead to itself, when called through setInterval()
setInterval( foo.inc.bind(foo), 1000 );

```

## Global Modifiers

### ImpactMixin

*New in 1.22 *

If present, the object at `ImpactMixin `will be [merged](#ig-merge) into the `ig `namespace before any module loading takes place. This allows you to overwrite Impact's module code to work with different environments (e.g. NodeJS).

Example:

```

<script type="text/javascript">
ImpactMixin = {
	// This function will overwrite Impact's ig.require
	requires: function() {
		console.log(arguments);
	}
};
</script>
<script type="text/javascript" src="lib/impact/impact.js"></script>
<script type="text/javascript" src="lib/game/main.js"></script>

```

### ImpactPrefix

If present, this string overwrites [ig.prefix](#ig-prefix).
