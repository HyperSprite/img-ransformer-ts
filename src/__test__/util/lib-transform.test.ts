import lib from '../../util/lib-transform';
import testData from './test-data';

// describe('lib.optionValuesRGB returns an array of options for libRGB.rgbFilter.', () => {
//   it('should expect \'Red filter\'', () => {
//     expect(lib.optionValuesRGB().toString()).toContain(
//       // tslint:disable-next-line
//       {"key": "greyscale_red_filter", "text": "Grayscale Red Filter", "value": "greyscale_red_filter"}
//     );
//   });
// });

describe('lib.transform various failures.', () => {
  it('lib.checkOptions, no category, no option: should expect "noOption"', () => {
    expect(lib.checkOptions())
      .toBe('noCategory');
  });
  
  it('lib.checkOptions, invalid option should expect "noOption"', () => {
    expect(lib.checkOptions(testData.someCategory))
      .toBe('noOption');
  });
  it('lib.checkObj, valid checkOption name, no defaultOption, should expect', () => {
    expect(lib.checkObj(''));
  });

  it('No parmaeters passed should expect "error" via callback check', () => {
    expect(lib.transform())
      .toMatchObject(testData.errorNoCallback);
  });
  it('No parmaeters passed should expect "error" via callback check', () => {
    expect(lib.transform(testData.imageArraySquare, 'foo', 'baz', ((cb: any) => cb)))
      .toMatchObject(testData.imageArraySquare);
  });
});


