/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 10, 2014
 */
"use strict";
(function(global) {
  var currentTimeMillis = function() {
    return new Date().getTime();
  };
  /**
   * @class js.lang.Object
   * @alias Object
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Class Object is the root of the class hierarchy. Every class has Object as a superclass. All objects, including arrays, implement the methods of this class.
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
  var $class = global.Class.forName( /** @lends js.lang.Object.prototype */ {

    name: "class Object",

    alias: "js.lang.Object",

    Object: function() {
      var _hashCode = (currentTimeMillis() + Math.random()).toString(16);
      if (Object.USEECMA) {
        Object.defineProperty(this, "_hashCode", {
          value: _hashCode,
          writable: false,
          enumerable: false,
          configurable: false
        });
      } else {
        this._hashCode = _hashCode;
      }
    },

    /** 
     * @name js.lang.Object.prototype.getClass
     * @function
     * @public 
     * @summary Returns the runtime class of this Object.
     * @description 
     *
     * @return {js.lang.Class} The Class object that represents the runtime class of this object.
     */
    "non-writable non-enumerable non-configurable non-proxyable getClass": function() {
      if (this.$class) {
        return this.$class;
      } else {
        if (Object.isArray(this)) {
          return global.js.lang.Array.$class;
        } else if (Object.isDate(this)) {
          return global.js.lang.Date.$class;
        } else if (Object.isFunction(this)) {
          return global.js.lang.Function.$class;
        } else if (Object.isNumber(this)) {
          return global.js.lang.Number.$class;
        } else if (Object.isString(this)) {
          return global.js.lang.String.$class;
        } else if (Object.isBoolean(this)) {
          return global.js.lang.Boolean.$class;
        } else if (this instanceof RegExp) {
          return global.js.lang.RegExp.$class;
        } else if (this instanceof Error) {
          return global.js.lang.Error.$class;
        } else if (this instanceof EvalError) {
          return global.js.lang.EvalError.$class;
        } else if (this instanceof RangeError) {
          return global.js.lang.RangeError.$class;
        } else if (this instanceof ReferenceError) {
          return global.js.lang.ReferenceError.$class;
        } else if (this instanceof SyntaxError) {
          return global.js.lang.SyntaxError.$class;
        } else if (this instanceof TypeError) {
          return global.js.lang.TypeError.$class;
        } else if (this instanceof URIError) {
          return global.js.lang.URIError.$class;
        }
      }
      return Object.$class;
    },

    /** 
     * @name js.lang.Object.prototype.getVersion
     * @function
     * @public 
     * @summary Returns the version of this object.
     * @description 
     *
     * @return {js.lang.String} The version of this object.
     */
    "non-writable non-enumerable non-configurable non-proxyable getVersion": (function() {
      /** 主版本号 . 子版本号 [ 修正版本号 [. 编译版本号 ]] */
      var version = "0.1.1.0001";
      return function() {
        return this.version || version;
      };
    })(),

    /** 
     * @function
     * @public 
     * @summary Indicates whether some other object is "equal to" this one.
     * @description 
     * <p>
     * Indicates whether some other object is "equal to" this one.
     * </p><p>
     * The equals method implements an equivalence relation on non-null object references:
     * </p><ul>
     * <li>It is reflexive: for any non-null reference value x, x.equals(x) should return true.</li>
     * <li>It is symmetric: for any non-null reference values x and y, x.equals(y) should return true if and only if y.equals(x) returns true.</li>
     * <li>It is transitive: for any non-null reference values x, y, and z, if x.equals(y) returns true and y.equals(z) returns true, then x.equals(z) should return true.</li>
     * <li>It is consistent: for any non-null reference values x and y, multiple invocations of x.equals(y) consistently return true or consistently return false, provided no information used in equals comparisons on the objects is modified.</li>
     * <li>For any non-null reference value x, x.equals(null) should return false.</li>
     * </ul><p>
     * The equals method for class Object implements the most discriminating possible equivalence relation on objects; that is, for any non-null reference values x and y, this method returns true if and only if x and y refer to the same object (x == y has the value true).
     * </p><p>
     * Note that it is generally necessary to override the hashCode method whenever this method is overridden, so as to maintain the general contract for the hashCode method, which states that equal objects must have equal hash codes.
     * </p>
     *
     * @param {js.lang.Object} obj - the reference object with which to compare.
     * @return {js.lang.Boolean} true if this object is the same as the obj argument; false otherwise.
     */
    "equals": function(obj) {
      return obj === this;
    },

    /** 
     * @function
     * @public 
     * @summary Returns a hash code value for the object.
     * @description 
     *
     * @return {js.lang.String} a hash code value for this object.
     */
    "hashCode": function() {
      if (!this._hashCode) {
        this._hashCode = (currentTimeMillis() + Math.random()).toString(16);
      }
      return this._hashCode;
    },

    /** 
     * @function
     * @public 
     * @summary Returns a string representation of the object.
     * @description 
     * <p>
     * Returns a string representation of the object. In general, the toString method returns a string that "textually represents" this object. The result should be a concise but informative representation that is easy for a person to read. It is recommended that all subclasses override this method.
     * </p><p>
     * The toString method for class Object returns a string consisting of the name of the class of which the object is an instance, the at-sign character `@', and the unsigned hexadecimal representation of the hash code of the object. In other words, this method returns a string equal to the value of:
     * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
     * getClass().getName() + '@' + Integer.toHexString(hashCode())
     * </p>
     *
     * @return {js.lang.String} a string representation of the object.
     */
    "toString": function() {
      // TODO String,Number,Boolean,Array等的toString()方法
      return this.getClass().getFullName() + "<" + this.hashCode() + ">";
    },

    /** 
     * @function
     * @public 
     * @summary Creates and returns a copy of this object.
     * @description 
     *
     * @return {js.lang.Object} a clone of this instance.
     */
    "clone": function() {
      var b = null;
      if (this instanceof Number || this instanceof String || this instanceof Boolean) {
        return this.valueOf();
      } else if (this instanceof Function || this instanceof RegExp || this instanceof Error || this instanceof EvalError || this instanceof RangeError || this instanceof ReferenceError || this instanceof SyntaxError || this instanceof TypeError || this instanceof URIError) {
        return this;
      } else if (this instanceof Date) {
        b = new Date();
        b.setTime(this.getTime());
        return b;
      } else if (Object.isNumber(this) || Object.isString(this) || Object.isBoolean(this)) {
        //FIXME
        return this;
      } else if (this instanceof Array) {
        b = [];
        for (var i = 0, len = this.length; i < len; i++) {
          b.push(this[i] ? this[i].clone() : this[i]);
        }
        return b;
      } else {
        b = this.$class ? this.$class.newInstance() : {};
        for (var a in this) {
          if (a === "_hashCode") {
            b[a] = currentTimeMillis().toString(16);
            continue;
          }
          if (this.hasOwnProperty(a)) {
            b[a] = this[a] ? this[a].clone() : this[a];
          }
        }
        return b;
      }
    },

    /** 
     * @function
     * @public 
     * @summary 
     * @description 
     *
     * @return {js.lang.String} a json representation of the object
     */
    "toJson": (function() {
      var NATIVE_JSON_STRINGIFY_SUPPORT = typeof JSON !== 'undefined' && JSON && typeof JSON.stringify === "function" && JSON.stringify(0) === "0" && typeof JSON.stringify(function() {}) === "undefined";
      return function() {
        if (NATIVE_JSON_STRINGIFY_SUPPORT) {
          // TODO 只取public属性
          return JSON.stringify(this);
        }
        return this;
      };
    })(),

    /** 
     * @function
     * @public 
     * @summary 
     * @description 
     *
     * @return {js.lang.String} a query string representation of the object
     */
    "toQueryString": function() {
      // TODO
      var queryString = [];
      for (var attr in this) {
        if (this[attr]) {
          queryString.push(attr + "=" + this[attr]);
        }
      }
      return queryString.join("&");
    }
  });
  if (Object.USEECMA) {
    Object.defineProperty(Object, "$class", {
      value: $class,
      writable: false,
      enumerable: false,
      configurable: false
    });
  } else {
    Object.$class = $class;
  }
})(this);