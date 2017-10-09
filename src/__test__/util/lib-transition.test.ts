import libTr from '../../util/lib-transition';

describe('libTransition transforms the pixle map based on options', () => {
  const rotateArrayInData = { data: [[1, 2, 3, 4],[5, 6, 7, 8],[9, 10, 11, 12],[13, 14, 15, 16]], width: 2, height: 2 };
  const rotateArrayOutData = { data: [9, 10, 11, 12, 1, 2, 3, 4, 13, 14, 15, 16, 5, 6, 7, 8], width: 2, height: 2 };
  it('rotateArray args ({data: [1, 2, 3...], width: 3, height: 3}, rotate) should expect [13, 9, 5...]', () => {
    expect(libTr.rotateArray(rotateArrayInData)).toMatchObject(rotateArrayOutData);
  });

  const flipArrayInData = { data: [[1, 2, 3, 4],[5, 6, 7, 8],[9, 10, 11, 12],[13, 14, 15, 16]], width: 2, height: 2 };
  const flipArrayOutData = { data: [9, 10, 11, 12, 13, 14, 15, 16, 1, 2, 3, 4, 5, 6, 7, 8], width: 2, height: 2 };
  it('flipArray args ({data: [1, 2, 3...], width: 3, height: 3}, rotate) should expect [13, 9, 5...]', () => {
    expect(libTr.flipArray(flipArrayInData)).toMatchObject(flipArrayOutData);
  });

  const transitionArrayInData = {
    data: Uint8ClampedArray.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]),
    width: 2,
    height: 2,
  };
  const transitionArrayOutData = {
    data: Uint8ClampedArray.from([9, 10, 11, 12, 1, 2, 3, 4, 13, 14, 15, 16, 5, 6, 7, 8]),
    width: 2,
    height: 2,
  };
  it('handleTransition args ({data: [1, 2, 3...], width: 3, height: 3}, rotate) should expect [13, 9, 5...]', () => {
    expect(libTr.handleTransitionMock(transitionArrayInData, 'rotate'))
      .toMatchObject(transitionArrayOutData);
  });
});

