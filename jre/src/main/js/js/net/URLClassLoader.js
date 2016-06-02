/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 14, 2014
 */

Class.forName({
  name: "class js.net.URLClassLoader extends js.lang.ClassLoader",

  '@Setter @Getter loadedScripts': {},
  '@Setter @Getter waitingList': {},
  '@Setter @Getter path': [],

  URLClassLoader: function(parent) {
    this.parent = parent;
  },

  getVersion: function() {
    return js.lang.System.getProperty("skin");
  },

  "public abstract getRelative": function() {},

  findClass: function(scriptUrl, notModify) {
    var isString = (Object.isString(scriptUrl));

    if (isString)
      scriptUrl = [scriptUrl];

    var classes = {},
      path = this.path,
      querys = [];
    if (!Object.isArray(scriptUrl)) {
      return classes;
    }

    for (var i = 0; i < scriptUrl.length; i++) {
      var src = scriptUrl[i],
        url = src;

      for (var j = 0; j < path.length; j++) {
        if (path[j] && path[j].name && path[j].url) {
          if (src.indexOf(path[j].name) === 0) {
            src = path[j].url + src.substring(path[j].name.length);
            break;
          }
        }
      }
      src = src.replace(/[.]/g, "/") + ".js";


      if (this.getVersion()) {
        querys.push("v=" + this.getVersion());
      }

      if (notModify) {
        querys.push("t=" + new Date().getTime());
      }

      if (querys.length > 0) {
        src += "?" + querys.join("&");
      }

      classes[url] = this.getRelative() + src;
    }
    return classes;
  },
  /**
   * Loads one or more external script checking if not already loaded
   * previously by this function.
   *
   * @param {String|Array}
   *            scriptUrl One or more URLs pointing to the scripts to
   *            be loaded.
   * @param {Function}
   *            [callback] A function to be called when the script is
   *            loaded and executed. If a string is passed to
   *            "scriptUrl", a boolean parameter is passed to the
   *            callback, indicating the success of the load. If an
   *            array is passed instead, two array parameters are
   *            passed to the callback; the first contains the URLs
   *            that have been properly loaded, and the second the
   *            failed ones.
   * @param {Object}
   *            [$scope] The $scope ("this" reference) to be used for
   *            the callback call. Default to {@link Mclipse}.
   * @param {Boolean}
   *            [showBusy] Changes the cursor of the document while + *
   *            the script is loaded.
   * @example new js.net.URLClassLoader().load( '/myscript.js' );
   * @example new js.net.URLClassLoader().load( '/myscript.js',
   *          function( success ) { // Alerts "true" if the script has
   *          been properly loaded. // HTTP error 404 should return
   *          "false". alert( success ); });
   * @example new js.net.URLClassLoader().load( [ '/myscript1.js',
   *          '/myscript2.js' ], function( completed, failed ) {
   *          alert( 'Number of scripts loaded: ' + completed.length );
   *          alert( 'Number of failures: ' + failed.length ); });
   */
  loadClass: (function(global) {

    var checkLoaded = function(url, success, asynchronous, notModify, callback, $scope, completed, failed, last) {

      (success ? completed : failed).push(url);
      if (last) {
        if (callback) {
          callback.call($scope, completed, failed);
        }
      }
    };

    var onLoad = function(url, success, asynchronous, notModify, callback, $scope, loadedScripts, waitingList, scope, completed, failed, last) {
      // Mark this script as loaded.

      if (success) {
        loadedScripts[url] = 1;

        if (waitingList[url]) {
          // Get the list of callback checks waiting for this
          // file.
          var waitingInfo = waitingList[url];
          delete waitingList[url];

          // Check all callbacks waiting for this file.
          for (var i = 0; i < waitingInfo.length; i++) {
            waitingInfo[i](url, success, asynchronous, notModify, callback, $scope, completed, failed, last);
          }
        }
      } else if (scope.parent) {
        scope.parent.loadClass(url, callback, $scope, asynchronous, notModify);
      } else {
        throw new js.lang.ClassNotFoundException("Can't find Class named (" + url + ")");
      }
    };

    var loadScript = function(url, src, notModify, callback, $scope, loadedScripts, waitingList, scope, completed, failed, last) {

      // Create the <script> element.
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = src;

      if (script) {
        if ('addEventListener' in script) {
          script.onload = function() {
            onLoad(url, true, true, notModify, callback, $scope, loadedScripts, waitingList, scope, completed, failed, last);
          };
        } else if ('readyState' in script) { // for <IE9
          // Compatability
          script.onreadystatechange = function() {
            if (script.readyState === 'loaded' || script.readyState === 'complete') {
              script.onreadystatechange = null;
              onLoad(url, true, true, notModify, callback, $scope, loadedScripts, waitingList, scope, completed, failed, last);
            }
          };
        } else {
          /** @ignore */
          script.onload = function() {
            // Some browsers, such as Safari, may call the
            // onLoad function
            // immediately. Which will break the loading
            // sequence. (#3661)
            setTimeout(function() {
              onLoad(url, true, true, notModify, callback, $scope, loadedScripts, waitingList, scope, completed, failed, last);
            }, 0);
          };

          // FIXME: Opera and Safari will not fire onerror.
          /** @ignore */
          script.onerror = function() {
            onLoad(url, false, true, notModify, callback, $scope, loadedScripts, waitingList, scope, completed, failed, last);
          };
        }
        // }

        // Append it to <head>.
        (document.head || document.getElementsByTagName("head")[0]).appendChild(script);
      }

    };

    var synchronousScript = function(url, src, notModify, callback, $scope, loadedScripts, waitingList, scope, completed, failed, last) {
      var isCrossOriginRestricted = false,
        xhr, status, isIE = /msie/.test(navigator.userAgent.toLowerCase()),
        debugSourceURL = isIE ? "" : ("\n//# sourceURL=" + src);

      if (typeof XMLHttpRequest != 'undefined') {
        xhr = new XMLHttpRequest();
      } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
      }

      try {
        xhr.open('GET', src, false);
        xhr.send(null);
      } catch (e) {
        isCrossOriginRestricted = true;
      }

      status = (xhr.status === 1223) ? 204 : (xhr.status === 0 && ((self.location || {}).protocol === 'file:' || (self.location || {}).protocol === 'ionp:')) ? 200 : xhr.status;

      isCrossOriginRestricted = isCrossOriginRestricted || (status === 0);

      if (isCrossOriginRestricted) {
        onLoad(url, false, false, notModify, callback, $scope, loadedScripts, waitingList, scope, completed, failed, last);
      } else if ((status >= 200 && status < 300) || (status === 304)) {
        //eval(xhr.responseText + debugSourceURL);
        new Function(xhr.responseText + debugSourceURL)(url);

        onLoad(url, true, false, notModify, callback, $scope, loadedScripts, waitingList, scope, completed, failed, last);
      } else {
        onLoad(url, false, false, notModify, callback, $scope, loadedScripts, waitingList, scope, completed, failed, last);
      }
      xhr = null;
    };

    return function(scriptUrl, callback, $scope, asynchronous, notModify) {

      var isString = (Object.isString(scriptUrl));

      if (isString)
        scriptUrl = [scriptUrl];

      if (!Object.isArray(scriptUrl)) {
        return false;
      }

      var scriptCount = scriptUrl.length,
        completed = [],
        failed = [];

      if (!$scope) {
        $scope = this;
      }

      if (scriptCount === 0) {
        if (callback) {
          callback.call($scope, true);
        }
        return true;
      }

      for (var i = 0; i < scriptCount; i++) {
        var url = scriptUrl[i];

        var last = i === scriptCount - 1;

        isString = Object.isString(url);

        if (!isString) {
          continue;
        }

        var loadedScripts = this.loadedScripts,
          waitingList = this.waitingList,
          scope = this;

        if (!$scope) {
          $scope = this;
        }

        // 1.判断内存中是否存在
        var u = url.split("."),
          ref = global;
        for (var j = 0, len = u.length; j < len; j++) {
          if (ref) {
            ref = ref[u[j]];
          } else {
            break;
          }
        }
        if (ref && !ref.equals(global)) {
          return;
        }

        // 2.判断当前ClassLoader是否加载过。
        if (loadedScripts[url]) {
          return;
        }

        var waitingInfo = waitingList[url] || (waitingList[url] = []);

        // 3.Load it only for the first request. // 4.委托父加载器加载
        if (waitingInfo.length > 0) {
          return;
        } else {
          waitingInfo.push(checkLoaded);
        }

        var classes = this.findClass(url, notModify);

        if (asynchronous) {
          loadScript(url, classes[url], notModify, callback, $scope, loadedScripts, waitingList, scope, completed, failed, last);
        } else {
          synchronousScript(url, classes[url], notModify, callback, $scope, loadedScripts, waitingList, scope, completed, failed, last);
        }

      }
    };
  })(this)

});