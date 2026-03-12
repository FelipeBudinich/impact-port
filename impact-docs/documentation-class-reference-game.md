# Class Reference Game

Defined in Module **impact.game **, inherits from [ig.Class](documentation-class-reference-class.md)

## Synopsis

```

// Create your own game class
MyGame = ig.Game.extend({
	init: function() {
		// initialize your game world, bind some
		// keys, etc.
		ig.input.bind( ig.KEY.SPACE, 'jump' );
		this.loadLevel( LevelMyGame1 );
	}
});

// Start your game
// 60fps, 320x240 pixels, scaled up by a factor of 2
ig.main('#canvas', MyGame, 60, 320, 240, 2 );

```

## Description

`ig.Game `is the main *hub *for your game. It hosts all currently active entities, background maps and a collision map. You can subclass your own Game Class from `ig.Game `.

Its [.update()](#update) and [.draw()](#draw) methods take care of collision detection, checking entities against each other and drawing everything to the screen.

## Constructor

### new ig.Game()

The default constructor does nothing. You can subclass `ig.Game `and provide your own code. Usually a game's constructor is called through [ig.main()](documentation-class-reference-ig-core.md#ig-main) when the [preloader](documentation-class-reference-loader.md) finished loading, or through [ig.system.setGame()](documentation-class-reference-system.md#setgame) when you want to load another game class.

The currently running instance of a Game class is provided at `ig.game `(lowercase), to be referenced from entities etc.

## Properties

### .autoSort

*New in 1.19 *

Whether to sort entities by the [.sortBy](#sortby) function each frame. The default is `false `.

### .backgroundMaps[]

An array of instances of [ig.BackgroundMap](documentation-class-reference-backgroundmap.md), holding the background layers. You can use the [.loadLevel()](#loadlevel) method to load these from a level saved with Weltmeister.

### .backgroundAnims{}

*Disclaimer: This is somewhat stupid an may change in future versions :/ *

An object, specifying the animated tiles for particular tileset. Note that you have to set this before loading a level through [.loadLevel()](#loadlevel).

```

// This sets two tiles (tile 0 and tile 5) of any background map with
// the 'media/tiles.png' tileset to be animated.
var as = new ig.AnimationSheet( 'media/tiles.png', 16, 16 );
this.backgroundAnims = {
	'media/tiles.png': {
		0: new ig.Animation( as, 0.1, [0,1,2,3,4] ),
		5: new ig.Animation( as, 0.2, [5,6,7] )
	}
};
this.loadLevel( MyLevel );

```

### .cellSize

The size of each cell for the spacial hash when checking and colliding entities (see [.checkEntities()](#checkentities)). As a rule of thumb, this should be about 4 times as big as your common entity size. E.g. if most of your entities are 8x8 pixels in size, set the `.cellSize `to `32 `. Don't worry too much about it though.

The default is `64 `.

### .clearColor

A CSS string specifying the color each frame is cleared with before drawing, e.g. `'#00ff00' `or `'rgb(0,255,0)' `.

*Added in 1.17 *: Set this property to `null `if you don't want to clear the screen before drawing each frame.

The default is `'#000000' `(black).

### .collisionMap

An instance of [ig.CollisionMap](documentation-class-reference-collisionmap.md) or `ig.CollisionMap.staticNoCollision `if you don't want collisions against a collisionMap.

The default is `ig.CollisionMap.staticNoCollision `.

You can use the game's [.loadLevel()](#loadlevel) method to load a level saved with Weltmeister. If this level has a map with the name `'collision' `it will be automatically set as the collision map.

Otherwise, create a collision map using the constructor:

```

// somewhere in your Game's init() method..
var data = [
 [1,2,6],
 [0,3,5],
 [2,8,1],
];
this.collisionMap = new ig.CollisionMap( 16, data );

```

### .entities[]

An array holding all entities in the game world. After a level is loaded ( [.loadLevel()](#loadlevel)) or [.sortEntities()](#sortentities) is called this array is sorted by the entities `.zIndex `.

You shouldn't need to manipulate this array directly. Use the games [.spawnEntity()](#spawentity) and [.removeEntity()](#removeentity) methods to add and remove entities. The [.getEntityByName()](#getentitybyname) and [.getEntitiesByType()](#getentitiesbytype) methods can be used to retrieve entities from this array.

### .gravity

The gravity (positive acceleration on the y axis) applied to all entities. Note that entities can specify a [.gravityFactor](documentation-class-reference-entity.md#gravityfactor) to be more or less affected by the game's `.gravity `.

The default is `0 `– i.e. no gravity.

### .namedEntities{}

An object holding all named entities (those entities with the `.name `property set). The game's [.spawnEntity()](#spawnentity) method automatically adds entities that have a name to this object. Use [.getEntityByName()](#getentitybyname) to retrieve a named entity.

### .screen.x, .screen.y

The screen position in pixels. Think of it as the position of a window into the game world.

### .sortBy

*New in 1.19 *

Specify the sort function used by [.sortEntities()](#sortentities). Can be one of

- `ig.Game.SORT.Z_INDEX `
- `ig.Game.SORT.POS_X `
- `ig.Game.SORT.POS_Y `

The default is `Z_INDEX `. Sorting by `POS_Y `can be useful for top down RPGs, so that characters in the front always overlap those in the back.

## Methods

### .checkEntities()

This method is called for each frame by the `.update() `method and checks all entities against each other. It uses a spacial hash with a cell size of [.cellSize](#cellsize) to do so.

If two entities are overlapping, the static `ig.Entity.checkPair() `function is called with these two entities as arguments. This in turn resolves all entity vs. entity collisions.

### .draw()

This method is called for each frame and draws all BackgroundMaps and entities.

### .getEntityByName( name )

Get the entity with the name `name `from the `.entities `array. Returns `undefined `if the entity can't be found.

### .getEntitiesByType( type )

Get an array of entities with the given type from the `.entities `array. `type `can either be a string or the actual class object. E.g.:

```

var blobs = this.getEntitiesByType( 'EntityBlob' );
// or
var blobs = this.getEntitiesByType( EntityBlob );

```

Note that subclasses of `EntityBlob `(e.g. `EntityBlobLarge `) will also be of the type `EntityBlob `, because `getEntitiesByType() `traverses the whole prototype chain of your classes.

### .getMapByName( name )

*New in 1.20 *

Returns the Background- or CollisionMap with the given name.

### .loadLevel( levelObject )

Loads the given `levelObject `as saved from Weltmeister.

This method deletes all entities and background and collision maps currently present in the game and resets the screen coordinates to `0 `, `0 `prior to creating the new entities and maps.

The structure of the levelObject, as saved from Weltmeister, is as follows:

```

{
	entities: [
		{type: "EntityClassName", x: 64, y: 32, settings: {}},
		{type: "EntityClassName", x: 16, y: 0, settings: {}},
		…
	],

	layer: [
		{
			name: "background1",
			tilesetName: "media/tiles/biolab.png",
			repeat: false,
			distance: 1,
			tilesize: 8,
			foreground: false,
			data: [
				[1,2,6],
				[0,3,5],
				[2,8,1],
			]
		},
		…
	]
}

```

Note that if a layer is named `"collision" `it is assumed to be the CollisionMap for this level.

Be careful not to call this method in the midst of an `update() `cycle (eg. through a trigger) - it switches out all entities while they are still being updated and can cause some unexpected behavior. Use [.loadLevelDeferred](#loadleveldeferred) instead.

### .loadLevelDeferred( levelObject )

*New in 1.16 *

Defers a call to `.loadLevel() `to the end of an update cycle. This makes sure that entities aren't "switched out", while they are still being updated.

### .sortEntities()

Re-sort the `.entities `array by their [.zIndex](documentation-class-reference-entity.md#zindex) to correctly set the drawing order.

Be careful not to call this method in the midst of an `update() `cycle (eg. through a trigger) - it re-sorts all entities while they are still being updated and can cause some unexpected behavior. Use [.sortEntitiesDeferred](#sortentitiesdeferred) instead.

*New in 1.19 *

You can specify the sort function to use with the [.sortBy](#sortby) property.

### .sortEntitiesDeferred()

*New in 1.18 *

Defers a call to `.sortEntities() `to the end of an update cycle.

### .spawnEntity( type, x, y, settings )

Create a new entity of the specified `type `(string or class object) and add it to the game world at `x `, `y `. This method calls the constructor of the entity class, just as usual.

The entity is appended to the `.entities `array at the end. You can call [.sortEntities()](#sortentities) after spawning the entity, to resort the entities by their `.zIndex `.

The return value is the newly created entity.

### .removeEntity( entity )

Removes an entity from the game world. Usually, this is called from the entity's [.kill()](documentation-class-reference-entity.md#kill) method.

### .run()

This is the main "run loop" method of the game. It is called *fps *times per second and, by default, only calls the game's [.update()](#update) and [.draw()](#draw) methods.

### .update()

This method is called for each frame and updates all entities, BackgroundMaps and tileset animations.
