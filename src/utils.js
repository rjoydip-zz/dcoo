const { defineProperty, getOwnPropertyDescriptor,
        getOwnPropertyNames, getOwnPropertySymbols } = Object;

export function isDescriptor(desc) {
  if (!desc || !desc.hasOwnProperty) {
    return false;
  }

  const keys = ['value', 'initializer', 'get', 'set'];

  for (let i = 0, l = keys.length; i < l; i++) {
    if (desc.hasOwnProperty(keys[i])) {
      return true;
    }
  }

  return false;
}

export function decorate(handleDescriptor, entryArgs) {
  if (isDescriptor(entryArgs[entryArgs.length - 1])) {
    return handleDescriptor(...entryArgs, []);
  } else {
    return function () {
      return handleDescriptor(...Array.prototype.slice.call(arguments), entryArgs);
    };
  }
}

export const getOwnKeys = getOwnPropertySymbols
    ? function (object) {
        return getOwnPropertyNames(object)
          .concat(getOwnPropertySymbols(object));
      }
    : getOwnPropertyNames;


export function getOwnPropertyDescriptors(obj) {
  const descs = {};

  getOwnKeys(obj).forEach(
    key => (descs[key] = getOwnPropertyDescriptor(obj, key))
  );

  return descs;
}

export function bind(fn, context) {
  if (fn.bind) {
    return fn.bind(context);
  } else {
    return function __autobind__() {
      return fn.apply(context, arguments);
    };
  }
}

export const warn = (() => {
  if (typeof console !== 'object' || !console || typeof console.warn !== 'function') {
    return () => {};
  } else {
    return bind(console.warn, console);
  }
})();

export const log = (() => {
  if (typeof console !== 'object' || !console || typeof console.log !== 'function') {
    return () => {};
  } else {
    return bind(console.log, console);
  }
})();

export const info = (() => {
  if (typeof console !== 'object' || !console || typeof console.info !== 'function') {
    return () => {};
  } else {
    return bind(console.info, console);
  }
})();

export const error = (() => {
  if (typeof console !== 'object' || !console || typeof console.error !== 'function') {
    return () => {};
  } else {
    return bind(console.error, console);
  }
})();
