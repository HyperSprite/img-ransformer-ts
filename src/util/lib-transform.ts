import libRGB from './lib-rgb-filter';
import libTr from './lib-transition';

const lib = <any>{};

/**
 * Transform is the main entry point for this lib.
 */

lib.transoform = (imageData: ImageData, category: string, option: string, cb: any)  => {
  /** Here we need to test our args for validity */
  switch (category) {
    case ('rgb'):
      return libRGB.handleRGBFilter(imageData, option, cb);
    case ('transition'):
      return libTr.handleTransition(imageData, option);
  }
};

export default lib;
