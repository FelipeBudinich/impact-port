# Class Reference Animationsheet

Defined in Module **impact.animation **, inherits from [ig.Class](documentation-class-reference-class.md)

## Synopsis

```

// Create animation
var animSheet = new ig.AnimationSheet( 'sheet.png', 16, 16 );
var anim = new ig.Animation( animSheet, 0.1, [0,1,2,3,2,1] );

```

## Description

`ig.AnimationSheet `is a thin wrapper around an [ig.Image](documentation-class-reference-image.md) object. It specifies the width and height for each animation frame in the sheet. It is used by the [ig.Animation](documentation-class-reference-animation.md) class.

## Constructor

### new ig.AnimationSheet( path, width, height )

- `path `Location of the image file
- `width `Width of a single animation frame
- `height `Height of a single animation frame

## Properties

### .image

An [ig.Image](documentation-class-reference-image.md) object, representing the actual animation sheet

### .width, .height

The width/height for a single animation frame, as set in the constructor
