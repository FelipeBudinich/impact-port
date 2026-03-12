# Class Reference Timer

Defined in Module **impact.timer **, inherits from [ig.Class](documentation-class-reference-class.md)

## Synopsis

```

var timer = new ig.Timer();

// Difference between current time and the time .set()
timer.delta(); // => 0

// Set the timer to 5 seconds in the future
timer.set( 5 );
timer.delta(); // => -5

// ... one second later
timer.delta(); // => -4

// ... 5 more seconds later
timer.delta(); // => 1

```

## Description

The `ig.Timer `has two distinct modes of operation. You can either get the difference ( [.delta()](#delta)) between the current time and the timers *target *time (as set by the [constructor](#new-ig-timer) or [.set()](#set)) or just get the current *tick *- the time since the last call to [.tick()](#tick).

All timers are only updated **once **for each frame. So calling `.delta() `on one timer several times during one frame, will result in the exact same return value.

`ig.Timer `**does not measure real time **, but game time. Game time can progress slower than the real time, when the browser can't keep up with executing the game loop several times (default 20) per second. See [ig.Timer.maxStep](#ig-timer-maxstep).

How fast the game time progresses is also depended on the global [ig.Timer.timeScale](#ig-timer-timescale) property.

Be aware, that all time intervals are in seconds, as opposed to JavaScripts milliseconds.

## Constructor

### new ig.Timer( [seconds] )

- `seconds `Relative *target *time. Default `0 `.

## Methods

### .delta()

Returns the time in seconds relative to the timers *target *time. See [.set()](#set).

If the *target *time is in the future, the return value of this function will be negative (e.g. `-5 `for 5 seconds in the future). If the target time is in the past, the return value will be positive. It essentially returns the time "since" the *target *time.

If you, for instance, want to measure how long the player took to finish a level of your game, just create a new timer when the level starts and call `.delta() `when the level ends.

```

// at level start
var playTimer = new ig.Timer(); // no "target" time given = NOW.

// ... at level end
var timeNeeded = playTimer.delta();

// reset the timer at the start of the next level
playTimer.reset();

```

### .pause()

*New in 1.20 *

Pauses the timer. Calling `.delta() `for paused timers will always return the same value. `.tick() `will return `0 `.

Calling `.unpause() `, `.set() `or `.reset() `unpauses the timer.

### .unpause()

*New in 1.20 *

Resumes a paused timer.

### .reset()

Reset the starting time for this timer. This does **not **reset the *target *time.

```

var timer = new ig.Timer( 5 );

// ... one second later
timer.delta(); // => -4

timer.reset();
timer.delta(); // => -5

```

### .set( [seconds] )

Resets the starting time for this timer **and **sets the relative *target *time. Default `0 `.

```

var timer = new ig.Timer( 5 );

// ... one second later
timer.delta(); // => -4

timer.set( 3 );
timer.delta(); // => -3

```

### .tick()

Get the time since the last call to .tick() for this timer. Note that, since `ig.Timer `represents game time, it does **not **update during a single frame. E.g.:

```

var timer = new ig.Timer();

timer.tick(); // => 0
doSomethingVeryComplicatedThatTakesAFewSeconds( andBlocksEverything );
timer.tick(); // => 0

```

A global *tick *, updated each frame, is also provided at `ig.system.tick `.

## Global properties

### ig.Timer.maxStep

The max time step. The game time will never advance more than this per frame. The default is `0.05 `, which equals a minimum frame rate of 20 fps. If the browser is unable to run at at least 20 fps, the game is essentially slowed down.

### ig.Timer.timeScale

Game time factor. With a value of `0.5 `the game will run in slow motion, with `2 `it will run at twice the speed. The default is `1 `.
