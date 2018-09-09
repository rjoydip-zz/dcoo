// Type definitions for dcoo
// Project: https://github.com/rjoydip/dcoo
// TypeScript Version: 2.4.1

export interface Log extends MethodDecorator {
  (message?: string, option?: LogOption): MethodDecorator;
}

export interface LogOption {
  url: string;
}

/**
 * Calls console.log() with a deprecation message. Provide a custom message to override the default one. You can also provide an options hash with a url, for further reading.
 */
export const log: Log;
/**
 * Immediately applies the provided function and arguments to the method, allowing you to wrap methods with arbitrary helpers like those provided by lodash.
 * The first argument is the function to apply, all further arguments will be passed to that decorating function.
 */
export function decorate(func: Function, ...args: any[]): MethodDecorator;
