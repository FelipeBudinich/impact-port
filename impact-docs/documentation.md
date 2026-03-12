# Documentation

New here? The [Create a Game](documentation-video-tutorial-create-a-game.md) video and the [Installation & Getting Started](documentation-getting-started.md) tutorial are probably a good starting point. They give you an overview of how to build a game with the engine.

If you are stuck with anything and can't seem to find an answer here, try asking in the [Forums](http://impactjs.com/forums) or in our [#impactjs](irc:--irc.freenode.org-impactjs.html) IRC channel at irc.freenode.org.

For offline use, this documentation can be [downloaded as ZIP archive](http://impactjs.com/files/impact-docs.zip).

## Books

Jesse Freeman's [Introducing HTML5 Game Development](http://www.amazon.com/gp/product/1449315178) walks you through the whole process of creating a game with Impact. It covers everything from setting up your working environment to packaging your game for release.

## Video Tutorials

- [Create a Game](documentation-video-tutorial-create-a-game.md) - Building the game Pong from start to finish
- [Working with Weltmeister](documentation-video-tutorial-weltmeister.md) - How the level editor works and how you can create your own entities to be used by it

## Topics

- [Installation & Getting Started](documentation-getting-started.md) - Installation instructions and a basic overview how Impact is structured into modules and classes
- [Weltmeister](documentation-weltmeister.md) - Everything about the Level Editor
- [Working with Assets](documentation-working-with-assets.md) - Referencing and loading image and sound files
- [Collision](documentation-collision.md) - Entity vs. Map and Entity vs. Entity collisions
- [Animations](documentation-animations.md) - Learn how to animate entities and background maps
- [Impact on Mobile Platforms](documentation-impact-on-mobile-platforms.md) - How to deal with different mobile devices
- [Debug](documentation-debug.md) - Enabling and extending the Debug Panel
- [Baking](documentation-baking.md) - Packing up your game for release
- [Drop Source Code](documentation-drop-source-code.md) - Source for the example game [Drop](http://impactjs.com/drop)
- [Physics with Box2D](documentation-physics-with-box2d.md) - How to use the Box2D Physics engine with Impact

## Class Reference

The [Class Reference](documentation-class-reference.md) lists all properties and methods for each of Impact's classes. If you are already familiar with the grand scheme of things, this is where you can look up the details.

### Core and System

- [Core](documentation-class-reference-ig-core.md) - Module definition, module loading and the ig.main() and utility functions
- [Class](documentation-class-reference-class.md) - Base Class for all classes
- [System](documentation-class-reference-system.md) - Hosts the current Game object and maintains the run loop.
- [Loader](documentation-class-reference-loader.md) - Preloads all assets (images and sounds) and starts the given Game when done.

### Logic

- [Game](documentation-class-reference-game.md) - The main hub for your game. It hosts all currently active entities, background maps and a collision map and takes care of updating and drawing everything.
- [Entity](documentation-class-reference-entity.md) - Interactive objects in the game world are typically subclassed from this base Entity class. It provides animation, drawing and basic physics.
- [Input](documentation-class-reference-input.md) - Handles all Keyboard and Mouse input.
- [Timer](documentation-class-reference-timer.md) - Timing stuff.
- [Map](documentation-class-reference-map.md) - Base class for CollisionMaps and BackgroundMaps.
- [CollisionMap](documentation-class-reference-collisionmap.md) - Trace objects against a 2D Tile Map

### Graphics

- [Image](documentation-class-reference-image.md) - A wrapper around image resources (png, gif or jpeg). It takes care of loading and scaling the source image.
- [Animation](documentation-class-reference-animation.md) - Animate Entities and Background Map tiles with an Animation Sheet
- [AnimationSheet](documentation-class-reference-animationsheet.md) - Load an Image as Animation Sheet and specify the width and height for each animation frame
- [Font](documentation-class-reference-font.md) - Load a bitmap font image and draw text.
- [BackgroundMap](documentation-class-reference-backgroundmap.md) - Draw a 2D Tile Map

### Sound

- [Sound](documentation-class-reference-sound.md) - Loads a sound file to be used as background music or game sound.
- [Music](documentation-class-reference-music.md) - Provides functionality to play background music and create a playlist.
- [SoundManager](documentation-class-reference-soundmanager.md) - Loads sound files for ig.Music and ig.Sound.
