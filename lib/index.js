'use strict';

function slice(node) {
  return node instanceof NodeList ? [].slice.call(node) : new Array(node);
}

var methods = {
  addClass: function addClass(name) {
    this.forEach(function (el) {
      return el.classList.add(name);
    });
  },
  data: function data(selector) {
    return this[0].dataset[selector];
  },
  find: function find(selector) {
    return wrap(this[0].querySelectorAll(selector));
  },
  hasClass: function hasClass(name) {
    return this[0].classList.contains(name);
  },
  on: function on(event, handler) {
    this.forEach(function (el) {
      return el.addEventListener(event, handler);
    });
  },
  offset: function offset() {
    var body = document.body.getBoundingClientRect();
    var bounds = this[0].getBoundingClientRect();
    return {
      top: bounds.top - body.top,
      left: bounds.left - body.left
    };
  },
  removeClass: function removeClass(name) {
    this[0].classList.remove(name);
  },
  toggleClass: function toggleClass(name) {
    this[0].classList.toggle(name);
  },
  width: function width() {
    return this[0].clientWidth;
  }
};

function notEmpty(fn) {
  return function () {
    if (this.length === 0) return this;
    return fn.apply(this, arguments);
  };
}

function decorate(wrapper) {
  for (var method in methods) {
    wrapper[method] = notEmpty(methods[method]);
  }
  return wrapper;
}

function wrap(el) {
  var wrapper = Object.create(Array.prototype);
  slice(el).forEach(function (node) {
    return wrapper.push(node);
  });
  return decorate(wrapper);
}

var dommer = function dommer(query) {
  var el = query[0] === '#' ? document.getElementById(query.substring(1)) : query instanceof HTMLElement || query === document ? query : document.querySelectorAll(query);

  return wrap(el);
};

dommer.fn = function (func) {
  methods[func.name] = func;
};

module.exports = dommer;