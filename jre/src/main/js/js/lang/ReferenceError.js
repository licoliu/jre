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
 * @class js.lang.ReferenceError 
 * @extends {js.lang.Object}
 * @alias ReferenceError
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The ReferenceError object represents an error when a non-existent variable is referenced.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * A ReferenceError is thrown when trying to dereference a variable that has not been declared.
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.ReferenceError.prototype */ {
  name: "class ReferenceError",
  alias: "js.lang.ReferenceError",

  "private name": "js.lang.ReferenceError", // 错误名
  "private number": 4,

  ReferenceError: function() {}
});