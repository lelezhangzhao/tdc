
var queue = {};
export function subscribe(event, fn) {
    if (!queue[event]) queue[event] = [];
    queue[event].push(fn);
}
export function publish (event, content) {
      var eventQueue = queue[event],
          len = eventQueue.length;
      if (eventQueue) {
          eventQueue.forEach(function(item, index) {
              item(content);
          });
      }
  }
  export function off(event, fn) {
      var eventQueue = queue[event];
      if (eventQueue) {
          queue[event] = eventQueue.filter(function(item) {
              return item !== fn;
          });
      }
  }


module.exports = {
  subscribe: subscribe,
  publish: publish,
  off: off
}