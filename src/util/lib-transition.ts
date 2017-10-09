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

libTr.flipArray = (imageData: iImageData) => {
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
  for (let i = 0; i < height; i += 1) {
    for (let j = 0; j < height; j += 1) {
      resArr.push(rowArr[i][j]);
    }
  }
  return { data: _.flatten(resArr), width: height, height: width };
};

/** 
 * Rotates an Array
 */

libTr.rotateArray = (imageData: iImageData) => {
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
  for (let i = 0; i < height; i += 1) {
    for (let j = 0; j < height; j += 1) {
      resArr.push(rowArr[j][i]);
    }
  }

  return { data: _.flatten(resArr), width: height, height: width };
};


/**
 *  Transition creates an array of [[RGBA]]
 *    so they can be manipulated as a unit
 *    then uses 'option' to slect the transition option. 
 */

libTr.handleTransition = (imageData: iImageData, option: string) => {
  const arrOfRGBs = _.chunk(imageData.data, 4);
  const width = imageData.width;
  const height = imageData.height;

  const newImage = new ImageData(width, height);
  const imgArr = libTr.rotateArray({ width, height, data: arrOfRGBs });
  newImage.data.set(imgArr.data);
  return newImage;
};

/**
 * This Mock is here because there is no Canvas in node.
 * It is simulating an ImageData type that would come out of
 * Canvas.context
 */
libTr.handleTransitionMock = (imageData: any, option: string) => {
  const arrOfRGBs = _.chunk(imageData.data, 4);
  const width = imageData.width;
  const height = imageData.height;
  const newImage = imageData;
  const imgArr = libTr.rotateArray({ width, height, data: arrOfRGBs });
  newImage.data.set(imgArr.data);
  
  return newImage;

};

export default libTr;
