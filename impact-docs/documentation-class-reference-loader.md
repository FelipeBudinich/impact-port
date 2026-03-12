# Class Reference Loader

Defined in Module **impact.loader **, inherits from [ig.Class](documentation-class-reference-class.md)

## Synopsis

```

// Subclass the default loader
MyLoader = ig.Loader.extend({

	draw: function() {
		// Add your drawing code here

		// This one clears the screen and draws the
		// percentage loaded as text
		var w = ig.system.realWidth;
		var h = ig.system.realHeight;
		ig.system.context.fillStyle = '#000000';
		ig.system.context.fillRect( 0, 0, w, h );

		var percentage = (this.status * 100).round() + '%';
		ig.system.context.fillStyle = '#ffffff';
		ig.system.context.fillText( percentage, w/2, h/2 );
	}
});

// Call ig.main() with your custom Loader class
ig.main('#canvas', MyGame, 60, 320, 240, 2, MyLoader);

```

## Description

`ig.Loader `is the default preloader for all images and sounds that the game needs. It shows a white progress bar on a black background.

You can subclass `ig.Loader `to provide your own drawing code or do some additional processing.

Note that, while the canvas and its drawing context are available when the preloader is executed, you can't use any `ig.Image `or `ig.Sound `resources yet.

## Constructor

### new ig.Loader( gameClass, resources )

- `gameClass `The [ig.Game](documentation-class-reference-game.md) class to start, when all resources have been loaded
- `resources `An array of resources, each of which must provide a `.load() `method that accepts a callback, such as [ig.Image](documentation-class-reference-image.md) and [ig.Sound](documentation-class-reference-sound.md).

Note that an instance of a Loader class is usually created by [ig.main()](documentation-class-reference-ig-core.md#main-function).

## Properties

### .done

`true `when everything has been loaded, `false `otherwise.

### .gameClass

The [ig.Game](documentation-class-reference-game.md) class to start, handed to this instance through the constructor.

### .resources[]

The array of resources to load, handed to this instance through the constructor.

### .status

Fraction of the resources loaded. E.g. if 10 of 20 resources have been loaded, the `.status `is `0.5 `. This only counts the number of resources, not their size.

## Methods

### .draw()

Called 60 times per second during load to update the progress bar.

### .end()

Called when all resources have finished loading. This usually calls [ig.system.setGame()](documentation-class-reference-system.md#setgame) with the loaders `.gameClass `.

### .load()

Initiates loading of all the resources. Usually called by `ig.main() `.

### .loadResource( res )

Initiate loading of one of the resources from the `.resources `array. `res `must be an instance of an object that has a `.load() `method, such as [ig.Image](documentation-class-reference-image.md) and [ig.Sound](documentation-class-reference-sound.md).
