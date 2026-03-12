# Class Reference Animation

Defined in Module **impact.animation **, inherits from [ig.Class](documentation-class-reference-class.md)

## Synopsis

```

// Create animation
var animSheet = new ig.AnimationSheet( 'sheet.png', 16, 16 );
var anim = new ig.Animation( animSheet, 0.1, [0,1,2,3,2,1] );

// Update animation to current frame
anim.update();

// Draw current frame
anim.draw( x, y );

```

## Description

An `ig.Animation `object takes care of animating an Entity or Background Map tile. Frames from an animation sheet – an image with all animation frames – are drawn as specified by the animations `frameTime `and `sequence `.

In most cases you shouldn't need to create an animation object by yourself, but instead use the [ig.Entity's](documentation-class-reference-entity.md)[.addAnim()](documentation-class-reference-entity.md#addanim) method.

Read more in the [Animations Tutorial](documentation-animations.md).

## Constructor

### new ig.Animation( sheet, frameTime, sequence, [stop] )

- `sheet `An [ig.AnimationSheet](documentation-class-reference-animationsheet.md) object specifying the image to use and the width and height of each frame
- `frameTime `Time in seconds each frame is displayed
- `sequence `An Array of integers, specifying the actual animation frames
- `stop `A Boolean, indicating whether to stop the animation when it has reached the last frame. Defaults to `false `.

## Properties

### .alpha

Alpha opacity of the animation from `0 `to `1 `. The default is `1 `(fully opaque).

### .angle

*New in 1.15 *

Rotation of the animation in radians. The center of rotation is specified by [.pivot](#pivot-x-pivot-y).

### .flip.x, .flip.y

Booleans, indicating whether the animation should be drawn flipped on the x and/or y axis

### .frame

The current frame number, set by the `.update() `method

### .loopCount

An integer, specifying how often the animation has been played through since the last call to `.rewind() `.

Note that even if the animation has stopped at the last frame, the `.loopCount `is updated as if the animation was still running.

### .pivot.x, .pivot.y

*New in 1.15 *

Center of the rotation when using [.angle](#angle). The default is half the `.width `and `.height `of the AnimationSheet, i.e. the center of the animation frame.

### .tile

The current tile of the animation sheet, set by the `.update() `method

## Methods

### .draw( x, y)

Draws the current animation frame at the given screen coordinates

### .gotoFrame( f )

Jumps to frame number `f `

### .gotoRandomFrame()

Jumps to a random frame

### .rewind()

Rewinds the animation to its first frame and resets the `.loopCount `

This method returns the animation itself. This is useful when switching between animations. E.g:

```

// In an entities .update() method
this.currentAnim = this.anims.jump.rewind();

```

### .update()

Updates the animation to the current frame, based on its `frameTime `
