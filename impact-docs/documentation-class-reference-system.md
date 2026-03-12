# Class Reference System

Defined in Module **impact.system **, inherits from [ig.Class](documentation-class-reference-class.md)

## Description

`ig.System `takes care of starting and stopping the run loop and calls the `.run() `method on the current Game object. It also does the housekeeping for `ig.Input `and provides some utility methods.

An instance of `ig.System `is automatically created at `ig.system `(lowercase) by the ig.main() function.

## Constructor

### new ig.System( canvasId, fps, width, height, scale )

- `canvasId `An ID-Selector string, specifying the canvas element used for drawing. E.g. `'#canvas' `
- `fps `The desired frames per second for this game
- `width `The (unscaled) width of the game screen
- `height `The (unscaled) height of the game screen
- `scale `The scaling factor for the game screen

The constructor for `ig.System `is usually called through [ig.main()](documentation-class-reference-ig-core.md#main-function) and the instance is provided at `ig.system `(lowercase).

## Properties

### .canvas

The canvas element.

### .context

The `'2d' `drawing context of the canvas element.

### .fps

*Obsolete in 1.20 *- See [ig.main()](documentation-class-reference-ig-core.md#main-function).

### .realWidth, .realHeight

The scaled size of the game screen. E.g. with a `.width `of `320 `pixels and a `.scale `of `2 `will result in a `.realWidth `of `640 `.

### .running

`true `if a game is running, `false `otherwise.

### .scale

The scaling factor for the game screen.

### .smoothPositioning

*Removed in 1.20, see [ig.System.drawMode](#ig-system-drawmode)*

### .tick

The time in seconds since the last frame. Use this for movement calculations and the like. E.g.:

```

pos.x = pos.x + vel.x * ig.system.tick;

```

Note that this value does **not **represent *real *time, but *game *time. If, for instance, the browser is unable to run the game at 20 fps, the whole game will be slowed down and the `.tick `will be lower than the real time since the last frame. See [ig.Timer](documentation-class-reference-timer.md) for a more detailed explanation.

### .width, .height

The (unscaled) size of the game screen in pixels, as set by the constructor.

## Methods

### .clear( color )

Clear the game screen with the specified color, where `color `is a CSS string. E.g. `'#f0f' `.

The [ig.Game's](documentation-class-reference-game.md)`.draw() `method calls `.clear() `for every frame with the Games `.clearColor `.

### .getDrawPos( p )

Get the real target position for drawing into the canvas. This takes the `.scale `and [ig.System.drawMode](#drawmode) into account.

You'll only need this method if you work directly with the `.context `, instead of drawing through [ig.Image](documentation-class-reference-image.md), [ig.Font](documentation-class-reference-font.md) or [ig.BackgroundMap](documentation-class-reference-backgroundmap.md).

```

// Using the canvas context directly, we need to take the
// ig.system.scale into account. Using getDrawPos() will
// give us the "scaled position"

ig.system.context.fillText(
	'Test Text',
	ig.system.getDrawPos( x ),
	ig.system.getDrawPos( y )
);

```

### .resize( width, height, [scale] )

*New in 1.17 *

Set the `width `and `height `of the canvas element in (unscaled) pixels. If the optional `scale `parameter is not present, the scale factor is not changed.

### .setGame( gameClass )

Run the specified `gameClass `. This stops the currently running game (if any), creates a new instance of the `gameClass `and starts the run loop again.

This method is safe to call from anywhere in the game, as the new game will only be started after the current frame has finished updating and drawing.

## Global Properties

### ig.System.drawMode

*New in 1.20 *

One of

- `ig.System.DRAW.AUTHENTIC `
- `ig.System.DRAW.SMOOTH `
- `ig.System.DRAW.SUBPIXEL `

The default is `SMOOTH `.

Specifies how graphics are positioned when drawing. `AUTHENTIC `rounds all drawing positions to unscaled pixels, `SMOOTH `rounds to scaled pixels and `SUBPIXEL `doesn't round at all.

E.g. if the `.scale `is `4 `and `drawMode `is `SMOOTH `, moving an entity will move it one pixel at a time. If `drawMode `is `AUTHENTIC `, the entity's smallest movement step will be `4 `pixels.

While `SMOOTH `is somewhat "un-authentic" for pixel-style games, it provides much smoother movements of entities and background layers when the game screen is scaled up.

Note that not all browsers support `SUBPIXEL `drawing. Depending on your game, subpixel positioning may lead to visual artifacts, such as seams between tiles. In most browsers it also comes with the price of a bit of performance.

You have to specify the draw mode before calling `ig.main() `, i.e.:

```

ig.System.drawMode = ig.System.DRAW.AUTHENTIC;
ig.main( ... );

```
