import _ from 'lodash';

import lib from './lib-transform';

const libLgt = <any>{};

interface iImageData {
  width: number;
  height: number;
  data: [number];
}

libLgt.lighten_plus_two = (imageData: iImageData) => libLgt.shade(imageData, 1.2);

libLgt.lighten_plus_one = (imageData: iImageData) => libLgt.shade(imageData, 1.1);

libLgt.darken_plus_one = (imageData: iImageData) => libLgt.shade(imageData, 0.9);

libLgt.darken_plus_two = (imageData: iImageData) => libLgt.shade(imageData, 0.7);

libLgt.shade = (imageData: iImageData, percent: number) => {
  const resArr = [];
  const width = imageData.width;
  const height = imageData.height;
  const data = imageData.data;
  let n = 0;

  for (let i = 0; i < height; i += 1) {
    for (let j = 0; j < width; j += 1) {
      data[n][0] = data[n][0] * percent;
      data[n][1] = data[n][1] * percent;
      data[n][2] = data[n][2] * percent;
      resArr.push(data[n]);
      n += 1;
    }
  }
  return { width, height, data: resArr };
};

libLgt.vignette = (imageData: iImageData) => {
  const resArr = [];
  const width = imageData.width;
  const height = imageData.height;
  const data = imageData.data;
  let n = 0;
  let w = 0;
  let h = 0;

  for (let i = 0; i < height; i += 1) {
    for (let j = 0; j < width; j += 1) {
      if (j < width * 0.45) {
        w += 0.0055;
        data[n][0] = data[n][0] * 0.999 * w;
        data[n][1] = data[n][1] * 0.999 * w;
        data[n][2] = data[n][2] * 0.999 * w;
      }
      if (j > width * 0.45) {
        w -= 0.0055;
        data[n][0] = data[n][0] * 0.99 * w;
        data[n][1] = data[n][1] * 0.99 * w;
        data[n][2] = data[n][2] * 0.99 * w;
      }
      if (i < height * 0.20) {
        h += 0.005;
        data[n][0] = data[n][0] * .99 * h;
        data[n][1] = data[n][1] * .99 * h;
        data[n][2] = data[n][2] * .99 * h;
      }
      if (i > height * 0.80) {
        h -= 0.005;
        data[n][0] = data[n][0] * .99 * h;
        data[n][1] = data[n][1] * .99 * h;
        data[n][2] = data[n][2] * .99 * h;
      }
      

      resArr.push(data[n]);
      
      n += 1;
    }
  }
  return { width, height, data: resArr };
};

// const checkObj = (checkProp: string, defaultOption: string) => {
//   const answer = libLgt.lights.hasOwnProperty(checkProp);
//   return (answer && typeof libLgt[checkProp] === 'function') ? 
//   checkProp : defaultOption;
// };

libLgt.lights = {
  lighten_plus_one: 'lighten_plus_one',
  lighten_plus_two: 'lighten_plus_two',
  darken_plus_one: 'darken_plus_one',
  darken_plus_two: 'darken_plus_two',
  // vignette: 'vignette', // not ready for users
};

/**
 *  Transition creates an array of [[RGBA]]
 *    so each pixle can be manipulated as a unit
 *    then uses 'option' to slect the transition method.
 */
libLgt.handleLight = (imageData: iImageData, option: string, callback: any) => {
  /**
   * Test for option, defaults to darken_plus_two.
   */
  const categoryOption = lib.checkOptions('lights', option, 'darken_plus_two');
  /** Takes flat array and creates 2 dimensional 4 element array */
  const arrOfRGBs = _.chunk(imageData.data, 4);
  /** Uses 'option' to pick transitoin method */
  const imgArr = libLgt[categoryOption]({ width: imageData.width, height: imageData.height, data: arrOfRGBs });
  /** Creates a new ImageData, from Canvas 2d context */
  const newImage = new ImageData(imgArr.width, imgArr.height);
  /** Flattens the returned array and sets it to newImage */
  newImage.data.set(_.flatten(imgArr.data));
  return callback(newImage);
};

export default libLgt;
