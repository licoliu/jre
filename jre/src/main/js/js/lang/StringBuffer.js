/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 13, 2014
 */

/** 
 * @class js.lang.StringBuffer 
 * @extends {js.lang.Object}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * A mutable sequence of characters. A string buffer is like a String, but can be modified. At any point in time it contains some particular sequence of characters, but the length and content of the sequence can be changed through certain method calls.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The principal operations on a StringBuffer are the append and insert methods, which are overloaded so as to accept data of any type. Each effectively converts a given datum to a string and then appends or inserts the characters of that string to the string buffer. The append method always adds these characters at the end of the buffer; the insert method adds the characters at a specified point.
 * </p><br/>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.StringBuffer.prototype */ {
  name: "class js.lang.StringBuffer extends Object",

  "private _strings": [],

  StringBuffer: function() {},

  /** 
   * @function
   * @public 
   * @summary Appends the string representation of arguments to the sequence.
   * @description Appends the string representation of arguments to the sequence. The overall effect is exactly as if the argument were converted to a string by the method argument.toString(), and the characters of that string were then appended to this character sequence.
   * @return {js.lang.StringBuffer} this string buffer
   */
  append: function() {
    this._strings.append(Array.prototype.slice.call(arguments, 0));
    return this;
  },

  /** 
   * @function
   * @public 
   * @summary Inserts the string representation of the arguments into this sequence.
   * @description Inserts the string representation of arguments into this sequence. The overall effect is exactly as if the argument were converted to a string by the method argument.toString(), and the characters of that string were then appended to this character sequence.
   *
   * @return {js.lang.StringBuffer} this string buffer
   */
  insert: function() {
    var args = Array.prototype.slice.call(arguments, 0);
    args.reverse();
    Array.prototype.splice.call(args, 0, 0, 0, 0);
    Array.prototype.splice.apply(this._strings, args);
    return this;
  },

  /** 
   * @function
   * @public 
   * @summary Appends the string representation of a array to the sequence.
   * @description Appends the string representation of a array to the sequence.
   *
   * @param {js.lang.Array}
   * @return {js.lang.StringBuffer} this string buffer
   */
  applys: function(array) {
    if (Object.isArray(array)) {
      throw new js.lang.IllegalArgumentException("this string buffer only applys a array");
    }
    this._strings.append(array);
    return this;
  },

  /** 
   * @function
   * @public 
   * @summary Removes all the characters of this sequence.
   * @description Removes all the characters of this sequence.
   *
   * @return {js.lang.StringBuffer} this string buffer
   */
  clear: function() {
    this._strings.splice(0, this._strings.length);
  },

  /** 
   * @function
   * @public 
   * @summary Removes the characters in a substring of this sequence.
   * @description Removes the characters in a substring of this sequence.
   * 
   * @param {js.lang.Number} The beginning index, inclusive.
   * @param {js.lang.Number} The ending index, exclusive.
   * @return {js.lang.StringBuffer} this string buffer
   * @throws {js.lang.IndexOutOfBoundsException} if start is negative, greater than length(), or greater than end.
   */
  remove: function(start, end) {
    var size = this.length();
    if (start < 0 || start > size || start > end) {
      throw new js.lang.IndexOutOfBoundsException();
    }

    if (!end || end > size) {
      end = size;
    }

    var cursor = 0,
      ele = null;
    for (var i = 0, len = this._strings.length; i < len; i++) {
      ele = this._strings[i];

      if (Object.isNull(ele)) {
        continue;
      }

      if (!Object.isString(ele)) {
        ele = "" + ele;
      }

      var length = ele.length;

      cursor += length;
      if (cursor > start) {
        var index = length - cursor + start;
        if (end <= cursor) {
          this._strings[i] = [
            ele.substring(0, index),
            ele.substring(end - start, length)
          ].join("");
          break;
        } else {
          start = cursor;
          this._strings[i] = ele.substring(0, index);
        }
      }
    }

    return this;
  },

  /** 
   * @function
   * @public 
   * @summary Removes the char at the specified position in this sequence.
   * @description Removes the char at the specified position in this sequence. This sequence is shortened by one char.
   * 
   * @param {js.lang.Number} Index of char to remove
   * @return {js.lang.StringBuffer} this string buffer
   */
  deleteCharAt: function(index) {
    return this.remove(index, index + 1);
  },

  /** 
   * @function
   * @public 
   * @summary Returns a new String that contains a subsequence of characters currently contained in this sequence.
   * @description Returns a new String that contains a subsequence of characters currently contained in this sequence. The substring begins at the specified start and extends to the character at index end - 1.
   *
   * @param {js.lang.Number} The beginning index, inclusive.
   * @param {js.lang.Number} The ending index, exclusive. default value is the length of this sequence.
   * @return {js.lang.StringBuffer} this string buffer
   */
  substring: function(start, end) {
    var size = this.length();
    if (start < 0 || start > size || start > end) {
      throw new js.lang.IndexOutOfBoundsException();
    }

    if (!end || end > size) {
      end = size;
    }

    var cursor = 0,
      substring = [],
      ele = null;
    for (var i = 0, len = this._strings.length; i < len; i++) {

      ele = this._strings[i];

      if (Object.isNull(ele)) {
        continue;
      }

      if (!Object.isString(ele)) {
        ele = "" + ele;
      }

      var length = ele.length;
      cursor += length;
      if (cursor > start) {
        var index = length - cursor + start;
        if (end <= cursor) {
          substring.push(ele.substring(index, end - start));
          break;
        } else {
          start = cursor;
          substring.push(ele.substring(index, length));
        }
      }
    }

    return substring.join("");
  },

  /** 
   * @function
   * @public 
   * @summary Returns the char value in this sequence at the specified index.
   * @description Returns the char value in this sequence at the specified index. The first char value is at index 0, the next at index 1, and so on, as in array indexing. The index argument must be greater than or equal to 0, and less than the length of this sequence.
   *
   * @param {js.lang.Number} the index of the desired char value.
   * @return {js.lang.String} the char value at the specified index.
   * @throws {js.lang.IndexOutOfBoundsException} if index is negative or greater than or equal to length().
   */
  charAt: function(index) {
    var cursor = 0,
      ele = null;
    for (var i = 0, len = this._strings.length; i < len; i++) {
      ele = this._strings[i];

      if (Object.isNull(ele)) {
        continue;
      }

      if (!Object.isString(ele)) {
        ele = "" + ele;
      }

      var length = ele.length;
      cursor += length;
      if (cursor > index) {
        return ele.charAt(length - cursor + index);
      }
    }
    throw new js.lang.IndexOutOfBoundsException();
  },

  /** 
   * @function
   * @public 
   * @summary Returns the index within this string of the first occurrence of the specified substring.
   * @description Returns the index within this string of the first occurrence of the specified substring. The integer returned is the smallest value.
   *
   * @param {js.lang.String} any string.
   * @return {js.lang.String} if the string argument occurs as a substring within this object, then the index of the first character of the first such substring is returned; if it does not occur as a substring, -1 is returned.
   */
  indexOf: function(str) {
    return this._strings.join("").indexOf(str);
  },

  /** 
   * @function
   * @public 
   * @summary Returns the length (character count).
   * @description Returns the length (character count).
   *
   * @return {js.lang.Number} the length of the sequence of characters currently represented by this object
   */
  length: function() {
    var cursor = 0,
      ele = null;
    for (var i = 0, len = this._strings.length; i < len; i++) {
      ele = this._strings[i];
      if (Object.isNull(ele)) {
        continue;
      }

      if (!Object.isString(ele)) {
        ele = "" + ele;
      }

      cursor += ele.length;
    }
    return cursor;
  },

  /** 
   * @function
   * @public 
   * @summary Returns the length (character count).
   * @description Returns the length (character count).
   *
   * @return {js.lang.Number} the length of the sequence of characters currently represented by this object
   */
  getLength: function() {
    return this.length();
  },

  /** 
   * @function
   * @public 
   * @summary Returns a string representing the data in this sequence.
   * @description Returns a string representing the data in this sequence. A new String object is allocated and initialized to contain the character sequence currently represented by this object. This String is then returned. Subsequent changes to this sequence do not affect the contents of the String.
   *
   * @param {js.lang.String} the split quote among each sequence.
   * @return {js.lang.String} a string representation of this sequence of characters.
   */
  toString: function(sp) {
    return this._strings.join(sp || "");
  }
});