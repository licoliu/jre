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
   * @class js.util.Stack 
   * @extends {js.util.List}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * The Stack class represents a last-in-first-out (LIFO) stack of objects. 
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * The usual push and pop operations are provided, as well as a method to peek at the top item on the stack, a method to test for whether the stack is empty, and a method to search the stack for an item and discover how far it is from the top.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * When a stack is first created, it contains no items.
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
  return Class.forName( /** @lends js.util.Stack.prototype */ {
    name: "class js.util.Stack extends js.util.List",

    "private _table": [],
    "private _max": 10,

    Stack: function(max) {
      this._max = max || 10;
    },

    /** 
     * @function
     * @public 
     * @summary Returns a shallow copy of this stack instance.
     * @description Returns a shallow copy of this stack instance: the keys and values themselves are cloned.
     * @return {js.util.Stack} a shallow copy of this stack
     */
    "clone": function() {
      var c = new js.util.Stack(this._max);
      var it = this.iterator();
      while (it.hasNext()) {
        var next = it.next();
        it.add(next ? next.clone() : next);
      }
      return c;
    },

    /** 
     * @function
     * @public 
     * @summary Set the max length of the stack.
     * @description Set the max length of the stack.
     *
     * @param {js.lang.Number} max - the max length of the stack
     */
    setMaxLength: function(max) {
      this._max = max || 10;
    },

    /** 
     * @function
     * @public 
     * @summary Returns the number of components in this stack.
     * @description Returns the number of components in this stack.
     *
     * @return {js.lang.Number} the number of components in this stack
     */
    length: function() {
      return this._table.length;
    },

    /** 
     * @function
     * @public 
     * @summary Removes all of the elements from this Stack.
     * @description Removes all of the elements from this Stack.
     */
    clear: function() {
      var length = this.length();
      if (length > 0) {
        this._table.splice(0, length);
      }
    },

    /** 
     * @function
     * @public 
     * @summary Removes the object at the top of this stack and returns that object as the value of this function.
     * @description Removes the object at the top of this stack and returns that object as the value of this function.
     *
     * @return {js.lang.Object} The object at the top of this stack (the last item of the Vector object).
     */
    pop: function() {
      return this._table.pop();
    },

    /** 
     * @function
     * @public 
     * @summary Pushes an item onto the top of this stack.
     * @description Pushes an item onto the top of this stack. 
     *
     * @param {js.lang.Object} item - the item to be pushed onto this stack.
     * @return {js.lang.Object} the item argument.
     */
    push: function(item) {
      if (this.length() > this._max) {
        this._table.shift();
      }
      this._table.push(item);
      return item;
    },

    /** 
     * @function
     * @public 
     * @summary Tests if this stack is empty.
     * @description 
     *
     * @return {js.lang.Boolean} true if and only if this stack contains no items; false otherwise.
     */
    empty: function() {
      return this._table.length <= 0;
    },

    /** 
     * @function
     * @public 
     * @summary Looks at the object at the top of this stack without removing it from the stack.
     * @description Looks at the object at the top of this stack without removing it from the stack.
     *
     * @return {js.lang.Object} the object at the top of this stack (the last item of the Vector object).
     */
    peek: function() {
      if (this.empty()) {
        return null;
      }
      return this._table[this._table.length - 1];
    },

    /** 
     * @function
     * @public 
     * @summary Returns the 1-based position where an object is on this stack.
     * @description Returns the 1-based position where an object is on this stack. If the object o occurs as an item in this stack, this method returns the distance from the top of the stack of the occurrence nearest the top of the stack; the topmost item on the stack is considered to be at distance 1. The equals method is used to compare o to the items in this stack.
     *
     * @param {js.lang.Object} o - the desired object.
     * @return {js.lang.Number} the 1-based position from the top of the stack where the object is located; the return value -1 indicates that the object is not on the stack.
     */
    search: function(ele) {
      var index = this._table.indexOf(ele);
      return index != -1 ? (this.length() - index) : -1;
    },

    /** 
     * @function
     * @public 
     * @summary Returns the number of components in this stack.
     * @description Returns the number of components in this stack.
     *
     * @return {js.lang.Number} the number of components in this stack
     */
    "size": function() {
      return this.length();
    },

    /** 
     * @function
     * @public 
     * @summary Removes the element at the specified position in this Stack.
     * @description Removes the element at the specified position in this Stack. Shifts any subsequent elements to the left (subtracts one from their indices). Returns the element that was removed from the Stack.
     *
     * @param {js.lang.Number} index - the index of the element to be removed
     * @return {js.lang.Object} element that was removed
     */
    "removeAt": function(index) {
      this.rangeCheck();
      return this._table.splice(index, 1);
    },

    /** 
     * @function
     * @public 
     * @summary Returns the element at the specified position in this Stack.
     * @description 
     *
     * @param {js.lang.Number} index - index of the element to return
     * @return {js.lang.Object} object at the specified index
     */
    "get": function(index) {
      this.rangeCheck();
      return this._table[index];
    },

    /** 
     * @function
     * @public 
     * @summary Returns a view of the portion of this stack between fromIndex, inclusive, and toIndex, exclusive.
     * @description Returns a view of the portion of this List between fromIndex, inclusive, and toIndex, exclusive. (If fromIndex and toIndex are equal, the returned List is empty.) The returned List is backed by this List, so changes in the returned List are reflected in this List, and vice-versa. The returned List supports all of the optional List operations supported by this List.
     *
     * @param {js.lang.Number} fromIndex - low endpoint (inclusive) of the subList
     * @param {js.lang.Number} toIndex - high endpoint (exclusive) of the subList
     * @return {js.util.List} a view of the specified range within this List
     */
    "subList": function(fromIndex, toIndex) {
      var sublist = new js.util.Stack();
      sublist._table = this._table.slice(fromIndex, toIndex);
      return sublist;
    },

    /** 
     * @function
     * @public 
     * @summary Replaces the element at the specified position in this Vector with the specified element.
     * @description Replaces the element at the specified position in this Vector with the specified element.
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
    }
  }).getClassConstructor();

});