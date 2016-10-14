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
 * @class js.lang.EvalError 
 * @extends {js.lang.Object}
 * @alias EvalError
 * @description
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The EvalError object indicates an error regarding the global eval() function.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * This exception is not thrown by JavaScript anymore, however the EvalError object remains for compatibility.
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.EvalError.prototype */ {
  name: "class EvalError",
  alias: "js.lang.EvalError",

  "private name": "js.lang.EvalError", // 错误名
  "private number": 2,

  /**
   * @name js.lang.EvalError.prototype.message
   * @private
   * @property {js.lang.String} Error message. Although ECMA-262 specifies that EvalError should provide its own message property, in SpiderMonkey, it inherits Error.prototype.message.
   */

  EvalError: function() {}
});