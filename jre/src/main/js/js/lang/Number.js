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
 * @class js.lang.Number 
 * @extends {js.lang.Object}
 * @alias Number
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The Number JavaScript object is a wrapper object allowing you to work with numerical values. A Number object is created using the Number() constructor.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The primary uses for the Number object are:
 * <ul><li>If the argument cannot be converted into a number, it returns NaN.</li>
 * <li>In a non-constructor context (i.e., without the new operator), Number can be used to perform a type conversion.</li>
 * </ul></p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.Number.prototype */ {
  name: "class Number",

  alias: "js.lang.Number",

  Number: function() {},

  /** 
   * @function
   * @public 
   * @summary Compares this number against the specified object.
   * @description Compares this number against the specified object. The result is true if and only if the argument is not null and is a Number object that represents a number that has the same value as the number represented by this object.
   *
   * @param {js.lang.Object} the object to compare with.
   * @return {js.lang.Boolean} true if the Number objects represent the same value; false otherwise.
   */
  "equals": function(obj) {
    return Object.isNumber(obj) && this == obj;
  },

  /** 
   * @function
   * @public 
   * @summary The toExponential() method returns a string representing the Number object in exponential notation.
   * @description 
   * <p>
   * If the fractionDigits argument is omitted, the number of digits after the decimal point defaults to the number of digits necessary to represent the value uniquely.
   * </p><p>
   * If you use the toExponential() method for a numeric literal and the numeric literal has no exponent and no decimal point, leave whitespace(s) before the dot that precedes the method call to prevent the dot from being interpreted as a decimal point.
   * </p><p>
   * If a number has more digits than requested by the fractionDigits parameter, the number is rounded to the nearest number represented by fractionDigits digits. See the discussion of rounding in the description of the toFixed() method, which also applies to toExponential().
   * </p>
   *
   * @param {js.lang.Number} fractionDigits - Optional. An integer specifying the number of digits after the decimal point. Defaults to as many digits as necessary to specify the number.
   * @return {js.lang.String} A string representing the given Number object in exponential notation with one digit before the decimal point, rounded to fractionDigits digits after the decimal point.
   */
  toExponential: Number.prototype.toExponential,

  /** 
   * @function
   * @public 
   * @summary The toFixed() method formats a number using fixed-point notation.
   * @description 
   *
   * @param {js.lang.Number} digits - Optional. The number of digits to appear after the decimal point; this may be a value between 0 and 20, inclusive, and implementations may optionally support a larger range of values. If this argument is omitted, it is treated as 0.
   * @return {js.lang.String} A string representing the given number using fixed-point notation.
   */
  toFixed: Number.prototype.toFixed,

  /** 
   * @function
   * @public 
   * @summary The toPrecision() method returns a string representing the Number object to the specified precision.
   * @description 
   * <p>
   * A string representing a Number object in fixed-point or exponential notation rounded to precision significant digits. See the discussion of rounding in the description of the Number.prototype.toFixed() method, which also applies to toPrecision().
   * </p><p>
   * If the precision argument is omitted, behaves as Number.prototype.toString(). If the precision argument is a non-integer value, it is rounded to the nearest integer.
   * </p><p>
   *
   * @param {js.lang.Number} precision - Optional. An integer specifying the number of significant digits.
   * @return {js.lang.Boolean} A string representing a Number object in fixed-point or exponential notation rounded to precision significant digits.
   */
  toPrecision: Number.prototype.toPrecision

});