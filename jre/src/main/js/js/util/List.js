/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 11, 2014
 */
define(function(require, exports, module) {

  require("bootstrap!js.util.Collection");
  require("bootstrap!js.util.Iterator");

  Class.forName({
    name: "class js.util.ListIterator extends js.util.Iterator",

    ListIterator: function(element, index) {
      this._element = element;
      this._cursor = index || 0;
    },

    "hasPrevious": function() {
      return this._cursor > 0;
    },

    "previous": function() {
      try {
        var i = this._cursor - 1,
          previous = this._element.get(i);
        this._lastRet = this._cursor = i;
        return previous;
      } catch (e) {
        throw new js.lang.IndexOutOfBoundsException();
      }
    },

    "nextIndex": function() {
      return this._cursor;
    },

    "previousIndex": function() {
      return this._cursor - 1;
    }
  });

  /** 
   * @abstract
   * @class js.util.List
   * @extends {js.util.Collection}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * An ordered collection (also known as a sequence). The user of this interface has precise control over where in the list each element is inserted. The user can access elements by their integer index (position in the list), and search for elements in the list.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Unlike sets, lists typically allow duplicate elements. More formally, lists typically allow pairs of elements e1 and e2 such that e1.equals(e2), and they typically allow multiple null elements if they allow null elements at all. It is not inconceivable that someone might wish to implement a list that prohibits duplicates, by throwing runtime exceptions when the user attempts to insert them, but we expect this usage to be rare.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * The List interface places additional stipulations, beyond those specified in the Collection interface, on the contracts of the iterator, add, remove, equals, and hashCode methods. Declarations for other inherited methods are also included here for convenience.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * The List interface provides four methods for positional (indexed) access to list elements. Lists (like javascript array) are zero based. Note that these operations may execute in time proportional to the index value for some implementations (the LinkedList class, for example). Thus, iterating over the elements in a list is typically preferable to indexing through it if the caller does not know the implementation.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * The List interface provides a special iterator, called a ListIterator, that allows element insertion and replacement, and bidirectional access in addition to the normal operations that the Iterator interface provides. A method is provided to obtain a list iterator that starts at a specified position in the list.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * The List interface provides two methods to search for a specified object. From a performance standpoint, these methods should be used with caution. In many implementations they will perform costly linear searches.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * The List interface provides two methods to efficiently insert and remove multiple elements at an arbitrary point in the list.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Note: While it is permissible for lists to contain themselves as elements, extreme caution is advised: the equals and hashCode methods are no longer well defined on such a list.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Some list implementations have restrictions on the elements that they may contain. For example, some implementations prohibit null elements, and some have restrictions on the types of their elements. Attempting to add an ineligible element throws an unchecked exception, typically NullPointerException or ClassCastException. Attempting to query the presence of an ineligible element may throw an exception, or it may simply return false; some implementations will exhibit the former behavior and some will exhibit the latter. More generally, attempting an operation on an ineligible element whose completion would not result in the insertion of an ineligible element into the list may throw an exception or it may succeed, at the option of the implementation. Such exceptions are marked as "optional" in the specification for this interface.
   * </p><p>
   * This interface is a member of the jsrt Collections Framework.
   * </p>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
  return Class.forName( /** @lends js.util.List.prototype */ {
    name: "abstract class js.util.List extends js.util.Collection",

    /** 
     * @function
     * @public 
     * @summary Returns a list iterator over the elements in this list (in proper sequence).
     * @description Returns a list iterator over the elements in this list (in proper sequence).
     *
     * @return {js.util.Iterator} a list iterator over the elements in this list (in proper sequence)
     * @throws {js.lang.IndexOutOfBoundsException}
     */
    listIterator: function() {
      var index = arguments[0] || 0;
      if (index < 0 || index > this.size()) {
        throw new new js.lang.IndexOutOfBoundsException("Index: " + index);
      }
      return new js.util.ListIterator(this, index);
    },

    "protected rangeCheck": function(index) {
      if (index < 0 || index >= this.size()) {
        throw new js.lang.IndexOutOfBoundsException("Index: " + index + ", Size: " + size);
      }
    },

    /** 
     * @function
     * @public 
     * @summary Returns an iterator over the elements in this list in proper sequence.
     * @description Returns an iterator over the elements in this list in proper sequence.
     *
     * @return {js.util.Iterator} an iterator over the elements in this list in proper sequence
     */
    iterator: function() {
      return new js.util.Iterator(this);
    },

    /** 
     * @name js.util.List.prototype.removeAt
     * @abstract
     * @function
     * @public 
     * @summary Removes the element at the specified position in this list (optional operation).
     * @description Removes the element at the specified position in this list (optional operation). Shifts any subsequent elements to the left (subtracts one from their indices). Returns the element that was removed from the list.
     *
     * @param {js.lang.Number} index - the index of the element to be removed
     * @return {js.lang.Object} the element previously at the specified position
     */
    "abstract removeAt": function(index) {},

    /** 
     * @name js.util.List.prototype.get
     * @abstract
     * @function
     * @public 
     * @summary Returns the element at the specified position in this list.
     * @description Returns the element at the specified position in this list.
     *
     * @param {js.lang.Number} index - index of the element to return
     * @return {js.lang.Object} the element at the specified position in this list
     */
    "abstract get": function(index) {},

    /** 
     * @name js.util.List.prototype.subList
     * @abstract
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
    "abstract subList": function(fromIndex, toIndex) {
      throw new js.lang.UnsupportedOperationException();
    },

    /** 
     * @name js.util.List.prototype.set
     * @abstract
     * @function
     * @public 
     * @summary Replaces the element at the specified position in this list with the specified element (optional operation).
     * @description Replaces the element at the specified position in this list with the specified element (optional operation).
     *
     * @param {js.lang.Number} index - index of the element to replace
     * @param {js.lang.Object} element - element to be stored at the specified position
     * @return {js.lang.Object} the element previously at the specified position
     * @throws {js.lang.UnsupportedOperationException} 
     */
    "abstract set": function(index, element) {
      throw new js.lang.UnsupportedOperationException();
    },

    /** 
     * @function
     * @public 
     * @summary Returns the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element.
     * @description Returns the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element. More formally, returns the lowest index i such that (o==null ? get(i)==null : o.equals(get(i))), or -1 if there is no such index.
     *
     * @param {js.lang.Object} o - element to search for
     * @return {js.lang.Number} the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element
     */
    "indexOf": function(o) {
      var e = this.listIterator();
      while (e.hasNext()) {
        var n = e.next();
        if (n === o) {
          return e.previousIndex();
        } else if (!Object.isEmpty(o) && !Object.isEmpty(o.equals) && Object.isFunction(o.equals) && o.equals(n)) {
          return e.previousIndex();
        }
      }
      return -1;
    },

    /** 
     * @function
     * @public 
     * @summary 
     * @description Returns the index of the last occurrence of the specified element in this list, or -1 if this list does not contain the element. More formally, returns the highest index i such that (o==null ? get(i)==null : o.equals(get(i))), or -1 if there is no such index.
     *
     * @param {js.lang.Object} o - element to search for
     * @return {js.lang.Number} the index of the last occurrence of the specified element in this list, or -1 if this list does not contain the element
     */
    "lastIndexOf": function(o) {
      var e = this.listIterator(this.size());
      while (e.hasPrevious()) {
        var p = e.previous();
        if (p === o) {
          return e.nextIndex();
        } else if (!Object.isEmpty(o) && !Object.isEmpty(o.equals) && Object.isFunction(o.equals) && o.equals(p)) {
          return e.nextIndex();
        }
      }
      return -1;
    }
  }).getClassConstructor();
});