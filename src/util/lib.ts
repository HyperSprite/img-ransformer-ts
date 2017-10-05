const lib = <any>{};

export type RGB = [ number, number, number ];

export interface GrayFilter {
  [key: string]: Function;
}
/**
 * rgbToGrayscale uses math from the Gimp RGB to Grayscale help docs
 * options match lightness, average, and luminosity.
 * see https://docs.gimp.org/2.8/en/gimp-tool-desaturate.html
 * red_filter is my own creation.
 * these filters only act on pixels RGB value.
 * Note, when adding new filters '_' will be replaced by ' ' for select.
 */

const grayFilter: GrayFilter = {
  lightness: ((rgb: RGB) => (Math.max(rgb[0], rgb[1], rgb[2]) + Math.min(rgb[0], rgb[1], rgb[2]) / 2)),
  average: (rgb: RGB) => (rgb[0] + rgb[1] + rgb[2]) / 3,
  luminosity: (rgb: RGB) => ((0.21 * rgb[0]) + (0.72 * rgb[1]) + (0.07 * rgb[2])),
  red_filter: (rgb: RGB) => ((0.72 * rgb[0]) + (0.21 * rgb[1]) + (0.07 * rgb[2])),
};

/**
 * Takes a string and returns it with first letter Cap and spaces replace underscores
 */
const capAndSplit = (word: string) => {
  return `${word.charAt(0).toUpperCase()}${word.slice(1).split('_').join(' ')}`;
};
/**
 * grayFilterValues is to return an array of options for the grayFilter Select.
 * Form: [{ key: 'red_filter', value: 'red_filter', text: 'Red filter' }] 
 */

lib.grayFilterValues = () => Object.keys(grayFilter).map((gF) => {
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
lib.rgbToGrayscale = (rgb: RGB, option = 'luminosity'): number => {
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
   * Runs fuction from grayFilter and rounds down result. 
   */
  if ({}.hasOwnProperty.call(grayFilter, option)) {
    result = Math.floor(grayFilter[option](rgb));
  }

  return result;
};

export default lib;
