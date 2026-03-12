# Class Reference Font

Defined in Module **impact.font **, inherits from [ig.Image](documentation-class-reference-image.md)

## Synopsis

```

var font = new ig.Font( 'font.png' );
font.draw( 'Some text', x, y, ig.Font.ALIGN.RIGHT );

```

## Description

An `ig.Font `object loads a specially formatted font image and allows you to draw text with it.

`ig.Font `uses bitmap fonts – it draws glyphs from an image rather than using the Canvas APIs `.fillText() `method.

The bottommost line of pixels in a font image specifies the character widths for each single character. A run of non-transparent pixels represents a character and its width. Therefore all characters in a font image must be on one line.

You can use the [Font Tool](font-tool/) to generate a font image from any installed System Font.

## Constructor

### new ig.Font( filename )

- `filename `The path and name of the font image to be loaded.

Note that, similar to [ig.Image](documentation-class-reference-image.md), fonts are cached. That means that if you create two fonts with the same font image, the constructor returns the same instance. E.g.:

```

var font1 = new ig.Font( 'font.png' );
var font2 = new ig.Font( 'font.png' );

font1 == font2; // => true

```

## Properties

### .alpha

*New in 1.20 *

Specifies the alpha transparency of the font. The default is `1 `(fully opaque).

### .firstChar

The first ASCII character that is present in the font image. The default is `32 `(space).

### .height

*New in 1.16 *

The height of the font in pixels. This is equal to the source image's height-1 to account for the bottommost line of pixels.

### .letterSpacing

*New in 1.20 *

Horizontal spacing between individual characters when drawing text. A negative spacing is useful italic fonts, where the bounding boxes should overlap each other. The default is `1 `.

### .lineSpacing

*New in 1.20 *

Vertical spacing when drawing text with line breaks ( `\n `). The default is `1 `.

## Methods

### .draw( text, x, y, [align] )

This methods draws the string `text `at `x `, `y `.

The optional `align `parameter can be one of:

- `ig.Font.ALIGN.LEFT `
- `ig.Font.ALIGN.RIGHT `
- `ig.Font.ALIGN.CENTER `

If omitted, `LEFT `is assumed.

*New in 1.19 *

Line breaks ( `'\n' `) are now correctly honored and drawing continues `.height `pixels further down

### .heightForString( text )

*New in 1.20 *

Returns the height in pixels that the given text string has with this font. Useful for multi-line strings.

### .widthForString( text )

*New in 1.16 *

Returns the width in pixels that the given text string has with this font.
