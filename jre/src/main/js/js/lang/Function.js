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
 * @class js.lang.Function 
 * @extends {js.lang.Object}
 * @alias Function
 * @description The Function constructor creates a new Function object. In JavaScript every function is actually a Function object.
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Function objects created with the Function constructor are parsed when the function is created. This is less efficient than declaring a function with a function expression or function statement and calling it within your code, because such functions are parsed with the rest of the code.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * All arguments passed to the function are treated as the names of the identifiers of the parameters in the function to be created, in the order in which they are passed.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Invoking the Function constructor as a function (without using the new operator) has the same effect as invoking it as a constructor.
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.Function.prototype */ {
  name: "class Function",

  alias: "js.lang.Function",

  Function: function() {},

  getName: function() {
    return this.name || this.toString().match(/function\s*([^(]*)\(/)[1]
  }
});