import libRGB from './lib-rgb-filter';
import libTr from './lib-transition';

const lib = <any>{};

/**
 * Transform is the main entry point for this lib.
 */

 /**
 * Takes a string and returns all words with 
 *   first letter Cap and spaces replace underscores
 */
const capAndSplit = (word: string) => {
  return word.split('_').map(wd => wd.charAt(0).toUpperCase() + wd.slice(1)).join(' ');
};
/**
 * optionValues is to return an array of options for the rgbFilter Select.
 * Form: [{ key: 'red_filter', value: 'red_filter', text: 'Red filter' }] 
 */

lib.optionValuesRGB = () => Object.keys(libRGB.rgbFilter).map((oV) => {
  return { key: oV, value: oV, text: capAndSplit(oV) };
});

lib.optionValuesTransition = () => Object.keys(libTr.transitions).map((oV) => {
  return { key: oV, value: oV, text: capAndSplit(oV) };
});

lib.transform = (imageData: ImageData, category: string, option: string, cb: any)  => {
  /** 
   * Here we need to test our args for validity 
  */
  if (!(cb instanceof Function)) {
    console.log({ error: 'no callback function found' });
    return { error: 'no callback function found' };
  }
  
  if (
    imageData.width <= 0 ||
    imageData.height <= 0 ||
    !imageData ||
    !imageData.data ||
    imageData.data.length < 4 ||
    imageData.data[Symbol.species] === 'Uint8ClampedArray'
  ) {
    console.log({ error: 'transform - invalid ImageData format.' });
    return cb({ error: 'transform - invalid ImageData format.' });
  }

  switch (category) {
    case ('rgb'):
      return libRGB.handleRGBFilter(imageData, option, cb);
    case ('transition'):
      return libTr.handleTransition(imageData, option, cb);
    default :
      console.log({ error: 'transform: invalid category' });
      return cb(imageData, { error: 'transform: invalid category' });
  }
};

export default lib;
