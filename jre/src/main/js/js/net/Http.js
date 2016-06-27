/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 14, 2014
 */
define(function(require, exports, module) {

  return Class.forName({
    name: "class js.net.http.Http extends Object",
    "public static REQUEST": {
      TYPE: ["GET", "HEAD", "PUT", "DELETE", "POST", "OPTIONS"]
    },
    Http: function() {}
  }).getClassConstructor();

});