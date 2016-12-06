/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 10, 2016
 */

/** 
 * @abstract
 * @class js.lang.Package 
 * @extends {js.lang.Object}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Within each ClassLoader instance all classes from the same js package have the same Package object. The static methods allow a package to be found by name or the set of all packages known to the current class loader to be found.
 * </p><br/>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
(function(global) {
  Class.forName( /** @lends js.lang.Package.prototype */ {
    name: "public final class js.lang.Package extends Object",
    "private _name": null,
    "private _value": null,

    Package: function(name, value) {
      this._name = name;
      this._value = value;
    },

    /** 
     * @function
     * @public 
     * @summary Return the name of this package.
     * @description Return the name of this package.
     *
     * @return {js.lang.String} 
     */
    getName: function() {
      return this._name;
    },

    /** 
     * @function
     * @public 
     * @summary get the package in the callers ClassLoader instance.
     * @description get the package in the callers ClassLoader instance.
     *
     * @return {js.lang.Object} 
     */
    getValue: function() {
      return this._value;
    },

    /** 
     * @name js.lang.Package.getPackage
     * @function
     * @public 
     * @static
     * @summary Find a package by name in the callers ClassLoader instance.
     * @description Find a package by name in the callers ClassLoader instance.
     *
     * @return {js.lang.Object} 
     */
    "static getPackage": function(name) {
      if (!Object.isString(name)) {
        return null;
      }

      var emp = name.split("."),
        length = emp.length,
        temp = global;

      for (var j = 0; j < length - 1; j++) {
        if (!emp[j] || !temp[emp[j]]) {
          return null;
        }
        temp = temp[emp[j]];
      }

      return temp;
    }
  });
  js.lang.Package.loaded = true;
})(this);