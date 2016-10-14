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
 * @class js.lang.Boolean 
 * @extends {js.lang.Object}
 * @alias Boolean
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The Boolean object is an object wrapper for a boolean value.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The value passed as the first parameter is converted to a boolean value, if necessary. If value is omitted or is 0, -0, null, false, NaN, undefined, or the empty string (""), the object has an initial value of false. All other values, including any object or the string "false", create an object with an initial value of true.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Do not confuse the primitive Boolean values true and false with the true and false values of the Boolean object.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Any object whose value is not undefined or null, including a Boolean object whose value is false, evaluates to true when passed to a conditional statement.
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.Boolean.prototype */ {
  name: "class Boolean",

  alias: "js.lang.Boolean",

  Boolean: function() {},

  /** 
   * @function
   * @public 
   * @summary Returns true if and only if the argument is not null and is a Boolean object that represents the same boolean value as this object.
   * @description Returns true if and only if the argument is not null and is a Boolean object that represents the same boolean value as this object.
   * 
   * @param {js.lang.Object} the object to compare with.
   * @return {js.lang.Boolean} true if the Boolean objects represent the same value; false otherwise.
   */
  "equals": function(obj) {
    return Object.isBoolean(obj) && this == obj;
  }
});