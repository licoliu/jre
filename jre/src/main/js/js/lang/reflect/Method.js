/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 14, 2014
 */

/** 
 * @class js.lang.reflect.Method 
 * @extends {js.lang.Object}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * A Method provides information about, and access to, a single method on a class or interface. The reflected method may be a class method or an instance method (including an abstract method).
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * A Method permits widening conversions to occur when matching the actual parameters to invoke with the underlying method's formal parameters, but it throws an IllegalArgumentException if a narrowing conversion would occur.
 * </p><br/>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.reflect.Method.prototype */ {
  name: "public final class js.lang.reflect.Method extends Object",

  "@Setter private _declaringClass": null,
  "@Setter private _name": null,
  "@Setter private _modifiers": null,
  "@Setter @Getter private _annotations": null,
  "@Setter @Getter private _value": null,

  Method: function(name, methodAccessor, declaringClass, modifiers,
    annotations) {
    this._name = name;
    this._declaringClass = declaringClass;
    this._modifiers = modifiers;
    this._annotations = annotations;
    this._value = methodAccessor;
  },

  /** 
   * @function
   * @public 
   * @summary Gets the method.
   * @description 
   * 
   * @return {js.lang.Function} the value of the methd
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
   * @return { js.lang.reflect.Method } - itself
   */
  clone: function() {
    return this;
  },

  /** 
   * @function
   * @public 
   * @summary Invokes the underlying method represented by this Method object, on the specified object with the specified parameters.
   * @description 
   * <p>
   * Invokes the underlying method represented by this Method object, on the specified object with the specified parameters. Individual parameters are automatically unwrapped to match primitive formal parameters, and both primitive and reference parameters are subject to method invocation conversions as necessary.
   * </p><p>
   * If the underlying method is static, then the specified obj argument is ignored. It may be null.
   * </p><p>
   * If the number of formal parameters required by the underlying method is 0, the supplied args array may be of length 0 or null.
   * </p><p>
   * If the underlying method is an instance method, it is invoked using dynamic method lookup as documented in The Java Language Specification, Second Edition, section 15.12.4.4; in particular, overriding based on the runtime type of the target object will occur.
   * </p><p>
   * If the underlying method is static, the class that declared the method is initialized if it has not already been initialized.
   * </p><p>
   * If the method completes normally, the value it returns is returned to the caller of invoke; if the value has a primitive type, it is first appropriately wrapped in an object. However, if the value has the type of an array of a primitive type, the elements of the array are not wrapped in objects; in other words, an array of primitive type is returned. If the underlying method return type is void, the invocation returns null.
   * </p>
   *
   * @param {js.lang.Object} obj - the object the underlying method is invoked from
   * @param {js.lang.Object} args - the arguments used for the method call
   * @return {js.lang.Object} the result of dispatching the method represented by this object on obj with parameters args
   */
  invoke: function() {
    if (arguments.length > 0) {
      var obj = arguments[0];
      if (!obj || !this._value) {
        throw new js.lang.NullPointerException();
      } else if (obj[this._name]) {
        // TODO 判断权限是否可以被调用
        try {
          return this._value.apply(obj, Array.prototype.slice.call(
            arguments, 1));
        } catch (e) {
          throw new js.lang.reflect.InvocationTargetException(e
            .getMessage());
        }
      }
    }
    throw new js.lang.IllegalArgumentException();
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
   * @summary Returns the name of the method represented by this Method object, as a String.
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
   * @summary Returns the Class object representing the class or interface that declares the executable represented by this object.
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
   * @summary Returns the modifiers for the executable represented by this object.
   * @description 
   *
   * @return {js.lang.Number} the modifiers for the underlying member
   */
  getModifiers: function() {
    return this._modifiers;
  }
});
js.lang.reflect.Method.loaded = true;