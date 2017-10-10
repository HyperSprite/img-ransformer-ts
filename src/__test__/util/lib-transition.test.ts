import testData from './test-data';
import libTr from '../../util/lib-transition';

export interface iTestImageObject {
  width: number;
  height: number;
  data: [ [number,number,number, number] ];
}

describe('libTransition transforms the pixle map based on options', () => {
  it('libTr.flip, dataArraySquare flips once, returns matching object', () => {
    expect(testData.loopCount(testData.dataArraySquare, libTr.flip, 1))
      .toMatchObject(testData.dataArraySquareOneFlip);
  });

  it('libTr.flip, dataArrayOffset flips twice, returns matching object', () => {
    expect(testData.loopCount(testData.dataArrayOffset, libTr.flip, 2))
      .toMatchObject(testData.dataArrayOffset);
  });

  it('libTr.rotate will rotate one time and return match to input array', () => {
    expect(testData.loopCount(testData.dataArraySquare, libTr.rotate, 1))
      .toMatchObject(testData.dataArraySquareOneRotate);
  });

  it('libTr.rotate will rotate four times and return match to input array', () => {
    expect(testData.loopCount(testData.dataArraySquare, libTr.rotate, 4))
      .toMatchObject(testData.dataArraySquare);
  });

  it('libTr.rotate will rotate one time and return match to input array', () => {
    expect(testData.loopCount(testData.dataArrayOffset, libTr.rotate, 1))
      .toMatchObject(testData.dataArrayOffsetOneRotate);
  });

  it('handleTransition rotate testImageArraySquare expect ', () => {
    const testImageArrayOffset = testData.imageArrayOffset;
    expect(libTr.handleTransitionMock(testImageArrayOffset, 'rotate', ((cb: any) => cb)))
      .toMatchObject(testData.imageArrayOffsetOneRotate);
  });
});
