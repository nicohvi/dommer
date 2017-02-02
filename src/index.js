function slice (node) {
  return node instanceof NodeList
    ? [].slice.call(node)
    : new Array(node);
}

let methods = {
  addClass (name) {
    this.forEach(el => el.classList.add(name));
  },

  append (nodes) {
    this[0].append(nodes);
  },

  attr (key, val = null) {
    val === null
      ? this[0].setAttribute(key, val) 
      : this[0].getAttribute(key);
  },

  data (selector) {
    return this[0].dataset[selector];
  },

  find (selector) {
    return wrap(this[0].querySelectorAll(selector));
  },

  hasClass (name) {
    return this[0].classList.contains(name);
  },

  on (event, handler) {
    this.forEach(el => el.addEventListener(event, handler));
  },

  offset () {
    const body = document.body.getBoundingClientRect();
    const bounds = this[0].getBoundingClientRect();
    return { 
      top: bounds.top - body.top, 
      left: bounds.left - body.left
    };
  },

  removeClass (name) {
    this[0].classList.remove(name);
  },

  val () {
    return this[0].value;
  },

  toggleClass (name, flag = null) {
    flag === null 
      ? this[0].classList.toggle(name)
      : this[0].classList.toggle(name, flag);
  },

  width () {
    return this[0].clientWidth;
  }
  
};

function notEmpty (fn) {
  return function () {
    if(this.length === 0) return this;
    return fn.apply(this, arguments);
  } 
}

function decorate (wrapper) {
  for(let method in methods) {
    wrapper[method] = notEmpty(methods[method]);
  }
  return wrapper;
}

function wrap (el) {
  let wrapper = Object.create(Array.prototype);
  slice(el).forEach(node => wrapper.push(node));
  return decorate(wrapper);
}

let dommer = function (query) {
  const el =  query[0] === '#'
    ? document.getElementById(query.substring(1))
    : (query instanceof HTMLElement || query === document)
    ? query
    : document.querySelectorAll(query);

  return wrap(el);
}

dommer.fn = (func) => {
  methods[func.name] = func;
};

module.exports = dommer;
