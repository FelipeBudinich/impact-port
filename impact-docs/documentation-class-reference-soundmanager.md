# Class Reference Soundmanager

Defined in Module **impact.sound **, inherits from [ig.Class](documentation-class-reference-class.md)

## Description

The sound managers takes care of loading sounds and providing them for [ig.Music](documentation-class-reference-music.md) and [ig.Sound](documentation-class-reference-sound.md) instances. An instance of the sound manager is automatically created at `ig.soundManager `(lowercase) by the [ig.main()](documentation-class-reference-ig-core.md#main-function) function.

## Properties

### .channels

*This property has been removed in 1.17 - use [ig.Sound.channels](documentation-class-reference-sound.md#ig-sound-channels) instead *

### .format

The sound format that is used by the current browser. Either `'mp3' `or `'ogg' `.

The browsers capabilities are automatically detected and the format is set accordingly. When both are supported, the `'mp3' `format is favored, as Chrome seems to have more issues with `'ogg' `.

If you want to set this manually, you have to do so before loading any sound file.

### .volume

Global volume for all [ig.Sound](documentation-class-reference-sound.md) instances from `0.0 `to `1.0 `. The default is `1 `.
