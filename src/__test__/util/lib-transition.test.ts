import libTr from '../../util/lib-transition';

describe('libTransition transforms the pixle map based on options', () => {
  const rotateArrayInData = { data: [[1, 2, 3, 4],[5, 6, 7, 8],[9, 10, 11, 12],[13, 14, 15, 16]], width: 2, height: 2 };
  const rotateArrayOutData = { data: [13, 9, 5, 1, 14, 10, 6, 2, 15, 11, 7, 3, 16, 12, 8, 4], width: 2, height: 2 };
  it('rotateArray args ({data: [1, 2, 3...], width: 3, height: 3}, rotate) should expect [13, 9, 5...]', () => {
    expect(libTr.rotateArray(rotateArrayInData).toString()).toBe(rotateArrayOutData.toString());
  });
  const transitionArrayInData = { data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], width: 2, height: 2 };
  const transitionArrayOutData = { data: [13, 9, 5, 1, 14, 10, 6, 2, 15, 11, 7, 3, 16, 12, 8, 4], width: 2, height: 2 };
  it('handleTransition args ({data: [1, 2, 3...], width: 3, height: 3}, rotate) should expect [13, 9, 5...]', () => {
    expect(libTr.handleTransition(transitionArrayInData, 'rotate').toString()).toBe(transitionArrayOutData.toString());
  });
});

