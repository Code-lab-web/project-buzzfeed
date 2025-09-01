'use strict';
const {
  ArrayPrototypeForEach,
  ArrayPrototypeMap,
  ArrayPrototypePush,
  FunctionPrototypeBind,
  ObjectEntries,
  String,
  Symbol,
} = primordials;

const {
  ERR_INVALID_ARG_TYPE,
  ERR_INVALID_ARG_VALUE,
  ERR_WASI_ALREADY_STARTED,
} = require('internal/errors').codes;
const {
  emitExperimentalWarning,
  kEmptyObject,
} = require('internal/util');
const {
  validateArray,
  validateBoolean,
  validateFunction,
  validateInt32,
  validateObject,
  validateString,
  validateUndefined,
} = require('internal/validators');
const kExitCode = Symbol('kExitCode');
const kSetMemory = Symbol('kSetMemory');
const kStarted = Symbol('kStarted');
const kInstance = Symbol('kInstance');
const kBindingName = Symbol('kBindingName');

emitExperimentalWarning('WASI');

class WASI {
  constructor(options = kEmptyObject) {
    validateObject(options, 'options');

    let _WASI;
    if (options.version !== undefined) {
      validateString(options.version, 'options.version');
    }
    const version = options.version || 'unstable';

    switch (version) {
      case 'unstable':
        ({ WASI: _WASI } = internalBinding('wasi'));
        this[kBindingName] = 'wasi_unstable';
        break;
      case 'preview1':
        ({ WASI: _WASI } = internalBinding('wasi'));
        this[kBindingName] = 'wasi_snapshot_preview1';
        break;
      // When adding support for additional wasi versions add case here
      default:
        throw new ERR_INVALID_ARG_VALUE('options.version',
                                        options.version,
                                        'unsupported WASI version');
    }

    if (options.args !== undefined) {
      validateArray(options.args, 'options.args');
    }
    const args = ArrayPrototypeMap(options.args || [], (arg) => {
      validateString(arg, 'options.args[]');
      return String(arg);
    });


    const env = [];
    if (options.env !== undefined) {
      validateObject(options.env, 'options.env');
      ArrayPrototypeForEach(
        ObjectEntries(options.env),
        ({ 0: key, 1: value }) => {
          if (value !== undefined) {
            validateString(key, 'options.env key');
            validateString(value, 'options.env value');
            if (key.includes('=')) {
              throw new ERR_INVALID_ARG_VALUE('options.env key', key, 'cannot contain "="');
            }
            ArrayPrototypePush(env, `${key}=${value}`);
          }
        });
    }

    const preopens = [];
    if (options.preopens !== undefined) {
      validateObject(options.preopens, 'options.preopens');
      ArrayPrototypeForEach(
        ObjectEntries(options.preopens),
        ({ 0: key, 1: value }) => {
          validateString(key, 'options.preopens key');
          validateString(value, 'options.preopens value');
          ArrayPrototypePush(preopens, String(key), String(value));
        }
      );
    }

    const { stdin = 0, stdout = 1, stderr = 2 } = options;
    validateInt32(stdin, 'options.stdin', 0);
    validateInt32(stdout, 'options.stdout', 0);
    validateInt32(stderr, 'options.stderr', 0);
    const stdio = [stdin, stdout, stderr];

    const wrap = new _WASI(args, env, preopens, stdio);

    for (const prop in wrap) {
      if (typeof wrap[prop] === 'function') {
        wrap[prop] = FunctionPrototypeBind(wrap[prop], wrap);
      }
    }

    let returnOnExit = true;
    if (options.returnOnExit !== undefined) {
      validateBoolean(options.returnOnExit, 'options.returnOnExit');
      returnOnExit = options.returnOnExit;
    }
    if (returnOnExit)
      wrap.proc_exit = FunctionPrototypeBind(wasiReturnOnProcExit, this);

    this[kSetMemory] = wrap._setMemory;
    delete wrap._setMemory;
    this.wasiImport = wrap;
    this[kStarted] = false;
    this[kExitCode] = 0;
    this[kInstance] = undefined;
  }

  finalizeBindings(instance, {
    memory = instance?.exports?.memory,
  } = {}) {
    if (this[kStarted]) {
      throw new ERR_WASI_ALREADY_STARTED();
    }

    if (instance === undefined || instance === null) {
      throw new ERR_INVALID_ARG_TYPE('instance', 'Object', instance);
    }
    validateObject(instance.exports, 'instance.exports');

    if (memory === undefined || !(memory instanceof WebAssembly.Memory)) {
       throw new ERR_INVALID_ARG_TYPE('memory', 'WebAssembly.Memory', memory);
    }

    this[kSetMemory](memory);

    this[kInstance] = instance;
    this[kStarted] = true;
  }

  // Must not export _initialize, must export _start
  start(instance) {
    this.finalizeBindings(instance);

    const { _start, _initialize } = this[kInstance].exports;

    if (typeof _start !== 'function') {
      throw new ERR_INVALID_ARG_TYPE('instance.exports._start', 'function', _start);
    }
    validateUndefined(_initialize, 'instance.exports._initialize');

    try {
      _start();
    } catch (err) {
      if (err !== kExitCode) {
        throw err;
      }
    }

    return this[kExitCode];
  }

  // Must not export _start, may optionally export _initialize
  initialize(instance) {
    this.finalizeBindings(instance);

    const { _start, _initialize } = this[kInstance].exports;

    validateUndefined(_start, 'instance.exports._start');
    if (_initialize !== undefined) {
      if (typeof _initialize !== 'function') {
        throw new ERR_INVALID_ARG_TYPE('instance.exports._initialize', 'function', _initialize);
      }
      _initialize();
    }
  }

  getImportObject() {
    return { [this[kBindingName]]: this.wasiImport };
  }
}

module.exports = { WASI };


function wasiReturnOnProcExit(rval) {
  // If __wasi_proc_exit() does not terminate the process, an assertion is
  // triggered in the wasm runtime. Node can sidestep the assertion and return
  // an exit code by recording the exit code, and throwing a JavaScript
  // exception that WebAssembly cannot catch.
  this[kExitCode] = rval;
  throw kExitCode;
}
