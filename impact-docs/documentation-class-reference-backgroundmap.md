# Class Reference Backgroundmap

Defined in Module **impact.background-map **, inherits from [ig.Map](documentation-class-reference-map.md)

## Synopsis

```

// Create BackgroundMap
var data = [
	[1,2,6],
	[0,3,5],
	[2,8,1],
];
var bg = new ig.BackgroundMap( 16, data, 'media/tileset.png' );

// Move
bg.setScreenPos( 25, 10 );

// Draw
bg.draw();

```

## Description

An `ig.BackgroundMap `draws tiles from a Tileset, as indicated by its 2D data Array.

The size of the tileset image must a multiple of the tilesize, otherwise Impact will get confused with the tile numbering. E.g. with a tilesize of `32 `the width and height of your tileset image should be one of: 32, 64, 96, 128…

You can either create a BackgroundMap by hand, or use the [ig.Game](documentation-class-reference-game.md) class' [.loadLevel()](documentation-class-reference-game.md#loadlevel) method, which takes the save data from Weltmeister and creates BackgroundMaps according to it.

BackgroundMaps can be pre-rendered into "chunks" instead of drawing each tile separately. This speeds up the drawing process immensely, especially on mobile devices. However, the pre-rendered mode needs more RAM and doesn't support tileset animations.

## Constructor

### new ig.BackgroundMap( tilesize, data, tileset )

- `tilesize `Width and height of a single tile in pixels
- `data `A 2D Array ( *Array of Arrays *) indicating where to draw which tile from the Tileset. Note that the tile numbering is *off by one *, meaning that tile `0 `draws nothing and tile `1 `draws the zeroth (first) tile of the tileset image.
- `tileset `Location of the image file or instance of [ig.Image](documentation-class-reference-image.md) used as the Tileset

## Properties

### .anims{}

An object specifying the animations for certain tiles. Animations are **not **updated by the BackgroundMap, but must be updated externally. Usually [ig.Game](documentation-class-reference-game.md) takes care of that – see [ig.Game's](documentation-class-reference-game.md)[.backgroundAnims](documentation-class-reference-game.md#backgroundanims) property.

By default, this is an empty object ( `{} `) indicating no animations.

```

var data = [
	[1,2,6],
	[0,3,5],
	[2,8,1],
];
var bg = new ig.BackgroundMap( 16, data, 'media/tileset.png' );

// sets tile number 5 of the BackgroundMap to be animated
var as = new ig.AnimationSheet( 'media/tiles.png', 16, 16 );
bg.anims[5] = new ig.Animation( as, 0.1, [0,1,2,3,4] );

```

### .chunkSize

The chunk width and height in pixels for pre-rendered BackgroundMaps. The default is `512 `. See [.preRender](#prerender).

iOS devices seem to support a chunk size of up to 4096, but testing showed no further performance gain with chunk sizes larger than 512.

### .debugChunks

If `.preRender `and `.debugChunks `are `true `, the `.draw() `method will draw a pink outline around each chunk.

### .distance

Distance factor of the BackgroundMap, indicating how fast the Map scrolls when `.setScreenPos() `is invoked. With a distance of `1 `, the Map scrolls synchronous to the screen. With a distance of `2 `the Map scrolls with half the speed, making it appear farther in the background. The default is `1 `

### .foreground

*New in 1.17 *

Whether this layer will be drawn in front of all entities. This is set automatically by Weltmeister. The default is `false `.

### .preRender

If set to `true `, the next call to `.draw() `will render the whole background map into chunks of `.chunkSize `pixels and then use these chunks to draw the map.

Pre-rendered maps can not be animated but are usually drawn much faster than tiled maps.

The default is `false `.

### .repeat

A Boolean, indicating whether drawing of the Map wraps at the edges. This is useful for secondary BackgroundMaps that are repeated continuously.

### .scroll.x, .scroll.y

Scroll position of the BackgroundMap in screen coordinates with the Map's `.distance `alreday factored in. Should only be read; use `.setScreenPos() `to set the scroll position of the Map.

### .tiles

An instance of [ig.Image](documentation-class-reference-image.md) representing the Tileset that is used for drawing, as set by the constructor or `.setTileset() `

### .tilesetName

Location of the loaded Tileset image (e.g. `'media/tileset.png' `)

## Methods

### .draw()

Draws the BackgroundMap at its current [.scroll](#scroll) position. If [.preRender](#prerender) is true, the map's pre-rendered chunks are drawn, otherwise the map is drawn tile by tile.

### .setScreenPos( x, y )

Set the `x `and `y `position of the screen. The BackgroundMap's `.scroll `position will be set acording to its `.distance `

### .setTileset( tileset )

Set a new Tileset. `tileset `is the location of the image file or instance of [ig.Image](documentation-class-reference-image.md) used as the Tileset.
