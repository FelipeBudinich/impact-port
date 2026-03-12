# Collision

## Overview

Collision detection in Impact is done in two separate steps: *"static" *collison (Entity vs. World) and *"dynamic" *collision (Entity vs. Entity).

Static collision is resolved by the entity itself while it's moving - i.e. the entity checks if it can move where it wants to. Before the entity moves, it does a trace from its current position to the destination. The game's CollisionMap answers with a trace result that states if and where there was a collision.

Dynamic collision is resolved **after **all entities have moved. Dynamic collision only checks if two entities are currently overlapping - and if so - moves them apart.

It is important to note that static collision is always accurate and framerate independent, while dynamic collision is not. This means, that fast moving entities can never move through walls but a collision between two fast moving entities *might *remain unnoticed.

Impact always maintains a minimum framerate of 20 frames per *game second *, so that all dynamic collisions are still adequately accurate. See [ig.Timer.maxStep](documentation-class-reference-timer.md#ig-timer-maxstep).

## Static Collision

By default, all entities will collide with the [game's .collisionMap](documentation-class-reference-game.md#collisionmap). The [entity's .update()](documentation-class-reference-entity.md#update) method calculates the movement speed based on the entities properties and then does a trace against the [CollisionMap](documentation-class-reference-collisionmap.md). The result of this trace is then handled by the [entity's .handleMovementTrace()](documentation-class-reference-entity.md#handlemovementtrace) method.

So if you want an entity to opt out of static collision, the easiest way to do this, is to overwrite the `.handleMovementTrace() `method for this entity with the following:

```

handleMovementTrace: function( res ) {
	// This completely ignores the trace result (res) and always
	// moves the entity according to its velocity
	this.pos.x += this.vel.x * ig.system.tick;
	this.pos.y += this.vel.y * ig.system.tick;
}

```

Refer to the CollisionMap's [trace()](documentation-class-reference-collisionmap.md#trace) method for a description of the `res `argument.

You can also check with which tile the entity collided and act accordingly (e.g. if you have tiles that are slippery).

If you want to play a sound when your player entity hits the floor with a certain speed, you can overwrite `.handleMovementTrace() `and check for collision and speed.

```

handleMovementTrace: function( res ) {
	if( res.collision.y && this.vel.y > 32 ) {
		this.soundBounce.play();
	}

	// Continue resolving the collision as normal
	this.parent(res);
}

```

You can use Weltmeister to create a CollisionMap. By default, the game's `.loadLevel() `method assumes that a layer named `'collision' `is the CollisionMap for that level.

You can always create a CollisionMap manually:

```

// In your Game's init() method
var map = [
	0,0,0,0
	0,1,1,0
	0,0,0,0
];
this.collisionMap = new ig.CollisionMap( 8, map );

```

If you don't specify a CollisionMap at all, an empty dummy ( `ig.CollisionMap.staticNoCollision `) will be used.

## Dynamic Collision

Entity vs. entity collision is a bit more complex, because an entity can have one of several collision modes. If two entities collide with each other, the collision modes of both of them determine if and how the collision will be resolved.

The collision mode of an entity is specified by its [.collides](documentation-class-reference-entity.md#collides) property. By default, this property is set to `ig.Entity.COLLIDES.NEVER `, ignoring all collisions no matter which collision mode the other entity has.

The other collision modes are `LITE `, `PASSIVE `, `ACTIVE `and `FIXED `.

If a `PASSIVE `entity collides with an `ACTIVE `entity the collision will be resolved by moving both entities apart. The same is true for `ACTIVE `vs. `ACTIVE `collisions.

The reason that there is a `PASSIVE `mode is that `PASSIVE `vs. `PASSIVE `collisions won't be resolved at all (i.e. they will just overlap). This can be useful for enemies that can move "through" each other, instead of blocking the way. These `PASSIVE `entities will still collide with `ACTIVE `entities.

The two other modes effectively define a *"weak" *and a *"strong" *entity for each collision. In these cases only the weak entity will be moved to resolve the collision.

An entity that has the `LITE `collision mode set is always the weak entity - i.e. the entity that moves. An entity that has the `FIXED `collision mode set is always the strong entity - it will stay where it is.

`LITE `entities only collide with `ACTIVE `or `FIXED `entities. `FIXED `entities will collide with `LITE `, `PASSIVE `and `ACTIVE `entities.

Still confused? Here's some general advice:

The player and enemy character typically should be `PASSIVE `so that they don't collide with each other, but can collide with `ACTIVE `entities, such a crates.

Platforms and elevators should be `FIXED `so that they move regardless if another entity is blockign their path.

All entities that are purely visual and don't affect the gameplay, should collide `LITE `or `NEVER `.
