# Class Reference Entity

Defined in Module **impact.entity **, inherits from [ig.Class](documentation-class-reference-class.md)

## Synopsis

```

// Create your own entity, subclassed from ig.Enitity
EntityPlayer = ig.Entity.extend({

	// Set some of the properties
	collides: ig.Entity.COLLIDES.ACTIVE,
	type: ig.Entity.TYPE.A,
	checkAgainst: ig.Entity.TYPE.B,

	size: {x: 16, y: 16},
	health: 50,

	// Load an animation sheet
	animSheet: new ig.AnimationSheet( 'media/player.png', 16, 16 ),

	init: function( x, y, settings ) {
		// Add animations for the animation sheet
		this.addAnim( 'idle', 0.1, [0,1,2] );
		this.addAnim( 'jump', 0.1, [3,4,5] );

		// Call the parent constructor
		this.parent( x, y, settings );
	}

	update: function() {
		// This method is called for every frame on each entity.
		// React to input, or compute the entity's AI here.

		if( ig.input.pressed('jump') ) {
			this.vel.y = -100;
			this.currentAnim = this.anims.jump.rewind();
		}

		// Call the parent update() method to move the entity
		// according to its physics
		this.parent();
	}
});

```

## Description

Interactive objects in the game world are typically subclassed from this base entity class. It provides animation, drawing and basic physics. Subclassing your entities from `ig.Entity `ensures that it can be added to the game world, react to the collision map and other entities and that it can be used in Weltmeister.

