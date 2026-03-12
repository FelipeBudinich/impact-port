# Baking

So you have finished your game and want to show it to the internets? Great! However, before you do so, you should pack all your source files together into one big file. This will shorten the initial loading time for your visitors **a lot **.

Impact comes with a PHP script that does the packing for you. You can call this script from the command line, or if you are on Windows double click the `bake.bat `in the `tools/ `directory. On MacOSX open a terminal window, navigate into the `tools/ `directory and write `./bake.sh `.

If you get an error message, make sure all the paths are correct. You can open the `bake.bat `or `bake.sh `with a text editor. The only two lines you should ever need to change are these:

```

SET GAME=lib/game/main.js

SET OUTPUT_FILE=game.min.js

```

The `GAME `variable should point to your game's main .js file (the one you load in the <script> tag of the .html page).

`OUTPUT_FILE `determines where the *baked *script file will be written.

On Windows you also have to make sure that the `bake.bat `can find the `php.exe `on your system. You can either add the installation path of PHP to your `PATH `environment variable ( [ask google](http://www.google.com/search?q=windows+add+php+path)) or edit the `bake.bat `to point directly to your `php.exe `.

If the script finishes without errors, you can find the `game.min.js `(or whatever you set it to in the `bake.bat `) in your Impact directory. You can now load this one .js file in your .html instead of the two files you had previously.

E.g. change this

```

<script type="text/javascript" src="lib/impact/impact.js"></script>
<script type="text/javascript" src="lib/game/main.js"></script>

```

to this

```

<script type="text/javascript" src="game.min.js"></script>

```

The `game.min.js `is then the only source file you'll have to upload or distribute.
