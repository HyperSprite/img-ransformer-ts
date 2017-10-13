import lib from '../../util/lib-transform';
import testData from './test-data';

describe('lib.optionValuesRGB returns an array of options for libRGB.rgbFilter.', () => {
  it('should expect \'Red filter\'', () => {
    expect(lib.optionValuesRGB().toString()).toContain(
      // tslint:disable-next-line
      {"key": "greyscale_red_filter", "text": "Grayscale Red Filter", "value": "greyscale_red_filter"}
    );
  });
});

describe('lib.transform various failures.', () => {
  it('No parmaeters passed should expect "error" via callback check', () => {
    expect(lib.transform())
      .toMatchObject(testData.errorNoCallback);
  });
  it('No parmaeters passed should expect "error" via callback check', () => {
    expect(lib.transform(testData.imageArraySquare, 'foo', 'baz', ((cb: any) => cb)))
      .toMatchObject(testData.imageArraySquare);
  });
});


