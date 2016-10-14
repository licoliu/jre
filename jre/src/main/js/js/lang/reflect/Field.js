/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 14, 2014
 */

/** 
 * @class js.lang.reflect.Field 
 * @extends {js.lang.Object}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * A Field provides information about, and dynamic access to, a single field of a class or an interface. The reflected field may be a class (static) field or an instance field.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * A Field permits widening conversions to occur during a get or set access operation, but throws an IllegalArgumentException if a narrowing conversion would occur.
 * </p><br/>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.reflect.Field.prototype */ {
  name: "public final class js.lang.reflect.Field extends Object",
  "@Setter private _declaringClass": null,
  "@Setter private _name": null,
  "@Setter private _modifiers": null,
  "@Setter @Getter private _annotations": null,
  "@Setter private _value": null,

  Field: function(name, value, declaringClass, modifiers, annotations) {
    this._name = name;
    this._declaringClass = declaringClass;
    this._modifiers = modifiers;
    this._annotations = annotations;
    this._value = value;
  },

  /** 
   * @function
   * @public 
   * @summary Sets the field represented by this Field object on the specified object argument to the specified new value.
   * @description
   * <p> 
   * Sets the field represented by this Field object on the specified object argument to the specified new value. The new value is automatically unwrapped if the underlying field has a primitive type.
   * </p><p>
   * The operation proceeds as follows:
   * </p><p>
   * If the underlying field is static, the obj argument is ignored; it may be null.
   * </p><p>
   * Otherwise the underlying field is an instance field. If the specified object argument is null, the method throws a NullPointerException. If the specified object argument is not an instance of the class or interface declaring the underlying field, the method throws an IllegalArgumentException.
   * </p><p>
   * If this Field object is enforcing Java language access control, and the underlying field is inaccessible, the method throws an IllegalAccessException.
   * </p><p>
   * If the underlying field is final, the method throws an IllegalAccessException unless setAccessible(true) has succeeded for this Field object and the field is non-static. Setting a final field in this way is meaningful only during deserialization or reconstruction of instances of classes with blank final fields, before they are made available for access by other parts of a program. Use in any other context may have unpredictable effects, including cases in which other parts of a program continue to use the original value of this field.
   * </p><p>
   * If the underlying field is of a primitive type, an unwrapping conversion is attempted to convert the new value to a value of a primitive type. If this attempt fails, the method throws an IllegalArgumentException.
   * </p><p>
   * If, after possible unwrapping, the new value cannot be converted to the type of the underlying field by an identity or widening conversion, the method throws an IllegalArgumentException.
   * </p><p>
   * If the underlying field is static, the class that declared the field is initialized if it has not already been initialized.
   * </p><p>
   * The field is set to the possibly unwrapped and widened new value.
   * </p><p>
   * If the field is hidden in the type of obj, the field's value is set according to the preceding rules.
   * </p>
   *
   * @param {js.lang.Object} obj - the object whose field should be modified
   * @param {js.lang.Object} value - the new value for the field of obj being modified 
   */
  "set": function(obj, value) {
    obj[this._name] = value;
  },

  /** 
   * @function
   * @public 
   * @summary Returns the value of the field represented by this Field, on the specified object.  
   * @description 
   * <p>
   * Returns the value of the field represented by this Field, on the specified object. The value is automatically wrapped in an object if it has a primitive type.
   * </p><p>
   * The underlying field's value is obtained as follows:
   * </p><p>
   * If the underlying field is a static field, the obj argument is ignored; it may be null.
   * </p><p>
   * Otherwise, the underlying field is an instance field. If the specified obj argument is null, the method throws a NullPointerException. If the specified object is not an instance of the class or interface declaring the underlying field, the method throws an IllegalArgumentException.
   * </p><p>
   * If this Field object is enforcing Java language access control, and the underlying field is inaccessible, the method throws an IllegalAccessException. If the underlying field is static, the class that declared the field is initialized if it has not already been initialized.
   * </p><p>
   * Otherwise, the value is retrieved from the underlying instance or static field. If the field has a primitive type, the value is wrapped in an object before being returned, otherwise it is returned as is.
   * </p><p>
   * If the field is hidden in the type of obj, the field's value is obtained according to the preceding rules.
   * </p>
   *
   * @param {js.lang.Object} obj - object from which the represented field's value is to be extracted
   * @return {js.lang.Object} the value of the represented field in object obj; primitive values are wrapped in an appropriate object before being returned
   */
  "get": function(obj) {
    return obj[this._name];
  },

  /** 
   * @function
   * @public 
   * @summary Gets the value of a static or instance field.
   * @description 
   * 
   * @param {js.lang.Object} obj - the object to extract the value from
   * @return {js.lang.Object} the value of the field
   */
  getValue: function(obj) {
    return obj ? this.get(obj) : this._value;
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
   * @return {js.lang.reflect.Field} itself
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
   * @summary Returns the Class object representing the class or interface that declares the field represented by this Field object.
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
   * @summary Returns the name of the field represented by this Field object.
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
   * @summary Returns the modifiers for the field represented by this Field object, as an integer.
   * @description 
   *
   * @return {js.lang.Number} the modifiers for the underlying member
   */
  getModifiers: function() {
    return this._modifiers;
  }
});
js.lang.reflect.Field.loaded = true;