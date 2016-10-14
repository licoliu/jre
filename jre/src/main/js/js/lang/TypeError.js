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
 * @class js.lang.TypeError 
 * @extends {js.lang.Object}
 * @alias TypeError
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The TypeError object represents an error when a value is not of the expected type.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * A TypeError is thrown when an operand or argument passed to a function is incompatible with the type expected by that operator or function.
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.TypeError.prototype */ {
  name: "class TypeError",

  alias: "js.lang.TypeError",

  "private name": "js.lang.TypeError", // 错误名

  "private number": 6,

  TypeError: function() {}
});