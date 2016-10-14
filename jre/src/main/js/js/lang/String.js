/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 10, 2014
 */

/** 
 * @class js.lang.String 
 * @extends {js.lang.Object}
 * @alias String
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * JavaScript strings are used for storing and manipulating text.
 * </p><br/>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.String.prototype */ {
  name: "class String",

  alias: "js.lang.String",

  String: function() {},

  /** 
   * @function
   * @public 
   * @summary Returns a string whose value is this string, with any leading and trailing whitespace removed.
   * @description Returns a string whose value is this string, with any leading and trailing whitespace removed.
   *
   * @return {js.lang.String} 
   */
  "trim": function() {
    var re = /^\s+|\s+$/g;
    return function() {
      return this.replace(re, "");
    };
  }(),

  /** 
   * @function
   * @public 
   * @summary Compares this string to the specified object. The result is true if and only if the argument is not null and is a String object that represents the same sequence of characters as this object.
   * @description Compares this string to the specified object. The result is true if and only if the argument is not null and is a String object that represents the same sequence of characters as this object.
   *
   * @return {js.lang.Boolean} 
   */
  "equals": function(s) {
    return Object.isString(s) && this == s;
  },

  /** 
   * @function
   * @public 
   * @summary Returns the length of this string.
   * @description Returns the length of this string.
   *
   * @return {js.lang.Boolean} 
   */
  getLength: function() {
    return this.length;
  },

  /** 
   * @function
   * @public 
   * @summary Tests if this string ends with the specified suffix.
   * @description Tests if this string ends with the specified suffix.
   *
   * @return {js.lang.Boolean} 
   */
  endsWith: function(str) {
    return new RegExp(str + "$").test(this);
  },

  /** 
   * @function
   * @public 
   * @summary The charAt() method returns the specified character from a string.
   * @description 
   * <p>
   * Characters in a string are indexed from left to right. The index of the first character is 0, and the index of the last character in a string called stringName is stringName.length - 1. If the index you supply is out of range, JavaScript returns an empty string.
   * </p><p>
   * If no index is provided to .charAt(), 0 will be used as default.
   * </p>
   *
   * @param {js.lang.Number} index - An integer between 0 and 1-less-than the length of the string. If no index is provided, charAt() will use 0.
   * @return {js.lang.String} A string representing the character at the specified index; empty string if index is out of range.
   */
  charAt: String.prototype.charAt,

  /** 
   * @function
   * @public 
   * @summary The charCodeAt() method returns an integer between 0 and 65535 representing the UTF-16 code unit at the given index (the UTF-16 code unit matches the Unicode code point for code points representable in a single UTF-16 code unit, but might also be the first code unit of a surrogate pair for code points not representable in a single UTF-16 code unit, e.g. Unicode code points > 0x10000). If you want the entire code point value, use codePointAt().
   * @description 
   * <p>
   * Unicode code points range from 0 to 1114111 (0x10FFFF). The first 128 Unicode code points are a direct match of the ASCII character encoding. For information on Unicode, see the JavaScript Guide.
   * </p><p>
   * Note that charCodeAt() will always return a value that is less than 65536. This is because the higher code points are represented by a pair of (lower valued) "surrogate" pseudo-characters which are used to comprise the real character. Because of this, in order to examine or reproduce the full character for individual characters of value 65536 and above, for such characters, it is necessary to retrieve not only charCodeAt(i), but also charCodeAt(i+1) (as if examining/reproducing a string with two letters), or to use codePointAt(i) instead. See example 2 and 3 below.
   * </p><p>
   * charCodeAt() returns NaN if the given index is less than 0 or is equal to or greater than the length of the string.
   * </p><p>
   * Backward compatibilty: In historic versions (like JavaScript 1.2) the charCodeAt() method returns a number indicating the ISO-Latin-1 codeset value of the character at the given index. The ISO-Latin-1 codeset ranges from 0 to 255. The first 0 to 127 are a direct match of the ASCII character set.
   * </p>
   *
   * @param {js.lang.Number} index - An integer greater than or equal to 0 and less than the length of the string; if it is not a number, it defaults to 0.
   * @return {js.lang.Number} A number representing the UTF-16 code unit value of the character at the given index; NaN if index is out of range.
   */
  charCodeAt: String.prototype.charCodeAt,

  /** 
   * @function
   * @public 
   * @summary The concat() method combines the text of one or more strings and returns a new string.
   * @description The concat() function combines the text from one or more strings and returns a new string. Changes to the text in one string do not affect the other string.
   *
   * @param {js.lang.String} string2...stringN - Strings to concatenate to this string.
   * @return {js.lang.String} A new string containing the combined text of the strings provided.
   */
  concat: String.prototype.concat,

  /** 
   * @function
   * @public 
   * @summary The indexOf() method returns the index within the calling String object of the first occurrence of the specified value, starting the search at fromIndex. Returns -1 if the value is not found.
   * @description Characters in a string are indexed from left to right. The index of the first character is 0, and the index of the last character of a string called stringName is stringName.length - 1.
   *
   * @param {js.lang.String} searchValue - A string representing the value to search for.
   * @param {js.lang.Number} fromIndex - Optional, The index at which to start the searching forwards in the string. It can be any integer. The default value is 0. If fromIndex <= 0 the entire string is searched. If fromIndex >= str.length, the string is not searched and -1 is returned. Unless searchValue is an empty string, then str.length is returned.
   * @return {js.lang.Number} The index of the first occurrence of the specified value; -1 if not found. The indexOf() method is case sensitive. For example, the following expression returns -1:
   */
  indexOf: String.prototype.indexOf,

  /** 
   * @function
   * @public 
   * @summary The lastIndexOf() method returns the index within the calling String object of the last occurrence of the specified value, searching backwards from fromIndex. Returns -1 if the value is not found.
   * @description Characters in a string are indexed from left to right. The index of the first character is 0, and the index of the last character is str.length - 1. The lastIndexOf() method is case sensitive. For example, the following expression returns -1:
   *
   * @param {js.lang.String} searchValue - A string representing the value to search for. If searchValue is an empty string, then fromIndex is returned.
   * @param {js.lang.Number} fromIndex - Optional, The index at which to start searching backwards in the string. Starting with this index, the left part of the string will be searched. It can be any integer. The default value is +Infinity. If fromIndex >= str.length, the whole string is searched. If fromIndex < 0,  the behavior will be the same as if it would be 0.
   * @return {js.lang.Number} The index of the last occurrence of the specified value; -1 if not found.
   */
  lastIndexOf: String.prototype.lastIndexOf,

  /** 
   * @function
   * @public 
   * @summary The match() method retrieves the matches when matching a string against a regular expression.
   * @description 
   * <p>
   * If the regular expression does not include the g flag, returns the same result as RegExp.exec(). The returned Array has an extra input property, which contains the original string that was parsed. In addition, it has an index property, which represents the zero-based index of the match in the string.
   * </p><p>
   * If the regular expression includes the g flag, the method returns an Array containing all matched substrings rather than match objects. Captured groups are not returned. If there were no matches, the method returns null.
   * </p>
   *
   * @param {js.lang.RegExp} regexp - A regular expression object. If a non-RegExp object obj is passed, it is implicitly converted to a RegExp by using new RegExp(obj).
   * @return {js.lang.Array} An Array containing the entire match result and any parentheses-captured matched results; null if there were no matches.
   */
  match: String.prototype.match,

  /** 
   * @function
   * @public 
   * @summary The replace() method returns a new string with some or all matches of a pattern replaced by a replacement. The pattern can be a string or a RegExp, and the replacement can be a string or a function to be called for each match.
   * @description 
   * <p>This method does not change the String object it is called on. It simply returns a new string.</p>
   * <p>To perform a global search and replace, include the g switch in the regular expression.</p>
   *
   * @param {js.lang.RegExp|js.lang.String} regexp | substr (pattern) - 
   * <p>A RegExp object or literal. The match is replaced by the return value of parameter #2.</p>
   * <p>A String that is to be replaced by newSubStr. It is treated as a verbatim string and is not interpreted as a regular expression. Only the first occurrence will be replaced.</p>
   * @param {js.lang.String|js.lang.Function} newSubStr | function (replacement) - 
   * <p>The String that replaces the substring received from parameter #1. A number of special replacement patterns are supported; see the "Specifying a string as a parameter" section below.</p>
   * <p>function to be invoked to create the new substring (to put in place of the substring received from parameter #1). The arguments supplied to this function are described in the "Specifying a function as a parameter" section below.</p>
   * @return {js.lang.String} A new string with some or all matches of a pattern replaced by a replacement.
   */
  replace: String.prototype.replace,

  /** 
   * @function
   * @public 
   * @summary The search() method executes a search for a match between a regular expression and this String object.
   * @description When you want to know whether a pattern is found and also its index in a string use search() (if you only want to know it exists, use the similar test() method, which returns a boolean); for more information (but slower execution) use match() (similar to the regular expression exec() method).
   *
   * @param {js.lang.RegExp} regexp - A regular expression object. If a non-RegExp object obj is passed, it is implicitly converted to a RegExp by using new RegExp(obj).
   * @return {js.lang.Number} The index of the first match between the regular expression and the given string; if not found, -1.
   */
  search: String.prototype.search,

  /** 
   * @function
   * @public 
   * @summary 
   * @description 
   *
   * @return {js.lang.String} 
   */
  slice: String.prototype.slice,

  /** 
   * @function
   * @public 
   * @summary The split() method splits a String object into an array of strings by separating the string into substrings.
   * @description 
   * <p>When found, separator is removed from the string and the substrings are returned in an array. If separator is not found or is omitted, the array contains one element consisting of the entire string. If separator is an empty string, str is converted to an array of characters.
   * <p>If separator is a regular expression that contains capturing parentheses, then each time separator is matched, the results (including any undefined results) of the capturing parentheses are spliced into the output array. However, not all browsers support this capability.
   *
   * @param {js.lang.String} separator - Optional. Specifies the character(s) to use for separating the string. The separator is treated as a string or a regular expression. If separator is omitted, the array returned contains one element consisting of the entire string. If separator is an empty string, str is converted to an array of characters.
   * @param {js.lang.Number} limit - Optional. Integer specifying a limit on the number of splits to be found. The split() method still splits on every match of separator, until the number of split items match the limit or the string falls short of separator.
   * @return {js.lang.Array} An array of strings split at each point where the separator occurs in the given string.
   */
  split: String.prototype.split,

  /** 
   * @function
   * @public 
   * @summary The substr() method returns the characters in a string beginning at the specified location through the specified number of characters. 
   * @description 
   * <p>
   * start is a character index. The index of the first character is 0, and the index of the last character is 1 less than the length of the string. substr() begins extracting characters at start and collects length characters (unless it reaches the end of the string first, in which case it will return fewer).
   * <p></p>
   * If start is positive and is greater than or equal to the length of the string, substr() returns an empty string.
   * <p></p>
   * If start is negative, substr() uses it as a character index from the end of the string. If start is negative and abs(start) is larger than the length of the string, substr() uses 0 as the start index. Note: the described handling of negative values of the start argument is not supported by Microsoft JScript.
   * <p></p>
   * If length is 0 or negative, substr() returns an empty string. If length is omitted, substr() extracts characters to the end of the string.
   * <p>
   * 
   * @param {js.lang.Number} start - Location at which to begin extracting characters. If a negative number is given, it is treated as strLength + start where strLength is the length of the string (for example, if start is -3 it is treated as strLength - 3.)
   * @param {js.lang.Number} length - Optional. The number of characters to extract.
   * @return {js.lang.String} A new string containing the extracted section of the given string. If length is 0 or a negative number, an empty string is returned.
   */
  substr: String.prototype.substr,

  /** 
   * @function
   * @public 
   * @summary The substring() method returns a subset of a string between one index and another, or through the end of the string.
   * @description 
   * <p>
   * substring() extracts characters from indexStart up to but not including indexEnd. In particular:
   * <li>If indexStart equals indexEnd, substring() returns an empty string.</li>
   * <li>If indexEnd is omitted, substring() extracts characters to the end of the string.</li>
   * <li>If either argument is less than 0 or is NaN, it is treated as if it were 0.</li>
   * <li>If either argument is greater than stringName.length, it is treated as if it were stringName.length.</li>
   * If indexStart is greater than indexEnd, then the effect of substring() is as if the two arguments were swapped; for example, str.substring(1, 0) == str.substring(0, 1).
   * </p>
   * 
   * @param {js.lang.Number} indexStart - An integer between 0 and the length of the string, specifying the offset into the string of the first character to include in the returned substring.
   * @param {js.lang.Number} indexEnd - Optional. An integer between 0 and the length of the string, which specifies the offset into the string of the first character not to include in the returned substring.
   * @return {js.lang.String} A new string containing the extracted section of the given string.
   */
  substring: String.prototype.substring,

  /** 
   * @function
   * @public 
   * @summary The toLowerCase() method returns the calling string value converted to lower case.
   * @description The toLowerCase() method returns the value of the string converted to lower case. toLowerCase() does not affect the value of the string str itself.
   *
   * @return {js.lang.String} A new string representing the calling string converted to lower case.
   */
  toLowerCase: String.prototype.toLowerCase,

  /** 
   * @function
   * @public 
   * @summary A new string representing the calling string converted to upper case.
   * @description The toUpperCase() method returns the value of the string converted to upper case. toUpperCase() does not affect the value of the string itself.
   *
   * @return {js.lang.String} A new string representing the calling string converted to upper case.
   */
  toUpperCase: String.prototype.toUpperCase

});