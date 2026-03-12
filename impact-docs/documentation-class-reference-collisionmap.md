# Class Reference Collisionmap

Defined in Module **impact.collision-map **, inherits from [ig.Map](documentation-class-reference-map.md)

## Synopsis

```

// Create CollisionMap
var data = [
	[1,2,6],
	[0,3,5],
	[2,8,1],
];
var collision = new ig.CollisionMap( 16, data );

// Do a trace
var res = collision.trace( x, y, vx, vy, objectWidth, objectHeight );

if( res.collision.x || res.collision.y ) {
	// The trace collided with the map at
	// (res.pos.x, res.pos.y)
}

```

## Description

An `ig.Collision `takes a 2D tilemap and allows tracing against it for collisions.

The [ig.Game](documentation-class-reference-game.md) class' [.loadLevel()](documentation-class-reference-game.md#loadlevel) method takes the save data from Weltmeister and creates a CollisonMap if present.

By default, all entities trace against the [ig.game.collisionMap](documentation-class-reference-game.md#collisionMap) as part of their update cycle.

## Constructor

### new ig.CollisionMap( tilesize, data, [tiledef] )

- `tilesize `Width and height of a single tile in pixels
- `data `A 2D Array ( *Array of Arrays *) indicating where to draw which tile from the Tileset.

*New in 1.19 *

The optional `tiledef `parameter specifies the tile definition to use. This defines which tiles are slopes etc. The default is `ig.CollisionMap.defaultTileDef `. Pass an empty object ( `{} `) to only have solid/non-solid tiles.

## Properties

### .firstSolidTile

*Removed in 1.19 *

First tile number that is considered solid. Default `1 `.

### .lastSolidTile

*Removed in 1.19 *

Last tile number that is considered solid. Default `255 `.

### .lastSlope

*New in 1.20 *

The last tile number that is used for slopes. All tiles above this number can be used for custom tiles. `.lastSlope `is automatically determined by the constructor through the tiledef property.

## Methods

### .trace( x, y, sx, sy, objectWidth, objectHeight )

Does a trace from `(x, y) `to `(x + sx, y + sy) `for an object with the specified `objectWidth `and `objectHeight `. This method returns a "trace result" in the following form:

```

{
	collision: { x: false, y: false, slope: false },
	pos: { x: 0, y: 0 }, // Resulting object position
	tile: { x: 0, y: 0 } // Tile for the collision
}

```

*New in 1.19 *

The `collision.slope `property is either false (if there was no slope collision) or an object with the properties `x, y `- the slope direction - and `nx, ny `- the slope normal.
