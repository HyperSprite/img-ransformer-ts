# Image Transformation Library API and docs

Entry point:
```js
lib.tFImageData(imageData, category, option, cb);
```

Returns an ImageData object. 

**ImageData** is an interface from the JavaScript Canvas 2d Context. 

> Note: ImageData is not natively supported in Node.js, because there is no DOM. It can be imported via node-canvas.If you are really looking for image data manipulation, I recommend [node-canvas](https://github.com/Automattic/node-canvas) (uses locally installed Cairo and Pango), mentioned above, [Filterous](https://github.com/girliemac/filterous-2) (uses node-canvas) [Jimp](https://github.com/oliver-moran/jimp) (no native dependencies, browser and node), or really, anything else.

The ImageData shape is as follows:

```js
width: 3 // number - Count of pixels left to right (not the number of array elements).
height: 1 // number - Count of pixels from top to bottom.
data: Uint8ClampedArray [ 255, 0, 0, 255, 124, 0, 0, 255, 64, 0, 0, 255 ]
//             One pixel| R, G, B, Alpha| Next pixel    |... and so on.
// This example image would be three pixels wide and one pixel high
```
Every four elements represents one pixel and all of the elements are in a single flat array. All values are stored as unsigned integers between 0 and 255. The Uint8ClampedArray Typed Array assures no values fall outside this range, if they do, they are rounded to fit.

**category** is the type of transformation.

Current options are:

* ```rgb``` : RGB is a set of single pass individual pixel manipulations without moving any of them. This is used for greyscale transformations. 
* ```transition``` : Transition are pixel moving transformations. It involves chunking up the array into 4 element arrays before moving them and then flattening them back into a single dimension.

**option** is the sub transformation.
* RGB
 * ```greyscale_lightness``` : Greyscale Lightness takes the Max and Min values of the RGB.
 * ```greyscale_average``` : Greyscale Average derives the average of the RGB values.
 * ```greyscale_luminosity``` : Greyscale Luminosity uses a Blue bias when calculating the RGB.
 * ```greyscale_red_filter``` : Greyscal Red Filter uses a Red bias, ideal for for landscapes.
 * ```tint_vintage_filter``` : Tint Vintage uses the Greyscale Average values and then boosts R and G.  
 * ```reload_image``` : Reload passes all of the pixels through unmodified.


* Transition
 * ```flip``` : Reverses the order of the [RGBA] sets to flip the image.
 * ```rotate``` : Rotates the [RGBA] sets 90 degrees.
