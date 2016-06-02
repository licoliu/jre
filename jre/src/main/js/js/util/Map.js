/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 11, 2014
 */
define(function(require, exports, module) {

  /**
   * @requires js.util.Iterator
   * @requires js.util.KeySet
   * @requires js.util.ValueList
   * @requires js.lang.UnsupportedOperationException
   */
  require("bootstrap!js.util.Iterator");
  require("bootstrap!js.util.KeySet");
  require("bootstrap!js.util.ValueList");
  require("bootstrap!js.lang.UnsupportedOperationException");

  /** 
   * @abstract
   * @class js.util.Map 
   * @extends {Object}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;This class provides a skeletal implementation of the Map interface, to minimize the effort required to implement this interface. To implement an unmodifiable map, the programmer needs only to extend this class and provide an implementation for the entrySet method, which returns a set-view of the map's mappings. Typically, the returned set will, in turn, be implemented atop AbstractSet. This set should not support the add or remove methods, and its iterator should not support the remove method.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * To implement a modifiable map, the programmer must additionally override this class's put method (which otherwise throws an UnsupportedOperationException), and the iterator returned by entrySet().iterator() must additionally implement its remove method.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * The programmer should generally provide a void (no argument) and map constructor, as per the recommendation in the Map interface specification.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * The documentation for each non-abstract method in this class describes its implementation in detail. Each of these methods may be overridden if the map being implemented admits a more efficient implementation.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * This class is a member of the Collections Framework.
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   * 
   * @see {@link js.util.Collection}
   */
  Class
    .forName( /** @lends js.util.Map.prototype */ {
      name: "class js.util.Map extends Object",

      /** 
       * @function
       * @public 
       * @summary Returns a shallow copy of this Map instance.
       * @description Returns a shallow copy of this Map instance: the keys and values themselves are cloned.
       * @return {js.util.Map} a shallow copy of this map
       */
      "clone": function() {
        var c = this.getClass().newInstance();
        var it = this.entrySet().iterator();
        while (it.hasNext()) {
          var next = it.next();
          if (next === null || next === undefined) {
            c.put(null, null);
          } else {
            c.put(next.clone());
            // var e = next.clone();
            // c.put(e.getKey(), e.getValue());
          }
        }
        return c;
      },

      /** 
       * @function
       * @public
       * @summary Removes all of the mappings from this map.
       * @description 
       * <p>&nbsp;&nbsp;&nbsp;&nbsp;
       * Removes all of the mappings from this map (optional operation). The map will be empty after this call returns.
       * This implementation calls entrySet().clear().
       * </p>
       * Note that this implementation throws an UnsupportedOperationException if the entrySet does not support the clear operation.
       */
      clear: function() {
        this.entrySet().clear();
      },

      /** 
       * @function
       * @public
       * @summary Returns true if this map contains a mapping for the specified key.
       * @description 
       * <p>&nbsp;&nbsp;&nbsp;&nbsp;
       * Returns true if this map contains a mapping for the specified key. More formally, returns true if and only if this map contains a mapping for a key k such that (key==null ? k==null : key.equals(k)). (There can be at most one such mapping.)
       * This implementation iterates over entrySet() searching for an entry with the specified key. If such an entry is found, true is returned. If the iteration terminates without finding such an entry, false is returned. Note that this implementation requires linear time in the size of the map; many implementations will override this method.
       * </p>
       * @param {(js.lang.String|js.lang.Number)} key - The key whose presence in this map is to be tested
       * @return {js.lang.Boolean} true if this map contains a mapping for the specified key
       */
      containsKey: function(key) {
        var e = this.entrySet().iterator();
        while (e.hasNext()) {
          var k = e.next().getKey();
          if (key === k) {
            return true;
          } else if (!Object.isEmpty(key) && !Object.isEmpty(key.equals) && Object.isFunction(key.equals) && key.equals(k)) {
            return true;
          }
        }
        return false;
      },

      /** 
       * @function
       * @public
       * @summary Returns true if this map maps one or more keys to the specified value.
       * @description  
       * <p>&nbsp;&nbsp;&nbsp;&nbsp;
       * Returns true if this map maps one or more keys to the specified value. More formally, returns true if and only if this map contains at least one mapping to a value v such that (value==null ? v==null : value.equals(v)). This operation will probably require time linear in the map size for most implementations of the Map interface.
       * This implementation iterates over entrySet() searching for an entry with the specified value. If such an entry is found, true is returned. If the iteration terminates without finding such an entry, false is returned. Note that this implementation requires linear time in the size of the map.
       * </p>
       * @param {Object} value - value whose presence in this map is to be tested
       * @return {js.lang.Boolean} true if this map maps one or more keys to the specified value
       */
      containsValue: function(value) {
        var e = this.entrySet().iterator();
        while (e.hasNext()) {
          var v = e.next().getValue();
          if (value === v) {
            return true;
          } else if (!Object.isEmpty(value) && !Object.isEmpty(value.equals) && Object.isFunction(value.equals) && value.equals(v)) {
            return true;
          }
        }
        return false;
      },

      /** 
       * @function
       * @public
       * @summary Returns the value to which the specified key is mapped, or null if this map contains no mapping for the key.
       * @description   
       * <p>&nbsp;&nbsp;&nbsp;&nbsp;
       * Returns the value to which the specified key is mapped, or null if this map contains no mapping for the key.
       * More formally, if this map contains a mapping from a key k to a value v such that (key==null ? k==null : key.equals(k)), then this method returns v; otherwise it returns null. (There can be at most one such mapping.)
       * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
       * If this map permits null values, then a return value of null does not necessarily indicate that the map contains no mapping for the key; it's also possible that the map explicitly maps the key to null. The containsKey operation may be used to distinguish these two cases.
       * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
       * This implementation iterates over entrySet() searching for an entry with the specified key. If such an entry is found, the entry's value is returned. If the iteration terminates without finding such an entry, null is returned. Note that this implementation requires linear time in the size of the map; many implementations will override this method.
       * </p>
       * @param {(js.lang.String|js.lang.Number)} key - the key whose associated value is to be returned
       * @return {Object} the value to which the specified key is mapped, or null if this map contains no mapping for the key
       */
      "get": function(key) {
        var i = this.entrySet().iterator();
        while (i.hasNext()) {
          var e = i.next();
          var k = e.getKey();
          if (key === k) {
            return e.getValue();
          } else if (!Object.isEmpty(key) && !Object.isEmpty(key.equals) && Object.isFunction(key.equals) && key.equals(k)) {
            return e.getValue();
          }
        }
        return null;
      },

      /** 
       * @function
       * @public
       * @summary Returns true if this map contains no key-value mappings.
       * @description 
       * <p>&nbsp;&nbsp;&nbsp;&nbsp;
       * Returns true if this map contains no key-value mappings.</p>
       * <p>&nbsp;&nbsp;&nbsp;&nbsp;
       * This implementation returns size() == 0.</p>
       * 
       * @return {js.lang.Boolean} true if this map contains no key-value mappings
       */
      isEmpty: function() {
        return this.size() <= 0;
      },

      /** 
       * @function
       * @public
       * @summary Associates the specified value with the specified key in this map (optional operation).
       * @description 
       * <p>&nbsp;&nbsp;&nbsp;&nbsp;
       * Associates the specified value with the specified key in this map (optional operation). If the map previously contained a mapping for the key, the old value is replaced by the specified value. (A map m is said to contain a mapping for a key k if and only if m.containsKey(k) would return true.)
       * This implementation always throws an UnsupportedOperationException.</p>
       * @param {(js.lang.String|js.lang.Number)} key - key with which the specified value is to be associated
       * @param {Object} value - value to be associated with the specified key
       * @return {Object} the previous value associated with key, or null if there was no mapping for key. (A null return can also indicate that the map previously associated null with key, if the implementation supports null values.)
       * @throws {js.lang.UnsupportedOperationException} if the put operation is not supported by this map
       */
      put: function(key, value) {
        throw new js.lang.UnsupportedOperationException();
      },

      /** 
       * @function
       * @public
       * @summary Copies all of the mappings from the specified map to this map.
       * @description 
       * <p>&nbsp;&nbsp;&nbsp;&nbsp;
       * Copies all of the mappings from the specified map to this map (optional operation). The effect of this call is equivalent to that of calling put(k, v) on this map once for each mapping from key k to value v in the specified map. The behavior of this operation is undefined if the specified map is modified while the operation is in progress.
       * This implementation iterates over the specified map's entrySet() collection, and calls this map's put operation once for each entry returned by the iteration.
       * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
       * Note that this implementation throws an UnsupportedOperationException if this map does not support the put operation and the specified map is nonempty.
       * </p>
       * @param {js.util.Map} m - mappings to be stored in this map
       */
      putAll: function(m) {
        var i = m.entrySet();
        while (i.hasNext()) {
          var e = i.next();
          this.put(e.getKey, e.getValue());
        }
      },

      /** 
       * @function
       * @public
       * @summary Removes the mapping for a key from this map if it is present (optional operation).
       * @description 
       * <p>&nbsp;&nbsp;&nbsp;&nbsp;
       * Removes the mapping for a key from this map if it is present (optional operation). More formally, if this map contains a mapping from key k to value v such that (key==null ? k==null : key.equals(k)), that mapping is removed. (The map can contain at most one such mapping.)
       * Returns the value to which this map previously associated the key, or null if the map contained no mapping for the key.
       * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
       * If this map permits null values, then a return value of null does not necessarily indicate that the map contained no mapping for the key; it's also possible that the map explicitly mapped the key to null.
       * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
       * The map will not contain a mapping for the specified key once the call returns.
       * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
       * This implementation iterates over entrySet() searching for an entry with the specified key. If such an entry is found, its value is obtained with its getValue operation, the entry is removed from the collection (and the backing map) with the iterator's remove operation, and the saved value is returned. If the iteration terminates without finding such an entry, null is returned. Note that this implementation requires linear time in the size of the map; many implementations will override this method.
       * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
       * Note that this implementation throws an UnsupportedOperationException if the entrySet iterator does not support the remove method and this map contains a mapping for the specified key.
       * </p>
       * @param {(js.lang.String|js.lang.Number)} key - key whose mapping is to be removed from the map
       * @return {Object} the previous value associated with key, or null if there was no mapping for key. 
       */
      remove: function(key) {
        var i = entrySet().iterator(),
          correctEntry = null;
        while (correctEntry === null && i.hasNext()) {
          var e = i.next();

          if (key === e.getKey()) {
            correctEntry = e;
          } else if (!Object.isEmpty(key) && !Object.isEmpty(key.equals) && Object.isFunction(key.equals) && key.equals(e.getKey())) {
            correctEntry = e;
          }
        }
        var oldValue = null;
        if (!Object.isNull(correctEntry)) {
          oldValue = correctEntry.getValue();
          i.remove();
        }
        return oldValue;
      },

      /** 
       * @function
       * @public
       * @summary Returns the number of key-value mappings in this map.
       * @description 
       * <p>&nbsp;&nbsp;&nbsp;&nbsp;
       * Returns the number of key-value mappings in this map. If the map contains more than Number.MAX_VALUE elements, returns Number.MAX_VALUE.
       * &nbsp;&nbsp;&nbsp;&nbsp;
       * This implementation returns entrySet().size().
       * </p>
       * @return {js.lang.Number} the number of key-value mappings in this map
       */
      size: function() {
        return this.entrySet().size();
      },

      /** 
       * @name entrySet
       * @function
       * @public
       * @abstract
       * @summary Returns a Set view of the mappings contained in this map.
       * @description 
       * <p>&nbsp;&nbsp;&nbsp;&nbsp;
       * Returns a Set view of the mappings contained in this map. The set is backed by the map, so changes to the map are reflected in the set, and vice-versa. If the map is modified while an iteration over the set is in progress (except through the iterator's own remove operation, or through the setValue operation on a map entry returned by the iterator) the results of the iteration are undefined. The set supports element removal, which removes the corresponding mapping from the map, via the Iterator.remove, Set.remove, removeAll, retainAll and clear operations. It does not support the add or addAll operations.
       * </p>
       * @return {js.util.Set} a set view of the mappings contained in this map
       */
      "abstract entrySet": function() {},

      /** 
       * @function
       * @public
       * @summary Returns a Set view of the keys contained in this map.
       * @description 
       * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
       * Returns a Set view of the keys contained in this map. The set is backed by the map, so changes to the map are reflected in the set, and vice-versa. If the map is modified while an iteration over the set is in progress (except through the iterator's own remove operation), the results of the iteration are undefined. The set supports element removal, which removes the corresponding mapping from the map, via the Iterator.remove, Set.remove, removeAll, retainAll, and clear operations. It does not support the add or addAll operations.
       * This implementation returns a set that subclasses AbstractSet. The subclass's iterator method returns a "wrapper object" over this map's entrySet() iterator. The size method delegates to this map's size method and the contains method delegates to this map's containsKey method.
       * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
       * The set is created the first time this method is called, and returned in response to all subsequent calls. No synchronization is performed, so there is a slight chance that multiple calls to this method will not all return the same set.
       * </p>
       * @return {js.util.KeySet} a set view of the keys contained in this map
       */
      keySet: function() {
        return new js.util.KeySet(this);
      },

      /** 
       * @function
       * @public
       * @summary Returns a Collection view of the values contained in this map.
       * @description 
       * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
       * Returns a Collection view of the values contained in this map. The collection is backed by the map, so changes to the map are reflected in the collection, and vice-versa. If the map is modified while an iteration over the collection is in progress (except through the iterator's own remove operation), the results of the iteration are undefined. The collection supports element removal, which removes the corresponding mapping from the map, via the Iterator.remove, Collection.remove, removeAll, retainAll and clear operations. It does not support the add or addAll operations.
       * This implementation returns a collection that subclasses AbstractCollection. The subclass's iterator method returns a "wrapper object" over this map's entrySet() iterator. The size method delegates to this map's size method and the contains method delegates to this map's containsValue method.
       * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
       * The collection is created the first time this method is called, and returned in response to all subsequent calls. No synchronization is performed, so there is a slight chance that multiple calls to this method will not all return the same collection.
       * </p>
       * @return {js.util.ValueList} a collection view of the values contained in this map
       */
      values: function() {
        return new js.util.ValueList(this);
      },

      /** 
       * @function
       * @public
       * @summary Compares the specified object with this map for equality.
       * @description 
       * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
       * Compares the specified object with this map for equality. Returns true if the given object is also a map and the two maps represent the same mappings. More formally, two maps m1 and m2 represent the same mappings if m1.entrySet().equals(m2.entrySet()). This ensures that the equals method works properly across different implementations of the Map interface.
       * This implementation first checks if the specified object is this map; if so it returns true. Then, it checks if the specified object is a map whose size is identical to the size of this map; if not, it returns false. If so, it iterates over this map's entrySet collection, and checks that the specified map contains each mapping that this map contains. If the specified map fails to contain such a mapping, false is returned. If the iteration completes, true is returned.
       * </p>
       * @param {Object} o - object to be compared for equality with this map
       * @return {js.lang.Boolean} true if the specified object is equal to this map
       */
      equals: function(o) {}
    });
});