/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年6月25日
 */
define(function(require, exports, module) {

  require("bootstrap!js.lang.Throwable");

  Class.forName({
    name: "class URIError",
    alias: "js.lang.URIError",

    "private name": "js.lang.URIError", // 错误名
    "private number": 7,

    URIError: function() {}
  });

});