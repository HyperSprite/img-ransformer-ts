import _ from 'lodash';

const libTr = <any>{};



interface iDataObj {
  width: number;
  height: number;
  data: [number];
}

/**
 * Flip an Array
 */

libTr.flipArray = (dataObj: iDataObj) => {
  const resArr = [];
  const rowArr = [];
  const width = dataObj.width;
  const height = dataObj.height;
  const data = dataObj.data;

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

libTr.rotateArray = (dataObj: iDataObj) => {
  const resArr = [];
  const rowArr = [];
  const width = dataObj.width;
  const height = dataObj.height;
  const data = dataObj.data;

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
  console.log(resArr);
  return { data: _.flatten(resArr), width: height, height: width };
};


/**
 *  Transition creates an array of [[RGBA]]
 *    so they can be manipulated as a unit
 *    then uses 'option' to slect the transition option. 
 */

libTr.handleTransition = (dataObj: iDataObj, option: string) => {
  const arrOfRGBs = [];
  const width = dataObj.width;
  const height = dataObj.height;
  const data = dataObj.data;
  const n = data.length;
  for (let i = 0; i < n; i += 4) {
    const rgb = [data[i], data[i + 1], data[i + 2], data[i + 3]];  
    arrOfRGBs.push(rgb);
  }
  const newImage = new ImageData(width, height);
  const imgArr = libTr.rotateArray({ width, height, data: arrOfRGBs });
  newImage.data.set(imgArr.data);
  // console.dir(newImage);
  return newImage;
};

export default libTr;
