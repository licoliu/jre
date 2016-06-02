/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 11, 2014
 */
define(function(require, exports, module) {

  require("bootstrap!js.util.Map");
  require("bootstrap!js.util.Entry");
  require("bootstrap!js.util.EntrySet");

  /** 
   * @class js.util.HashMap
   * @extends {js.util.Map} 
   * @description  
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;Hash table based implementation of the Map interface. This implementation provides all of the optional map operations, and permits null values and the null key. This class makes no guarantees as to the order of the map; in particular, it does not guarantee that the order will remain constant over time.
   * This implementation provides constant-time performance for the basic operations (get and put), assuming the hash function disperses the elements properly among the buckets. Iteration over collection views requires time proportional to the "capacity" of the HashMap instance (the number of buckets) plus its size (the number of key-value mappings). Thus, it's very important not to set the initial capacity too high (or the load factor too low) if iteration performance is important.
   * </p><p>
   * &nbsp;&nbsp;&nbsp;&nbsp;The iterators returned by all of this class's "collection view methods" are fail-fast: if the map is structurally modified at any time after the iterator is created, in any way except through the iterator's own remove method, the iterator will throw a Exception. Thus, in the face of concurrent modification, the iterator fails quickly and cleanly, rather than risking arbitrary, non-deterministic behavior at an undetermined time in the future.
   * </p><p>
   * &nbsp;&nbsp;&nbsp;&nbsp;This class is a member of the Collections Framework.
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   * 
   * @see {@link js.util.Collection}
   * @see {@link js.util.Map}
   */

  Class
    .forName( /** @lends js.util.HashMap.prototype */ {
      name: "class js.util.HashMap extends js.util.Map",

      /**
       * @property {js.lang.Array}
       * @private
       */
      "private _table": [],

      /**
       * @property {Object}
       * @private
       */
      "private _hash": {},

      /**
       * @property {js.lang.Array}
       * @private
       */
      "private _hashCache": [],

      /**
       * @property {js.lang.Array}
       * @private
       */
      "private _hashArray": [],

      /**
       * @function
       * @private
       * @return {js.lang.String}
       */
      "private hash": function(key) {
        var hash = this._hash[key];
        if (Object.isEmpty(hash)) {
          if (this._hashCache.length <= 0) {
            hash = this._table.length;
          } else {
            hash = this._hashCache.pop();
          }
          this._hashArray.push(hash);
        }
        if (hash < 0 || hash > this._table.length)
          throw new js.lang.UnsupportedOperationException();
        return hash;
      },

      /**
       * @function
       * @public
       * @summary Associates the specified value with the specified key in this map.
       * @description 
       * <p>&nbsp;&nbsp;&nbsp;&nbsp;
       * Associates the specified value with the specified key in this map. 
       * If the map previously contained a mapping for the key, the old value is replaced.
       * </p>
       * @param {(js.lang.String|js.lang.Number)} key - key with which the specified value is to be associated
       * @param {Object} value - value to be associated with the specified key
       * @return {Object} the previous value associated with key, or null if there was no mapping for key. (A null return can also indicate that the map previously associated null with key.)
       */
      put: function(key, value) {
        var entry = key;
        if (!Object.isNull(entry) && entry instanceof js.util.Entry) {
          key = entry.getKey();
          value = entry.getValue();
        } else {
          entry = new js.util.Entry(key, value);
        }

        var oldValue = null;
        var hash = this.hash(key);
        if (hash < this._table.length && hash >= 0) {
          oldValue = this._table[hash];
        }
        this._hash[key] = hash;
        this._table[hash] = entry;
        return oldValue;
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
       * A return value of null does not necessarily indicate that the map contains no mapping for the key; it's also possible that the map explicitly maps the key to null. The containsKey operation may be used to distinguish these two cases.
       * </p>
       * @param {(js.lang.String|js.lang.Number)} key - the key whose associated value is to be returned
       * @return {Object} the value to which the specified key is mapped, or null if this map contains no mapping for the key
       */
      "get": function(key) {
        var hash = this._hash[key];
        return (!Object.isNull(hash) && hash >= 0 && hash < this._table.length && this._table[hash]) ? this._table[hash]
          .getValue() : null;
      },

      /**
       * @function
       * @public
       * @summary Returns a Set view of the mappings contained in this map.
       * @description  
       * <p>&nbsp;&nbsp;&nbsp;&nbsp;
       * Returns a Set view of the mappings contained in this map. The set is backed by the map, so changes to the map are reflected in the set, and vice-versa. If the map is modified while an iteration over the set is in progress (except through the iterator's own remove operation, or through the setValue operation on a map entry returned by the iterator) the results of the iteration are undefined. The set supports element removal, which removes the corresponding mapping from the map, via the Iterator.remove, Set.remove, removeAll, retainAll and clear operations. It does not support the add or addAll operations.
       * </p>
       * @return {js.util.EntrySet} a set view of the mappings contained in this map
       */
      entrySet: function() {
        // size(),remove()
        return new js.util.EntrySet(this);
      },

      /**
       * @function
       * @public
       * @summary Returns the number of key-value mappings in this map.
       * @description Returns the number of key-value mappings in this map.
       * @return {js.lang.Number} the number of key-value mappings in this map
       */
      size: function() {
        return this._table.length - this._hashCache.length;
      },

      /**
       * @function
       * @public
       * @summary Removes the mapping for the specified key from this map if present.
       * @description Removes the mapping for the specified key from this map if present.
       * @param {(js.lang.String|js.lang.Number)} key - key whose mapping is to be removed from the map
       * @return {Object} the previous value associated with key, or null if there was no mapping for key. (A null return can also indicate that the map previously associated null with key.)
       */
      remove: function(key) {
        var hash = this._hash[key];
        var oldObj = null;

        if (!Object.isNull(hash) && hash >= 0 && hash < this._table.length && this._table[hash]) {
          oldObj = this._table[hash].getValue();
          this._table[hash] = null;
          this._hashCache.push(hash);
        }
        var hai = this._hashArray.indexOf(hash);
        if (hai >= 0) {
          this._hashArray.splice(hai, 1);
        }
        delete this._hash[key];

        return oldObj;
      },

      /**
       * @function
       * @public
       * @summary Removes all of the mappings from this map.
       * @description Removes all of the mappings from this map. The map will be empty after this call returns.
       */
      clear: function() {
        Object.each(this._hash, function(i, v, o) {
          this.remove(i);
        }, this);
        /*
         * for (var i in this._hash) { this.remove(i); }
         */
      }
    });
});