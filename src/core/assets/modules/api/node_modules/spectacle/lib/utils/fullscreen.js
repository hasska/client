"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFullscreenElement = exports.exitFullscreen = exports.requestFullscreen = void 0;

var requestFullscreen = function requestFullscreen(element) {
  var request = element.requestFullscreen || element.webkitRequestFullscreen || element.mozRequestFullScreen || element.mozRequestFullScreen;

  if (typeof request === 'function') {
    request.call(element);
  }
};

exports.requestFullscreen = requestFullscreen;

var exitFullscreen = function exitFullscreen() {
  var exit = document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen;

  if (typeof exit === 'function') {
    exit.call(document);
  }
};

exports.exitFullscreen = exitFullscreen;

var getFullscreenElement = function getFullscreenElement() {
  return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
};

exports.getFullscreenElement = getFullscreenElement;