/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 16, 2014
 */
define(function(require, exports, module) {

  /** 
   * @abstract
   * @class js.text.Format
   * @extends {js.lang.Object}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
  return Class.forName( /** @lends js.text.Format.prototype */ {
    name: "abstract class js.text.Format extends Object",
    Format: function() {},

    /** 
     * @function
     * @public 
     * @abstract
     * @summary Formats a Date into a date/time string.
     * @description Formats a Date into a date/time string.
     *
     * @param {js.util.Date|js.lang.Number} date - the time value to be formatted into a time string.
     * @return {js.lang.String} the formatted time string.
     */
    'abstract format': function(obj) {},

    /** 
     * @function
     * @public 
     * @abstract
     * @summary Parses text from the beginning of the given string to produce a date.
     * @description Parses text from the beginning of the given string to produce a date.
     *
     * @param {js.lang.String} source - A String whose beginning should be parsed.
     * @return {js.util.Date} A Date parsed from the string.
     */
    'abstract parse': function(source) {}
  }).getClassConstructor();

});