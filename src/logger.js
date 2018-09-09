import {
  decorate,
  warn,
  log,
  info,
  error
} from './utils';

function handleDescriptor(target, key, descriptor, [msg = '', options = {}]) {
  if (typeof descriptor.value !== 'function') {
    throw new SyntaxError('Only functions can be marked as deprecated');
  }

  const methodSignature = `${target.constructor.name}#${key}`;

  if (options.url) {
    msg += `\nSee ${options.url} for more details.\n`;
  }

  return {
    ...descriptor,
    value: function logWrapper() {
      switch (options.type) {
        case 'log':
          log(`${methodSignature}: ${msg}`);
          break;
        case 'warn':
          warn(`${methodSignature}: ${msg}`);
          break;
        case 'error':
          error(`${methodSignature}: ${msg}`);
          break;
        default:
          info(`${methodSignature}: ${msg}`);
          break;
      }
      return descriptor.value.apply(this, arguments);
    }
  };
}

export default function logger(...args) {
  return decorate(handleDescriptor, args);
}
