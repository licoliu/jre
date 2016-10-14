/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 14, 2014
 */

/** 
 * @class js.io.PrintWriter 
 * @extends {js.io.Writer}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Prints formatted representations of objects to a text-output stream.
 * </p><br/>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.io.PrintWriter.prototype */ {
  name: "class js.io.PrintWriter extends js.io.Writer",
  PrintWriter: function() {},

  /** 
   * @function
   * @public 
   * @summary Prints a character.
   * @description 
   *
   * @param {js.lang.Array|js.lang.String} cbuf - The characters array or a string to be printed
   * @param {js.lang.Number} off - Offset from which to start writing characters
   * @param {js.lang.Number} len - Number of characters to write
   * @param {js.lang.Boolean} ln - Whether to add a newline or not
   */
  print: function(cbuf, off, len, ln) {},

  /** 
   * @function
   * @public 
   * @summary Prints a character, and add a newline at the end.
   * @description 
   *
   * @param {js.lang.Array|js.lang.String} cbuf - The characters array or a string to be printed
   * @param {js.lang.Number} off - Offset from which to start writing characters
   * @param {js.lang.Number} len - Number of characters to write
   */
  println: function(cbuf, off, len) {
    this.print(cbuf, off, len, true);
  }
});