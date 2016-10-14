/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 12, 2014
 */

/**
 * @class js.lang.IllegalAccessException 
 * @extends {js.lang.Exception}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * An IllegalAccessException is thrown when an application tries to reflectively create an instance (other than an array), set or get a field, or invoke a method, but the currently executing method does not have access to the definition of the specified class, field, method or constructor.
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.IllegalAccessException.prototype */ {
  name: "class js.lang.IllegalAccessException extends js.lang.Exception",
  "private name": "js.lang.IllegalAccessException", // 错误名
  "private number": 101 // 错误号
});