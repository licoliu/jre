/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 10, 2014
 */

/**
 * @class js.lang.Array
 * @extends {js.lang.Object}
 * @alias Array
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The JavaScript Array object is a global object that is used in the construction of arrays; which are high-level, list-like objects.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Arrays are list-like objects whose prototype has methods to perform traversal and mutation operations. Neither the length of a JavaScript array nor the types of its elements are fixed. Since an array's length can change at any time, and data can be stored at non-contiguous locations in the array, JavaScript arrays are not guaranteed to be dense; this depends on how the programmer chooses to use them. In general, these are convenient characteristics; but if these features are not desirable for your particular use, you might consider using typed arrays.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Some people think that you shouldn't use an array as an associative array. In any case, you can use plain objects instead, although doing so comes with its own caveats. See the post Lightweight JavaScript dictionaries with arbitrary keys as an example.
 *</p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.Array.prototype */ {
  name: "class Array",

  alias: "js.lang.Array",

  Array: function() {},

  /** 
   * @function
   * @public 
   * @summary Removes all of the elements from this array (optional operation).
   * @description Removes all of the elements from this array (optional operation). The array will be empty after this call returns.
   */
  clear: function() {
    this.splice(0, this.length);
  },

  /** 
   * @function
   * @public 
   * @summary Returns true if this array contains the specified element.
   * @description Returns true if this array contains the specified element. More formally, returns true if and only if this array contains at least one element e such that (o==null ? e==null : o.equals(e)).
   * 
   * @param {js.lang.Object} elem - element whose presence in this array is to be tested
   * @return {js.lang.Boolean} 
   */
  contains: function(elem) {
    return (this.indexOf2(elem) !== -1);
  },

  /** 
   * @function
   * @public 
   * @summary Returns the first (least) index of an element within the array equal to the specified value, or -1 if none is found.
   * @description indexOf() compares searchElement to elements of the Array using strict equality (the same method used by the === or triple-equals operator).
   *
   * @param {js.lang.Object} elem - Element to locate in the array.
   * @return {js.lang.Number} 
   */
  indexOf: Array.prototype.indexOf ? Array.prototype.indexOf : function(elem, start, end) {
    return this.indexOf2(elem, start, end);
  },

  /** 
   * @function
   * @public 
   * @summary Returns the index of the first occurrence of the specified element in this array, or -1 if this array does not contain the element.
   * @description Returns the index of the first occurrence of the specified element in this array, or -1 if this array does not contain the element. More formally, returns the lowest index i such that (o==null ? get(i)==null : o.equals(get(i))), or -1 if there is no such index.
   *
   * @param {(Object | js.lang.Function)} elem - element to search for or a function which decides the search result by its return value.
   * @param {js.lang.Number} start - The index to start the search at. If the index is greater than or equal to the array's length, -1 is returned, which means the array will not be searched. Note: if the provided index is negative, the array is still searched from front to back. If the calculated index is less than 0 or not set, then the whole array will be searched. Default: 0 (entire array is searched).
   * @param {js.lang.Number} end - The index to stop the search at. If the index is greater than the array's length, the index will be set to the array's length. If the provided index value is less than or equal to the start index, -1 is returned, which means the array will not be searched. Note: If the calculated index is not set, then the whole array will be searched. Default: the array's length (entire array is searched).
   * @return {js.lang.Number} 
   */
  indexOf2: function(elem, start, end) {
    for (var i = Math.max(start || 0, 0), len = Math.min(end || this.length, this.length); i < len; i++) {
      if (Object.isFunction(elem) ? elem(this[i]) :
        ((this[i] && Object.isFunction(this[i].equals)) ? this[i].equals(elem) : this[i] === elem)) {
        return i;
      }
    }
    return -1;
  },

  /** 
   * @function
   * @public 
   * @summary Removes the first occurrence of the specified element from this array, if it is present (optional operation).
   * @description Removes the first occurrence of the specified element from this array, if it is present (optional operation). If this array does not contain the element, it is unchanged. More formally, removes the element with the lowest index i such that (o==null ? get(i)==null : o.equals(get(i))) (if such an element exists). Returns true if this array contained the specified element (or equivalently, if this array changed as a result of the call).
   *
   * @param {js.lang.Object} elem - element to be removed from this array, if present
   * @return {js.lang.Boolean} true if this array contained the specified element
   */
  remove: function(elem) {
    var index = this.indexOf2(elem);
    if (index > -1) {
      this.splice(index, 1);
      return true;
    }
    return false;
  },

  /** 
   * @function
   * @public 
   * @summary Removes the element at the specified position in this array (optional operation).
   * @description Removes the element at the specified position in this array (optional operation). Shifts any subsequent elements to the left (subtracts one from their indices). Returns the element that was removed from the array.
   * 
   * @param {js.lang.Number} index - the index of the element to be removed
   * @return {js.lang.Object} the element previously at the specified position
   * @throws {js.lang.IndexOutOfBoundsException} if the index is out of range (index < 0 || index >= size())
   */
  removeByIndex: function(index) {
    if (index < 0 || index >= this.length) {
      throw new js.lang.IndexOutOfBoundsException();
    }
    return this.splice(index, 1)[0];
  },

  /** 
   * @function
   * @public 
   * @summary Replaces the element at the specified position in this array with the specified element (optional operation).
   * @description Replaces the element at the specified position in this array with the specified element (optional operation).
   *
   * @param {js.lang.Number} index - index of the element to replace
   * @param {js.lang.Number} elem - element to be stored at the specified position
   * @return {js.lang.Object} the element previously at the specified position
   * @throws {js.lang.IndexOutOfBoundsException} if the index is out of range (index < 0 || index >= size())
   */
  set: function(index, elem) {
    if (index < 0 || index >= this.length) {
      throw new js.lang.IndexOutOfBoundsException();
    }
    var element = this[index];
    this[index] = elem;
    return element;
  },

  /** 
   * @function
   * @public 
   * @summary Returns the element at the specified position in this array.
   * @description Returns the element at the specified position in this array.
   *
   * @param {js.lang.Number} index - index of the element to return
   * @return {js.lang.Object} the element at the specified position in this array
   * @throws {js.lang.IndexOutOfBoundsException} if the index is out of range (index < 0 || index >= size())
   */
  get: function(index) {
    if (index < 0 || index >= this.length) {
      throw new js.lang.IndexOutOfBoundsException();
    }
    return this[index];
  },

  /** 
   * @function
   * @public 
   * @summary Get the first element of this array.
   * @description Get the first element of this array.
   *
   * @return {js.lang.Object} the element at the first position in this array
   */
  first: function() {
    return this.length > 0 ? this[0] : null;
  },

  /** 
   * @function
   * @public 
   * @summary Get the last element of this array.
   * @description Get the last element of this array.
   *
   * @return {js.lang.Object} the element at the last position in this array
   */
  last: function() {
    return this.length > 0 ? this[this.length - 1] : null;
  },

  /** 
   * @function
   * @public 
   * @summary Appends the given array to this array at the last position.
   * @description 
   *
   * @param {js.lang.Array} array - array to be appended
   * @param {js.lang.Number} start - the start position of the given array to be inserted
   * @param {js.lang.Number} end - the end position of the given array to be inserted
   * @return {js.lang.Array} this array
   */
  append: function(array, start, end) {
    if (!Object.isEmpty(array) && Object.isArray(array)) {
      start = start || 0;
      end = Math.min(end || array.length, array.length);

      if (end > start) {
        //end = (end && end > start && end < array.length) ? end : array.length;
        var parameter = Array.prototype.slice.call(array, start, end);
        Array.prototype.splice.call(parameter, 0, 0, this.length, 0);
        Array.prototype.splice.apply(this, parameter);
      }
    }
    return this;
  },

  /** 
   * @function
   * @public 
   * @summary Inserts the given array into this array at the first position.
   * @description 
   *
   * @param {js.lang.Array} array - array to be inserted
   * @param {js.lang.Number} start - the start position of the given array to be inserted
   * @param {js.lang.Number} end - the end position of the given array to be inserted
   * @return {js.lang.Array} this array
   */
  insert: function(array, start, end) {
    if (!Object.isEmpty(array) && Object.isArray(array)) {
      start = start || 0;
      end = Math.min(end || array.length, array.length);

      if (end > start) {
        //end = (end && end > start && end < array.length) ? end : array.length;
        var parameter = Array.prototype.slice.call(array, start, end);
        Array.prototype.splice.call(parameter, 0, 0, 0, 0);
        Array.prototype.splice.apply(this, parameter);
      }
    }
    return this;
  },

  /** 
   * @function
   * @public 
   * @summary Returns the number of elements in this array.
   * @description 
   *
   * @return {js.lang.Object} the number of elements in this array
   */
  getLength: function() {
    return this.length;
  },

  /** 
   * @function
   * @public 
   * @summary Returns the number of elements in this array.
   * @description 
   *
   * @return {js.lang.Object} the number of elements in this array
   */
  size: function() {
    return this.getLength();
  },

  /** 
   * @function
   * @public 
   * @summary The concat() method returns a new array comprised of the array on which it is called joined with the array(s) and/or value(s) provided as arguments.
   * @description 
   * <p>
   * concat creates a new array consisting of the elements in the object on which it is called, followed in order by, for each argument, the elements of that argument (if the argument is an array) or the argument itself (if the argument is not an array).
   * </p><p>
   * concat does not alter this or any of the arrays provided as arguments but instead returns a shallow copy that contains copies of the same elements combined from the original arrays. Elements of the original arrays are copied into the new array as follows:
   * </p><p>
   * Object references (and not the actual object): concat copies object references into the new array. Both the original and new array refer to the same object. That is, if a referenced object is modified, the changes are visible to both the new and original arrays.
   * </p><p>
   * Strings, numbers and booleans (not String, Number, and Boolean objects): concat copies the values of strings and numbers into the new array.
   * </p>
   *  
   * @param {js.lang.Array|js.lang.Object} valueN - Arrays and/or values to concatenate into a new array. See the description below for details.
   * @return {js.lang.Array} A new Array instance.
   */
  concat: Array.prototype.concat,

  /** 
   * @function
   * @public 
   * @summary The join() method joins all elements of an array into a string.
   * @description The string conversions of all array elements are joined into one string. If an element is undefined or null, it is converted to the empty string.
   *
   * @param {js.lang.String} separator - Optional. Specifies a string to separate each element of the array. The separator is converted to a string if necessary. If omitted, the array elements are separated with a comma. If separator is an empty string, all elements are joined without any characters in between them.
   * @return {js.lang.String} A string with all array elements joined.
   */
  join: Array.prototype.join,

  /** 
   * @function
   * @public 
   * @summary The pop() method removes the last element from an array and returns that element.
   * @description 
   * <p>
   * The pop method removes the last element from an array and returns that value to the caller.
   * </p><p>
   * pop is intentionally generic; this method can be called or applied to objects resembling arrays. Objects which do not contain a length property reflecting the last in a series of consecutive, zero-based numerical properties may not behave in any meaningful manner.
   * </p><p>
   * If you call pop() on an empty array, it returns undefined.
   * </p>
   
   * @return {js.lang.Object} The last element from the array; undefined if the array is empty.
   */
  pop: Array.prototype.pop,

  /** 
   * @function
   * @public 
   * @summary The push() method adds one or more elements to the end of an array and returns the new length of the array.
   * @description 
   * <p>
   * The push method appends values to an array.
   * </p><p>
   * push is intentionally generic. This method can be used with call() or apply() on objects resembling arrays. The push method relies on a length property to determine where to start inserting the given values. If the length property cannot be converted into a number, the index used is 0. This includes the possibility of length being nonexistent, in which case length will also be created.
   * </p><p>
   * The only native, array-like objects are strings, although they are not suitable in applications of this method, as strings are immutable.
   * </p>
   *
   * @param {js.lang.Object} elementN - The elements to add to the end of the array.
   * @return {js.lang.Number} The new length property of the object upon which the method was called.
   */
  push: Array.prototype.push,

  /** 
   * @function
   * @public 
   * @summary The reverse() method reverses an array in place. The first array element becomes the last and the last becomes the first.
   * @description The reverse method transposes the elements of the calling array object in place, mutating the array, and returning a reference to the array.
   *
   * @return {js.lang.Array} The reversed array.
   */
  reverse: Array.prototype.reverse,

  /** 
   * @function
   * @public 
   * @summary The shift() method removes the first element from an array and returns that element. This method changes the length of the array.
   * @description 
   * <p>
   * The shift method removes the element at the zeroeth index and shifts the values at consecutive indexes down, then returns the removed value. If the length property is 0, undefined is returned.
   * </p><p>
   * shift is intentionally generic; this method can be called or applied to objects resembling arrays. Objects which do not contain a length property reflecting the last in a series of consecutive, zero-based numerical properties may not behave in any meaningful manner.
   * </p>
   *
   * @return {js.lang.Object} The removed element.
   */
  shift: Array.prototype.shift,

  /** 
   * @function
   * @public 
   * @summary The slice() method returns a shallow copy of a portion of an array into a new array object.
   * @description 
   * <p>
   * slice does not alter. It returns a shallow copy of elements from the original array. Elements of the original array are copied into the returned array as follows:
   * <ul>
   * <li>For object references (and not the actual object), slice copies object references into the new array. Both the original and new array refer to the same object. If a referenced object changes, the changes are visible to both the new and original arrays.</li>
   * <li>For strings, numbers and booleans (not String, Number and Boolean objects), slice copies the values into the new array. Changes to the string, number or boolean in one array does not affect the other array.</li>
   * </ul>
   * If a new element is added to either array, the other array is not affected.
   * </p>
   *
   * @param {js.lang.Number} begin - Zero-based index at which to begin extraction. As a negative index, begin indicates an offset from the end of the sequence. slice(-2) extracts the last two elements in the sequence. If begin is undefined, slice begins from index 0.
   * @param {js.lang.Number} end - Zero-based index at which to end extraction. slice extracts up to but not including end. slice(1,4) extracts the second element through the fourth element (elements indexed 1, 2, and 3). As a negative index, end indicates an offset from the end of the sequence. slice(2,-1) extracts the third element through the second-to-last element in the sequence. If end is omitted, slice extracts through the end of the sequence (arr.length).
   * @return {js.lang.Array} A new array containing the extracted elements.
   */
  slice: Array.prototype.slice,

  /** 
   * @function
   * @public 
   * @summary The sort() method sorts the elements of an array in place and returns the array. The sort is not necessarily stable. The default sort order is according to string Unicode code points.
   * @description 
   * <p>
   * If compareFunction is not supplied, elements are sorted by converting them to strings and comparing strings in Unicode code point order. For example, "Banana" comes before "cherry". In a numeric sort, 9 comes before 80, but because numbers are converted to strings, "80" comes before "9" in Unicode order.
   * If compareFunction is supplied, the array elements are sorted according to the return value of the compare function. If a and b are two elements being compared, then:
   * <ul>
   * <li>If compareFunction(a, b) is less than 0, sort a to a lower index than b, i.e. a comes first.</li>
   * <li>If compareFunction(a, b) returns 0, leave a and b unchanged with respect to each other, but sorted with respect to all different elements. Note: the ECMAscript standard does not guarantee this behaviour, and thus not all browsers (e.g. Mozilla versions dating back to at least 2003) respect this.</li>
   * <li>If compareFunction(a, b) is greater than 0, sort b to a lower index than a.</li>
   * <li>compareFunction(a, b) must always return the same value when given a specific pair of elements a and b as its two arguments. If inconsistent results are returned then the sort order is undefined.</li>
   * </ul>
   * To compare numbers instead of strings, the compare function can simply subtract b from a. The following function will sort the array ascending (if it doesn't contain Infinity and NaN).
   * </p>
   *
   * @param {js.lang.Function} compareFunction - Optional. Specifies a function that defines the sort order. If omitted, the array is sorted according to each character's Unicode code point value, according to the string conversion of each element.
   * @return {js.lang.Array} - The sorted array.
   */
  sort: Array.prototype.sort,

  /** 
   * @function
   * @public 
   * @summary The splice() method changes the content of an array by removing existing elements and/or adding new elements.
   * @description If you specify a different number of elements to insert than the number you're removing, the array will have a different length at the end of the call.
   *
   * @param {js.lang.Number} start - Index at which to start changing the array (with origin 0). If greater than the length of the array, actual starting index will be set to the length of the array. If negative, will begin that many elements from the end.
   * @param {js.lang.Number} deleteCount - An integer indicating the number of old array elements to remove. If deleteCount is 0, no elements are removed. In this case, you should specify at least one new element. If deleteCount is greater than the number of elements left in the array starting at start, then all of the elements through the end of the array will be deleted. If deleteCount is omitted, deleteCount will be equal to (arr.length - start).
   * @param {js.lang.Object} item1, item2, ... - The elements to add to the array, beginning at the start index. If you don't specify any elements, splice() will only remove elements from the array.
   * @return {js.lang.Object} An array containing the deleted elements. If only one element is removed, an array of one element is returned. If no elements are removed, an empty array is returned.
   */
  splice: Array.prototype.splice,

  /** 
   * @function
   * @public 
   * @summary The toSource() method returns a string representing the source code of the array.
   * @description This method is usually called internally by JavaScript and not explicitly in code. You can call toSource while debugging to examine the contents of an array.
   *
   * @return {js.lang.String} A string representing the source code of the array.
   */
  toSource: Array.prototype.toSource,

  /** 
   * @function
   * @public 
   * @summary The toString() method returns a string representing the specified array and its elements.
   * @description The Array object overrides the toString method of Object. For Array objects, the toString method joins the array and returns one string containing each array element separated by commas. For example, the following code creates an array and uses toString to convert the array to a string. JavaScript calls the toString method automatically when an array is to be represented as a text value or when an array is referred to in a string concatenation.
   *
   * @return {js.lang.Object} A string representing the elements of the array.
   */
  toString: Array.prototype.toString,

  /** 
   * @function
   * @public 
   * @summary 把数组转换为本地数组，并返回结果。
   * @description 
   *
   * @return {js.lang.Object} 
   */
  toLocaleString: Array.prototype.toLocaleString,

  /** 
   * @function
   * @public 
   * @summary The unshift() method adds one or more elements to the beginning of an array and returns the new length of the array.
   * @description 
   * <p>
   * The unshift method inserts the given values to the beginning of an array-like object.
   * </p><p> 
   * unshift is intentionally generic; this method can be called or applied to objects resembling arrays. Objects which do not contain a length property reflecting the last in a series of consecutive, zero-based numerical properties may not behave in any meaningful manner.
   * </p>
   *
   * @parma {js.lang.Object} elementN - The elements to add to the front of the array.
   * @return {js.lang.Number}  The new length property of the object upon which the method was called.
   */
  unshift: Array.prototype.unshift,

  /** 
   * @function
   * @public 
   * @summary 返回数组对象的原始值
   * @description 
   *
   * @return {js.lang.Object} 
   */
  valueOf: Array.prototype.valueOf
});