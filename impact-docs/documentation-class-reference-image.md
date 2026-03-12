# Class Reference Image

Defined in Module **impact.image **, inherits from [ig.Class](documentation-class-reference-class.md)

## Synopsis

```

// Load an image
var img = new ig.Image( 'player.png' );

// Draw the whole image
img.draw( x, y );

// Draw one 'tile' of the image
// (tile 3, with a tilesize of 16x16 pixels)
img.drawTile( x, y, 3, 16 );

```

## Description

`ig.Image `is a wrapper around image resources (png, gif or jpeg). It takes care of loading and scaling the source image. You can draw the whole image ( [.draw()](#draw)) or just one tile of it ( [.drawTile()](#drawtile)).

Most of the time you shouldn't need to draw an `ig.Image `directly, but instead use [ig.Animation](documentation-class-reference-animation.md) or [ig.BackgroundMap](documentation-class-reference-backgroundmap.md).

## Constructor

### new ig.Image( filename )

- `filename `The path and name of the image file to be loaded.

Note that images are cached. That means that if you create two images with the same source file, the constructor returns the same instance. E.g.:

```

var img1 = new ig.Image( 'player.png' );
var img2 = new ig.Image( 'player.png' );

img1 == img2; // => true

```

After loading an image, it is automatically scaled (nearest neighbor) according to `ig.system.scale `if necessary. If the engine hasn't completely loaded all required modules (denoted by `ig.ready `), the image is added to the resources to be loaded by the preloader.

## Properties

### .data

The actual image resource when the image is loaded. This is either an `<img> `or (if [ig.system.scale](documentation-class-reference-system.md#scale) is not `1 `) `<canvas> `element.

### .failed

`true `when the image resource could not be loaded (e.g. at an 404 or 403 error)

### .loaded

`true `when the image resource has been loaded, `false `otherwise

### .path

The path and name of the image file as passed to the constructor.

### .width, .height

Size of the image in (unscaled) pixels.

## Methods

### .draw( targetX, targetY, [sourceX], [sourceY], [width], [height] )

Draws the whole image at `targetX `, `targetY `, or a part of it when `sourceX `, `sourceY `and `width `and `height `are given.

### .drawTile( targetX, targetY, tile, tileWidth, [tileHeight], [flipX], [flipY] )

Draws a single tile with the index `tile `at `targetX `, `targetY `.

The position of the specified tile is calculated with the given `tileWidth `and `tileHeight `. If `tileHeight `is ommitted, it is assumed to be the same as `tileWidth `.

`flipX `and `flipY `are booleans, denoting if the tile should be drawn flipped ("mirrored") on the given axis.
