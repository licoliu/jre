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
 * @class js.lang.RangeError 
 * @extends {js.lang.Object}
 * @alias RangeError
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The RangeError object indicates an error when a value is not in the set or range of allowed values.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * A RangeError is thrown when trying to pass a number as an argument to a function that does not allow a range that includes that number. 
 * This can be encountered when attempting to create an array of an illegal length with the Array constructor, or when passing bad values to the numeric methods Number.toExponential(), Number.toFixed() or Number.toPrecision().
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.RangeError.prototype */ {
  name: "class RangeError",
  alias: "js.lang.RangeError",

  "private name": "js.lang.RangeError", // 错误名
  "private number": 3,

  RangeError: function() {}
});