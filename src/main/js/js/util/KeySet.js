/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 11, 2014
 */
define(function(require, exports, module) {

  require("bootstrap!js.util.Set");

  Class.forName({
    name: "class js.util.KeySet extends js.util.Set",
    "private _element": null,
    KeySet: function(element) {
      this._element = element;
    },
    iterator: function() {
      return new js.util.KeyIterator(this._element);
    },
    size: function() {
      return this._element.size();
    }
  });
});

