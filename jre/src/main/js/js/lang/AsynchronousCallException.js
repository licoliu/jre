/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 19, 2014
 */

/**
 * @class js.lang.AsynchronousCallException 
 * @extends {js.lang.Exception}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Thrown because of a failed synchronous call.
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.AsynchronousCallException.prototype */ {
  name: "class js.lang.AsynchronousCallException extends js.lang.Exception",
  "private name": "js.lang.AsynchronousCallException", // 错误名
  "private number": 500, // 错误号

  "toString": function() {
    var name = this.getClass().getFullName(),
      desc = this.description;
    return (desc && desc.status) ? name + ": " + desc.statusText + "-" + desc.status : name;
  }
});