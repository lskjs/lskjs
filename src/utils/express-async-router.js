const express = require('express');
const consolevoid = { log() {} };
// var consolevoid = console
const exp = {};
    // #endregion
    // #region Types and Constants
let DEFAULT_SENDER = function (req, res, val) { res.send(val); },
  SHORTCUTS_METHODS = ['all', 'get', 'post', 'put', 'delete', 'patch', 'options', 'head'];
    // #endregion
    // #region Public
function AsyncRouter(options) {
  let sender = getSender(options),
    innerRouter = express.Router(options),
    asyncRouter = function () {
      return innerRouter.apply(this, arguments);
    };
  asyncRouter.__asyncRouter = true;
  asyncRouter.useRouter = function () {
    const r = express.Router();
    r.use(...arguments);
    this.use(r);
    return this;
  };
  wrapAllMatchers(asyncRouter, sender, innerRouter);
  asyncRouter.param = function param() {
    if (typeof arguments[1] === 'function' && arguments[1].length === 3) {
      innerRouter.param(arguments[0], wrapParamHandler(arguments[1]));
      return this;
    }
    innerRouter.param(...arguments);
    return this;
  };
  asyncRouter.route = function route(path) {
    const r = innerRouter.route(path);
    wrapAllMatchers(r, sender);
    return r;
  };
  asyncRouter.use = function use() {
    const args = [];
    for (let _i = 0; _i < arguments.length; _i++) {
      args[_i - 0] = arguments[_i];
                // if (arguments[_i] && arguments[_i].__asyncRouter) {
                //   return this.useRouter.apply(this, arguments);
                // }
    }

    innerRouter.use(...args.map((arg) => { return typeof arg === 'function' && !arg.__asyncRouter ? wrapHandlerOrErrorHandler(arg) : arg; }));
    return this;
  };
  return asyncRouter;
}
exp.AsyncRouter = AsyncRouter;
function create(options) {
  return AsyncRouter(options);
}
exp.create = create;
    // #endregion
    // #region Private Methods
function getSender(options) {
  if (!options) {
    return DEFAULT_SENDER;
  }
  let send = options.send,
    sender = options.sender;
  delete options.send;
  delete options.sender;
  if (send !== false) {
    return sender || DEFAULT_SENDER;
  }
}
function wrapAllMatchers(route, sender, router) {
  consolevoid.log('wrapAllMatchers');

  router = router || route;
  SHORTCUTS_METHODS.forEach((method) => {
    route[method] = wrapMatcher(router, router[method], sender);
  });
}
function wrapMatcher(router, routerMatcher, sender) {
  consolevoid.log('wrapMatcher');

  const _this = this;
  return function (name) {
    consolevoid.log('@wrapMatcher');
    const args = [];
    for (let _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }
    let last = args.length - 1,
      mappedArgs = args.map((a, i) => { return i === last ? wrapHandler(a, sender) : wrapHandlerOrErrorHandler(a); });
    routerMatcher.apply(router, [name].concat(mappedArgs));
    return _this;
  };
}
function wrapHandler(handler, sender) {
  consolevoid.log('wrapHandler');

  return function (req, res, next) {
    consolevoid.log('@wrapHandler');

    try {
      next = once(next);
      toCallback(handler.call(this, req, res, next), next, req, res, (result) => {
        if (sender && !res.headersSent) {
          return sender(req, res, result);
        }
      });
    } catch (err) {
      next(err);
    }
  };
}
function wrapParamHandler(handler) {
  consolevoid.log('wrapParamHandler');

  return function (req, res, next, param) {
    consolevoid.log('@wrapParamHandler');
    try {
      next = once(next);
      toCallback(handler.call(this, req, res, param), next, req, res);
    } catch (err) {
      next(err);
    }
  };
}
function wrapHandlerOrErrorHandler(handler) {
  consolevoid.log('wrapHandlerOrErrorHandler');
  if (handler.length === 4) {
    return function (err, req, res, next) {
      consolevoid.log('@wrapHandlerOrErrorHandler 4');
      try {
        next = once(next);
        toCallback(handler.call(this, err, req, res, next), next, req, res);
      } catch (err) {
        next(err);
      }
    };
  }
  return function (req, res, next) {
    consolevoid.log('@wrapHandlerOrErrorHandler !=4');

    try {
      next = once(next);
      toCallback(handler.call(this, req, res, next), next, req, res, handler.length === 3);
    } catch (err) {
      next(err);
    }
  };
}
function toCallback(thenable, next, req, res, end) {
  consolevoid.log('toCallback');
  if (!thenable || typeof thenable.then !== 'function') {
    consolevoid.log('tc 1', thenable);

    thenable = Promise.resolve(thenable);
  }
  if (typeof end === 'function') {
    consolevoid.log('tc 2');

    thenable = thenable.then(end);
  }
  thenable.then(() => {
    consolevoid.log('tc 3 = !!next , !end , !res.headersSent', !!next, !end, !res.headersSent);
          // consolevoid.log(end);
          // next()
    if (next && !end && !res.headersSent) {
      next();
    }
  }, (err) => {
    consolevoid.log('tc 4');
    if (typeof err === 'string') {
      err = new Error(err);
    }
    next(err);
  });
}
function once(fn) {
  consolevoid.log('once');
  let called = false;
  return function () {
    consolevoid.log('@once');
    if (called) {
      return;
    }
    called = true;
    fn.apply(this, arguments);
  };
}

module.exports = exp;
