/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 14, 2014
 */

/** 
 * @class js.lang.reflect.Modifier 
 * @extends {js.lang.Object}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The Modifier class provides static methods and constants to decode class and member access modifiers. The sets of modifiers are represented as numbers with distinct bit positions representing different modifiers. The values for the constants representing the modifiers are taken from the tables in sections 4.1, 4.4, 4.5, and 4.7 of The Java™ Virtual Machine Specification.
 * </p><br/>
 
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName({
  name: "public class js.lang.reflect.Modifier extends Object",

  /** 
   * @name js.lang.reflect.Modifier.ANNOTATION
   * @public
   * @static
   * @constant
   * @property {js.lang.Number} The value representing the annotation modifier.
   */
  "public static final ANNOTATION": 2048,

  /** 
   * @name js.lang.reflect.Modifier.ABSTRACT
   * @public
   * @static
   * @constant
   * @property {js.lang.Number} The value representing the abstract modifier.
   */
  "public static final ABSTRACT": 1024,

  /** 
   * @name js.lang.reflect.Modifier.INTERFACE
   * @public
   * @static
   * @constant
   * @property {js.lang.Number} The value representing the interface modifier.
   */
  "public static final INTERFACE": 512,

  /** 
   * @name js.lang.reflect.Modifier.WRITABLE
   * @public
   * @static
   * @constant
   * @property {js.lang.Number} The value representing the writable modifier.
   */
  "public static final WRITABLE": 256,

  /** 
   * @name js.lang.reflect.Modifier.ENUMERABLE
   * @public
   * @static
   * @constant
   * @property {js.lang.Number} The value representing the enumerable modifier.
   */
  "public static final ENUMERABLE": 128,

  /** 
   * @name js.lang.reflect.Modifier.CONFIGURABLE
   * @public
   * @static
   * @constant
   * @property {js.lang.Number} The value representing the configurable modifier.
   */
  "public static final CONFIGURABLE": 64,

  /** 
   * @name js.lang.reflect.Modifier.PROXYABLE
   * @public
   * @static
   * @constant
   * @property {js.lang.Number} The value representing the proxyable modifier.
   */
  "public static final PROXYABLE": 32,

  /** 
   * @name js.lang.reflect.Modifier.FINAL
   * @public
   * @static
   * @constant
   * @property {js.lang.Number} The value representing the final modifier.
   */
  "public static final FINAL": 16,

  /** 
   * @name js.lang.reflect.Modifier.STATIC
   * @public
   * @static
   * @constant
   * @property {js.lang.Number} The value representing the static modifier.
   */
  "public static final STATIC": 8,

  /**
   * @name js.lang.reflect.Modifier.PROTECTED
   * @public
   * @static
   * @constant
   * @property {js.lang.Number} The value representing the protected modifier.
   */
  "public static final PROTECTED": 4,

  /** 
   * @name js.lang.reflect.Modifier.PRIVATE
   * @public
   * @static
   * @constant
   * @property {js.lang.Number} The value representing the private modifier.
   */
  "public static final PRIVATE": 2,

  /** 
   * @name js.lang.reflect.Modifier.PUBLIC
   * @public
   * @static
   * @constant
   * @property {js.lang.Number} The value representing the public modifier.
   */
  "public static final PUBLIC": 1,

  /** 
   * @name js.lang.reflect.Modifier.DEFAULT
   * @public
   * @static
   * @constant
   * @property {js.lang.Number} The value representing the default modifier.
   */
  "public static final DEFAULT": 0,

  /** 
   * @name js.lang.reflect.Modifier.isInterface
   * @function
   * @public 
   * @static 
   * @summary Return true if the number argument includes the interface modifier, false otherwise.
   * @description 
   *
   * @param {js.lang.Number} mod - a set of modifiers
   * @return {js.lang.Boolean} true if mod includes the interface modifier; false otherwise.
   */
  "public static isInterface": function(mod) {
    return (mod & js.lang.reflect.Modifier.INTERFACE) !== 0;
  },

  /** 
   * @name js.lang.reflect.Modifier.isAnnotation
   * @function
   * @public 
   * @static 
   * @summary Return true if the number argument includes the annotation modifier, false otherwise.
   * @description 
   *
   * @param {js.lang.Number} mod - a set of modifiers
   * @return {js.lang.Boolean} true if mod includes the annotation modifier; false otherwise.
   */
  "public static isAnnotation": function(mod) {
    return (modifiers & js.lang.reflect.Modifier.ANNOTATION) !== 0;
  },

  /** 
   * @name js.lang.reflect.Modifier.isAbstract
   * @function
   * @public 
   * @static 
   * @summary Return true if the number argument includes the abstract modifier, false otherwise.
   * @description 
   *
   * @param {js.lang.Number} mod - a set of modifiers
   * @return {js.lang.Boolean} true if mod includes the abstract modifier; false otherwise.
   */
  "public static isAbstract": function(mod) {
    return (mod & js.lang.reflect.Modifier.ABSTRACT) !== 0;
  },

  /** 
   * @name js.lang.reflect.Modifier.isFinal
   * @function
   * @public 
   * @static 
   * @summary Return true if the number argument includes the final modifier, false otherwise.
   * @description 
   *
   * @param {js.lang.Number} mod - a set of modifiers
   * @return {js.lang.Boolean} true if mod includes the final modifier; false otherwise.
   */
  "public static isFinal": function(mod) {
    return (mod & js.lang.reflect.Modifier.FINAL) !== 0;
  },

  /** 
   * @name js.lang.reflect.Modifier.isPrivate
   * @function
   * @public 
   * @static 
   * @summary Return true if the number argument includes the private modifier, false otherwise.
   * @description 
   *
   * @param {js.lang.Number} mod - a set of modifiers
   * @return {js.lang.Boolean} true if mod includes the private modifier; false otherwise.
   */
  "public static isPrivate": function(mod) {
    return (mod & js.lang.reflect.Modifier.PRIVATE) !== 0;
  },

  /** 
   * @name js.lang.reflect.Modifier.isProtected
   * @function
   * @public 
   * @static 
   * @summary Return true if the number argument includes the protected modifier, false otherwise.
   * @description 
   *
   * @param {js.lang.Number} mod - a set of modifiers
   * @return {js.lang.Boolean} true if mod includes the protected modifier; false otherwise.
   */
  "public static isProtected": function(mod) {
    return (mod & js.lang.reflect.Modifier.PROTECTED) !== 0;
  },

  /** 
   * @name js.lang.reflect.Modifier.isPublic
   * @function
   * @public 
   * @static 
   * @summary Return true if the number argument includes the public modifier, false otherwise.
   * @description 
   *
   * @param {js.lang.Number} mod - a set of modifiers
   * @return {js.lang.Boolean} true if mod includes the public modifier; false otherwise.
   */
  "public static isPublic": function(mod) {
    return (mod & js.lang.reflect.Modifier.PUBLIC) !== 0;
  },

  /** 
   * @name js.lang.reflect.Modifier.isStatic
   * @function
   * @public 
   * @static 
   * @summary Return true if the number argument includes the static modifier, false otherwise.
   * @description 
   *
   * @param {js.lang.Number} mod - a set of modifiers
   * @return {js.lang.Boolean} true if mod includes the static modifier; false otherwise.
   */
  "public static isStatic": function(mod) {
    return (mod & js.lang.reflect.Modifier.STATIC) !== 0;
  },

  /** 
   * @name js.lang.reflect.Modifier.isDefault
   * @function
   * @public 
   * @static 
   * @summary Return true if the number argument includes the default modifier, false otherwise.
   * @description 
   *
   * @param {js.lang.Number} mod - a set of modifiers
   * @return {js.lang.Boolean} true if mod includes the default modifier; false otherwise.
   */
  "public static isDefault": function(mod) {
    return (mod & js.lang.reflect.Modifier.DEFAULT) !== 0;
  },

  /** 
   * @name js.lang.reflect.Modifier.isProxyable
   * @function
   * @public 
   * @static 
   * @summary Return true if the number argument includes the proxyable modifier, false otherwise.
   * @description 
   *
   * @param {js.lang.Number} mod - a set of modifiers
   * @return {js.lang.Boolean} true if mod includes the proxyable modifier; false otherwise.
   */
  "public static isProxyable": function(mod) {
    return (mod & js.lang.reflect.Modifier.PROXYABLE) !== 0;
  },

  /**
   * @name js.lang.reflect.Modifier.isWritable
   * @function
   * @public 
   * @static 
   * @summary Return true if the number argument includes the writable modifier, false otherwise.
   * @description 
   *
   * @param {js.lang.Number} mod - a set of modifiers
   * @return {js.lang.Boolean} true if mod includes the writable modifier; false otherwise.
   */
  "public static isWritable": function(mod) {
    return (mod & js.lang.reflect.Modifier.WRITABLE) !== 0;
  },

  /** 
   * @name js.lang.reflect.Modifier.isEnumerable
   * @function
   * @public 
   * @static 
   * @summary Return true if the number argument includes the enumerable modifier, false otherwise.
   * @description 
   *
   * @param {js.lang.Number} mod - a set of modifiers
   * @return {js.lang.Boolean} true if mod includes the enumerable modifier; false otherwise.
   */
  "public static isEnumerable": function(mod) {
    return (mod & js.lang.reflect.Modifier.ENUMERABLE) !== 0;
  },

  /** 
   * @name js.lang.reflect.Modifier.isConfigurable
   * @function
   * @public 
   * @static 
   * @summary Return true if the number argument includes the configurable modifier, false otherwise.
   * @description 
   *
   * @param {js.lang.Number} mod - a set of modifiers
   * @return {js.lang.Boolean} true if mod includes the configurable modifier; false otherwise.
   */
  "public static isConfigurable": function(mod) {
    return (mod & js.lang.reflect.Modifier.CONFIGURABLE) !== 0;
  },

  /** 
   * @function
   * @public 
   * @summary return itself
   * @description 
   *
   * @return {js.lang.reflect.Modifier} itself
   */
  clone: function() {
    return this;
  }
});