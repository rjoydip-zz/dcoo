import { decorate, warn, log, info, error } from 'lib/utils';
const _options = ['warn', 'info', 'log', 'error'];

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
      if(_options.includes(options.type)) {
        [options.type](`${methodSignature}: ${msg}`);
      } else {
        log(`${methodSignature}: ${msg}`);
      }
      
      return descriptor.value.apply(this, arguments);
    }
  };
}

export default function log(...args) {
  return decorate(handleDescriptor, args);
}
