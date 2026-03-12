# Drop Source Code

This is the source code for the [Drop Demo Game](http://impactjs.com/drop).

You can download a complete package with all images, sounds, the .html file and the Impact Game Engine on your [personal download page](http://impactjs.com/download), after you've purchased a license.

An interesting aspect of the game is the LCD look that is *generated *from the source images when the game is loaded. E.g. the [sprite for the bouncing ball](http://impactjs.com/drop/media/player.png?) is just 4x4 px in size.

```

ig.module(
	'drop'
)
.requires(
	'impact.game',
	'impact.entity',
	'impact.collision-map',
	'impact.background-map',
	'impact.font'
)
.defines(function(){

// The Backdrop image for the game, subclassed from ig.Image
// because it needs to be drawn in it's natural, unscaled size,
FullsizeBackdrop = ig.Image.extend({
	resize: function(){ /* Do Nothing */ },
	draw: function() {
		if( !this.loaded ) { return; }
		ig.system.context.drawImage( this.data, 0, 0 );
	}
});

// The Collectable Coin Entity
EntityCoin = ig.Entity.extend({
	size: {x:6, y:6},
	offset: {x:-1, y:-1},
	animSheet: new ig.AnimationSheet( 'media/coin.png', 4, 4 ),
	type: ig.Entity.TYPE.B,

	sound: new ig.Sound('media/coin.ogg'),

	init: function( x, y, settings ) {
		this.addAnim( 'idle', 0.1, [0,1] );
		this.parent( x, y, settings );
	},

	update: function() {
		this.parent();
		if( this.pos.y - ig.game.screen.y < -32 ) {
			this.kill();
		}
	},

	pickup: function() {
		ig.game.score += 500;
		this.sound.play();
		this.kill();
	}
});

// The Bouncing Player Ball thing
EntityPlayer = ig.Entity.extend({
	size: {x:4, y:4},
	checkAgainst: ig.Entity.TYPE.B,

	animSheet: new ig.AnimationSheet( 'media/player.png', 4, 4 ),

	maxVel: {x: 50, y: 300},
	friction: {x: 600, y:0},
	speed: 300,
	bounciness: 0.5,
	sound: new ig.Sound('media/bounce.ogg'),

	init: function( x, y, settings ) {
		this.addAnim( 'idle', 0.1, [0] );
		this.parent( x, y, settings );
	},

	update: function() {
		// User Input
		if( ig.input.state('left') ) {
			this.accel.x = -this.speed;
		}
		else if( ig.input.state('right') ) {
			this.accel.x = this.speed;
		}
		else {
			this.accel.x = 0;
		}

		this.parent();
	},

	handleMovementTrace: function( res ) {
		if( res.collision.y && this.vel.y > 32 ) {
			this.sound.play();
		}
		this.parent(res);
	},

	check: function( other ) {
		// The 'other' entity must be a coin, because we
		// only have two entity types (coins and the player)
		other.pickup();
	}
});

// A Custom Loader for the game, that, after all images have been
// loaded, goes through them and "pixifies" them to create the LCD
// effect.
DropLoader = ig.Loader.extend({
	end: function() {
		for( i in ig.Image.cache ) {
			var img = ig.Image.cache[i];
			if( !(img instanceof FullsizeBackdrop) ) {
				this.pixify( img, ig.system.scale );
			}
		}
		this.parent();
	},

	// This essentially deletes the last row and collumn of pixels for
	// each upscaled pixel.
	pixify: function( img, s ) {
		var ctx = img.data.getContext('2d');
		var px = ctx.getImageData(0, 0, img.data.width, img.data.height);

		for( var y = 0; y < img.data.height; y++ ) {
			for( var x = 0; x < img.data.width; x++ ) {
				var index = (y * img.data.width + x) * 4;
				var alpha = (x % s == 0 || y % s == 0) ? 0 : 0.9;
				px.data[index + 3] = px.data[index + 3] * alpha;
			}
		}
		ctx.putImageData( px, 0, 0 );
	}
});

// The actual Game Source
DropGame = ig.Game.extend({
	clearColor: '#c7e300',
	gravity: 240,
	player: null,

	map: [],
	score: 0,
	speed: 1,

	tiles: new ig.Image( 'media/tiles.png' ),
	backdrop: new FullsizeBackdrop( 'media/backdrop.png' ),
	font: new ig.Font( 'media/04b03.font.png' ),
	gameOverSound: new ig.Sound( 'media/gameover.ogg' ),

	init: function() {
		ig.system.smoothPositioning = false;

		ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
		ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
		ig.input.bind(ig.KEY.ENTER, 'ok');

		// The first part of the map is always the same
		this.map = [
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,1,1,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
		];

		// Now randomly generate the remaining rows
		for( var y = 8; y < 18; y++ ) {
			this.map[y] = this.getRow();
		}

		// The map is used as CollisionMap AND BackgroundMap
		this.collisionMap = new ig.CollisionMap( 8, this.map );
		var bgmap = new ig.BackgroundMap( 8, this.map, this.tiles );

		// Add the bgmap to the Game's array of BackgroundMaps
		// so it will be automatically drawn by .draw()
		this.backgroundMaps.push( bgmap );

		this.player = this.spawnEntity( EntityPlayer, 30, 16 );
	},

	getRow: function() {
		// Randomly generate a row of blocks for the map. This is a naive
		// approach, that sometimes leaves the player hanging with no
		// block to jump to. It's random after all.
		var row = [];
		for( var x = 0; x < 8; x++ ) {
			row[x] = Math.random() > 0.93 ? 1 : 0;
		}
		return row;
	},

	placeCoin: function() {
		// Randomly find a free spot for the coin, max 12 tries
		for( var i = 0; i < 12; i++ ) {
			var tile = (Math.random() * 8).ceil();
			if(
				this.map[this.map.length-1][tile] &&
				!this.map[this.map.length-2][tile]
			) {
				var y = (this.map.length-1) * 8;
				var x = tile * 8 + 1;
				this.spawnEntity( EntityCoin, x, y );
				return;
			}
		}
	},

	update: function() {
		if( ig.input.pressed('ok') ) {
			ig.system.setGame( DropGame );
		}

		if( this.gameOver ) {
			return;
		}

		this.speed += ig.system.tick * (10/this.speed);
		this.screen.y += ig.system.tick * this.speed;
		this.score += ig.system.tick * this.speed;

		// Do we need a new row?
		if( this.screen.y > 40 ) {

			// Move screen and entities one tile up
			this.screen.y -= 8;
			for( var i =0; i < this.entities.length; i++ ) {
				this.entities[i].pos.y -= 8;
			}

			// Delete first row, insert new
			this.map.shift();
			this.map.push(this.getRow());

			// Place coin?
			if( Math.random() > 0.5 ) {
				this.placeCoin();
			}
		}
		this.parent();

		// check for gameover
		var pp = this.player.pos.y - this.screen.y;
		if( pp > ig.system.height + 8 || pp < -32 ) {
			this.gameOver = true;
			this.gameOverSound.play();

		}
	},

	draw: function() {
		this.backdrop.draw();

		if( this.gameOver ) {
			this.font.draw( 'Game Over!', 32, 32, ig.Font.ALIGN.CENTER );
			this.font.draw( 'Press Enter', 32, 48, ig.Font.ALIGN.CENTER );
			this.font.draw( 'to Restart', 32, 56, ig.Font.ALIGN.CENTER );
		}
		else {
			for( var i = 0; i < this.backgroundMaps.length; i++ ) {
				this.backgroundMaps[i].draw();
			}

			for( var i = 0; i < this.entities.length; i++ ) {
				this.entities[i].draw();
			}
		}

		var s = this.score.floor().toString();
		this.font.draw( s, 62, 2, ig.Font.ALIGN.RIGHT );
	}
});

// Start the game - 30fps, 64x96 pixels, scaled up 5x
ig.main('#canvas', DropGame, 30, 64, 96, 5, DropLoader );

});

```
