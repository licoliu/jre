/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 11, 2014
 */
define(function(require, exports, module) {

  /** 
   * @class js.util.Iterator 
   * @extends {js.lang.Object}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * An iterator over a collection. Iterator takes the place of Enumeration in the jsrt Collections Framework. Iterators differ from enumerations in two ways:
   * <ul><li>Iterators allow the caller to remove elements from the underlying collection during the iteration with well-defined semantics.</li>
   * <li>Method names have been improved.</li></ul>
   * </p><p>
   * This interface is a member of the jsrt Collections Framework.
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
  return Class.forName( /** @lends js.util.Iterator.prototype */ {
    name: "class js.util.Iterator extends Object",
    "private _element": null,
    "private _cursor": 0,
    "private _lastRet": -1,

    Iterator: function(element) {
      this._element = element || [];
    },

    /** 
     * @function
     * @public 
     * @summary Returns true if the iteration has more elements.
     * @description Returns true if the iteration has more elements. (In other words, returns true if next() would return an element rather than throwing an exception.)
     *
     * @return {js.lang.Boolean} true if the iteration has more elements
     */
    hasNext: function() {
      return this._cursor < this._element.size();
    },

    /** 
     * @function
     * @public 
     * @summary Returns the next element in the iteration.
     * @description Returns the next element in the iteration.
     *
     * @return {js.lang.Object} the next element in the iteration
     */
    next: function() {
      try {
        var next = this._element.get(this._cursor);
        this._lastRet = this._cursor++;
        return next;
      } catch (e) {
        throw new js.lang.IndexOutOfBoundsException("Index: " + this._cursor + ", Size: " + this._element.size() + ",Message:" + e.getMessage());
      }
    },

    /** 
     * @function
     * @public 
     * @summary Removes from the underlying collection the last element returned by this iterator (optional operation).
     * @description Removes from the underlying collection the last element returned by this iterator (optional operation). This method can be called only once per call to next(). The behavior of an iterator is unspecified if the underlying collection is modified while the iteration is in progress in any way other than by calling this method.
     */
    remove: function() {
      if (this._lastRet === -1)
        throw new js.lang.IllegalStateException();
      try {
        this._element.removeAt(this._lastRet);
        if (this._lastRet < this._cursor)
          this._cursor--;
        this._lastRet = -1;
      } catch (e) {
        throw new js.lang.IndexOutOfBoundsException();
      }
    }
  }).getClassConstructor();
});