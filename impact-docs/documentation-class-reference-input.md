# Class Reference Input

Defined in Module **impact.input **, inherits from [ig.Class](documentation-class-reference-class.md)

## Synopsis

```

// On game start
ig.input.bind( ig.KEY.UP_ARROW, 'jump' );

// In your game's or entity's update() method
if( ig.input.pressed('jump') ) {
	this.vel.y = -100;
}

```

## Description

`ig.Input `handles all Keyboard and Mouse input.

You can bind keys to specific *actions *and then ask if one of these actions is currently held down ( [.state()](#state)) or was just pressed down after the last frame ( [.pressed()](#pressed)).

Note that an instance of `ig.Input `is automatically created at `ig.input `(lowercase) by the `ig.main() `function.

## Properties

### .accel.x, .accel.y, .accel.z

*New in 1.18 *

Current acceleration of the device in m/s². This will be `0 `for devices that don't have an accelerometer.

Call [.initAccelerometer()](#initaccelerometer) to start capturing accelerometer input.

### .mouse.x, .mouse.y

Position of the mouse cursor on your game screen in pixels. Note that this position is only updated when at least one mouse button is bound to an action.

If you haven't bound any mouse button, you can call [.initMouse()](#initmouse) yourself once, to start capturing mouse input.

## Methods

### .bind( key, action )

Bind a Keyboard or Mouse button to an action. `action `is a string or integer, identifying the action in your game. Call this function for each button and action pair at the start of your game.

`key `can be anything of [ig.KEY.*](#mouse-and-keyboard-button-names).

Several buttons can be bound to the same action, but a button can **not **be bound to several actions.

```

// Binds both, UP_ARROW and SPACE, to the same action
ig.input.bind( ig.KEY.UP_ARROW, 'jump' );
ig.input.bind( ig.KEY.SPACE, 'jump' );

```

### .bindTouch( selector, action )

*Note: this is a bit cumbersome to use. Consider using the [TouchButton plugin](http://impactjs.com/ejecta/integrating-impact-games) instead, as it will work in Mobile Browsers as well as in Ejecta. *

Bind an HTML element to issue the specified `action `when the element is *touched *. This will only work for devices that implement the `touchstart `and `touchend `events - currently iOS and Android devices.

The element specified by the `selector `must already be present. It will not be created by Impact. `selector `can only be an id-selector; e.g. `'#button' `.

```

// Bind the <div id="button1"></div> element to the "jump" action
ig.input.bindTouch( '#button1', 'jump' );

```

### .initAccelerometer()

*New in 1.18 *

Start capturing accelerometer input. The acceleration will be available at [.accel.x, .accel.y, .accel.z](#accel-x-accel-y-accel-z). This will be ignored for devices that don't have an accelerometer.

### .initMouse()

Start capturing mouse input. The current mouse position will be available at [.mouse.x, .mouse.y](#mouse-x-mouse-y).

This method is automatically called as soon as one of the mouse buttons has been bound.

### .pressed( action )

Returns `true `if one of the buttons bound to the specified `action `was just pressed down, `false `otherwise.

In contrast to [.state()](#state), this method only returns `true `once for each button press. You can use this for example if you want the user to repeatedly press a button to shoot instead of having "autofire".

### .released( action )

*New in 1.19 *

Returns `true `if one of the buttons bound to the specified `action `was just released, `false `otherwise.

### .state( action )

Returns `true `if one of the buttons bound to the specified `action `is currently pressed down, `false `otherwise.

### .unbind( key )

Unbind a Keyboard or Mouse button from its current action.

`key `can be anything of `ig.KEY.* `. See below for a list.

### .unbindAll()

Unbind all Keyboard, Mouse and Touch buttons.

## Mouse and Keyboard button names

```

ig.KEY.MOUSE1
ig.KEY.MOUSE2
ig.KEY.MWHEEL_UP
ig.KEY.MWHEEL_DOWN

ig.KEY.BACKSPACE
ig.KEY.TAB
ig.KEY.ENTER
ig.KEY.PAUSE
ig.KEY.CAPS
ig.KEY.ESC
ig.KEY.SPACE
ig.KEY.PAGE_UP
ig.KEY.PAGE_DOWN
ig.KEY.END
ig.KEY.HOME
ig.KEY.LEFT_ARROW
ig.KEY.UP_ARROW
ig.KEY.RIGHT_ARROW
ig.KEY.DOWN_ARROW
ig.KEY.INSERT
ig.KEY.DELETE
ig.KEY._0
ig.KEY._1
ig.KEY._2
ig.KEY._3
ig.KEY._4
ig.KEY._5
ig.KEY._6
ig.KEY._7
ig.KEY._8
ig.KEY._9
ig.KEY.A
ig.KEY.B
ig.KEY.C
ig.KEY.D
ig.KEY.E
ig.KEY.F
ig.KEY.G
ig.KEY.H
ig.KEY.I
ig.KEY.J
ig.KEY.K
ig.KEY.L
ig.KEY.M
ig.KEY.N
ig.KEY.O
ig.KEY.P
ig.KEY.Q
ig.KEY.R
ig.KEY.S
ig.KEY.T
ig.KEY.U
ig.KEY.V
ig.KEY.W
ig.KEY.X
ig.KEY.Y
ig.KEY.Z
ig.KEY.NUMPAD_0
ig.KEY.NUMPAD_1
ig.KEY.NUMPAD_2
ig.KEY.NUMPAD_3
ig.KEY.NUMPAD_4
ig.KEY.NUMPAD_5
ig.KEY.NUMPAD_6
ig.KEY.NUMPAD_7
ig.KEY.NUMPAD_8
ig.KEY.NUMPAD_9
ig.KEY.MULTIPLY
ig.KEY.ADD
ig.KEY.SUBSTRACT
ig.KEY.DECIMAL
ig.KEY.DIVIDE
ig.KEY.F1
ig.KEY.F2
ig.KEY.F3
ig.KEY.F4
ig.KEY.F5
ig.KEY.F6
ig.KEY.F7
ig.KEY.F8
ig.KEY.F9
ig.KEY.F10
ig.KEY.F11
ig.KEY.F12
ig.KEY.SHIFT
ig.KEY.CTRL
ig.KEY.ALT
ig.KEY.PLUS
ig.KEY.COMMA
ig.KEY.MINUS
ig.KEY.PERIOD

```
