/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 12, 2014
 */

/**
 * @class js.lang.IndexOutOfBoundsException 
 * @extends {js.lang.Exception}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Thrown to indicate that an index of some sort (such as to an array, to a string, or to a vector) is out of range.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Applications can subclass this class to indicate similar exceptions.
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.IndexOutOfBoundsException.prototype */ {
  name: "class js.lang.IndexOutOfBoundsException extends js.lang.Exception",
  "private name": "js.lang.IndexOutOfBoundsException", // 错误名
  "private number": 104 // 错误号
});