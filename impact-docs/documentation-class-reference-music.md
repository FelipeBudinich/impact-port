# Class Reference Music

Defined in Module **impact.sound **, inherits from [ig.Class](documentation-class-reference-class.md)

## Synopsis

```

ig.music.add( 'music/track1.ogg' );
ig.music.add( 'music/track2.ogg' );
ig.music.add( 'music/track3.ogg' );

ig.music.volume = 0.5;
ig.music.play();

```

## Description

`ig.Music `offers capabilities to play a list of background music in ordered or random fashion.

An instance of `ig.Music `is automatically created at `ig.music `(lowercase) by the `ig.main() `function.

## Properties

### .currentIndex

The index of the current track in the [.tracks](#tracks) array.

### .currentTrack

The instance of [ig.Sound](documentation-class-reference-sound.md) that is currently playing. `null `if [.tracks](#tracks) is empty.

### .loop

Wheter the current track should be looped instead of jumping to the next track. If there is only one track in the `.tracks `array, this property is ignored. The default is `false `.

### .random

If `true `, tracks are played in random order. The default is `false `.

### .tracks[]

An array of instances of [ig.Sound](documentation-class-reference-sound.md) to be played back.

### .volume

The volume for all music tracks from `0.0 `to `1.0 `. The default is `1 `.

## Methods

### .add( track, [name] )

Adds the given `track `to the `.tracks `array and sets [.currentTrack](#currenttrack) to this one, if it is the first track to be added.

`track `can be either an instance of `ig.Sound `or the filename and path to a sound file. You should load all sound files as class properties, to make sure they are loaded by the preloader. See [Working with Assets](documentation-working-with-assets.md).

*New in 1.19 *

Use the optional `name `parameter to specify a name for the track. Named tracks can be played with the [.play()](#play) method.

### .fadeOut( time )

Linearly fade out the current track over `time `seconds.

When the fade out is complete, [.stop()](#stop) is called and the volume for this track is reset to it's original volume.

### .next()

Stops the current track and jumps to the next track in the `.tracks `array. If `.random `is true, the next track is chosen randomly.

### .pause()

Pauses the current track.

### .play( [name] )

Starts playing the current track.

*New in 1.19 *

Use the optional `name `parameter to directly jump to and play a named track. The name can be specified when calling [.add()](#add).

### .stop()

Stops the current track. Same as [.pause()](#pause), but additionally "rewinds" the track to the beginning.
