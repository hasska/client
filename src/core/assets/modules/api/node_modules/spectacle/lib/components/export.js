"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _slides = require("../utils/slides");

var _reactEmotion = _interopRequireDefault(require("react-emotion"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StyledExport =
/*#__PURE__*/
(0, _reactEmotion.default)("div", {
  target: "e1i58j6t0"
})("height:100%;width:100%;");

var Export =
/*#__PURE__*/
function (_Component) {
  _inherits(Export, _Component);

  function Export() {
    _classCallCheck(this, Export);

    return _possibleConstructorReturn(this, (Export.__proto__ || Object.getPrototypeOf(Export)).apply(this, arguments));
  }

  _createClass(Export, [{
    key: "_renderSlides",
    value: function _renderSlides() {
      var _this = this;

      return this.props.slideReference.map(function (reference, index) {
        var slide = (0, _slides.getSlideByIndex)(_this.props.slides, _this.props.slideReference, index);
        return (0, _react.cloneElement)(slide, {
          key: index,
          slideIndex: index,
          export: _this.props.route.params.indexOf('export') !== -1,
          print: _this.props.route.params.indexOf('print') !== -1,
          transition: [],
          transitionIn: [],
          transitionOut: [],
          transitionDuration: 0
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement(StyledExport, null, this._renderSlides());
    }
  }]);

  return Export;
}(_react.Component);

exports.default = Export;
Export.propTypes = {
  route: _propTypes.default.object,
  slideReference: _propTypes.default.array,
  slides: _propTypes.default.array
};
Export.contextTypes = {
  styles: _propTypes.default.object
};