/** 
 * @class atom.misc.Launcher
 * @extends {js.lang.Object} 
 * @description 
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends atom.misc.Launcher.prototype */ {
  name: "class atom.misc.Launcher extends Object",
  "private static launcher": null,
  "@Getter private loader": null,

  "public getClassLoader": function() {
    return this.loader;
  },

  "public Launcher": function() {
    var bootstrap;
    try {
      bootstrap = atom.misc.Launcher.BootstrapClassLoader.getBootstrapClassLoader();
    } catch (e) {
      throw new js.lang.InternalError("Could not create bootstrap class loader");
    }

    var extcl;
    try {
      extcl = atom.misc.Launcher.ExtClassLoader.getExtClassLoader(bootstrap);
    } catch (e) {
      throw new js.lang.InternalError("Could not create extension class loader");
    }
    // Now create the class loader to use to launch the application
    try {
      this.loader = atom.misc.Launcher.AppClassLoader.getAppClassLoader(extcl);
    } catch (e) {
      throw new js.lang.InternalError("Could not create application class loader");
    }

    var csscl;
    try {
      csscl = atom.misc.Launcher.CSSClassLoader.getCSSClassLoader();
    } catch (e) {
      throw new js.lang.InternalError("Could not create css class loader");
    }
  },

  "public static getLauncher": function() {
    var launcher = atom.misc.Launcher.launcher;
    if (!launcher) {
      launcher = new atom.misc.Launcher();
      atom.misc.Launcher.launcher = launcher;
    }
    return launcher;
  }
});

Class.forName({
  name: "class atom.misc.Launcher.TestcaseClassLoader extends js.net.URLClassLoader",

  "private static testcaseClassLoader": null,

  "private TestcaseClassLoader": function() {

  },

  "public getRelative": function() {
    return js.lang.System.getProperty("js.test.dirs");
  },

  "public static getTestcaseClassLoader": function() {
    var loader = atom.misc.Launcher.TestcaseClassLoader.testcaseClassLoader;
    if (!loader) {
      loader = new atom.misc.Launcher.TestcaseClassLoader();
      atom.misc.Launcher.TestcaseClassLoader.testcaseClassLoader = loader;
    }
    return loader;
  }
});

Class.forName({
  name: "class atom.misc.Launcher.BootstrapClassLoader extends js.net.URLClassLoader",

  "private static bootstrapClassLoader": null,

  "private BootstrapClassLoader": function() {

  },

  "public getRelative": function() {
    return js.lang.System.getProperty("atom.bootstrap.class.path");
  },

  "public static getBootstrapClassLoader": function() {
    var loader = atom.misc.Launcher.BootstrapClassLoader.bootstrapClassLoader;
    if (!loader) {
      loader = new atom.misc.Launcher.BootstrapClassLoader();
      atom.misc.Launcher.BootstrapClassLoader.bootstrapClassLoader = loader;
    }
    return loader;
  }
});

Class.forName({
  name: "class atom.misc.Launcher.ExtClassLoader extends js.net.URLClassLoader",

  "private static extClassLoader": null,

  "private ExtClassLoader": function(parent) {
    this.parent = parent;
  },

  "public getRelative": function() {
    return js.lang.System.getProperty("js.ext.dirs");
  },

  "public static getExtClassLoader": function(cl) {
    var loader = atom.misc.Launcher.ExtClassLoader.extClassLoader;
    if (!loader) {
      loader = new atom.misc.Launcher.ExtClassLoader(cl);
      atom.misc.Launcher.ExtClassLoader.extClassLoader = loader;
    }
    return loader;
  }
});

