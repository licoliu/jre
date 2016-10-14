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
 * @class js.lang.SyntaxError 
 * @extends {js.lang.Object}
 * @alias SyntaxError
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The SyntaxError object represents an error when trying to interpret syntactically invalid code.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * A SyntaxError is thrown when the JavaScript engine encounters tokens or token order that does not conform to the syntax of the language when parsing code.
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.SyntaxError.prototype */ {
  name: "class SyntaxError",

  alias: "js.lang.SyntaxError",

  "private name": "js.lang.SyntaxError", // 错误名

  "private number": 5,

  SyntaxError: function() {}
});