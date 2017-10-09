const lib = <any>{};

export type RGB = [ number, number, number ];

export interface iRGBFilter {
  [key: string]: Function;
}

/**
 * rgbToGrayscale uses math from the Gimp RGB to Grayscale help docs
 * options match lightness, average, and luminosity.
 * see https://docs.gimp.org/2.8/en/gimp-tool-desaturate.html
 * red_filter and vintage_filter are my own creation.
 * these filters only act on pixels RGB value.
 * Note, when adding new filters '_' will be replaced by ' ' for select.
 */

const rgbFilter: iRGBFilter = {
  greyscale_lightness: (rgb: RGB) => {
    const grey = Math.floor((Math.max(rgb[0], rgb[1], rgb[2]) + Math.min(rgb[0], rgb[1], rgb[2]) / 2));
    return [grey, grey, grey];
  },
  greyscale_average: (rgb: RGB) => {
    const grey = Math.floor((rgb[0] + rgb[1] + rgb[2]) / 3);
    return [grey, grey, grey];
  },
  greyscale_luminosity: (rgb: RGB) => {
    const grey = Math.floor((0.21 * rgb[0]) + (0.72 * rgb[1]) + (0.07 * rgb[2]));
    return [grey, grey, grey];
  },
  greyscale_red_filter: (rgb: RGB) => {
    const grey = Math.floor((0.72 * rgb[0]) + (0.21 * rgb[1]) + (0.07 * rgb[2]));
    return [grey, grey, grey];
  },
  greyscale_vintage_filter: (rgb: RGB) => {
    const grey = (Math.max(rgb[0], rgb[1], rgb[2]) + Math.min(rgb[0], rgb[1], rgb[2]) / 2);
    return [Math.floor(grey * 0.89), Math.floor(grey * 0.84), Math.floor(grey * 0.75)];
  },
  reload_image: (rgb: RGB) => {
    return rgb;
  },
};

/**
 * Takes a string and returns all words with 
 *   first letter Cap and spaces replace underscores
 */
const capAndSplit = (word: string) => {
  return word.split('_').map(wd => wd.charAt(0).toUpperCase() + wd.slice(1)).join(' ');
};
/**
 * rgbFilterValues is to return an array of options for the rgbFilter Select.
 * Form: [{ key: 'red_filter', value: 'red_filter', text: 'Red filter' }] 
 */

lib.rgbFilterValues = () => Object.keys(rgbFilter).map((gF) => {
  return { key: gF, value: gF, text: capAndSplit(gF) };
});
/** 
 * returns false if supplied number is out of range or not a number
 */
lib.rgbValue = (num: number) => {
  return (typeof num === 'number' && !isNaN(num) && (num >= 0) && (num <= 255));
};

/**
 * Takes [R,G,B] and filter option (defaults to 'luminosity')
 *   and returns a sigle number value between 0 and 255.
 * Returns -1 on any error
 */
lib.rgbToGrayscale = (rgb: RGB, option = 'reload_image') => {
  let result = -1;
  
  /**
   * Checks to see if first argument is an array with values
   *   that match rgbValue function
   */
  if (
    !rgb ||
    !Array.isArray(rgb) ||
    rgb.length !== 3 ||
    !rgb.every(color => lib.rgbValue(color))
  ) return result;
  /**
   * Checks the 'option' is valid
   * Runs fuction from rgbFilter and rounds down result. 
   */
  if ({}.hasOwnProperty.call(rgbFilter, option)) {
    // result = Math.floor(rgbFilter[option](rgb));
    result = rgbFilter[option](rgb);
  }

  return result;
};


/**
 * This does Greyscal conversions expeting a Canvas ImageData stype format
 * as in:
 * {
 *   width: number,
 *   height: number,
 *   data: Uint8ClampedArray,
 * }
 *   Does not use the bitwise operators or Typed Array buffers.
 */
lib.walkRGBImageArray = (newImage: ImageData, option: string, callback: any) => {
  const data = newImage.data;
  for (let i = 0; i < data.length; i += 4) {
    const rgb = lib.rgbToGrayscale([data[i], data[i + 1], data[i + 2]], option);
    data[i] = rgb[0];
    data[i + 1] = rgb[1];
    data[i + 2] = rgb[2];
  }
  return callback(newImage);
};

lib.handleRGBFilter = (imageData: ImageData, option: string, callback: any) => {
  const width = imageData.width;
  const height = imageData.height;
  const newImage = new ImageData(width, height);
  newImage.data.set(imageData.data);
  
  const result = lib.walkRGBImageArray(newImage, option, callback);
  
  return callback(result);
};



/**
 *  TODO
 *  This is so full of broken. First, it fails testing returning:
 *    RangeError: byte length of Uint32Array should be a multiple of 4
 *      at new Uint32Array (native)
 *  Also, it appears to work but it is actually returning some kind of 
 *    negative set of values. It is seems to be processing the pixels
 *    themselves correctly but not necessarily in the right order or something.
 *    Also, it does not appear to be an Endian issue since the alpha channel
 *    is in the right spot. Need to come back to this after some research.
 */
lib.forGreyscalewUint32 = (newImage: any, option: string, callback: any) => {
  const d = newImage.data;
  const buf = new ArrayBuffer(newImage.data.length);
  const buf8 = new Uint8ClampedArray(buf);
  const data = new Uint32Array(buf);

  let j = 0;
  for (let i = 0; i < newImage.data.length; i += 4) {
    const grey = lib.rgbToGrayscale([d[i], d[i + 1], d[i + 2]], option);
    /**          Alpha      |  Red         |  Green       |  Blue */
    data[j] = (255 << 24) | (grey << 16) | (grey <<  8) | grey;
    j += 1; // Advance current increment
  }
  newImage.data.set(buf8);
  return callback(newImage);
};

/**
 * This Mock is here because there is no Canvas in node.
 * It is simulating an ImageData type that would come out of
 * Canvas.context
 */
lib.handleRGBFilterMock = (imageData: any, option: string, callback: any) => {
  const newImage = imageData;
  newImage.data.set(imageData.data);
  const result = lib.walkRGBImageArray(imageData, option, callback);
  
  return callback(result);
};

export default lib;