Class.forName({
  name: "class atom.misc.Launcher.CSSClassLoader extends js.net.URLClassLoader",

  "private static cssClassLoader": null,
  "public static final BOOTSTRAP": "BOOTSTRAP",
  "public static final EXT": "EXT",
  "public static final APP": "APP",
  "public static final SKIN": "SKIN",

  "private CSSClassLoader": function() {},

  "public static getCSSClassLoader": function() {
    var loader = atom.misc.Launcher.CSSClassLoader.cssClassLoader;
    if (!loader) {
      loader = new atom.misc.Launcher.CSSClassLoader();
      atom.misc.Launcher.CSSClassLoader.cssClassLoader = loader;
    }
    return loader;
  },

  "public getRelative": function(type) {
    switch (type) {
      case atom.misc.Launcher.CSSClassLoader.EXT:
        return js.lang.System.getProperty("css.ext.dirs");
      case atom.misc.Launcher.CSSClassLoader.SKIN:
        return js.lang.System.getProperty("css.skin.path");
      case atom.misc.Launcher.CSSClassLoader.BOOTSTRAP:
        return js.lang.System.getProperty("css.bootstrap.dirs");
      case atom.misc.Launcher.CSSClassLoader.APP:
      default:
        return js.lang.System.getProperty("css.class.path");
    }
  },

  "getSkin": function() {
    return js.lang.System.getProperty('skin');
  },

  findClass: function(linkUrl, notModify, type) {
    var isString = (Object.isString(linkUrl));

    if (isString)
      linkUrl = [linkUrl];

    var classes = {},
      path = this.path,
      querys = [],
      relative = null;
    if (!Object.isArray(linkUrl)) {
      return classes;
    }

    for (var i = 0; i < linkUrl.length; i++) {
      var src = linkUrl[i],
        url = src;

      for (var j = 0; j < path.length; j++) {
        if (path[j] && path[j].name && path[j].url) {
          if (src.indexOf(path[j].name) === 0) {
            src = path[j].url + src.substring(path[j].name.length);
            break;
          }
        }
      }
      src = src.replace(/[.]/g, "/") + ".css";

      if (notModify) {
        querys.push("t=" + new Date().getTime());
      }

      var version = js.lang.System.getProperty("version");
      var debug = js.lang.System.getProperty("debug");

      if (version) {
        querys.push("v=" + version);
      }

      if (querys.length > 0) {
        src += "?" + querys.join("&");
      }

      classes[url] = this.getRelative(type) + src;
    }
    return classes;
  },

  "protected loadClass": function(url, callback, $scope, type, notModify) {

    var isString = (Object.isString(url));

    if (isString)
      url = [url];

    if (!Object.isArray(url)) {
      return false;
    }

    var linkCount = url.length,
      completed = [],
      failed = [];

    if (linkCount === 0) {
      if (callback) {
        callback.call($scope, true);
      }
      return true;
    }

    for (var i = 0; i < linkCount; i++) {
      var linkUrl = url[i];

      if (!Object.isString(linkUrl)) {
        return false;
      }
      var link = document.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = this.findClass(linkUrl, notModify, type)[linkUrl];
      if (this.loadedScripts[link.href]) {
        continue;
      }
      this.loadedScripts[link.href] = 1;
      (document.head || document.getElementsByTagName("head")[0]).appendChild(link);

    }
  }
});

Class.forName({
  name: "class atom.misc.Launcher.AppClassLoader extends js.net.URLClassLoader",

  "private static appClassLoader": null,

  "private AppClassLoader": function(parent) {
    this.parent = parent;
  },

  "public getRelative": function() {
    return js.lang.System.getProperty("js.class.path");
  },

  "public static getAppClassLoader": function(cl) {
    var loader = atom.misc.Launcher.AppClassLoader.appClassLoader;
    if (!loader) {
      loader = new atom.misc.Launcher.AppClassLoader(cl);
      atom.misc.Launcher.AppClassLoader.appClassLoader = loader;
    }
    return loader;
  },

  "public main": function() {
    var mainClass = js.lang.System.getProperty("main");
    if (mainClass) {
      if (typeof seajs !== 'undefined') {
        seajs.config({
          // base: js.lang.System.getProperty("js.class.path")
        });
        seajs.use(mainClass);
      } else {
        // this.loadClass(mainClass);
        $import(mainClass);
      }
    }
  }
});

