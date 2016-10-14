/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 12, 2014
 */
define(function(require, exports, module) {

  require("bootstrap!js.lang.Exception");

  /** 
   * @abstract
   * @class js.util.NoSuchElementException 
   * @extends {js.lang.Exception}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Thrown by various accessor methods to indicate that the element being requested does not exist.
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
  return Class.forName( /** @lends js.util.NoSuchElementException.prototype */ {
    name: "class js.util.NoSuchElementException extends js.lang.Exception",
    "private name": "js.util.NoSuchElementException", // 错误名
    "private number": 801
      // 错误号
  }).getClassConstructor();
});