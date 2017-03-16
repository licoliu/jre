/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 12, 2014
 */

/**
 * @class js.lang.Exception 
 * @extends {js.lang.Throwable}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The class Exception and its subclasses are a form of Throwable that indicates conditions that a reasonable application might want to catch.
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.Exception.prototype */ {
  name: "class js.lang.Exception extends js.lang.Throwable",

  "private name": "js.lang.Exception", // 错误名

  "private number": 0, // 错误号

  Exception: function(message, fileName, lineNumber, stack, description) {
    this.message = message;
    this.fileName = fileName;
    this.stack = stack;
    this.lineNumber = lineNumber;
    this.description = description;
  }

});