All of the methods listed here can be overwritten in your subclass and called with [this.parent()](documentation-class-reference-class.md#this-parent) if needed.

## Constructor

### new ig.Entity( x, y, settings )

- `x, y `Position to place this entity in the game world
- `settings `A JavaScript object, whose properties overwrite the entity's default properties

Typically, you should create your entities through the [ig.Game's](documentation-class-reference-game.md)`spawnEntity() `method, which creates the entity and adds it to the game world.
The `settings `object overwrites the properties for this one particular entity. E.g.:

```

var settings = {health: 100, vel: {x: 200, y: 100}};
var myEnt = new EntityMyEntityClass( 0, 0, settings );

```

Weltmeister makes use of the `settings `object, to store additional settings for each entity.

## Properties

### .accel.x, .accel.y

Current acceleration to be added to the entity's velocity per second. E.g. an entity with a `.vel.x `of `0 `and `.accel.x `of `10 `will have a `.vel.x `of `100 `ten seconds later.

### .animSheet

An instance of [AnimationSheet](documentation-class-reference-animation.md), used by the entity's [.addAnim()](#addanim) method.

### .anims

An object holding all the entity's animations, created through [.addAnim()](#addanim). E.g.:

```

this.addAnim( 'run', 0.1, [0,1,2] );
this.currentAnim = this.anims.run;

```

### .bounciness

A factor, indicating with which force the entity will bounce back after a collision. With a `.bounciness `set to `1 `, the entity will bounce back with the same speed it has hit the other entity/collision map. Default `0 `.

### .checkAgainst

One of

- `ig.Entity.TYPE.NONE `
- `ig.Entity.TYPE.A `
- `ig.Entity.TYPE.B `
- `ig.Entity.TYPE.BOTH `

See the documentation for the [.type property](#type).

The default is `NONE `.

### .collides

One of

- `ig.Entity.COLLIDES.NEVER `
- `ig.Entity.COLLIDES.LITE `
- `ig.Entity.COLLIDES.PASSIVE `
- `ig.Entity.COLLIDES.ACTIVE `
- `ig.Entity.COLLIDES.FIXED `

This property determines how the entity collides with other entities. Note that this is independent from the collision against a collision map.

In `ACTIVE `vs. `LITE `or `FIXED `vs. *any *collisions, only the *weak *entity moves, while the other one stays fixed. In `ACTIVE `vs. `ACTIVE `and `ACTIVE `vs. `PASSIVE `collisions, both entities are moved. `LITE `or `PASSIVE `entities don't collide with other `LITE `or `PASSIVE `entities at all.

The behavior for `FIXED `vs. `FIXED `collisions is undefined.

Typically, entities that are unimportant for the game itself, such as particles, should collide `LITE `or `NEVER `. Moving platforms should collide `FIXED `, to be unaffected by the other entity's movement.

Read more in the [Collision Tutorial](documentation-collision.md).

### .currentAnim

An instance of [ig.Animation](documentation-class-reference-animation.md) that will be drawn by the entity's [.draw()](#draw) method, or `null `if no animation has been defined yet.

### .friction.x, .friction.y

Deceleration to be subtracted from the entity's velocity per second. Only applies if [.accel.*](#accel-x-accel-y) is `0 `.

### .gravityFactor

How much this entity is affected by the gravity set in the [game](documentation-class-reference-game.md) class. A `.gravityFactor `of `0 `will make the entity float, no matter what the game's gravity is set to. The default is `1 `.

### .health

Health for this entity. An entity's health is typically decreased through the [.receiveDamage()](#receivedamage) method. If the health reaches `0 `, the entity's [.kill()](#kill) method is called, removing the entity from the game world.

### .id

An integer representing a unique ID for this entity. This ID is set by the entity's [.init()](#new-ig-entity) method.

Note that the `.id `of an entity might be different on each level load.

### .last.x, .last.y

The entity's position in the last frame (before [.update()](#update) is called). This is used for the entity vs. entity collision response.

### .maxVel.x, .maxVel.y

Maximum velocity. The entity's speed will be capped at these values.

The default is `100 `.

### .minBounceVelocity

If the entity's velocity is below this threshold, it won't bounce back. This is needed so an entity can come to a complete rest, instead of bouncing back with a tiny velocity. Default `40 `.

### .name

Specifies the name of the entity, to be retrieved by the Game's [getEntityByName()](documentation-class-reference-game.md#getentitybyname) method. This should be set through the constructor or in Weltmeister with the key/value pair and should be unique per level.

The default is `null `(no name).

### .offset.x, .offset.y

Drawing offset for this entity's animations. E.g. If your entity's collision box ( `.size.x, .size.y `) is 8 pixels wide, but your animations frame size is 16 pixels wide, you specify an `.offset.x `of 4, to shift the collision box 4 pixels to the right, to center it on the animation frame.

### .pos.x, .pos.y

The entity's position in the game world.

### .size.x, .size.y

The entity's size in pixels. This is used for collision detection and response.
The default x and y size is `16 `.

### .standing

Boolean, stating if the entity is resting on the ground (y axis).

### .slopeStanding

*New in 1.19 *

An object defining at which slope angle the `.standing `property is still set. The default is

```

slopeStanding: {min: (44).toRad(), max: (136).toRad() }

```

### .type

One of

- `ig.Entity.TYPE.NONE `
- `ig.Entity.TYPE.A `
- `ig.Entity.TYPE.B `

Through the `.type `property, entities can be organized into one of two groups (or none). This is useful in conjunction with the [.checkAgainst](#checkagainst) property.

When two entities are overlapping and the `.checkAgainst `property of one entity matches the `.type `of the other one, the former entity's [.check()](#check) method is called with the latter entity as the parameter.

You can, for instance, give all *friendly *entities the `.type ``A `, and set up all *hostile *entities to `.checkAgainst ``A `. In the `.check() `method of the hostile entity you can then give the friendly entity damage.

The default is `NONE `.

### .vel.x, vel.y

Current velocity in pixels per second.

### .zIndex

Drawing order. Entities with a higher `.zIndex `will get drawn last. Note that entities are, by default, only sorted once after level load ( [ig.Game's](documentation-class-reference-game.md)[.loadLevel()](documentation-class-reference-game.md#loadlevel)). If you spawn entities after that, they will be appended at the end of the games `.entities `array and thus drawn last. Call [ig.Game's](documentation-class-reference-game.md)[.sortEntitiesDeferred()](documentation-class-reference-game.md#sortentitiesdeferred) to re-sort them. E.g.:

```

// Spawn 50 "particle" entities. Set a negative zIndex, so they will
// be drawn first and occluded by all other entities
for( var i = 0; i < 50; i++ ) {
	var e = ig.game.spawnEntity( EntityMyParticle, x, y );
	e.zIndex = -10;
}

// Re-sort Entities
ig.game.sortEntitiesDeferred();

```

### ._wmScalable

Whether the entity's `.size `can be changed in Weltmeister. The default is `false `.

### ._wmIgnore

If `true `, this entity will not show up in the entity menu in Weltmeister. The default is `false `.

### ._wmDrawBox

Whether Weltmeister should draw a box for this entity. This is useful for entities that are invisible in the game. The default is `false `.

### ._wmBoxColor

When `._wmDrawBox `is `true `, this property specifies the color of the box that will be drawn in Weltmeister. Use a CSS-String such as `'#ff00ff' `or `'rgba(255,0,255,0.5)' `.

## Methods

### .addAnim( name, frameTime, sequence, [stop] )

Specify an animation for the entity's `.animSheet `. This method is essentially a shorthand for the [Animation](documentation-class-reference-animation.md) constructor.

- `name `The name of the new animation in the entity's `.anims `object.
- `frameTime `The time each frame of the animation will be displayed in seconds
- `sequence `An array of frame numbers for the animation.
- `stop `Boolean. Determines if the animation should stop at the last frame, or repeat indefinitely. Defaults to `false `.

If the entities [.currentAnim](#currentanim) is `null `, the newly created Animation is set as the `.currentAnim `.

You can access an Animation created with this method through the [.anims](#anims) property. E.g.:

```

this.addAnim( 'run', 0.1, [0,1,2,3,4] );
this.anims.run.flip.x = true;

```

### .angleTo( other )

Return the angle from this entity's center to the `other `entity's center.

### .check( other )

This method is called if this entity overlaps with the `other `entity and the `other `entity's [.type](#type) matches this entity's [.checkAgainst](#checkagainst) property.

### .collideWith( other, axis )

This method is called when this entity collides with another entity. `axis `is the collision axis: either `'x' `or `'y' `.

### .draw()

Automatically called by the [Game](documentation-class-reference-game.md) for each frame. Draws the current animation.

### .distanceTo( other )

Returns the absolute distance in pixels from this entity's center to the `other `entity's center.

### .handleMovementTrace( res )

The default [.update()](#update) method of an entity does a movement trace against the [CollisionMap](documentation-class-reference-collisionmap.md). The `.handleMovementTrace() `method receives the result of this trace and acts accordingly. Refer to the CollisionMap's [trace()](documentation-class-reference-collisionmap.md#trace) method for a description of the `res `argument.

You can overwrite this method to opt out of collision or create some additional behavior.

If, for instance, you want to play a sound when your player entity hits the floor with a certain speed, you can overwrite `.handleMovementTrace() `and check for collision and speed.

```

EntityPlayer = ig.Entity.extend({

…

handleMovementTrace: function( res ) {
	if( res.collision.y && this.vel.y > 32 ) {
		this.soundBounce.play();
	}

	// Continue resolving the collision as normal
	this.parent(res);
},

…

});

```

### .kill()

Removes the entity from the game world. This method is called by [.receiveDamage()](#receivedamage) if the entity's [health](#health) is `0 `or less.

### .ready()

*New in 1.19 *

This function is called once after a level was completely loaded and all entities are present. Use it to initialize connections between entities and such. The default implementation of this function does nothing.

### .receiveDamage( amount, from )

Substracts `amount `from the entities [.health](#health) and calls [.kill()](#kill) if the entities new health is below or equal to `0 `.

This function should be called with the damage giving entity as the `from `parameter. This parameter, however, is currently not used.

### .touches( other )

Returns `true `if this entity touches the `other `entity, otherwise `false `.

### .update()

This method is called each frame by the [Game](documentation-class-reference-game.md) before drawing. The base entity's `.update() `method moves the entity according to it's velocity, friction, bounciness etc. and updates the current animation. This is the place to add your own logic for this entity. If you overwrite this method, you can still call the base entity's `.update() `method with `this.parent() `. See the [Synopsis](#synopsis) for an example.
