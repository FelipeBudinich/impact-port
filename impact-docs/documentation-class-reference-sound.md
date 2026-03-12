# Class Reference Sound

Defined in Module **impact.sound **, inherits from [ig.Class](documentation-class-reference-class.md)

## Synopsis

```

var sound = new ig.Sound( 'shoot.ogg' );
sound.play();

```

## Description

An instance of `ig.Sound `represents a sound file, to be used as background music or game sound.

## Constructor

### new ig.Sound( filename, [multiChannel] )

- `filename `The path and name of the sound file to be loaded.
- `multiChannel `Whether multiple "channels" for concurrent play should be created. Pass `false `for music or sound files that are only played once. The default is `true `

All your sound files have to be present in OGG Vorbis and MP3 format. Their file name has to be the same, except for the file extension. The real file name that will be loaded can be different from the given `filename `, as the [ig.SoundManager](documentation-class-reference-soundmanager.md) decides on the file extension. Also see [ig.Sound.use](#ig-sound-use).

E.g. for a "jump" sound, you'd have the following files:

```

media/sounds/jump.ogg
media/sounds/jump.mp3

```

These can then be loaded with one of the following statements

```

// These 3 lines all do the same. The file extension (.ogg or .mp3) will
// be decided by the SoundManager, based on the browser's capabilities
// Use whatever syntax you like best.
var sound = new ig.Sound( 'media/sounds/jump.ogg' );

var sound = new ig.Sound( 'media/sounds/jump.mp3' );

var sound = new ig.Sound( 'media/sounds/jump.*' );

```

## Properties

### .path

The path and name of the image file as passed to the constructor.

### .volume

The volume for this sound file from `0.0 `to `1.0 `. This will be multiplied with the [ig.soundManager.volume](documentation-class-reference-soundmanager.md#volume) before the sound is played. The default is `1 `.

## Methods

### .play()

Plays the sound file. If the sound file was not loaded as `multiChannel `(see constructor) and it is already playing, the sound restarts from the beginning, otherwise the sound is played concurrently in another channel.

### .stop()

Stops playback of the sound

## Global Properties

### ig.Sound.enabled

You can disable all sounds an music by setting this property to `false `before calling [ig.main()](documentation-class-reference-ig-core.md#main-function). The default is `true `.

When `ig.Sound.enabled `is `false `, no sound files will be loaded or played back. This is useful for mobile devices that currently still have vast problems with sound playback in the browser.

```

// Disable all sounds for mobile devices
if( ig.ua.mobile ) {
	ig.Sound.enabled = false;
}

// Start the game
ig.main(…)

```

### ig.Sound.channels

*New in 1.17 *

Set the number of copies to be created for each sound file. Having more copies means the sound can be played multiple times simultaneously. This has to be set before you call `ig.main() `

The default is 4.

### ig.Sound.FORMAT{}

*New in 1.17 *

An object specifying the file extension and mime type for various sound formats. This is used in conjunction with [ig.Sound.use](#ig-sound-use). Currently implemented are:

- `ig.Sound.FORMAT.OGG `
- `ig.Sound.FORMAT.MP3 `
- `ig.Sound.FORMAT.M4A `
- `ig.Sound.FORMAT.WEBM `
- `ig.Sound.FORMAT.CAF `

### ig.Sound.use[]

*New in 1.17 *

An array of `ig.Sound.FORMAT `properties to specify the sound formats to test support for. The file extension for all sound files that will be loaded is determined by the first supported format.

The default is

```

[ig.Sound.FORMAT.OGG, ig.Sound.FORMAT.MP3]

```

I.e. if the browser supports Ogg/Vorbis, Impact will attempt to load `filename.ogg `. If Ogg/Vorbis is not supported, the support for MP3 is tested and `filename.mp3 `will be loaded. If neither format is supported, sound is completely disabled.

Currently, Ogg/Vorbis is supported by Firefox, Opera and Chrome. MP3 and m4a are supported by Safari, Chrome and IE9.
