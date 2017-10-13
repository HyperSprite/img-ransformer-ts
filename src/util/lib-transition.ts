import _ from 'lodash';

const libTr = <any>{};

interface iImageData {
  width: number;
  height: number;
  data: [number];
}

/**
 * Flip an Array
 */
libTr.flip = (imageData: iImageData) => {
  const resArr = [];
  const width = imageData.width;
  const height = imageData.height;
  const data = imageData.data;
  for (let h = height - 1; h >= 0; h -= 1) {
    for (let w = 0; w < width; w += 1) {
      resArr.push(data[h * width + w]);
    }
  }
  return { width, height, data: resArr };
};

/** 
 * Rotates an Array
 * 
 * See notes in readme.md about this new version
 */
libTr.rotate = (imageData: iImageData) => {
  const resArr = [];
  const width = imageData.width;
  const height = imageData.height;
  const data = imageData.data;
  for (let w = 0; w < width; w += 1) {
    for (let h = height - 1; h >= 0; h -= 1) {
      resArr.push(data[h * width + w]);
    }
  }
  return { data: resArr, width: height, height: width };
};


libTr.transitions = {
  flip: 'flip',
  rotate: 'rotate',
};


libTr.checkObjTransitions = (checkProp: string) => {
  let result = false;
  const answer = libTr.transitions.hasOwnProperty(checkProp);
  if (answer) {
    result = libTr.transitions[checkProp];
  }
  return result;
};
/**
 *  Transition creates an array of [[RGBA]]
 *    so each pixle can be manipulated as a unit
 *    then uses 'option' to slect the transition method.
 */
libTr.handleTransition = (imageData: iImageData, option: string, callback: any) => {
  /**
   * Test for option, defaults to rotate.
   */
  
  const opt = libTr.checkObjTransitions(option) || 'rotate';

  /** Takes flat array and creates 2 dimensional 4 element array */
  const arrOfRGBs = _.chunk(imageData.data, 4);
  /** Uses 'option' to pick transitoin method */
  const imgArr = libTr[opt]({ width: imageData.width, height: imageData.height, data: arrOfRGBs });
  /** Creates a new ImageData, from Canvas 2d context */
  const newImage = new ImageData(imgArr.width, imgArr.height);
  /** Flattens the returned array and sets it to newImage */
  newImage.data.set(_.flatten(imgArr.data));
  return callback(newImage);
};

/**
 * This Mock is here because there is no Canvas in node.
 * It is simulating an ImageData type that would come out of
 * Canvas.context
 */
libTr.handleTransitionMock = (imageData: any, option: string, callback: any) => {
  /** Takes flat array and creates 2 dimensional 4 element array */
  const arrOfRGBs = _.chunk(imageData.data, 4);
  /** Uses 'option' to pick transitoin method */
  const imgArr = libTr[option]({ width: imageData.width, height: imageData.height, data: arrOfRGBs });
  /** Creates a new ImageData, from scratch */
  /** Flattens the returned array and sets it to newImage */
  const newImage = {
    data: _.flatten(imgArr.data),
    width: imgArr.width,
    height: imgArr.height,
  };
  return callback(newImage);
};

export default libTr;
