/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 12, 2014
 */

/**
 * @class js.lang.NullPointerException 
 * @extends {js.lang.Exception}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Thrown when an application attempts to use null in a case where an object is required. These include:
 * <ul><li>Calling the instance method of a null object.</li>
 * <li>Accessing or modifying the field of a null object.</li>
 * <li>Taking the length of null as if it were an array.</li>
 * <li>Accessing or modifying the slots of null as if it were an array.</li>
 * <li>Throwing null as if it were a Throwable value.</li>
 * </ul></p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Applications should throw instances of this class to indicate other illegal uses of the null object. 
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.NullPointerException.prototype */ {
  name: "class js.lang.NullPointerException extends js.lang.Exception",
  "private name": "js.lang.NullPointerException",
  "private number": 107
});