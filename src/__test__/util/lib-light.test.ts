import testData from './test-data';
import libLgt from '../../util/lib-light';

export interface iTestImageObject {
  width: number;
  height: number;
  data: [ [number,number,number, number] ];
}

describe('libLight alters the pixle map brightness based on options', () => {
  it('libLgt.rotate will vignette one time and return match to input array', () => {
    expect(testData.loopCount(testData.dataArrayOffset, libLgt.lighten, 1))
      .toMatchObject(testData.dataArrayOffset);
  });
});
