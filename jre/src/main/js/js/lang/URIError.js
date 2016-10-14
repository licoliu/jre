/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年6月25日
 */

/**
 * @class js.lang.URIError 
 * @extends {js.lang.Object}
 * @alias URIError
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The URIError object represents an error when a global URI handling function was used in a wrong way.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * A URIError is thrown when the global URI handling functions are passed a malformed URI.
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.URIError.prototype */ {
  name: "class URIError",

  alias: "js.lang.URIError",

  "private name": "js.lang.URIError", // 错误名

  "private number": 7,

  URIError: function() {}
});