/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 14, 2014
 */

/** 
 * @abstract
 * @class js.io.Writer 
 * @extends {js.lang.Object}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Abstract class for writing to character streams. The only methods that a subclass must implement are write(array, off, len). Most subclasses, however, will override some of the methods defined here in order to provide higher efficiency, additional functionality, or both.
 * </p><br/>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.io.Writer.prototype */ {
  name: "abstract class js.io.Writer extends Object",
  "protected _writer": null,

  Writer: function(writer) {
    this._writer = writer;
  },

  /** 
   * @function
   * @public 
   * @summary Appends the specified character to this writer.
   * @description Appends the specified character to this writer.
   *
   * @param {js.lang.String} c - the specified character
   * @return {js.io.Writer} This writer
   */
  append: function(c) {
    return this;
  },

  /** 
   * @function
   * @public 
   * @summary Writes an array of characters.
   * @description Writes an array of characters.
   *
   * @param {js.lang.Array} cbuf - Array of characters
   * @param {js.lang.Number} off - Offset from which to start writing characters
   * @param {js.lang.Number} len - Number of characters to write
   */
  /** 写入字符数组,字符,字符串或某一部分 */
  write: function(cbuf, off, len) {}
});