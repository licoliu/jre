/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年6月25日
 */

/**
 * @class js.lang.Error 
 * @extends {js.lang.Object}
 * @alias Error
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The Error constructor creates an error object. Instances of Error objects are thrown when runtime errors occur.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The Error object can also be used as a base object for user-defined exceptions. See below for standard built-in error types.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Runtime errors result in new Error objects being created and thrown.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * This page documents the use of the Error object itself and its use as a constructor function. For a list of properties and methods inherited by Error instances, see Error.prototype.
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.Error.prototype */ {
  name: "class Error",
  alias: "js.lang.Error",

  "private name": "js.lang.Error", // 错误名
  "private number": 1,

  Error: function(message, fileName, lineNumber, stack, description) {
    this.message = message;
    this.fileName = fileName;
    this.stack = stack;
    this.lineNumber = lineNumber;
    this.description = description;
  },

  'static init': function() {
    var methods = {},
      __methods = js.lang.Throwable.$class.getDeclaredMethods(),
      __length = __methods.length,
      __index = 0;
    for (; __index < __length; __index++) {
      methods[__methods[__index]._name] = __methods[__index]._value;
    }
    Object.extend(Error.prototype, methods, null, null, {
      writable: false,
      enumerable: false,
      configurable: false
    });
  }
});

js.lang.Error.init();