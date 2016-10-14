/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 11, 2014
 */

define(function(require, exports, module) {

  /** 
   * @abstract
   * @class js.util.Collection
   * @extends {js.lang.Object}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * The root interface in the collection hierarchy. A collection represents a group of objects, known as its elements. Some collections allow duplicate elements and others do not. Some are ordered and others unordered. The JDK does not provide any direct implementations of this interface: it provides implementations of more specific subinterfaces like Set and List. This interface is typically used to pass collections around and manipulate them where maximum generality is desired.
   * </p><p><code>
   *                                       js.util.Collection 
   *                                               |
   *                       ----------------------------------------------------- 
   *                      |                                                    | 
   *                  js.util.List                                         js.util.Set 
   *                      |                                                    | 
   *        ------------------------------                        ------------------------------- 
   *        |                            |                        |                             | 
   *  js.util.ArrayList             js.util.Stack            js.util.HashSet               js.util.TreeSet
   *
   *
   *
   *
   *                                           js.util.Map 
   *                                                 | 
   *                       -------------------------------------------------------- 
   *                       |                                                      |
   *                  js.util.HashMap                                       js.util.TreeMap
   * </code></p><p>
   * This interface is a member of the jsrt Collections Framework.
   * </p>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
  return Class.forName( /** @lends js.util.Collection.prototype */ {
    name: "abstract class js.util.Collection extends Object",

    /** 
     * @function
     * @public 
     * @summary Returns a shallow copy of this Collection instance.
     * @description Returns a shallow copy of this Collection instance.
     * @return {js.util.Map} a shallow copy of this collection
     */
    "clone": function() {
      var c = this.getClass().newInstance();
      var it = this.iterator();
      while (it.hasNext()) {
        var next = it.next();
        c.add(next ? next.clone() : next);
      }
      return c;
    },

    /** 
     * @name js.util.Collection.prototype.size
     * @abstract
     * @function
     * @public 
     * @summary Returns the number of elements in this collection.
     * @description Returns the number of elements in this collection. If this collection contains more than Number.MAX_VALUE elements, returns Number.MAX_VALUE.
     *
     * @return {js.lang.Number} the number of elements in this collection
     */
    "abstract size": function() {},

    /** 
     * @name js.util.Collection.prototype.iterator
     * @abstract
     * @function
     * @public 
     * @summary Returns an iterator over the elements in this collection.
     * @description Returns an iterator over the elements in this collection. There are no guarantees concerning the order in which the elements are returned (unless this collection is an instance of some class that provides a guarantee).
     *
     * @return {js.util.Iterator} an Iterator over the elements in this collection
     */
    "abstract iterator": function() {},

    /**
     * @name js.util.Collection.prototype.add
     * @abstract 
     * @function
     * @public 
     * @summary Ensures that this collection contains the specified element (optional operation).
     * @description 
     * <p>
     * Ensures that this collection contains the specified element (optional operation). Returns true if this collection changed as a result of the call. (Returns false if this collection does not permit duplicates and already contains the specified element.)
     * </p><p>
     * Collections that support this operation may place limitations on what elements may be added to this collection. In particular, some collections will refuse to add null elements, and others will impose restrictions on the type of elements that may be added. Collection classes should clearly specify in their documentation any restrictions on what elements may be added.
     * </p><p>
     * If a collection refuses to add a particular element for any reason other than that it already contains the element, it must throw an exception (rather than returning false). This preserves the invariant that a collection always contains the specified element after this call returns.
     * </p>
     *
     * @param {js.lang.Object} e - element whose presence in this collection is to be ensured
     * @return {js.lang.Boolean} true if this collection changed as a result of the call
     * @throws {js.lang.UnsupportedOperationException}
     */
    "abstract add": function(e) {
      throw new js.lang.UnsupportedOperationException();
    },

    /**
     * @name js.util.Collection.prototype.addAll
     * @abstract  
     * @function
     * @public 
     * @summary Adds all of the elements in the specified collection to this collection (optional operation).
     * @description Adds all of the elements in the specified collection to this collection (optional operation). The behavior of this operation is undefined if the specified collection is modified while the operation is in progress. (This implies that the behavior of this call is undefined if the specified collection is this collection, and this collection is nonempty.)
     *
     * @param {js.util.Collection} c - collection containing elements to be added to this collection
     * @return {js.lang.Boolean} true if this collection changed as a result of the call
     * @throws {js.lang.UnsupportedOperationException}
     */
    "abstract addAll": function(c) {
      var modified = false;
      var e = c.iterator();
      while (e.hasNext()) {
        if (this.add(e.next()))
          modified = true;
      }
      return modified;
    },

    /** 
     * @function
     * @public 
     * @summary Returns true if this collection contains the specified element.
     * @description Returns true if this collection contains the specified element. More formally, returns true if and only if this collection contains at least one element e such that (o==null ? e==null : o.equals(e)).
     *
     * @param {js.lang.Object} o - element whose presence in this collection is to be tested
     * @return {js.lang.Boolean} true if this collection contains the specified element
     */
    contains: function(o) {
      var e = this.iterator();
      while (e.hasNext()) {
        var n = e.next();
        if (n == o) {
          return true;
        } else if (!Object.isEmpty(o) && !Object.isEmpty(o.equals) && Object.isFunction(o.equals) && o.equals(n)) {
          return true;
        }
      }
      return false;
    },

    /** 
     * @function
     * @public 
     * @summary Removes all of the elements from this collection (optional operation).
     * @description Removes all of the elements from this collection (optional operation). The collection will be empty after this method returns.
     */
    clear: function() {
      var e = this.iterator();
      while (e.hasNext()) {
        e.next();
        e.remove();
      }
    },

    /** 
     * @function
     * @public 
     * @summary Returns true if this collection contains all of the elements in the specified collection.
     * @description Returns true if this collection contains all of the elements in the specified collection.
     *
     * @param {js.util.Collection} c - collection to be checked for containment in this collection
     * @return {js.lang.Boolean} true if this collection contains all of the elements in the specified collection
     */
    containsAll: function(c) {
      var e = c.iterator();
      while (e.hasNext()) {
        if (!this.contains(e.next())) {
          return false;
        }
      }
      return true;
    },

    /** 
     * @function
     * @public 
     * @summary Returns true if this collection contains no elements.
     * @description Returns true if this collection contains no elements.
     *
     * @return {js.lang.Boolean} true if this collection contains no elements
     */
    isEmpty: function() {
      return this.size() <= 0;
    },

    /** 
     * @function
     * @public 
     * @summary Removes a single instance of the specified element from this collection, if it is present (optional operation).
     * @description Removes a single instance of the specified element from this collection, if it is present (optional operation). More formally, removes an element e such that (o==null ? e==null : o.equals(e)), if this collection contains one or more such elements. Returns true if this collection contained the specified element (or equivalently, if this collection changed as a result of the call).
     *
     * @param {js.lang.Object} o - element to be removed from this collection, if present
     * @return {js.lang.Boolean} true if an element was removed as a result of this call
     */
    remove: function(o) {
      var e = this.iterator();
      while (e.hasNext()) {
        var n = e.next();
        if (n == o) {
          e.remove();
          return true;
        } else if (!Object.isEmpty(o) && !Object.isEmpty(o.equals) && Object.isFunction(o.equals) && o.equals(n)) {
          e.remove();
          return true;
        }
      }
      return false;
    },

    /** 
     * @function
     * @public 
     * @summary Removes all of this collection's elements that are also contained in the specified collection (optional operation).
     * @description Removes all of this collection's elements that are also contained in the specified collection (optional operation). After this call returns, this collection will contain no elements in common with the specified collection.
     *
     * @param {js.util.Collection} c - collection containing elements to be removed from this collection
     * @return {js.lang.Boolean} true if this collection changed as a result of the call
     */
    removeAll: function(c) {
      var modified = false;
      var e = this.iterator();
      while (e.hasNext()) {
        if (c.contains(e.next())) {
          e.remove();
          modified = true;
        }
      }
      return modified;
    },

    /** 
     * @function
     * @public 
     * @summary Retains only the elements in this collection that are contained in the specified collection (optional operation).
     * @description Retains only the elements in this collection that are contained in the specified collection (optional operation). In other words, removes from this collection all of its elements that are not contained in the specified collection.
     *
     * @param {js.util.Collection} c - collection containing elements to be retained in this collection
     * @return {js.lang.Boolean} true if this collection changed as a result of the call
     */
    retainAll: function(c) {
      var modified = false;
      var e = this.iterator();
      while (e.hasNext()) {
        if (!c.contains(e.next())) {
          e.remove();
          modified = true;
        }
      }
      return modified;
    },

    /** 
     * @function
     * @public 
     * @summary Returns an array containing all of the elements in this collection.
     * @description 
     * <p>
     * Returns an array containing all of the elements in this collection. If this collection makes any guarantees as to what order its elements are returned by its iterator, this method must return the elements in the same order.
     * </p><p>
     * The returned array will be "safe" in that no references to it are maintained by this collection. (In other words, this method must allocate a new array even if this collection is backed by an array). The caller is thus free to modify the returned array.
     * </p><p>
     * This method acts as bridge between array-based and collection-based APIs.
     * </p>
     *
     * @return {js.lang.Array} an array containing all of the elements in this collection
     */
    toArray: function() {
      var r = [],
        it = this.iterator(),
        i = 0;
      while (it.hasNext()) {
        r[i++] = it.next();
      }
      return r;
    }
  }).getClassConstructor();
});