"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.countSlides = exports.isMagicSlide = exports.getRootIndex = exports.getSlideByIndex = void 0;

var _react = require("react");

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _reduce = _interopRequireDefault(require("lodash/reduce"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getSlideByIndex = function getSlideByIndex(children, slideReference, index) {
  children = _react.Children.toArray(children);
  var slide;
  var reference = slideReference[index];

  if (reference) {
    if (!(0, _isUndefined.default)(reference.magicIndex)) {
      slide = (0, _react.cloneElement)(children[reference.rootIndex], {
        magicIndex: reference.magicIndex
      });
    } else if ((0, _isUndefined.default)(reference.setIndex)) {
      slide = children[reference.rootIndex];
    } else {
      var setChildren = _react.Children.toArray(children[reference.rootIndex].props.children);

      slide = setChildren[reference.setIndex];
    }
  }

  return slide;
};

exports.getSlideByIndex = getSlideByIndex;

var getRootIndex = function getRootIndex(slideReference, index) {
  var reference = slideReference[index];
  return reference.rootIndex;
};

exports.getRootIndex = getRootIndex;

var isMagicSlide = function isMagicSlide(slideReference, index) {
  var reference = slideReference[index];
  return !(0, _isUndefined.default)(reference.magicIndex);
};

exports.isMagicSlide = isMagicSlide;

var countSlides = function countSlides(children) {
  return (0, _reduce.default)(_react.Children.toArray(children), function (count, child) {
    count += child.props.hasSlideChildren ? _react.Children.toArray(child.props.children).length : 1;
    return count;
  }, 0);
};

exports.countSlides = countSlides;