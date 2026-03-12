# Getting Started

## Installation

While games written with Impact *should *work offline, most browsers wont allow them to. These browser deny access to certain functions, due to their faulty same origin policy (a file in `file://game/lib/ `is not considered to be in the same "domain" as a file in `file://game/ `). Opera is a notable exception to this.

Also, the Weltmeister level editor uses some .php scripts to load an save levels and list directory contents.

Long story short: you need a webserver. And by webserver I don't mean a separate server computer, but just a program on your computer to serve web pages. If you are using MacOSX, you already have a webserver and PHP installed and just need to enable it. On Windows you can install Apache and PHP; it's not that complicated. If you're using Linux, you should be nerd enough to figure this one out by yourself :)

The [XAMMP](http://www.apachefriends.org/en/xampp.html) project is awesome to have a webserver working in no time. It comes with a bit of bloat that you won't really need for Impact, but that's totally okay.

If you want to install Apache and PHP manually and need some help, please ask google:

- [install Apache and PHP on Windows](http://www.google.com/search?q=windows+apache+php)
- [enable Apache and PHP on OSX](http://www.google.com/search?q=osx+apache+php)

So you have your webserver and PHP running now, right? Good! Now just unpack Impact into the webserver's root directory and point your browser to [http://localhost/](http://localhost/). You should see a directory listing, including your just created `impact/ `subdirectory. Try loading Weltmeister through [http://localhost/impact/weltmeister.html](http://localhost/impact/weltmeister.html). It should load without any errors.

If there are error messages, you should see them in your browsers console. Read on if you don't know where to find the error console.

**Other Solutions **

- For Windows users, Microsoft's [PHP on Windows](http://www.microsoft.com/web/platform/phponwindows.aspx) is supposed to be pretty good.
- Amadeus' [python-impact](https://github.com/amadeus/python-impact/) is a single file Python script that allows you to run Impact games and Weltmeister without installing a "real" webserver. Should run out-of-the-box on Mac.
- If you don't want to use PHP or Apache, Conner Petzold made a nodejs module that allows Impact to run on a node http server. His [node-impact](https://github.com/cpetzold/node-impact) module is on github.
- If you are using Windows and would like to develop with Impact on IIS and .NET rather than in Apache and PHP, check out the [ImpactJS-IIS-.NET-API project](http://code.google.com/p/impactjs-iis-backend/) by Mike Hamilton.
- For Ruby enthusiasts, Chris Darroch put together a Sinatra backend for Impact. Just remove the `.php `extensions for the API calls in your `lib/weltmeister/config.js `and fire up [impact.rb](https://github.com/chrisdarroch/impactrb).

## Setting Up you working environment

If you are building a game with Impact (or anything in the browser really) the browser's developer tools and JavaScript consoles come in handy. If you don't use them you will to be in the dark when something isn't working.

- In **Google Chrome **you can get to the console by clicking the *Wrench Icon -> Tools -> JavaScript console *.
- In **Safari **you first have to enable the *Developer *menu: Open Safari's Preferences through *Safari -> Preferences *, go the the *Advanced *Tab and check *Show Develop menu in menu bar *. After that, you can open the console through *Develop -> Show Error Console *.
- For **Firefox **, please install the awesome [Firebug](http://getfirebug.com/) extension. You can however get to a basic error console through *Extras -> Error console *.
- In **Opera **you can find the developer tools in *Menu -> Page -> Developer Tools -> Opera Dragonfly *.
- If you are using **Internet Explorer **, consider using another browser. Impact runs on IE9, but it's a bit slow. You can get to the developer tools by pressing F12.

Now you just need a text editor to edit your source files. If you are masochistic, even Windows Notepad will work. An editor with Syntax Highlighting will make your life easier, though.

I'm using [Komodo Edit](http://www.activestate.com/komodo-edit), which basically is the free version of Komodo IDE. Despite it's name, Komodo Edit is still an IDE of sorts. It pretty awesome and runs on Windows, MacOSX and Linux.

If you just want a lightweight editor, I can recommend [SciTE](http://www.scintilla.org/SciTE.html) for Windows and Linux. It also runs on MacOSX, but it's a bit of a hassle to set it up.

For MacOSX, I hear that [BBEdit](http://www.barebones.com/products/bbedit/index.html) and [TextMate](http://macromates.com/) are "the best" editors around. I also used [Smultron](http://smultron.sourceforge.net/) for some time, which is now discontinued, but still great.

These are just some recommendations, based on my personal experience. Don't trust me. Feel free to look around and try different editors and IDEs.

## Directory Structure

After having installed Impact you should have the following directory structure:

```

media/
lib/
lib/game/
lib/game/entities/
lib/game/levels/
lib/impact/
lib/weltmeister/

```

All of your games resources, such as images, sounds and music, should go in the `media/ `directory.

The `lib/ `directory hosts all JavaScript files. `lib/impact/ `hosts the Impact engine itself, `lib/weltmeister/ `hosts all sources for the level editor. Your own game source files should go into `lib/game/ `and the source files for your entities should go into `lib/game/entities/ `, so Weltmeister can find them.

## HTML Files

Games written with Impact run directly in the browser. There's no plugin needed anywhere. However, since JavaScript itself has no facilities to display anything, Impact needs an HTML page with a `<canvas> `tag in which it can render the game screen.

The most basic HTML page looks like this:

```

<!DOCTYPE html>
<html>
<head>
	<title>My Awesome Game!</title>
	<script type="text/javascript" src="lib/impact/impact.js"></script>
	<script type="text/javascript" src="lib/game/game.js"></script>
</head>
<body>
	<canvas id="canvas"></canvas>
</body>
</html>

```

This page can of course be extended with further content (text, links. images...) just like any other HTML page. It can also be *styled *using CSS. I really can't go into the details here as this is a huge topic on its own. But this basic HTML page is really everything you need for your game to work.

Note that only two JavaScript files are referenced by this HTML page: The engine and your main game script. All other JavaScript files will be automatically *included *from within these two files.

Before releasing your game you can also *bake *all your JavaScript together into one (compressed) file. This will shorten the initial loading time for your game. For development purposes however, it is best to keep your files separated to have a better overview. See [Baking](documentation-baking.md) for more info.

All images and sound files needed for your game will be loaded dynamically through JavaScript as well. Impact's Preloader ensures that all resources are loaded, before your game is started.

Impact comes with a default `index.html `for your game that loads the `lib/game/game.js `file.

The `weltmeister.html `loads the editor. See the introduction to the [Weltmeister Editor](documentation-weltmeister.md) for more info.

## Modules

JavaScript itself does not provide an `include() `function, that loads other JavaScript source files. You could write your own `include() `function that uses AJAX to load files, but this would make your game rather impossible to debug, because all line numbers and file names will get lost and error messages would state little more than *"Error in anonymous()" *.

Instead, Impact's source code is organized into modules. A module definition typically looks like this:

```

ig.module(
 'game.my-file'
)
.requires(
 'impact.game',
 'impact.image',
 'game.other-file'
)
.defines(function(){

 // code for this module

});

```

The module name `'game.my-file' `directly corresponds to the filename. So this module sits in `lib/game/my-file.js `. Similarly, the modules listed in the `.requires() `method will be loaded from `lib/impact/game.js `, `lib/impact/image.js `and `lib/game/other-file.js `respectively. These *required *files will be loaded, before the module's body - the function passed to `.defines() `- is executed. You can read a bit more about modules in the [ig Core](documentation-class-reference-ig-core.md#module-definition) reference.

## How Impact Works

The Impact Engine, at it's heart, is not a library but a framework. What this means, is that Impact provides a fully functional box, where you can throw your code in. Impact runs on its own. You just add your stuff to it, and it will be managed by the Engine as well.

"Your stuff", in most cases, are sub-classes of one of Impact's base classes. The most important one is the [ig.Entity](documentation-class-reference-entity.md) class. Every object in the game world has to be a sub-class of `ig.Entity `.

As soon as you start your game, Impact will set up an interval that calls the `ig.system.run() `method 60 times per second. This method does some housekeeping stuff and then calls your game's `.run() `method - which, by default, just calls `.update() `and `.draw() `on itself.

The [ig.Game](documentation-class-reference-game.md)'s `.draw() `method is pretty boring: it just clears the screen and calls `.draw() `on each background layer and entity.

The `.update() `method updates the background layer positions and - this is where it gets interesting - calls `.update() `on each entity. The default `.update() `method of an entity moves it according to it's physics properties (position, velocity, bounciness...) and takes the game's collision map into account.

After all entities have been updated, the game's `.checkEntities() `method is called. This resolves all *dynamic *collisions - that is, *Entity vs. Entity *collisions. It also calls an entities `.check() `method, if it overlaps with another entity and "wants" checks (see the [Class Reference](documentation-class-reference-entity.md) for more details).

You can overwrite any of these methods in your own `ig.Entity `and `ig.Game `sub-classes - you can provide your own logic and then, if you want, call the original methods with `this.parent() `.

Remember, this all is happening for each and every frame. That is (if the browser can keep up) 60 times per second.
