# Class Reference Map

Defined in Module **impact.map **, inherits from [ig.Class](documentation-class-reference-class.md)

## Synopsis

```

// Create a map
var data = [
	[1,2,6],
	[0,3,5],
	[2,8,1],
];
var map = new ig.Map( 16, data );

// 40, 20 are the pixel coordinates for the tile to set
// So this essentially does data[2][1] = 8;
map.setTile( 40, 20, 8 );

// Gets the same tile we just set, even though the
// pixel coordinates are not the exact same
var tile = map.getTile( 46, 18 );
tile; // => 8

```

## Description

`ig.Map `is the base class for [ig.BackgroundMap](documentation-class-reference-backgroundmap.md) and [ig.CollisionMap](documentation-class-reference-collisionmap.md). It only provides basic access to the tiles in the map data.

You usually won't need to create instances of an `ig.Map `.

## Constructor

### new ig.Map( tilesize, data )

- `tilesize `Width and height of a single tile in pixels
- `data `A 2D Array ( *Array of Arrays *) used as the data for this map

## Properties

### .data

The 2D data array for this map, as set through the constructor.

### .tilesize

The width and height of a single tile in pixels, as set through the constructor.

### .width, .height

The width and height of the map in tiles.

## Methods

### .getTile( x, y )

Get the tile at the pixel coordinates `x `, `y `. Returns `0 `if the coordinates lie outside of this map.

### .setTile( x, y, tile)

Set the tile at the pixel coordinates `x `, `y `to the given `tile `. Does nothing if the coordinates lie outside of this map.
