# Class Reference

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
