"use strict";

function slice(node) {
  return node instanceof NodeList ? [].slice.call(node) : new Array(node);
}

var methods = {
  addClass: function addClass(name) {
    this.forEach(function (el) {
      return el.classList.add(name);
    });
  },
  append: function append(nodes) {
    this[0].append(nodes);
  },
  attr: function attr(key) {
    var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    if (val === null) return this[0].getAttribute(key);

    val ? this[0].setAttribute(key, val) : this[0].removeAttribute(key);
  },
  data: function data(key) {
    var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    if (val === null) {
      var result = this[0].dataset[key];
      return result === "false" ? false : result === "true" ? true : result;
    }
    this[0].dataset[key] = val;
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
  parent: function parent(selector) {
    var parentNode = null;
    var curr = this[0];

    selector = selector.indexOf('.') > -1 ? selector.slice(1) : selector;

    while (true) {
      parentNode = curr.parentNode;
      if (!parentNode || parentNode.tagName.toLowerCase() === 'html') throw Error("No parent node");
      if (parentNode.classList.contains(selector) || parentNode.tagName.toLowerCase() === selector) {
        return wrap(parentNode);
      }
      curr = parentNode;
    }
  },
  removeClass: function removeClass(name) {
    this[0].classList.remove(name);
  },
  val: function val() {
    return this[0].value;
  },
  toggleClass: function toggleClass(name) {
    var flag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    flag === null ? this[0].classList.toggle(name) : this[0].classList.toggle(name, flag);
  },
  trigger: function trigger(name) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { "bubbles": true, "cancelable": false };

    var event = new Event(name, opts);
    this.forEach(function (node) {
      return node.dispatchEvent(event);
    });
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