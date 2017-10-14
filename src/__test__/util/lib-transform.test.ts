import lib from '../../util/lib-transform';
// import libLgt from '../../util/lib-light';
// import libRGB from '../../util/lib-rgb-filter';
// import libTr from '../../util/lib-transition';
import tD from './test-data';

// describe('lib.optionValuesRGB returns an array of options for libRGB.rgbFilter.', () => {
//   it('should expect \'Red filter\'', () => {
//     expect(lib.optionValuesRGB().toString()).toContain(
//       // tslint:disable-next-line
//       {"key": "greyscale_red_filter", "text": "Grayscale Red Filter", "value": "greyscale_red_filter"}
//     );
//   });
// });

describe('lib.transform various failures.', () => {
  it('lib.checkOptions, invalid checkOption name, should expect "testDefaultOption"', () => {
    expect(lib.checkOptions('testCat', 'testOption', 'testDefaultOption'))
      .toBe('testDefaultOption');
  });
  it('lib.checkOptions, valid category, invalid checkOption name, should expect "defaultOption"', () => {
    expect(lib.checkOptions('lights', 'testOption', 'testDefaultOption'))
      .toBe('testDefaultOption');
  });
  it('lib.checkOptions, lights category and darken_plus_one should expect "darken_plus_one"', () => {
    expect(lib.checkOptions('lights', 'darken_plus_one', 'testDefaultOption'))
      .toBe('darken_plus_one');
  });
  it('lib.checkOptions, transitions category and rotate should expect "rotate"', () => {
    expect(lib.checkOptions('transitions', 'rotate', 'testDefaultOption'))
      .toBe('rotate');
  });

  it('lib.transform, no parmaeters passed should expect "error" via callback check', () => {
    expect(lib.transform())
      .toMatchObject(tD.errorNoCallback);
  });
  it('lib.transform, incorrect category and option, will pass imageData right through', () => {
    expect(lib.transform(tD.imageArraySquare, 'foo', 'baz', ((cb: any) => cb)))
      .toMatchObject(tD.imageArraySquare);
  });
});


