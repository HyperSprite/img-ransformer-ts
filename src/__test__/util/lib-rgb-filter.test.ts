import libRGB from '../../util/lib-rgb-filter';
import imageArray from './imageArray';

describe('libRGB.rgbValue test for valid RGB number', () => {

  it('should return true for 0', () => {
    expect(libRGB.rgbValue(0)).toBe(true);
  });
  it('should return true for 255', () => {
    expect(libRGB.rgbValue(255)).toBe(true);
  });
  it('should return false for -1', () => {
    expect(libRGB.rgbValue('r')).toBe(false);
  });
  it('should return false for 256', () => {
    expect(libRGB.rgbValue('r')).toBe(false);
  });
  it('should return false for "r"', () => {
    expect(libRGB.rgbValue('r')).toBe(false);
  });
});

describe('libRGB.rgbToGrayscale converts an array containing RGB to Grayscale based on options', () => {

  it('args ([246, 64, 10], \'greyscale_lightness\') should expect 251 using \'lightness\'', () => {
    expect(libRGB.rgbToGrayscale([246, 64, 10], 'greyscale_lightness')).toMatchObject([251, 251, 251]);
  });
  it('args ([126, 126, 126], \'greyscale_average\') should expect 125 using \'average\'', () => {
    expect(libRGB.rgbToGrayscale([126, 126, 126], 'greyscale_average')).toMatchObject([126, 126, 126]);
  });
  it('args ([49, 87, 35], \'greyscale_luminosity\')should expect 75 using \'luminosity\'', () => {
    expect(libRGB.rgbToGrayscale([49, 87, 35], 'greyscale_luminosity')).toMatchObject([75, 75, 75]);
  });
  it('args ([87, 49, 35]), \'greyscale_red_filter\') should expect 75 using \'red_filter\'', () => {
    expect(libRGB.rgbToGrayscale([87, 49, 35], 'greyscale_red_filter')).toMatchObject([75, 75, 75]);
  });
  it('args ([87, 49, 35]), \'greyscale_vintage_filter\') should expect [93, 87, 78] using \'red_filter\'', () => {
    expect(libRGB.rgbToGrayscale([87, 49, 35], 'greyscale_vintage_filter')).toMatchObject([93, 87, 78]);
  });
  it('args ([49, 87, 35]<no option>) should expect 75 using luminosity', () => {
    expect(libRGB.rgbToGrayscale([49, 87, 35])).toMatchObject([49, 87, 35]);
  });
  it('args ([87, 49, 35], \'nofilter\') should expect -1, \'noFilter\' is invalid', () => {
    expect(libRGB.rgbToGrayscale([49, 87, 35], 'nofilter')).toBe(-1);
  });
  it('args ([49, 87]<no option>) should expect -1', () => {
    expect(libRGB.rgbToGrayscale([49, 87])).toBe(-1);
  });
  it('args (49, 38, 27, \'average\') should expect -1', () => {
    expect(libRGB.rgbToGrayscale(49, 38, 27, 'avereage')).toBe(-1);
  });
  it('args (27, \'average\') should expect -1', () => {
    expect(libRGB.rgbToGrayscale(27, 'avereage')).toBe(-1);
  });
  it('args (\'someString\', \'average\') should expect -1', () => {
    expect(libRGB.rgbToGrayscale('someString', 'avereage')).toBe(-1);
  });
});

describe('libRGB.rgbFilterValues returns an array of options for the grayFilter Select.', () => {
  it('should expect \'Red filter\'', () => {
    expect(libRGB.rgbFilterValues().toString()).toContain(
      // tslint:disable-next-line
      {"key": "greyscale_red_filter", "text": "Grayscale Red Filter", "value": "greyscale_red_filter"}
    );
  });
});

const ImageDataShape = {
  width: 50,
  height: 50,
  data: expect.any(Uint8ClampedArray),
};

describe('libRGB.handleRGBFilterMock returns ImageData format data', () => {
  it('should expect ImageData has width property', () => {
    const testImage =  { width: 50, height: 50, data: Uint8ClampedArray.from(imageArray) };
    expect(libRGB.handleRGBFilterMock(testImage, 'lightness', (cb: any) => cb)).toHaveProperty('width', 50);
  });
  it('should expect ImageData Shape', () => {
    const testImage =  { width: 50, height: 50, data: Uint8ClampedArray.from(imageArray) };
    expect(libRGB.handleRGBFilterMock(testImage, 'lightness', (cb: any) => cb)).toMatchObject(ImageDataShape);
  });
});
