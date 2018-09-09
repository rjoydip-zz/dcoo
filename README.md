# dcoo [![Build Status](https://travis-ci.org/rjoydip/dcoo.svg?branch=master)](https://travis-ci.org/rjoydip/dcoo)

Useful ES2016/ES7 decorators.

These are stage-0 decorators because while [the decorators spec has changed](http://tc39.github.io/proposal-decorators/) and is now stage-2, no transpiler has yet to implement these changes and until they do, this library won't either. Although the [TypeScript documentation](http://www.typescriptlang.org/docs/handbook/decorators.html) uses the phrase "Decorators are a stage 2 proposal for JavaScript" this is misleading because TypeScript still only implements the **stage-0** version of the spec, which is very incompatible with stage-2 (as of this writing).

_\*compiled code is intentionally not checked into this repo_

### Get It

A version compiled to ES5 in CJS format is published to npm as [`dcoo`](https://www.npmjs.com/package/dcoo)

```bash
# npm install dcoo --save // not yet published
npm install https://github.com/rjoydip/dcoo.git
```

This can be consumed by any transpiler that supports stage-0 of the decorators spec, like [babel.js](https://babeljs.io/) version 5. _Babel 6 [does not yet support decorators natively](https://phabricator.babeljs.io/T2645), but you can include [babel-plugin-transform-decorators-legacy](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy)._

dcoo does not officially support TypeScript. There are known incompatibilities with the way it transpiles the output. PRs certainly welcome to fix that!

## Decorators

##### For Methods

- [@logger](#logger)

## Docs

### @logger

Calls `console.log()`, `console.warn()`, `console.error()` ,`console.info()` with a log message. Provide a custom message to override the default one. You can also provide an options hash with a `url`, for further reading.

```js
import { logger } from "dcoo";

class Logger {
  @logger("logger msg", {
    type: "info"
  })
  loggerFn() {}
}

let logger = new Logger();
logger.loggerFn();
// Logger#loggerFn: logger msg
```
