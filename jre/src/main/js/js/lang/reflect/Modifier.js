/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 14, 2014
 */

/**
 * abstract 1024, interface 512, final 16, static 8, protected 4, private 2
 * ,public 1,default 0
 */
Class.forName({
  name: "public class js.lang.reflect.Modifier extends Object",

  /** 表示 abstract 修饰符的 int 的值。 2E10 */
  "public static final ABSTRACT": 1024,

  /** 表示 interface 修饰符的 int 的值。 2E9 */
  "public static final INTERFACE": 512,

  "public static final WRITABLE": 256,
  "public static final ENUMERABLE": 128,
  "public static final CONFIGURABLE": 64,
  "public static final PROXYABLE": 32,

  /** 表示 final 修饰符的 int 值。 2E4 */
  "public static final FINAL": 16,

  /** 表示 static 修饰符的 int 值。 2E3 */
  "public static final STATIC": 8,

  /** 表示 protected 修饰符的 int 值。 2E2 */
  "public static final PROTECTED": 4,

  /** 表示 private 修饰符的 int 值。2E1 */
  "public static final PRIVATE": 2,

  /** 表示 public 修饰符的 int 值。 2E0 */
  "public static final PUBLIC": 1,

  /** 表示 default 修饰符的 int 值。 2E0 */
  "public static final DEFAULT": 0,

  /** 如果整数参数包括 abstract 修饰符，则返回 true，否则返回 false。 */
  "public static isAbstract": function(mod) {
    return (mod & js.lang.reflect.Modifier.ABSTRACT) !== 0;
  },
  /** 如果整数参数包括 final 修饰符，则返回 true，否则返回 false。 */
  "public static isFinal": function(mod) {
    return (mod & js.lang.reflect.Modifier.FINAL) !== 0;
  },
  /** 如果整数参数包括 interface 修饰符，则返回 true，否则返回 false。 */
  "public static isInterface": function(mod) {
    return (mod & js.lang.reflect.Modifier.INTERFACE) !== 0;
  },
  /** 如果整数参数包括 private 修饰符，则返回 true，否则返回 false。 */
  "public static isPrivate": function(mod) {
    return (mod & js.lang.reflect.Modifier.PRIVATE) !== 0;
  },
  /** 如果整数参数包括 protected 修饰符，则返回 true，否则返回 false。 */
  "public static isProtected": function(mod) {
    return (mod & js.lang.reflect.Modifier.PROTECTED) !== 0;
  },
  /** 如果整数参数包括 public 修饰符，则返回 true，否则返回 false。 */
  "public static isPublic": function(mod) {
    return (mod & js.lang.reflect.Modifier.PUBLIC) !== 0;
  },
  /** 如果整数参数包括 static 修饰符，则返回 true，否则返回 false。 */
  "public static isStatic": function(mod) {
    return (mod & js.lang.reflect.Modifier.STATIC) !== 0;
  },
  "public static isDefault": function(mod) {
    return (mod & js.lang.reflect.Modifier.DEFAULT) !== 0;
  },
  "public static isProxyable": function(mod) {
    return (mod & js.lang.reflect.Modifier.PROXYABLE) !== 0;
  },
  "public static isWritable": function(mod) {
    return (mod & js.lang.reflect.Modifier.WRITABLE) !== 0;
  },
  "public static isEnumerable": function(mod) {
    return (mod & js.lang.reflect.Modifier.ENUMERABLE) !== 0;
  },
  "public static isConfigurable": function(mod) {
    return (mod & js.lang.reflect.Modifier.CONFIGURABLE) !== 0;
  },

  clone: function() {
    return this;
  }
});