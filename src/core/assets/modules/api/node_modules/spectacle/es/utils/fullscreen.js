export var requestFullscreen = function requestFullscreen(element) {
  var request = element.requestFullscreen || element.webkitRequestFullscreen || element.mozRequestFullScreen || element.mozRequestFullScreen;

  if (typeof request === 'function') {
    request.call(element);
  }
};
export var exitFullscreen = function exitFullscreen() {
  var exit = document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen;

  if (typeof exit === 'function') {
    exit.call(document);
  }
};
export var getFullscreenElement = function getFullscreenElement() {
  return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
};