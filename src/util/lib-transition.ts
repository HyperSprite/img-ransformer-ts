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
  const rowArr = [];
  const width = imageData.width;
  const height = imageData.height;
  const data = imageData.data;

  let n = data.length;
  // console.log(' start n --- ', n);
  for (let i = 0; i < height; i += 1) {
    rowArr[i] = data.slice(n - width,  n);
    n -= width;
    // console.log(' start n --- ', n, i);
  }
  for (let i = 0; i < height; i += 1) {
    for (let j = 0; j < width; j += 1) {
      resArr.push(rowArr[i][j]);
    }
  }
  return { width, height, data: resArr };
};

/** 
 * Rotates an Array
 */
libTr.rotate = (imageData: iImageData) => {
  const resArr = [];
  const rowArr = [];
  const width = imageData.width;
  const height = imageData.height;
  const data = imageData.data;

  let n = data.length;
  for (let i = 0; i < height; i += 1) {
    rowArr[i] = data.slice(n - width,  n);
    n -= width;
  }

  for (let i = 0; i < width; i += 1) {
    for (let j = 0; j < height; j += 1) {
      resArr.push(rowArr[j][i]);
    }
  }
  return { data: resArr, width: height, height: width };
};

libTr.transitions = {
  flip: 'flip',
  rotate: 'rotate',
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
  const opt = libTr.transitions[option] || 'rotate';

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
