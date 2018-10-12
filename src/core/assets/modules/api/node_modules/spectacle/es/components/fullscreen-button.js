function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import styled from 'react-emotion';
var Button =
/*#__PURE__*/
styled("button", {
  target: "e1i28ids0"
})("display:inline-block;appearance:none;background:none;border:none;outline:0;color:inherit;padding:0;cursor:pointer;> svg{height:1.5em;width:1.5em;}");

var FullscreenButton = function FullscreenButton(props) {
  return React.createElement(Button, _extends({
    "aria-label": "Toggle full screen"
  }, props), React.createElement("svg", {
    viewBox: "0 0 24 24"
  }, React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), React.createElement("path", {
    d: "M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z",
    fill: "currentColor"
  })));
};

export default FullscreenButton;