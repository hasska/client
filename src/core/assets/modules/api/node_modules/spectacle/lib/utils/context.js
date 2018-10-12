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

var Context =
/*#__PURE__*/
function (_Component) {
  _inherits(Context, _Component);

  function Context() {
    _classCallCheck(this, Context);

    return _possibleConstructorReturn(this, (Context.__proto__ || Object.getPrototypeOf(Context)).apply(this, arguments));
  }

  _createClass(Context, [{
    key: "getChildContext",
    value: function getChildContext() {
      var _props = this.props,
          history = _props.history,
          styles = _props.styles,
          store = _props.store;
      return {
        history: history,
        styles: styles,
        store: store
      };
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);

  return Context;
}(_react.Component);

Object.defineProperty(Context, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'Context'
});
Object.defineProperty(Context, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    children: _propTypes.default.node,
    history: _propTypes.default.object,
    store: _propTypes.default.object,
    styles: _propTypes.default.object
  }
});
Object.defineProperty(Context, "childContextTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    styles: _propTypes.default.object,
    history: _propTypes.default.object,
    store: _propTypes.default.object
  }
});
var _default = Context;
exports.default = _default;