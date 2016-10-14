/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 11, 2014
 */
define(function(require, exports, module) {

  require("bootstrap!js.util.List");

  /** 
   * @class js.util.ArrayList
   * @extends {js.util.List}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Implements all optional list operations, and permits all elements, including null.
   * </p><p>
   * This interface is a member of the jsrt Collections Framework.
   * </p>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
  return Class.forName( /** @lends js.util.ArrayList.prototype */ {
    name: "class js.util.ArrayList extends js.util.List",
    "private _table": [],

    /** 
     * @function
     * @public 
     * @summary Appends the specified element to the end of this list if only one parameter was given. Otherwise, when we get position and element parameters, inserts the specified element at the specified position in this list. Shifts the element currently at that position (if any) and any subsequent elements to the right (adds one to their indices).
     * @description Appends the specified element to the end of this list if only one parameter was given. Otherwise, when we get position and element parameters, inserts the specified element at the specified position in this list. Shifts the element currently at that position (if any) and any subsequent elements to the right (adds one to their indices).
     *
     * @param {js.lang.Number} index(optional) - index at which the specified element is to be inserted
     * @param {js.lang.Object} e - element to be appended to this list
     */
    "add": function() {
      // index, element
      var index = null,
        element = null;
      if (arguments.length >= 2 && !Object.isEmpty(arguments[0]) && Object.isNumber(arguments[0])) {
        index = arguments[0];
        element = arguments[1];
      } else if (arguments.length > 0) {
        element = arguments[0];
        index = this.size();
      }
      if (index != this.size()) {
        this.rangeCheck(index);
      }
      this._table.splice(index, 0, element);
    },

    /** 返回此列表 fromIndex（包括）和 toIndex（不包括）之间部分的视图。 */
    /** 
     * @function
     * @public 
     * @summary Returns a view of the portion of this list between the specified fromIndex, inclusive, and toIndex, exclusive.
     * @description 
     * </p><p>
     * Returns a view of the portion of this list between the specified fromIndex, inclusive, and toIndex, exclusive. (If fromIndex and toIndex are equal, the returned list is empty.) The returned list is backed by this list, so non-structural changes in the returned list are reflected in this list, and vice-versa. The returned list supports all of the optional list operations supported by this list.
     * </p><p>
     * This method eliminates the need for explicit range operations (of the sort that commonly exist for arrays). Any operation that expects a list can be used as a range operation by passing a subList view instead of a whole list. For example, the following idiom removes a range of elements from a list:
     * </p><p><code>
     *      list.subList(from, to).clear();
     * </code></p><p>
     * Similar idioms may be constructed for indexOf and lastIndexOf, and all of the algorithms in the Collections class can be applied to a subList.
     * </p><p>
     * The semantics of the list returned by this method become undefined if the backing list (i.e., this list) is structurally modified in any way other than via the returned list. (Structural modifications are those that change the size of this list, or otherwise perturb it in such a fashion that iterations in progress may yield incorrect results.)
     * </p>
     *
     * @param {js.lang.Number} fromIndex - low endpoint (inclusive) of the subList
     * @param {js.lang.Number} toIndex - high endpoint (exclusive) of the subList
     * @return {js.util.List} a view of the specified range within this list
     * @throws {js.lang.UnsupportedOperationException}
     */
    subList: function(fromIndex, toIndex) {
      var sublist = new js.util.ArrayList();
      sublist._table = this._table.slice(fromIndex, toIndex);
      return sublist;
    },

    /** 
     * @function
     * @public 
     * @summary Replaces the element at the specified position in this list with the specified element.
     * @description Replaces the element at the specified position in this list with the specified element.
     *
     * @param {js.lang.Number} index - index of the element to replace
     * @param {js.lang.Object} element - element to be stored at the specified position
     * @return {js.lang.Object} the element previously at the specified position
     */
    "set": function(index, element) {
      this.rangeCheck(index);
      var oldValue = this._table[index];
      this._table[index] = element;
      return oldValue;
    },

    /** 
     * @function
     * @public 
     * @summary Returns the element at the specified position in this list.
     * @description Returns the element at the specified position in this list.
     *
     * @param {js.lang.Number} index - index of the element to return
     * @return {js.lang.Object} the element at the specified position in this list
     */
    "get": function(index) {
      this.rangeCheck(index);
      return this._table[index];
    },

    /** 
     * @function
     * @public 
     * @summary Removes the element at the specified position in this list.
     * @description Removes the element at the specified position in this list. Shifts any subsequent elements to the left (subtracts one from their indices).
     *
     * @param {js.lang.Number} index - the index of the element to be removed
     * @return {js.lang.Object} the element that was removed from the list
     */
    removeAt: function(index) {
      return this._table.splice(index, 1)[0];
    },

    /** 
     * @function
     * @public 
     * @summary Returns the number of elements in this list.
     * @description Returns the number of elements in this list.
     *
     * @return {js.lang.Number} the number of elements in this list
     */
    "size": function() {
      return this._table.length;
    }
  }).getClassConstructor();
});