import lib from '../../util/lib';

describe('lib.rgbValue test for valid RGB number', () => {

  it('should return true for 0', () => {
    expect(lib.rgbValue(0)).toBe(true);
  });
  it('should return true for 255', () => {
    expect(lib.rgbValue(255)).toBe(true);
  });
  it('should return false for -1', () => {
    expect(lib.rgbValue('r')).toBe(false);
  });
  it('should return false for 256', () => {
    expect(lib.rgbValue('r')).toBe(false);
  });
  it('should return false for "r"', () => {
    expect(lib.rgbValue('r')).toBe(false);
  });
});

describe('lib.rgbToGrayscale converts an array containing RGB to Grayscale based on options', () => {

  it('args ([246, 64, 10], \'lightness\') should expect 251 using \'lightness\'', () => {
    expect(lib.rgbToGrayscale([246, 64, 10], 'lightness')).toBe(251);
  });
  it('args ([126, 126, 126], \'average\') should expect 125 using \'average\'', () => {
    expect(lib.rgbToGrayscale([126, 126, 126], 'average')).toBe(126);
  });
  it('args ([49, 87, 35], \'luminosity\')should expect 75 using \'luminosity\'', () => {
    expect(lib.rgbToGrayscale([49, 87, 35], 'luminosity')).toBe(75);
  });
  it('args ([87, 49, 35]), \'redfilter\') should expect 75 using \'redfilter\'', () => {
    expect(lib.rgbToGrayscale([87, 49, 35], 'redfilter')).toBe(75);
  });
  it('args ([49, 87, 35]<no option>) should expect 75 using luminosity', () => {
    expect(lib.rgbToGrayscale([49, 87, 35])).toBe(75);
  });
  it('args ([87, 49, 35], \'nofilter\') should expect -1, \'noFilter\' is invalid', () => {
    expect(lib.rgbToGrayscale([87, 49, 35], 'nofilter')).toBe(-1);
  });
  it('args ([49, 87]<no option>) should expect -1', () => {
    expect(lib.rgbToGrayscale([49, 87])).toBe(-1);
  });
  it('args (49, 38, 27, \'average\') should expect -1', () => {
    expect(lib.rgbToGrayscale(49, 38, 27, 'avereage')).toBe(-1);
  });
  it('args (27, \'average\') should expect -1', () => {
    expect(lib.rgbToGrayscale(27, 'avereage')).toBe(-1);
  });
  it('args (\'someString\', \'average\') should expect -1', () => {
    expect(lib.rgbToGrayscale('someString', 'avereage')).toBe(-1);
  });
});
