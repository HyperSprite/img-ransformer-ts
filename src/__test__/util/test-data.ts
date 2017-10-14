const testData = <any>{};


  // tslint:disable-next-line max-line-length
testData.imageArray = {
  data: [255,4,0,255,255,18,0,255,255,28,0,255,255,32,0,255,255,31,0,255,255,24,0,255,255,12,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,253,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,255,0,255,255,247,0,255,255,217,0,255,255,181,0,255,255,137,0,255,255,92,0,255,255,50,0,255,255,7,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,9,255,255,0,48,255,255,0,85,255,255,0,123,255,255,0,162,255,255,0],
  width: 50,
  height: 50,
};

testData.dataArraySquare = {
  data: [
    [1, 2, 3, 4],[5, 6, 7, 8],[9, 10, 11, 12],[13, 14, 15, 16],
  ],
  width: 2,
  height: 2,
};

testData.dataArraySquareOneFlip = {
  data: [
    [9, 10, 11, 12],[13, 14, 15, 16],[1, 2, 3, 4],[5, 6, 7, 8],
  ],
  width: 2,
  height: 2,
};

testData.dataArraySquareOneRotate = {
  data: [
    [9, 10, 11, 12], [1, 2, 3, 4], [13, 14, 15, 16], [5, 6, 7, 8],
  ],
  width: 2,
  height: 2,
};

testData.dataArrayOffset = {
  data: [
    [1, 2, 3, 4],[5, 6, 7, 8],[9, 10, 11, 12],[13, 14, 15, 16],[17, 18, 19,20],[21, 22, 23, 24],
  ],
  width: 2,
  height: 3,
};

testData.dataArrayOffsetOneFlip = {
  data: [
    [17, 18, 19,20],[21, 22, 23, 24],[9, 10, 11, 12],[13, 14, 15, 16],[1, 2, 3, 4],[5, 6, 7, 8],
  ],
  width: 2,
  height: 3,
};

testData.dataArrayOffsetOneRotate = {
  data: [
    [17, 18, 19,20],[9, 10, 11, 12],[1, 2, 3, 4],[21, 22, 23, 24],[13, 14, 15, 16],[5, 6, 7, 8],
  ],
  width: 3,
  height: 2,
};

testData.imageArraySquare = {
  data: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
  ],
  width: 2,
  height: 2,
};

testData.imageArraySquareOneRotate = {
  data: [
    9, 10, 11, 12, 1, 2, 3, 4, 13, 14, 15, 16, 5, 6, 7, 8,
  ],
  width: 2,
  height: 2,
};

testData.imageArrayOffset = {
  data: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,20, 21, 22, 23, 24,
  ],
  width: 2,
  height: 3,
};

testData.imageArrayOffsetOneRotate = {
  data: [
    17, 18, 19, 20, 9, 10, 11, 12, 1, 2, 3, 4, 21, 22, 23, 24, 13, 14, 15, 16, 5, 6, 7, 8,
  ],
  width: 3,
  height: 2,
};

testData.errorNoCallback = {
  error: 'no callback function found',
},

testData.testCategory = {
  testCat: testData.testCatagoryFunction,
};

testData.testOptions = {
  testOption: 'testOptionFunction',
  testDefaultOption: 'testDefaultOptionFuncation',
};

testData.testCategories = {
  testCatagoryFunction: (imageData: ImageData) => imageData,
};

// testImageFunction: (imageData: iImageData) => imageData,
testData.testOptionObj = {
  testOptionFunction: (image: {}) => image,
  testDefaultOptionFuncation: (image: {}) => image,
},

testData.loopCount = (data: any, inputFunc: any, count: number) => {
  let loopData = data;
  for (let i = 0; i < count; i += 1) {
    loopData = inputFunc(loopData);
  }
  return loopData;
};

export default testData;
