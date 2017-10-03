"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib = {};
const grayFilter = {
    lightness: ((rgb) => (Math.max(rgb[0], rgb[1], rgb[2]) + Math.min(rgb[0], rgb[1], rgb[2]) / 2)),
    average: (rgb) => (rgb[0] + rgb[1] + rgb[2]) / 3,
    luminosity: (rgb) => ((0.21 * rgb[0]) + (0.72 * rgb[1]) + (0.07 * rgb[2])),
    redfilter: (rgb) => ((0.72 * rgb[0]) + (0.21 * rgb[1]) + (0.07 * rgb[2])),
};
lib.rgbValue = (num) => {
    return (typeof num === 'number' && !isNaN(num) && (num >= 0) && (num <= 255));
};
lib.rgbToGrayscale = (rgb, option = 'luminosity') => {
    let result = -1;
    if (!rgb ||
        !Array.isArray(rgb) ||
        rgb.length !== 3 ||
        !rgb.every(color => lib.rgbValue(color)))
        return result;
    if ({}.hasOwnProperty.call(grayFilter, option)) {
        result = Math.floor(grayFilter[option](rgb));
    }
    return result;
};
exports.default = lib;
//# sourceMappingURL=lib.js.map