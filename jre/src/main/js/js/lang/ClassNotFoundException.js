/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 19, 2014
 */

/** 
 * @class js.lang.ClassNotFoundException 
 * @extends {js.lang.Exception}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Thrown when an application tries to load in a class through its string name using:
 * <ul><li>The loadClass method in class ClassLoader.</li></ul>
 * but no definition for the class with the specified name could be found.
 * </p><br/>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.ClassNotFoundException.prototype */ {
  name: "class js.lang.ClassNotFoundException extends js.lang.Exception",
  "private name": "js.lang.ClassNotFoundException", // 错误名
  "private number": 100
    // 错误号
});