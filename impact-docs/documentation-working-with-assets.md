# Working With Assets

## Paths to Your Image and Sound Files

When you load image or sound files, the path to this file is always relative to the .html file in which your game is running. I.e. the location of your .js files is irrelevant.

So let's assume you have the following directory structure and your `game.js `is loaded by the `game.html `:

```

/mygame/game.html
/mygame/lib/game.js
/mygame/media/some-image.png
/mygame/media/some-sound.ogg
/mygame/media/some-sound.mp3

```

When you now want to load `some-image.png `from within your `game.js `file, you'd do the following:

```

// The game.html file is in /mygame/, that means that all
// assets can be referenced relative to /mygame/
var someImage = new ig.Image( 'media/some-image.png' );

// It works exactly the same for sounds:
var someSound = new ig.Sound( 'media/some-sound.*' );

// Or AnimationSheets
var someAnimSheet = new ig.AnimationSheet( 'media/some-image.png', 8, 8 );

```

The path `'media/some-sound.*' `is actually valid. Impact will load the appropiate sound file (MP3 or OGG Vorbis) depending on the browsers capabilities. See [ig.Sound](documentation-class-reference-sound.md#new-ig-sound).

## Using the Preloader

All sound and image files that your game needs should be loaded by the [preloader](documentation-class-reference-loader.md), so that they are actually available when needed.

Calling the `.draw() `method on an image that has not yet been loaded, will do nothing. Attempting to play a sound file that has not been loaded, will result in a severe lag.

All instances of [ig.Image](documentation-class-reference-image.md), [ig.Font](documentation-class-reference-font.md), [ig.AnimationSheet](documentation-class-reference-animationsheet.md) and [ig.Sound](documentation-class-reference-sound.md) that are created during *load-time *will be appended to the preloader's chain of assets to load. Images and Sounds that are only created at *runtime *, will **not **be loaded by the preloader.

```

MyGame = ig.Game.extend({
	// This image will be loaded by the preloader. It is created
	// as soon as the script is executed
	titleImage: new ig.Image( 'media/title.png' ),

	init: function() {
		// This image file will NOT be loaded by the preloader. The
		// init() method is only called after the preloader finishes
		// and the game is started.
		this.backgroundImage = new ig.Image( 'media/background.png' );
	}
});

```

## Caching

All assets are automatically *cached *. They are only loaded once, no matter how often you need them. E.g. if two entities share the same AnimationSheet image it will not be loaded twice. So this is perfectly valid:

```

EntityPlayer = ig.Entity.extend({
	animSheet: new ig.AnimationSheet( 'media/player.png', 16, 16 )
	…
});

EntityPlayerGibs = ig.Entity.extend({
	// The player gibs are in the same image file
	animSheet: new ig.AnimationSheet( 'media/player.png', 8, 8 )
	…
});

```

You can also use this to make sure your background music is loaded by the preloader. You can't use [ig.music.add()](documentation-class-reference-music.md#add) at load time, but you can already load the sound file as an instance of [ig.Sound](documentation-class-reference-sound.md).

```

MyGame = ig.Game.extend({
	// Make sure the music is loaded by the preloader.
	// Passing 'false' as the second argument, prevents loading this
	// sound as multi channel.
	bgtune: new ig.Sound( 'media/background-tune.*', false ),

	init: function() {
		// Now add the file to the playlist
		ig.music.add( this.bgtune );

		// You could also just specify the path again:
		// ig.music.add( 'media/background-tune.*' );

		// Ready to Rock!
		ig.music.play();
	}
});

```
