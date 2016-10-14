/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 10, 2014
 */

/** 
 * @class js.dom.Document 
 * @extends {js.lang.Object}
 * @description 
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.dom.Document.prototype */ {
  name: "class js.dom.Document",

  Document: function() {},

  /** 
   * @name js.dom.Document.ready
   * @function
   * @public 
   * @static 
   * @summary Specify a function to execute when the DOM is fully loaded.
   * @description 
   * <p>
   * The .ready() method offers a way to run JavaScript code as soon as the page's Document Object Model (DOM) becomes safe to manipulate. This will often be a good time to perform tasks that are needed before the user views or interacts with the page, for example to add event handlers and initialize plugins. When multiple functions are added via successive calls to this method, they run when the DOM is ready in the order in which they are added. 
   * </p>
   *
   * @param {js.lang.Function} ready - the callback when the DOM is fully loaded.
   * @param {js.lang.Object} scope - the callback's execution context
   */
  "static ready": (function() {

    var isReady = false,
      isReadyListen = false;
    var readyQueue = [];
    var completed = function() {
      document.removeEventListener("DOMContentLoaded", completed);
      window.removeEventListener("load", completed);

      onload();
    };
    var onload = function() {
      for (var i = 0, len = readyQueue.length; i < len; i++) {
        if (readyQueue[i] && readyQueue[i].ready && Object.isFunction(readyQueue[i].ready)) {
          readyQueue[i].ready.apply(readyQueue[i].scope || window);
        }
      }

      readyQueue.clear();
    };

    return function(ready, scope) {

      if (Object.isNull(ready) || !Object.isFunction(ready)) {
        throw new js.lang.IllegalArgumentException("You should give me a valid function, that i will execute it as a callback when the document loaded.");
      }

      readyQueue.push({
        ready: ready,
        scope: scope || window
      });

      if (document.readyState === "complete") {
        // Handle it asynchronously to allow scripts the opportunity to delay ready
        setTimeout(onload);

      } else if (!isReadyListen) {
        // Use the handy event callback
        document.addEventListener("DOMContentLoaded", completed);
        // A fallback to window.onload, that will always work
        window.addEventListener("load", completed);

        isReadyListen = true;
      }
    };
  })(),

  /** 
   * @name js.dom.Document.getDocument
   * @function
   * @public 
   * @static 
   * @summary get the document object
   * @description 
   *
   * @return {js.lang.Object} 
   */
  "static getDocument": function() {
    return document;
  }
});