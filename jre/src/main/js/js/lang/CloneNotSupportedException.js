/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 19, 2014
 */

/**
 * @class js.lang.CloneNotSupportedException 
 * @extends {js.lang.Exception}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Thrown to indicate that the <code>clone</code> method in class
 * <code>Object</code> has been called to clone an object, but that
 * the object's class does not implement the <code>Cloneable</code>
 * interface.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Applications that override the <code>clone</code> method can also
 * throw this exception to indicate that an object could not or
 * should not be cloned.
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 *
 * @see java.lang.Object#clone()
 */
Class.forName( /** @lends js.lang.CloneNotSupportedException.prototype */ {
  name: "class js.lang.CloneNotSupportedException extends js.lang.Exception",
  "private name": "js.lang.CloneNotSupportedException", // 错误名
  "private number": 109
  // 错误号
});