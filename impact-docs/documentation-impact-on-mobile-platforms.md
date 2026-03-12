# Impact On Mobile Platforms

## Overview

While Impact runs surprisingly well on most mobile platforms, there are still some issues to be aware of:

- Performance – mobile platforms are still quite slow, but with some tricks you can almost always achive good frame rates
- Resolution – The screen size is different for many devices. The iPhone 4's *device pixel ratio *further complicates things
- Sound – Only one sound at a time can be played and there are browser bugs with loading sound files.
- **Update: this is fixed in iOS6. **Multitouch Issues – sadly, this iOS 4.2.1 [introduced a bug](http://www.phoboslab.org/crap/mt.html) where sometimes a second touch in the browser is not recognized. Apple is already aware of the problem.

As it is now, the best mobile device to play HTML5 games on is the iPhone 3GS or 3rd gen iPod Touch. Impact also runs well on all other iOS devices, but those are a bit slower. Even the newer iPhone 4 and iPad can't compete with the 3GS' speed, because they have more pixels to paint.

My guess is, that Apple has full hardware acceleration for the HTML5 Canvas tag somewhere in their roadmap for iOS, so that the larger screen size of the iPhone 4 and iPad won't matter anymore. It will only get faster.

## Targeting Different Devices

You can use Impacts [ig.ua.*](documentation-class-reference-ig-core.md#ig-ua) properties to check for particular devices. `ig.ua `can be used as soon as the main `impact.js `file is loaded.

With this, you can, for instance, start the game with different resolutions, depending on the device it is running on:

```

if( ig.ua.mobile ) {
	// Disable sound for all mobile devices
	ig.Sound.enabled = false;
}

if( ig.ua.iPhone4 ) {
	// The iPhone 4 has more pixels - we'll scale the
	// game up by a factor of 4
	ig.main('#canvas', MyGame, 60, 160, 160, 4);
}
else if( ig.ua.mobile ) {
	// All other mobile devices
	ig.main('#canvas', MyGame, 60, 160, 160, 2);
}
else {
	// Desktop browsers
	ig.main('#canvas', MyGame, 60, 240, 160, 2);
}

```

If you want to provide a different HTML file for each device, you can do so with a simple `index.php `. This example assumes you have an `index-iphone.html `, `index-ipad.html `and `index-desktop.html `file in the same directory.

```

<?php
if( preg_match('/iphone|android/i', $_SERVER['HTTP_USER_AGENT']) ) {
	include('index-iphone.html');
}
else if( preg_match('/ipad/i', $_SERVER['HTTP_USER_AGENT']) ) {
	include('index-ipad.html');
}
else {
	include('index-desktop.html');
}
?>

```

## Always Render in the Native Resolution

If one pixel on your Canvas does not directly correspond to one pixel of the device's screen the whole Canvas has to be scaled by the browser before being shown – which is extremely slow.

Most mobile browser support the `viewport `meta tag. With this tag you can lock the zoom level of your page to `1 `, i.e. no zoom.

```

<meta name="viewport" content="width=device-width;
	initial-scale=1; maximum-scale=1; user-scalable=0;"/>

```

This already ensures that the Canvas is rendered in its native resolution.

Of course there is one exception: the iPhone 4 and the 4th. generation iPod Touch actually scale the page up by a factor of 2 if you specify a scaling of 1. Their displays have so many dots per inch that everything that is normally one pixel in size will be scaled up twice on these devices to appear in the same size. I.e. they have a *device pixel ratio *of 2.

If we scale up the Canvas twice for the iPhone 4 through the [ig.main()](documentation-class-reference-ig-core.md#main-function) function, it will be displayed larger than we wanted and will still not be rendered in its native resolution. We actually now have to scale the Canvas' display size (not the Canvas' internal resolution) down again with some CSS.

E.g. for a game with a native resolution of 160x160px, you would have the following calls to `ig.main() `:

```

if( ig.ua.iPhone4 ) {
	// The game's native resolution is 160x160. It will be
	// scaled up 4x for the iPhone4, resulting in a drawing
	// resolution of 640x640 px
	ig.main('#canvas', MyGame, 60, 160, 160, 4);
}
else {
	// For all other devices (including desktop browsers),
	// the game will be scaled up 2x, resulting in a drawing
	// resolution of 320x320 px
	ig.main('#canvas', MyGame, 60, 160, 160, 2);
}

```

And the following CSS:

```

#canvas {
	/* Remember, those 320 "px" will be displayed over 640 pixels
	on the iPhone 4's screen, that's why we have to render
	the game at 640x640 pixels. */

	width: 320px;
	height: 320px;
}

```

Here's a complete HTML file that works well on all iOS devices. This is essentially the HTML that is used for [Biolab Disaster](http://playbiolab.com). It also defines four buttons that can be bound to game actions via. [ig.input.bindTouch()](documentation-class-reference-input.md#bindtouch). You can download the image file that is used for these buttons [here](http://playbiolab.com/media/iphone-buttons.png?).

```

<!DOCTYPE html>
<html>
<head>
	<title>Impact Game</title>
	<style type="text/css">
		html,body {
			background-color: #000;
			margin: 0;
			padding: 0;
			min-height: 416px;
			position: relative;
		}

		#canvas {
			width: 320px;
			height: 320px;
		}

		.button {
			background-image: url(media/iphone-buttons.png);
			background-repeat: no-repeat;
			width: 80px;
			height: 96px;
			position: absolute;
			bottom: 0px;

			-webkit-touch-callout: none;
			-webkit-user-select: none;
			-webkit-tap-highlight-color: rgba(0,0,0,0);
			-webkit-text-size-adjust: none;
		}
		#buttonLeft { left: 0; background-position: 0, 0; }
		#buttonRight { left: 80px; background-position: -80px, 0; }
		#buttonShoot { right: 80px; background-position: -160px, 0; }
		#buttonJump { right: 0px; background-position: -240px, 0; }
	</style>

	<meta name="viewport" content="width=device-width;
		initial-scale=1; maximum-scale=1; user-scalable=0;"/>

	<!-- This meta tag ensures that the toolbar at the bottom of the browser
		is hidden when this page is accessed frome the Home Screen. -->
	<meta name="apple-mobile-web-app-capable" content="yes" />

	<!-- The icon that should be used when added to the Home Screen -->
	<link rel="apple-touch-icon" href="media/touch-icon.png"/>

	<script type="text/javascript" src="lib/impact/impact.js"></script>
	<script type="text/javascript" src="lib/game/game.js"></script>
</head>

<!-- This will scroll the viewport, so that the navigation bar is no longer visible -->
<body onload="setTimeout(function(){window.scrollTo(0,0);},1);">
	<div id="game">
		<canvas id="canvas"></canvas>
		<div class="button" id="buttonLeft"></div>
		<div class="button" id="buttonRight"></div>
		<div class="button" id="buttonShoot"></div>
		<div class="button" id="buttonJump"></div>
	</div>
</body>
</html>

```

You can also use another meta tag to specify how the iPhone's status bar should be displayed:

```

<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

```

## Use as Few Draw Calls as Possible

Each *draw call *has significant performance implications. You should limit your draw call to as few as possible. If you ever worked with OpenGL or Direct3D, this won't come to you as a surprise.

A *draw call *is basically any invocation of the Canvas API that draws anything. In Impact, most of these calls to the API are done through `ig.Image's `[.drawTile()](documentation-class-reference-image.md#drawtile) method. It is used everywhere: Animations use it to draw the current animation frame and BackgroundMaps use it draw each tile of the map from their tileset.

Because BackgroundMaps, by default, need one draw call for each tile that is being displayed, they are easily the largest performance hog.

Luckily BackgroundMaps come with a special mode that pre-renders the map into large chunks. This way the engine only has to render one or two chunks for each frame, instead of several hundred tiles.

You can enable this mode at any time (usually right after loading a level) through the [.preRender](documentation-class-reference-backgroundmap.md#prerender) property. E.g.:

```

// in your ig.Game subclass
loadLevel: function( level ) {
	this.parent( level );

	// Enable the pre-rendered background mode for all
	// mobile devices
	if( ig.ua.mobile ) {
		for( var i = 0; i < this.backgroundMaps.length; i++ ) {
			this.backgroundMaps[i].preRender = true;
		}
	}
}

```

Note that you will lose all background animations if you use the this mode.

If you make use of particles that have no gameplay implications (i.e. are only there to look pretty) you should limit their number on mobile platforms.

The `.kill() `method for the Blob enemy in Biolab Disaster for instance looks like this:

```

kill: function() {
	// Limit number of gibs on mobile platforms
	var gibs = ig.ua.mobile ? 5 : 30;

	for( var i = 0; i < gibs; i++ ) {
		ig.game.spawnEntity( EntityBlobGib, this.pos.x, this.pos.y );
	}
	this.parent();
},

```

## Sound

As of now, all mobile platforms struggle to play HTML5 audio. On iOS you can get one single sound to play at a time, but there are still bugs that currently make it impossible to pre-load a sound file.

Your best bet is to disable sound completely on these platforms. This also has the benefit, that you don't need to load sound files (which oftentimes are quite large) at all.

You can disable sound globally with the [ig.Sound.enabled](documentation-class-reference-sound.md#ig-sound-enabled) property.

```

// Disable all sounds for mobile devices
if( ig.ua.mobile ) {
 ig.Sound.enabled = false;
}

// Start the game
ig.main(…)

```
