/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年10月13日
 */
define(function(require, exports, module) {

  /** 
   * @class js.util.Arrays
   * @extends {js.lang.Object}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * This class contains various methods for manipulating arrays (such as sorting and searching). This class also contains a static factory that allows arrays to be viewed as lists.
   * </p><p>
   * This interface is a member of the jsrt Collections Framework.
   * </p>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
  return Class.forName( /** @lends js.util.Arrays.prototype */ {
    name: "public class js.util.Arrays",

    // Suppresses default constructor, ensuring non-instantiability.
    "private Arrays": function() {},

    /** 
     * @name js.util.Arrays.reverse
     * @function
     * @public 
     * @static 
     * @summary The reverse() method reverses an array in place. The first array element becomes the last and the last becomes the first.
     * @description The reverse method transposes the elements of the calling array object in place, mutating the array, and returning a reference to the array.
     *
     * @param {js.lang.Array} original - an array
     * @return {js.lang.Array} The reversed array.
     */
    "public static reverse": function(original) {
      if (Object.isNull(original)) {
        return;
      }

      if (!Object.isArray(original)) {
        throw new js.lang.IllegalArgumentException(
          "Cannot reverse given Object as a Array");
      }

      original.reverse();
    },

    /** 
     * @name js.util.Arrays.sort
     * @function
     * @public 
     * @static 
     * @summary Sorts the specified array of objects according to the order induced by the specified comparator.
     * @description Sorts the specified array of objects according to the order induced by the specified comparator.
     *
     * @param {js.lang.Array} original - the array to be sorted
     * @param {js.lang.Boolean} desc - the comparator to determine the order of the array. A null value indicates that the elements' ascending ordering should be used.
     */
    "public static sort": function(original, desc) {
      if (Object.isNull(original)) {
        return;
      }

      if (!Object.isArray(original)) {
        throw new js.lang.IllegalArgumentException(
          "Cannot sort given Object as a Array");
      }

      /*
      for (var i = 0, len = original.length; i < len; i++) {
          var index = i;
          for (var j = i + 1; j < len; j++) {
              if ((!desc && original[index] > original[j]) || (desc && original[index] < original[j])) {
                  index = j;
              }
          }
          var c = original[i];
          original[i] = original[index];
          original[index] = c;
      }
      */

      if (desc) {
        original.sort(function(a, b) {
          return b - a;
        });
      } else {
        original.sort(function(a, b) {
          return a - b;
        });
      }
    },

    /** 
     * @name js.util.Arrays.sortBy
     * @function
     * @public 
     * @static 
     * @summary Sorts the specified array of objects according to the order induced by the specified comparator.
     * @description Sorts the specified array of objects according to the order induced by the specified comparator.
     *
     * @param {js.lang.Array} original - the array to be sorted
     * @param {js.lang.Function} fn -  the comparator to determine the order of the array. 
     */
    "public static sortBy": function(original, fn) {
      if (Object.isNull(original)) {
        return;
      }
      if (!Object.isArray(original))
        throw new js.lang.IllegalArgumentException(
          "Cannot sort given Object as a Array");

      original.sort(fn);
    },

    /** 
     * @name js.util.Arrays.copyOf
     * @function
     * @public 
     * @static 
     * @summary Copies the specified array, truncating or padding with nulls (if necessary) so the copy has the specified length.
     * @description Copies the specified array, truncating or padding with zeros (if necessary) so the copy has the specified length. For all indices that are valid in both the original array and the copy, the two arrays will contain identical values. For any indices that are valid in the copy but not the original, the copy will contain null. Such indices will exist if and only if the specified length is greater than that of the original array.
     *
     * @param {js.lang.Array} original - the array to be copied
     * @param {js.lang.Number} newLength - the length of the copy to be returned
     * @return {js.lang.Array} a copy of the original array, truncated or padded with zeros to obtain the specified length
     */
    "public static copyOf": function(original, newLength) {
      var copy = [];
      js.lang.System.arraycopy(original, 0, copy, 0, Math.min(original.length, newLength));
      return copy;
    },

    /** 
     * @name js.util.Arrays.copyOfRange
     * @function
     * @public 
     * @static 
     * @summary Copies the specified range of the specified array into a new array.
     * @description 
     * <p>Copies the specified range of the specified array into a new array. The initial index of the range (from) must lie between zero and original.length, inclusive. The value at original[from] is placed into the initial element of the copy (unless from == original.length or from == to). Values from subsequent elements in the original array are placed into subsequent elements in the copy. The final index of the range (to), which must be greater than or equal to from, may be greater than original.length, in which case null is placed in all elements of the copy whose index is greater than or equal to original.length - from. The length of the returned array will be to - from.
     * </p><p>The resulting array is of exactly the same class as the original array.
     * </p>
     *
     * @param {js.lang.Array} original - the array from which a range is to be copied
     * @param {js.lang.Number} from - the initial index of the range to be copied, inclusive
     * @param {js.lang.Number} to - the final index of the range to be copied, exclusive. (This index may lie outside the array.)
     * @return {js.lang.Array} a new array containing the specified range from the original array, truncated or padded with nulls to obtain the required length
     */
    "public static copyOfRange": function(original, from, to) {
      var newLength = to - from;
      if (newLength < 0)
        throw new js.lang.IllegalArgumentException(from + " > " + to);

      var copy = [];
      js.lang.System.arraycopy(original, from, copy, 0, Math.min(original.length - from, newLength));
      return copy;
    },

    /** 
     * @name js.util.Arrays.equals
     * @function
     * @public 
     * @static 
     * @summary Returns true if the two specified arrays of Objects are equal to one another.
     * @description 
     * <p>Returns <tt>true</tt> if the two specified arrays of booleans are
     * <i>equal</i> to one another. Two arrays are considered equal if both
     * arrays contain the same number of elements, and all corresponding pairs
     * of elements in the two arrays are equal. In other words, two arrays
     * are equal if they contain the same elements in the same order.  Also,
     * two array references are considered equal if both are <tt>null</tt>.</p>
     *
     * @param {js.lang.Array} a - one array to be tested for equality
     * @param {js.lang.Array} a2 - the other array to be tested for equality
     * @return {js.lang.Boolean} <tt>true</tt> if the two arrays are equal 
     */
    "public static equals": function(a, a2) {
      if (a == a2)
        return true;

      if (Object.isNull(a) || Object.isNull(a2))
        return false;

      if (!Object.isArray(a) || !Object.isArray(a2)) {
        throw new js.lang.IllegalArgumentException(
          "Only compare two arrays in the equals method");
      }

      var length = a.length;
      if (a2.length !== length)
        return false;

      for (var i = 0; i < length; i++) {
        var o1 = a[i];
        var o2 = a2[i];
        if (!(Object.isNull(o1) ? Object.isNull(o2) : o1.equals(o2)))
          return false;
      }

      return true;
    }
  }).getClassConstructor();
});