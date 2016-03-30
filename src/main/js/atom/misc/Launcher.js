/**
 * @namespace atom
 */
/**
 * @namespace atom.misc
 */
Class.forName({
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
  "@Setter @Getter private skin": null,

  "private CSSClassLoader": function() {},

  "public static getCSSClassLoader": function() {
    var loader = atom.misc.Launcher.CSSClassLoader.cssClassLoader;
    if (!loader) {
      loader = new atom.misc.Launcher.CSSClassLoader();
      atom.misc.Launcher.CSSClassLoader.cssClassLoader = loader;
    }
    return loader;
  },

  "public getRelative": function() {
    return js.lang.System.getProperty("atom.root.dirs");
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

      switch (type) {
        case atom.misc.Launcher.CSSClassLoader.EXT:
          relative = '/lib/';
          break;
        case atom.misc.Launcher.CSSClassLoader.SKIN:
          relative = (debug ? '/src/main/skin/' : "/classes/skin/") + this.skin + "/css/";
          break;
        case atom.misc.Launcher.CSSClassLoader.BOOTSTRAP:
          relative = "";
          break;
        case atom.misc.Launcher.CSSClassLoader.APP:
        default:
          relative = (debug ? '/src/main/css/' : "/classes/css/");
          break;
      }

      classes[url] = this.getRelative() + relative + src;
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
        this.loadClass(mainClass);
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

          //4.bootstrap,ext,app
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
    } else if (!Object.isInstanceof(classloader, js.lang.ClassLoader)) {
      switch (classloader) {
        case 'BootstrapClassLoader':
          classloader = atom.misc.Launcher.BootstrapClassLoader.getBootstrapClassLoader();
          break;
        case 'ExtClassLoader':
          classloader = atom.misc.Launcher.ExtClassLoader.getExtClassLoader();
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
    path = null,
    mainClass = null,
    skin = null,
    servletpath = null;

  for (var i = 0, len = scripts.length; i < len; i++) {
    var script = scripts[i],
      jsvm = script.getAttribute("jsvm"),
      sp = script.getAttribute("servletpath"),
      hasDebug = script.hasAttribute("debug"),
      debug = script.getAttribute("debug"),
      v = script.getAttribute("version"),
      main = script.getAttribute("main"),
      s = script.getAttribute("skin");

    if (jsvm && jsvm === 'true') {
      if (sp) {
        sp = sp.trim();

        if (!"/".equals(sp)) {
          if (sp.indexOf("/") === 0) {
            sp = sp.substring(1);
          }
          if (sp.lastIndexOf("/") === sp.length - 1) {
            sp = sp.substring(0, sp.length - 1);
          }
          root.push(sp);
        }
        servletpath = sp;
      }

      if (hasDebug && debug.toLowerCase() !== 'false') {
        isDebug = true;
      }

      if (main) {
        mainClass = main;
      }
      skin = s;
      version = v;
      break;
    }
  }

  path = root.join("/");

  var loader = atom.misc.Launcher.getLauncher().getLoader();

  var refPath = isDebug ? '/src/main/' : "/classes/";

  var bootstrapPath = path + "/jre" + refPath;
  var extPath = path + '/lib/';
  var appPath = path + refPath;
  var testPath = path + '/src/test/js/';

  js.lang.System.setProperty("atom.root.dirs", path);

  js.lang.System.setProperty("atom.bootstrap.class.path", bootstrapPath + 'js/');
  js.lang.System.setProperty("js.ext.dirs", extPath);
  js.lang.System.setProperty("js.class.path", appPath + 'js/');

  js.lang.System.setProperty("js.test.dirs", testPath);

  js.lang.System.setProperty("css.bootstrap.dirs", bootstrapPath + 'css/');
  js.lang.System.setProperty("css.ext.dirs", extPath);
  js.lang.System.setProperty("css.class.path", appPath + 'css/');
  js.lang.System.setProperty("css.skin.path", appPath + 'skin/');

  js.lang.System.setProperty("template.bootstrap.dirs", bootstrapPath + 'template/');
  js.lang.System.setProperty("template.ext.dirs", extPath);
  js.lang.System.setProperty("template.class.path", appPath + 'template/');

  js.lang.System.setProperty("main", mainClass);
  js.lang.System.setProperty("debug", isDebug);
  js.lang.System.setProperty("version", version);
  js.lang.System.setProperty("servletpath", servletpath);
  js.lang.System.setProperty("skin", skin);
  /*
  $import([
      "js.lang.ClassNotFoundException",
      "js.lang.reflect.Field",
      "js.lang.reflect.Method"
  ], "BootstrapClassLoader");
  */
  js.dom.Document.ready(loader.main, loader);


})(this);