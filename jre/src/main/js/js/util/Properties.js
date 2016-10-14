/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2015 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2015年2月11日
 */
define(function(require, exports, module) {

  require("bootstrap!js.util.HashMap");

  /** 
   * @abstract
   * @class js.util.Properties
   * @extends {js.util.HashMap}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * The Properties class represents a persistent set of properties. The Properties can be saved to a stream or loaded from a stream. Each key and its corresponding value in the property list is a string.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * A property list can contain another property list as its "defaults"; this second property list is searched if the property key is not found in the original property list.
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
  return Class.forName( /** @lends js.util.Properties.prototype */ {
    name: "public class js.util.Properties extends js.util.HashMap",

    "protected defaults": null,

    "public Properties": function(defaults) {
      if (Object.isInstanceof(defaults, js.util.Properties)) {
        this.defaults = defaults;
      } else {
        this.load(defaults);
      }
    },

    /**
     * @function
     * @public 
     * @summary Searches for the property with the specified key in this property list.
     * @description Searches for the property with the specified key in this property list. If the key is not found in this property list, the default property list, and its defaults, recursively, are then checked. The method returns the default value argument if the property is not found.
     *
     * @param {js.lang.String} key - the hashtable key.
     * @param {js.lang.Object} defaultValue - a default value.
     * @return  the value in this property list with the specified key value.
     * @see     #setProperty
     * @see     #defaults
     */
    "getProperty": function(key, defaultValue) {
      var oval = this.get(key);
      var sval = Object.isString(oval) ? oval : null;
      var val = (Object.isNull(sval) && !Object.isNull(defaults)) ? defaults.getProperty(key) : sval;
      return Object.isNull(val) ? defaultValue : val;
    },

    /** 
     * @function
     * @public 
     * @summary Calls the Hashtable method put.
     * @description Calls the Hashtable method put. Provided for parallelism with the getProperty method. Enforces use of strings for property keys and values. The value returned is the result of the Hashtable call to put.
     *
     * @param {js.lang.String} key - the key to be placed into this property list.
     * @param {js.lang.Object} value - the value corresponding to key.
     * @return {js.lang.Object} the previous value of the specified key in this property list, or null if it did not have one.
     */
    "setProperty": function(key, value) {
      return this.put(key, value);
    },

    /** 
     * @function
     * @public 
     * @summary Reads a property list (key and element pairs) from the json object.
     * @description 
     *
     * @param {js.lang.Object} json - the json object
     */
    "load": function(json) {
      for (var i in json) {
        this.put(i, json[i]);
      }
    }
  }).getClassConstructor();

});