(function(global) {
  global.$import = function(name, classloader, async, callback) {
    if (Object.isNull(classloader)) {
      var index = name.indexOf("!");
      var prefix = "";
      if (index !== -1) {
        prefix = name.substring(0, index);
        name = name.substring(index + 1);
      }

      switch (prefix) {

        //css,css-ext,skin
        case 'skin':
          classloader = 'CSSClassLoader';
          async = atom.misc.Launcher.CSSClassLoader.SKIN;
          break;
        case 'css':
        case 'css:app':
          classloader = 'CSSClassLoader';
          async = null;
          break;
        case 'css:ext':
          classloader = 'CSSClassLoader';
          async = atom.misc.Launcher.CSSClassLoader.EXT;
          break;
        case 'css:bootstrap':
          classloader = 'CSSClassLoader';
          async = atom.misc.Launcher.CSSClassLoader.BOOTSTRAP;
          break;

          //test
        case 'js:test':
        case 'test':
          classloader = 'TestcaseClassLoader';
          break;

          //bootstrap,ext,app
        case 'js:ext':
        case 'ext':
          classloader = 'ExtClassLoader';
          break;
        case 'js:bootstrap':
        case 'bootstrap':
          classloader = 'BootstrapClassLoader';
          break;
        case 'js:app':
        case 'app':
        default:
          classloader = null;
          break;
      }

      if (Object.isNull(classloader)) {
        classloader = js.lang.ClassLoader.getSystemClassLoader();
      }
    }

    if (!Object.isInstanceof(classloader, js.lang.ClassLoader)) {
      switch (classloader) {
        case 'BootstrapClassLoader':
          classloader = atom.misc.Launcher.BootstrapClassLoader.getBootstrapClassLoader();
          break;
        case 'ExtClassLoader':
          classloader = atom.misc.Launcher.ExtClassLoader.getExtClassLoader();
          break;
        case 'TestcaseClassLoader':
          classloader = atom.misc.Launcher.TestcaseClassLoader.getTestcaseClassLoader();
          break;
        case 'CSSClassLoader':
          classloader = atom.misc.Launcher.CSSClassLoader.getCSSClassLoader();
          break;
        default:
          classloader = js.lang.ClassLoader.getSystemClassLoader();
          break;
      }
    }
    // 1判断内存中是否存在 ， 2判断当前ClassLoader是否加载过。classloader.getDebug()
    return classloader.loadClass(name, callback, null, async, false);
  };

  if (!global.define) {
    global.define = function(factory) {
      if (Object.isFunction(factory)) {
        factory.call(global, global.$import, global);
      } else {
        var name = arguments.callee.caller.arguments[0];
        if (name && !"".equals(name = name.trim())) {
          var names = name.split("."),
            len = names.length,
            g = global;
          for (var i = 0; i < len; i++) {
            g = g[i];
            if (!g) {
              g = {};
            }
          }
          g = factory;
        }
      }
    };
  }

  js.lang.System.setOut(new js.io.Console(console));

  var root = [location.origin],
    version = null,
    isDebug = false,
    scripts = document.getElementsByTagName("script"),
    mainClass = null,
    skin = null,
    loglevel = null,
    target = null,
    immediately = true,
    servletPath = null,
    rps = ["classes"],
    bps = ["jre", "classes"],
    eps = ["lib"],
    aps = ["classes"],
    tps = ["src", "test", "js"];

  for (var i = 0, len = scripts.length; i < len; i++) {
    var script = scripts[i],
      jsvm = script.getAttribute("jsvm"),
      sp = script.getAttribute("servletpath"),
      hasDebug = script.hasAttribute("debug"),
      debug = script.getAttribute("debug"),
      v = script.getAttribute("version"),
      main = script.getAttribute("main"),
      im = script.getAttribute("immediately"),
      s = script.getAttribute("skin"),
      t = script.getAttribute("target"),
      ll = script.getAttribute("loglevel");

    if (jsvm && jsvm === 'true') {

      if (hasDebug && debug.toLowerCase() !== 'false') {
        isDebug = true;
      }

      if (!im || im.toLowerCase() !== 'true') {
        immediately = false;
      }

      if (main) {
        mainClass = main;
      }
      skin = s || 'default';
      version = v;
      target = t || 'local';
      loglevel = ll || 'error';

      rps = isDebug ? ["src", "main"] : ["classes"];
      bps = ["jre"].concat(rps);
      eps = ["lib"];
      aps = rps.slice();
      tps = ["src", "test", "js"];

      if (sp) {
        sp = sp.trim();

        if (!"/".equals(sp)) {
          if (sp.indexOf("/") === 0) {
            sp = sp.substring(1);
          }
          if (sp.lastIndexOf("/") === sp.length - 1) {
            sp = sp.substring(0, sp.length - 1);
          }

          var sps = [],
            _sps = sp.split("/");
          for (var i = 0, len = _sps.length; i < len; i++) {
            var _sp = _sps[i].trim();
            if (!_sp || "." == _sp) {
              continue;
            } else if (".." == _sp) {
              rps.shift();
              bps.shift();
              eps.shift();
              aps.shift();
              tps.shift();
            } else {
              rps.unshift(_sp);
              bps.unshift(_sp);
              eps.unshift(_sp);
              aps.unshift(_sp);
              tps.unshift(_sp);
            }

            sps.push(_sp);
          }

          sp = sps.join("/");
          root.push(sp);
        }
        servletPath = sp;
      }
      break;
    }
  }

  var loader = atom.misc.Launcher.getLauncher().getLoader();

  var getUrl = function(urls) {
    var _url = (urls || []).join("/").replace(/\/{2,}/g, "/");

    if (_url.charAt(0) !== '/') {
      _url = "/" + _url;
    }

    if (_url.slice(-1) !== '/') {
      _url += '/';
    }

    return _url;
  };

  js.lang.System.setProperty("atom.root.dirs", getUrl(root));

  js.lang.System.setProperty("atom.bootstrap.class.path", getUrl(bps.concat(["js"])));
  js.lang.System.setProperty("js.ext.dirs", getUrl(eps));
  js.lang.System.setProperty("js.class.path", getUrl(aps.concat(["js"])));

  js.lang.System.setProperty("js.test.dirs", getUrl(tps));

  js.lang.System.setProperty("css.bootstrap.dirs", getUrl(bps.concat(["css"])));
  js.lang.System.setProperty("css.ext.dirs", getUrl(eps));
  js.lang.System.setProperty("css.class.path", getUrl(aps.concat(["css"])));
  js.lang.System.setProperty("css.skin.path", getUrl(aps.concat(["skin", "css"])));

  js.lang.System.setProperty("template.bootstrap.dirs", getUrl(bps.concat(["template"])));
  js.lang.System.setProperty("template.ext.dirs", getUrl(eps));
  js.lang.System.setProperty("template.class.path", getUrl(aps.concat(["template"])));

  js.lang.System.setProperty("main", mainClass);
  js.lang.System.setProperty("debug", isDebug);
  js.lang.System.setProperty("version", version);
  js.lang.System.setProperty("loglevel", loglevel);
  js.lang.System.setProperty("target", target);
  js.lang.System.setProperty("servletPath", servletPath);
  js.lang.System.setProperty("skin", skin);
  js.lang.System.setProperty("immediately", immediately);

  if (immediately) {
    loader.main();
  } else {
    js.dom.Document.ready(loader.main, loader);
  }
})(this);