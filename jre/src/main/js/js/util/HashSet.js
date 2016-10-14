/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 11, 2014
 */
define(function(require, exports, module) {

  require("bootstrap!js.util.Set");
  require("bootstrap!js.util.HashMap");

  /** 
   * @class js.util.HashSet 
   * @extends {js.util.Set}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * This class implements the Set interface, backed by a hash table (actually a HashMap instance). It makes no guarantees as to the iteration order of the set; in particular, it does not guarantee that the order will remain constant over time. This class permits the null element.
   * </p><p>
   * This interface is a member of the jsrt Collections Framework.
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
  return Class.forName( /** @lends js.util.HashSet.prototype */ {
    name: "class js.util.HashSet extends js.util.Set",

    "private _table": null,

    HashSet: function() {
      this._table = new js.util.HashMap();
    },

    /** 
     * @function
     * @public 
     * @summary Returns an iterator over the elements in this set.
     * @description Returns an iterator over the elements in this set. The elements are returned in no particular order.
     *
     * @return {js.util.Iterator} an Iterator over the elements in this set
     */
    iterator: function() {
      return this._table.keySet().iterator();
    },

    /** 
     * @function
     * @public 
     * @summary Returns the number of elements in this set (its cardinality).
     * @description Returns the number of elements in this set (its cardinality).
     *
     * @return {js.lang.Number} the number of elements in this set (its cardinality)
     */
    size: function() {
      return this._table.size();
    },

    /** 
     * @function
     * @public 
     * @summary Returns true if this set contains no elements.
     * @description Returns true if this set contains no elements.
     *
     * @return {js.lang.Boolean} true if this set contains no elements
     */
    isEmpty: function() {
      return this._table.isEmpty();
    },

    /** 
     * @function
     * @public 
     * @summary Returns true if this set contains the specified element.
     * @description Returns true if this set contains the specified element. More formally, returns true if and only if this set contains an element e such that (o==null ? e==null : o.equals(e)).
     *
     * @param {js.lang.Object} o - element whose presence in this set is to be tested
     * @return {js.lang.Boolean} true if this set contains the specified element
     */
    contains: function(o) {
      return this._table.containsKey(o);
    },

    /** 
     * @function
     * @public 
     * @summary Adds the specified element to this set if it is not already present.
     * @description Adds the specified element to this set if it is not already present. More formally, adds the specified element e to this set if this set contains no element e2 such that (e==null ? e2==null : e.equals(e2)). If this set already contains the element, the call leaves the set unchanged and returns false.
     *
     * @param {js.lang.Object} e - element to be added to this set
     * @return {js.lang.Boolean} true if this set did not already contain the specified element
     */
    add: function(e) {
      return this._table.put(e, null);
    },

    /** 
     * @function
     * @public 
     * @summary Removes the specified element from this set if it is present.
     * @description Removes the specified element from this set if it is present. More formally, removes an element e such that (o==null ? e==null : o.equals(e)), if this set contains such an element. Returns true if this set contained the element (or equivalently, if this set changed as a result of the call). (This set will not contain the element once the call returns.)
     *
     * @param {js.lang.Object} o - object to be removed from this set, if present
     * @return {js.lang.Boolean} true if the set contained the specified element
     */
    remove: function(o) {
      this._table.remove(o);
      return o;
    },

    /** 
     * @function
     * @public 
     * @summary Removes all of the elements from this set.
     * @description Removes all of the elements from this set. The set will be empty after this call returns.
     */
    clear: function() {
      this._table.clear();
    }
  }).getClassConstructor();
});