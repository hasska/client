"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Notes =
/*#__PURE__*/
function (_Component) {
  _inherits(Notes, _Component);

  function Notes() {
    _classCallCheck(this, Notes);

    return _possibleConstructorReturn(this, (Notes.__proto__ || Object.getPrototypeOf(Notes)).apply(this, arguments));
  }

  _createClass(Notes, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _context = this.context,
          store = _context.store,
          parentSlide = _context.slideHash,
          updateNotes = _context.updateNotes;
      var currentSlide = store.getState().route.slide; // updateNotes is only defined when this component is wrapped in
      // a Presenter.
      // Also, the type of parentSlide is either string or number based
      // on the parent slide having an id or not.

      if (updateNotes && currentSlide === "".concat(parentSlide)) {
        updateNotes(this.props.children);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return false;
    }
  }]);

  return Notes;
}(_react.Component);

exports.default = Notes;
Object.defineProperty(Notes, "contextTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    store: _propTypes.default.object,
    slideHash: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
    updateNotes: _propTypes.default.func
  }
});
Object.defineProperty(Notes, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    children: _propTypes.default.node.isRequired
  }
});