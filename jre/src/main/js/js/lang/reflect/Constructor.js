/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 14, 2014
 */

/** 
 * @class js.lang.reflect.Constructor 
 * @extends {js.lang.Object}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Constructor provides information about, and access to, a single constructor for a class.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Constructor permits widening conversions to occur when matching the actual parameters to newInstance() with the underlying constructor's formal parameters, but throws an IllegalArgumentException if a narrowing conversion would occur.
 * </p><br/>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.reflect.Constructor.prototype */ {
  name: "class js.lang.reflect.Constructor extends Object",

  "@Setter private _declaringClass": null,
  "@Setter private _name": null,
  "@Setter private _modifiers": null,
  "@Setter @Getter private _annotations": null,
  "@Setter private _value": null,

  Constructor: function(name, value, declaringClass, modifiers, annotations) {
    this._name = name;
    this._declaringClass = declaringClass;
    this._modifiers = modifiers;
    this._annotations = annotations;
    this._value = value;
  },

  /** 
   * @function
   * @public 
   * @summary Gets the constructor.
   * @description 
   * 
   * @return {js.lang.Object} the value of the constructor
   */
  getValue: function() {
    return this._value;
  },

  /** 
   * @function
   * @public 
   * @summary Returns this element's annotation for the specified type if such an annotation is present, else null.
   * @description 
   *
   * @param {js.lang.Class} annotationClass - the Class object corresponding to the annotation type
   * @return {js.lang.Object} this element's annotation for the specified annotation type if present on this element, else null
   */
  getAnnotation: function(annotationClass) {
    var annotations = this.getDeclaredAnnotations(),
      annotation = null;
    if (annotations) {
      for (var i = 0, len = annotations.length; i < len; i++) {
        annotation = annotations[i];
        if (annotation.getClass() === annotationClass) {
          return annotation;
        }
      }
    }
    return null;
  },

  /** 
   * @function
   * @public 
   * @summary return itself
   * @description 
   *
   * @return {js.lang.reflect.Constructor} itself
   */
  clone: function() {
    return this;
  },

  /** 
   * @function
   * @public 
   * @summary Returns all this element's annotations.
   * @description 
   *
   * @return {js.lang.Array} 
   */
  getDeclaredAnnotations: function() {
    return this._annotations;
  },

  /** 
   * @function
   * @public 
   * @summary Returns the Class object representing the class or interface that declares the constructor represented by this constructor object.
   * @description 
   *
   * @return {js.lang.Class} an object representing the declaring class of the underlying member
   */
  getDeclaringClass: function() {
    return this._declaringClass;
  },

  /** 
   * @function
   * @public 
   * @summary Returns the name of the constructor represented by this constructor object.
   * @description 
   *
   * @return {js.lang.String} the simple name of the underlying member
   */
  getName: function() {
    return this._name;
  },

  /** 
   * @function
   * @public 
   * @summary Returns the modifiers for the constructor represented by this constructor object, as an integer.
   * @description 
   *
   * @return {js.lang.Number} the modifiers for the underlying member
   */
  getModifiers: function() {
    return this._modifiers;
  }

});