import libLgt from './lib-light';
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

lib.category = {
  lights: libLgt.lights,
  rgbs: libRGB.rgbFilter,
  transitions: libTr.transitions,
};

 /** For checking if an optin exists,
  *   If no defaultOption and checkOption does not exist on the filter object
  *     returns string 'noOption', can be used to test if an option is availible.
  *   If an option is on the filter object, it is tested to make sure it is a function:
  *     true, returns the function name.
  *     false, returns default option.
  */
lib.checkOptions = (category: string, checkOption: string, defaultOption: string) => {
  let apiOptionCheck = defaultOption || 'noOption';
  apiOptionCheck = category || 'noCategory';
  
  const answer = lib.category[category].hasOwnProperty(checkOption);
  return (answer && typeof [category][checkOption] === 'function') ? 
  lib.category[checkOption][checkOption] : apiOptionCheck;
};

lib.optionValues = (category: string) => Object.keys(lib.category[category]).map((oV) => {
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
  console.log('swtich', category);
  switch (category) {
    
    case ('lights'):
      return libLgt.handleLight(imageData, option, cb);
    case ('rgbs'):
      return libRGB.handleRGBFilter(imageData, option, cb);
    case ('transitions'):
      return libTr.handleTransition(imageData, option, cb);
    default :
      console.log({ error: 'transform: invalid category' });
      return cb(imageData, { error: 'transform: invalid category' });
  }
};

export default lib;
