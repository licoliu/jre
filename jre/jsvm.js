/*
 * ! JSRT JavaScript Library 0.1.5 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 10, 2014
 */

/**
 * @namespace js
 */
/**
 * @namespace js.awt
 */
/**
 * @namespace js.dom
 */
/**
 * @namespace js.io
 */
/**
 * @namespace js.lang
 */
/**
 * @namespace js.net
 */
/**
 * @namespace js.test
 */
/**
 * @namespace js.text
 */
/**
 * @namespace js.util
 */

(function(global) {
  var USEECMA = !!Object.defineProperties;

  var extend = (function() {
    var copy = function(d, s, k, m, pros) {
      pros = pros || {};
      var writable = !!pros.writable,
        enumerable = !!pros.enumerable,
        configurable = !!pros.configurable;
      if (Object.prototype.toString.apply(d) !== "[object Array]") {
        for (var i in s) {
          if (s.hasOwnProperty(i)) {
            if (k) {
              if (!d[k]) {
                d[k] = {};
              }

              if (USEECMA) {
                Object.defineProperty(d[k], i, {
                  value: m ? s[i][m] : s[i],
                  writable: writable,
                  enumerable: enumerable,
                  configurable: configurable
                });
              } else {

                d[k][i] = m ? s[i][m] : s[i];
              }
            } else {
              if (USEECMA) {
                Object.defineProperty(d, i, {
                  value: m ? (s[i] ? s[i][m] : null) : s[i],
                  writable: writable,
                  enumerable: enumerable,
                  configurable: configurable
                });
              } else {
                d[i] = m ? (s[i] ? s[i][m] : null) : s[i];
              }
            }
          }
        }
      } else {
        for (var j = 0, len = d.length; j < len; j++) {
          for (var t in s) {
            if (s.hasOwnProperty(t)) {
              if (!d[j]) {
                d[j] = {};
              }
              if (k) {
                if (!d[j][k]) {
                  d[j][k] = {};
                }
                if (USEECMA) {
                  Object.defineProperty(d[j][k], t, {
                    value: m ? s[t][m] : s[t],
                    writable: writable,
                    enumerable: enumerable,
                    configurable: configurable
                  });
                } else {
                  d[j][k][t] = m ? s[t][m] : s[t];
                }
              } else {

                if (USEECMA) {
                  Object.defineProperty(d[j], t, {
                    value: m ? (s[t] ? s[t][m] : null) : s[t],
                    writable: writable,
                    enumerable: enumerable,
                    configurable: configurable
                  });
                } else {

                  d[j][t] = m ? (s[t] ? s[t][m] : null) : s[t];
                }
              }
            }
          }
        }
      }
    };
    return function(d, s, k, m, pros) {


      if (typeof d === 'undefined' || d === null || typeof s === 'undefined' || s === null || typeof d === "number" || typeof s === "number" || typeof d === "string" || typeof s === "string" || typeof d === "boolean" || typeof s === "boolean") {
        return d;
      }
      if (Object.prototype.toString.apply(s) !== "[object Array]") {
        copy(d, s, k, m, pros);
      } else {
        for (var j = 0, len = s.length; j < len; j++) {
          copy(d, s[j], k, m, pros);
        }
      }
      return d;
    };
  })();
  if (USEECMA) {
    Object.defineProperties(Object, {
      "extend": {
        value: extend,
        writable: false,
        enumerable: false,
        configurable: false
      },

      "USEECMA": {
        value: USEECMA,
        writable: false,
        enumerable: false,
        configurable: false
      }

    });
  } else {
    Object.extend = extend;
    Object.USEECMA = USEECMA;
  }
})(this);

Object
  .extend(
    Object,
    function() {
      return {
        // TODO 增加isNull和isEmpty的区分
        isNull: function(v) {
          return typeof v === 'undefined' || v === null;
        },

        isEmpty: function(v) {
          return typeof v === 'undefined' || v === null || ((Object.isArray(v) && !v.length)) || (Object.isString(v) && !(v.trim ? v.trim() : v.replace(/^\s+|\s+$/g, "")));
        },

        isArray: function(v) {
          return Object.prototype.toString.apply(v) === "[object Array]";
        },

        isDate: function(v) {
          return Object.prototype.toString.apply(v) === "[object Date]";
        },

        isObject: function(v) {
          return !!v && Object.prototype.toString.call(v) === "[object Object]";
        },

        isFunction: function(v) {
          return Object.prototype.toString.apply(v) === "[object Function]";
        },

        isNumber: function(v) {
          return typeof v === "number" && isFinite(v);
        },

        isString: function(v) {
          return typeof v === "string";
        },

        isBoolean: function(v) {
          return typeof v === "boolean";
        },

        isDefined: function(v) {
          return typeof v !== "undefined";
        },

        isInstanceof: function(sub, sup) {
          return sub instanceof sup;
        },
        /*
         * extend2 : function(d, s) { if (!Object.isEmpty(d) &&
         * Object.isArray(d)) { for (var i = 0; i < d.length;
         * i++) { Object.each(s, function(j, v, o) {
         * d[i].prototype[j] = v.value; }); } } return d; },
         */
        each: function(obj, fn, scope) {
          return Object.enumerate(obj, fn, scope, false);
        },
        enumerate: function(obj, fn, scope, pt) {
          if (Object.isEmpty(obj) || Object.isNumber(obj) || Object.isString(obj) || Object.isBoolean(obj)) {
            return;
          }
          if (Object.isArray(obj)) {
            for (var i = 0, len = obj.length; i < len; i++) {

              if (fn
                .call(scope || obj[i], i, obj[i],
                  obj) === false) {
                return i;
              }
            }
          } else {
            for (var p in obj) {
              if (pt || obj.hasOwnProperty(p)) {
                if (fn.call(scope || obj[p], p, obj[p],
                    obj) === false) {
                  return p;
                }
              }
            }
          }
          return true;
        }
      };
    }(), null, null, {
      writable: false,
      enumerable: false,
      configurable: false
    });

(function(global) {

  var fetch = function(name, callback, scope) {
    if (Object.isEmpty(name)) {
      return null;
    }
    var emp = name.split("."),
      length = emp.length,
      temp = global;

    for (var j = 0; j < length - 1; j++) {
      if (!temp[emp[j]]) {
        temp[emp[j]] = {};
      }
      temp = temp[emp[j]];
    }
    return callback.call(scope, emp[j], temp);
  };

  var format = (function() {
    var regx1 = /(\s+$|^\s+)/g,
      regx2 = /\s*([,(=])\s*/g,
      regx3 = /\s*[)]\s*/g,
      regx4 = /\s{2,}/g;
    return function(str) {
      return str.replace(regx1, "").replace(regx2, "$1").replace(regx3,
        ") ").replace(regx4, " ");
    };
  })();


  var FEATURE = {
    "CLASS": "class",
    "INTERFACE": "interface",
    "CONSTRUCTOR": "constructor",
    "FIELD": "field",
    "METHOD": "method",
    "UNKNOWN": "unknown"
  };
  var Attribute = function(name, value, declaringClass, modifiers,
    annotations) {
    this._name = name;
    this._value = value;
    this._declaringClass = declaringClass;
    this._modifiers = modifiers;
    this._annotations = annotations;
  };
  Attribute.prototype = {
    getName: function() {
      return this._name;
    },
    setName: function(name) {
      this._name = name;
    },
    getValue: function() {
      return this._value;
    },
    setValue: function(value) {
      this._value = value;
    },
    getDeclaringClass: function() {
      return this._declaringClass;
    },
    setDeclaringClass: function(declaringClass) {
      this._declaringClass = declaringClass;
    },
    getModifiers: function() {
      return this._modifiers;
    },
    setModifiers: function(modifiers) {
      this._modifiers = modifiers;
    },
    getAnnotations: function() {
      return this._annotations;
    },
    setAnnotations: function(annotation) {
      this._annotations = annotation;
    }
  };
  var convert = function(m, props) {

    m = format(m);

    var modify = null,
      feature = null,
      n = null,
      extend = null,
      implement = null;
    var index = null;
    if (props) {
      // method,field,constructor
      index = m.lastIndexOf(" ");
      modify = (index === -1 ? "" : m.substring(0, index + 1));
      n = m.substring(index + 1);

      if (n == props.belongsTo) {
        feature = FEATURE.CONSTRUCTOR;
      } else if (Object.isFunction(props.value)) {
        feature = FEATURE.METHOD;
      } else {
        feature = FEATURE.FIELD;
      }

    } else {

      var index1 = m.indexOf("class ");
      var index2 = m.indexOf("interface ");

      index = null;
      if (index1 != -1) {
        index = index1;
        feature = FEATURE.CLASS;
      } else {
        index = index2;
        feature = FEATURE.INTERFACE;
      }
      modify = m.substring(0, index);
      // FIXME var defs = m.substring(index + 1).split(" ")
      var defs = m.substring(index).split(" "),
        len = defs.length;
      n = defs[1];
      if (len >= 4) {
        if (defs[2] === "extends") {
          extend = defs[3];
        } else {
          extend = "Object";
          implement = defs[3].split(",");
        }
        if (len >= 6) {
          implement = defs[5].split(",");
        }
      }
    }

    var regx = /@\S*/g;
    var isAbstract = modify.indexOf("abstract ") != -1,
      isInterface = modify
      .indexOf("interface ") != -1,
      isFinal = modify
      .indexOf("final ") != -1,
      isStatic = modify.indexOf("static ") != -1,
      isProtected = modify
      .indexOf("protected ") != -1,
      isPrivate = modify
      .indexOf("private ") != -1,
      isDefault = modify
      .indexOf("default ") != -1,
      isPublic = (modify.indexOf("public ") != -1 || (!isPrivate && !isDefault && !isProtected)),
      isNonWritable = modify
      .indexOf("non-writable ") != -1,
      isNonEnumerable = modify
      .indexOf("non-enumerable ") != -1,
      isNonConfigurable = modify
      .indexOf("non-configurable ") != -1,
      isNonProxyable = modify
      .indexOf("non-proxyable ") != -1,
      isWritable = modify.indexOf("writable ") != -1,
      isEnumerable = modify.indexOf("enumerable ") != -1,
      isConfigurable = modify.indexOf("configurable ") != -1,
      isProxyable = modify.indexOf("proxyable ") != -1;

    /*
     * abstract 1024, interface 512, final 16, static 8, protected 4,
     * private 2 ,public 1,default 0
     */

    /*
     * 默认public
     *
     * non前缀的优先级更高
     *
     * 构造器不允许手动设置
     *
     * 提供三种模式
     * 1.系统默认
     * 		属性默认为writable,enumerable,non-configurable,non-proxyable
     * 		方法默认为writable,proxyable,non-enumerable,non-configurable, 如果final方法则为non-writable,non-enumerable,non-configurable,non-proxyable
     * 		构造器默认为proxyable,non-writable,non-enumerable,non-configurable
     * 2.手动设置writable，enumerable，configurable，proxyable
     * 3.手动设置non-writable，non-enumerable，non-configurable，non-proxyable
     */
    var modifiers = 0;

    if (isAbstract) {
      modifiers += Modifier.abstractBit;
    }
    if (isInterface) {
      modifiers += Modifier.interfaceBit;
    }
    if (isFinal) {
      modifiers += Modifier.finalBit;
    }
    if (isStatic) {
      modifiers += Modifier.staticBit;
    }
    if (isProtected) {
      modifiers += Modifier.protectedBit;
    }
    if (isPrivate) {
      modifiers += Modifier.privateBit;
    }
    if (isPublic) {
      modifiers += Modifier.publicBit;
    }

    switch (feature) {
      case FEATURE.CONSTRUCTOR:
        modifiers += Modifier.proxyableBit;
        break;
      case FEATURE.METHOD:
        if (!isFinal && (!isNonProxyable || isProxyable)) {
          modifiers += Modifier.proxyableBit;
        }

        if (!isFinal && (!isNonWritable || isWritable)) {
          modifiers += Modifier.writableBit;
        }

        if (!isFinal && !isNonEnumerable && isEnumerable) {
          modifiers += Modifier.enumerableBit;
        }

        if (!isFinal && !isNonConfigurable && isConfigurable) {
          modifiers += Modifier.configurableBit;
        }
        break;
      case FEATURE.FIELD:
        if (!isFinal && (!isNonWritable || isWritable)) {
          modifiers += Modifier.writableBit;
        }

        if (!isFinal && (!isNonEnumerable || isEnumerable)) {
          modifiers += Modifier.enumerableBit;
        }

        if (!isFinal && !isNonConfigurable && isConfigurable) {
          modifiers += Modifier.configurableBit;
        }
        break;
      default:
        break;
    }

    return {
      annotations: m.match(regx) || [],
      modifiers: modifiers,
      feature: feature || FEATURE.UNKNOWN,
      name: n,
      extend: extend || 'Object',
      implement: implement
    };
  };

  var Modifier = function() {};

  Object
    .extend(
      Modifier,
      function() {
        return {
          abstractBit: 1024,
          interfaceBit: 512,

          writableBit: 256,
          enumerableBit: 128,
          configurableBit: 64,
          proxyableBit: 32,

          finalBit: 16,
          staticBit: 8,
          protectedBit: 4,
          privateBit: 2,
          publicBit: 1,

          isProxyable: function(modifiers) {
            return (modifiers & Modifier.proxyableBit) !== 0;
          },
          isWritable: function(modifiers) {
            return (modifiers & Modifier.writableBit) !== 0;
          },
          isEnumerable: function(modifiers) {
            return (modifiers & Modifier.enumerableBit) !== 0;
          },
          isConfigurable: function(modifiers) {
            return (modifiers & Modifier.configurableBit) !== 0;
          },
          isAbstract: function(modifiers) {
            return (modifiers & Modifier.abstractBit) !== 0;
          },
          isInterface: function(modifiers) {
            return (modifiers & Modifier.interfaceBit) !== 0;
          },
          isFinal: function(modifiers) {
            return (modifiers & Modifier.finalBit) !== 0;
          },
          isStatic: function(modifiers) {
            return (modifiers & Modifier.staticBit) !== 0;
          },
          isProtected: function(modifiers) {
            return (modifiers & Modifier.protectedBit) !== 0;
          },
          isPrivate: function(modifiers) {
            return (modifiers & Modifier.privateBit) !== 0;
          },
          isPublic: function(modifiers) {
            return (modifiers & Modifier.publicBit) !== 0;
          }
        };
      }(), null, null, {
        writable: false,
        enumerable: false,
        configurable: false
      });

  var proxy = function(m, b, t, a) {
    var f = m.getValue(),
      modifiers = m.getModifiers(),
      isStatic = Modifier.isStatic(modifiers),
      isProxyable = Modifier.isProxyable(modifiers);

    return ((!Object.isEmpty(b) || !Object.isEmpty(t) || !Object.isEmpty(a)) && isProxyable) ? function() {
      // TODO 判断权限private,default,protected,public
      // TODO 判断是否可以被重写final

      var thisClass = this.getClass(),
        superClass = thisClass.getSuperClass();
      var $this = isStatic ? thisClass.getClassConstructor() : this;
      $this.$super = superClass ? (isStatic ? superClass.getClassConstructor() : superClass.getClassConstructor().prototype) : null;

      //var args = Array.prototype.slice.call(arguments,0).concat([$super,$this]);

      // before
      if (!Object.isEmpty(b) && Object.isFunction(b)) {
        b.apply($this, arguments);
      }

      var result = null;
      try {
        result = (!Object.isEmpty(f) && Object.isFunction(f)) ? f.apply($this, arguments) : f;
      } catch (e) {
        if (Object.isEmpty(t)) {
          throw e;
        } else {
          // throw
          if (Object.isFunction(t)) {
            t.apply($this, arguments);
          }
        }
      }

      // after
      if (!Object.isEmpty(a) && Object.isFunction(a)) {
        var parameter = Array.prototype.slice.call(arguments);
        parameter.unshift(result);
        a.apply($this, parameter);
      }

      return result;
    } : f;
  };
  var doAnnotations = function(self, m) {
    if (Object.isFunction(m.getValue())) {
      // 方法上的注解
    } else {
      // 属性上的注解
      if (m.getName() && m.getName().length > 1 && m.getName().length != "_") {
        var name = m.getName().indexOf("_") === 0 ? m.getName()
          .substring(1) : m.getName();
        name = name.charAt(0).toUpperCase() + name.substring(1);

        var modifier = Modifier.publicBit + Modifier.writableBit + Modifier.proxyableBit;
        //(((m.getModifiers() & 8) != 0) ? 8 : 0) + 1;

        if (m.getAnnotations().indexOf("@Getter") != -1) {
          var getName = "get" + name;
          if (!self.hasMethod(getName)) {
            self.addMethod(new Attribute(getName, function() {
              return this[m.getName()];
            }, self, modifier, []));
          }
        }
        if (m.getAnnotations().indexOf("@Setter") != -1) {
          var setName = "set" + name;
          if (!self.hasMethod(setName)) {
            self.addMethod(new Attribute(setName, function(value) {
              this[m.getName()] = value;
            }, self, modifier, []));
          }
        }
      }
    }
  };

  var empty = function() {};

  var CodeHeap = function() {
    this.heap = [];
  };
  CodeHeap.prototype = {
    find: function(elem) {
      for (var i = 0, len = this.heap.length; i < len; i++) {
        if (this.heap[i].key === elem) {
          return this.heap[i].value || null;
        }
      }
      return undefined;
    },
    get: function($class, key, subKey) {
      var code = this.find($class);
      if (Object.isDefined(code)) {
        var values = code[key];
        if (subKey) {
          if (values) {
            for (var i = 0, len = values.length; i < len; i++) {
              if (values[i].getName() === subKey) {
                return values[i] || null;
              }
            }
          }
          return undefined;
        }
        return values;
      }
      throw new Error("illegal code heap states.");
    },
    set: function($class, key, value) {
      var code = this.find($class);
      if (code) {
        if (Object.isArray(key)) {
          Object.each(key, function(i, v, o) {
            code[v] = value;
          });
        } else {
          code[key] = value;
        }
      }
    },
    create: function($class, name, fullName, alias, packages, feature,
      modifiers, annotations, fields, methods, superClass,
      superInterfaces, classloader, instanceClass, classConstructor) {

      if (this.find($class)) {
        throw new Error("class or interface <" + fullName + "> have already loaded!");
      }
      this.heap.push({
        key: $class,
        value: {
          name: name,
          fullName: fullName,
          alias: alias,

          packages: packages,
          feature: feature,
          modifiers: modifiers,
          annotations: annotations,

          // 自身method和fields,不包含从父类继承来的
          // FIXME 从{}更改成[]，以防止内部元素与Object原生属性及方法的重名问题
          fields: fields || [],
          methods: methods || [],

          superClass: superClass,
          superInterfaces: superInterfaces || [],

          classloader: classloader,
          instanceClass: instanceClass || function() {},
          instance: classConstructor,
          classConstructor: classConstructor

        }
      });

    }
  };

  var heap = new CodeHeap();

  var $class = function(classDef, classloader) {
    // TODO 判断extend合法,判断name合法+判断类是否已经存在 class xxx extends yyy
    // implements
    // zzz,ttt
    var modify = convert(classDef.name),
      fullName = modify.name,
      alias = classDef.alias,
      packages = null,
      isRoot = false,
      isKernel = true,
      superClassDef = modify.extend,
      superInterfacesDef = modify.implement,
      classObj = this,
      classConstructor = null;

    heap.create(this, null, fullName, alias, packages, modify.feature,
      modify.modifiers, modify.annotations, null, null, null, null,
      classloader, null, null);

    switch (fullName) {

      case 'Object':
        isRoot = true;
        classConstructor = Object;
        break;
      case 'Function':
        classConstructor = Function;
        break;
      case 'Array':
        classConstructor = Array;
        break;
      case 'String':
        classConstructor = String;
        break;
      case 'Boolean':
        classConstructor = Boolean;
        break;
      case 'Number':
        classConstructor = Number;
        break;
      case 'Date':
        classConstructor = Date;
        break;
      case 'RegExp':
        classConstructor = RegExp;
        break;
      case 'Error':
        classConstructor = Error;
        break;
      case 'EvalError':
        classConstructor = EvalError;
        break;
      case 'RangeError':
        classConstructor = RangeError;
        break;
      case 'ReferenceError':
        classConstructor = ReferenceError;
        break;
      case 'SyntaxError':
        classConstructor = SyntaxError;
        break;
      case 'TypeError':
        classConstructor = TypeError;
        break;
      case 'URIError':
        classConstructor = URIError;
        break;

      default:
        isKernel = false;

        classConstructor = function() {
          // 原始构造器
          // 1.设置class对象和hashCode值

          if (Object.USEECMA) {
            Object.defineProperty(this, "$class", {
              value: classObj,
              writable: false,
              enumerable: false,
              configurable: false
            });
          } else {
            this.$class = classObj;
          }

          // 2.2初始化继承父类属性
          // TODO protected以上的属性
          var each = function(j, v, o) {
            var i = v.getName();
            if (!classObj.hasField(i)) {
              var value = v.getValue(),
                modifiers = v.getModifiers();

              value = value ? value.clone() : value;

              if (Object.USEECMA) {
                Object
                  .defineProperty(
                    this,
                    i, {
                      value: value,
                      writable: Modifier.isWritable(modifiers),
                      enumerable: Modifier.isEnumerable(modifiers),
                      configurable: Modifier.isConfigurable(modifiers)
                    });
              } else {
                this[i] = value;
              }
            }
          };
          var sc = classObj.getSuperClass(),
            superClasses = [];
          while (sc) {
            superClasses.unshift(sc);
            sc = sc.getSuperClass();
          }
          Object.each(superClasses, function(j, sc, o) {
            var f = sc.getFields();
            Object.each(f, each, this);
            // sc.getConstructor().apply(this, arguments);
          }, this);

          // 3.初始化自身定义属性
          Object.each(classObj.getFields(), function(j, v, o) {
            var i = v.getName();
            var value = v.getValue(),
              modifiers = v.getModifiers();
            value = value ? value.clone() : value;
            if (Object.USEECMA) {
              Object.defineProperty(this, i, {
                value: value,
                writable: Modifier.isWritable(modifiers),
                enumerable: Modifier.isEnumerable(modifiers),
                configurable: Modifier.isConfigurable(modifiers)
              });
            } else {
              this[i] = value;
            }
          }, this);

          // 4.用户构造器,先调用父类构造器以及constructor2方法
          var constructor2 = classObj.getConstructor();
          if (constructor2) {
            constructor2.apply(this, arguments);
          }

          // 5.执行默认初始化方法
          var initial = classObj.getInitial();
          (initial = initial || this.initial || empty).apply(this,
            arguments);

          // 6.防止用户构造器修改class对象
          if (!Object.USEECMA && this.$class != classObj) {
            this.$class = classObj;
          }
        };

        break;
    }

    heap.set(this, ["classConstructor", "instance"], classConstructor);

    var name = fetch(fullName, function(name, value) {
      value[name] = classConstructor;

      if (Object.USEECMA) {
        Object.defineProperty(value[name], "$class", {
          value: this,
          writable: false,
          enumerable: false,
          configurable: false
        });
      } else {
        value[name].$class = this;
      }

      packages = value;
      return name;
    }, this);

    heap.set(this, "packages", packages);
    heap.set(this, "name", name);

    if (!isRoot) {

      if (superInterfacesDef) {
        var len = superInterfacesDef.length;

        var superInterfaces = heap.get(this, "superInterfaces");
        for (var i = 0; i < len; i++) {

          superInterfaces[i] = fetch(superInterfacesDef[i], function(
            name, value) {
            return value[name];
          }).$class;
        }
      }

      var superClass = (fetch(superClassDef, function(name, value) {
        return value[name];
      })).$class;

      heap.set(this, "superClass", superClass);

      // TODO 判断父类是否final
      if (!isKernel) {
        var instanceClass = heap.get(this, "instanceClass");
        instanceClass.prototype = ((superClass) ? heap.get(superClass,
          "instance") : Object).prototype;

        if (Object.USEECMA) {
          classConstructor.prototype = Object
            .create(instanceClass.prototype);

          Object.defineProperty(classConstructor.prototype,
            "constructor", {
              value: classConstructor,
              writable: false,
              enumerable: false,
              configurable: false
            });

        } else {
          classConstructor.prototype = new instanceClass();

          classConstructor.prototype.constructor = classConstructor;
        }

        if (superClass == Object.$class) {

          // TODO 拷贝js.lang.Object.$class中的toString方法
          if (Object.USEECMA) {
            var m = Object.$class.getMethod("toString"),
              modifiers = m.getModifiers();
            Object
              .defineProperty(
                classConstructor.prototype,
                "toString", {
                  value: m.getValue(),
                  writable: Modifier.isWritable(modifiers),
                  enumerable: Modifier.isEnumerable(modifiers),
                  configurable: Modifier.isConfigurable(modifiers)
                });
          } else {

            classConstructor.prototype.toString = Object.$class
              .getMethod("toString").getValue();
          }
        }
      }
    }

    Object.each(classDef, function(i, v, o) {
      if (i != "name" && i != "alias") {
        var m = convert(i, {
            belongsTo: name,
            value: v
          }),
          feature = m.feature;
        m = new Attribute(m.name, v, this, m.modifiers, m.annotations);

        switch (feature) {
          case FEATURE.CONSTRUCTOR:
            if (name === "Object") {
              heap.set(this, "constructor2", m.getValue());
            } else {
              // 将构造器代理，默认调用父类构造器
              heap.set(this, "constructor2", proxy(m, this
                .getSuperClass().getConstructor()));
            }
            break;

          case FEATURE.METHOD:
            // 确保toString为原生
            if (isKernel && m.getName() === "toString") {
              this.getMethods().push(m);
              return true;
            }
            this.addMethod(m);
            break;

          case FEATURE.FIELD:
            this.addField(m);
            break;
          default:
            this.addField(m);
            break;
        }
      }
    }, this);

    // 默认无参构造函数
    if (!heap.get(this, "constructor2")) {
      heap.set(this, "constructor2", proxy(new Attribute(name, empty,
        this, Modifier.publicBit + Modifier.proxyableBit, []), this.getSuperClass().getConstructor()));
    }

    fetch(alias, function(name, value) {
      value[name] = classConstructor;
    }, this);

    return this;
  };
  $class.prototype = {
    getClassLoader: function() {

      return heap.get(this, "classloader") || (js.lang.ClassLoader ? js.lang.ClassLoader
        .getSystemClassLoader() : null);
    },

    getClassConstructor: function() {
      return heap.get(this, "classConstructor");
    },
    getConstructor: function() {
      return heap.get(this, "constructor2");
    },
    getInitial: function() {
      return heap.get(this, "initial");
    },
    getPackage: function() {
      return heap.get(this, "packages");
    },

    getDeclaredField: function(name) {
      return this.getField(name);
    },
    getDeclaredFields: function() {
      return this.getFields();
    },
    hasField: function(name) {
      return Object.isDefined(heap.get(this, "fields", name));
    },
    getField: function(name) {
      var v = heap.get(this, "fields", name);
      if (Object.isDefined(v)) {
        return v;
      }
      throw new js.lang.NoSuchFieldException();
    },
    getFields: function() {
      return heap.get(this, "fields");
    },
    getDeclaredMethod: function(name) {
      return this.getMethod(name);
    },
    getDeclaredMethods: function() {
      return this.getMethods();
    },
    hasMethod: function(name) {
      return Object.isDefined(heap.get(this, "methods", name));
    },
    getMethod: function(name) {
      var v = heap.get(this, "methods", name);
      if (Object.isDefined(v)) {
        return v;
      }
      throw new js.lang.NoSuchMethodException();
    },
    getMethods: function() {
      return heap.get(this, "methods");
    },
    getName: function() {
      return heap.get(this, "name");
    },
    getFullName: function() {
      return heap.get(this, "fullName");
    },
    getSuperClass: function() {
      return heap.get(this, "superClass");
    },
    getModifiers: function() {
      return heap.get(this, "modifiers");
    },
    getAnnotations: function() {
      return heap.get(this, "annotations");
    },

    // 构造器必须公有静态方法必须公有
    addMethod: function(m) {
      if (!Object.isEmpty(m) && Object.isFunction(m.getValue())) {
        if (m.getAnnotations() && m.getAnnotations().length) {
          doAnnotations(this, m);
        }
        // 不允许更改构造器
        var n = m.getName(),
          name = heap.get(this, "name");
        if (n === name) {
          return;
        }

        m.setValue(proxy(m));
        m.setDeclaringClass(this);

        if (typeof js !== 'undefined' && !Object.isNull(js) && !Object.isNull(js.lang) && !Object.isNull(js.lang.reflect) && !Object.isNull(js.lang.reflect.Method) && js.lang.reflect.Method.loaded) {
          m = new js.lang.reflect.Method(n, m.getValue(),
            this, m.getModifiers(), m.getAnnotations());
        }
        var modifiers = m.getModifiers(),
          isStatic = Modifier.isStatic(modifiers);
        if (isStatic) {

          if (Object.USEECMA) {
            Object.defineProperty(this.getClassConstructor(), n, {
              value: m.getValue(),
              writable: Modifier.isWritable(modifiers),
              enumerable: Modifier.isEnumerable(modifiers),
              configurable: Modifier.isConfigurable(modifiers)
            });
          } else {
            this.getClassConstructor()[n] = m.getValue();
          }
        } else {
          if (Object.USEECMA) {
            Object
              .defineProperty(
                this.getClassConstructor().prototype,
                n, {
                  value: m.getValue(),
                  writable: Modifier.isWritable(modifiers),
                  enumerable: Modifier.isEnumerable(modifiers),
                  configurable: Modifier.isConfigurable(modifiers)
                });
          } else {
            this.getClassConstructor().prototype[n] = m.getValue();
          }
        }
        this.getMethods().push(m);

        if (n === "initial") {
          heap.set(this, "initial", m.getValue());
        }
      }
    },
    addField: function(m) {
      if (!Object.isEmpty(m) && !Object.isFunction(m.getValue())) {
        if (m.getAnnotations() && m.getAnnotations().length) {
          doAnnotations(this, m);
        }
        m.setDeclaringClass(this);
        if (typeof js !== 'undefined' && !Object.isNull(js) && !Object.isNull(js.lang) && !Object.isNull(js.lang.reflect) && !Object.isNull(js.lang.reflect.Field) && js.lang.reflect.Field.loaded) {
          m = new js.lang.reflect.Field(m.getName(), m
            .getValue(), this, m.getModifiers(), m
            .getAnnotations());
        }
        var modifiers = m.getModifiers(),
          isStatic = Modifier.isStatic(modifiers);
        if (isStatic) {
          if (Object.USEECMA) {
            Object.defineProperty(this.getClassConstructor(), m
              .getName(), {
                value: m.getValue(),

                writable: Modifier.isWritable(modifiers),
                enumerable: Modifier.isEnumerable(modifiers),
                configurable: Modifier.isConfigurable(modifiers)
              });
          } else {
            this.getClassConstructor()[m.getName()] = m.getValue();
          }
        }
        this.getFields().push(m);
      }
    },
    getInstance: function() {
      return heap.get(this, "instance");
    },
    isInstance: function(obj) {
      return Object.isNull(obj) ? false : obj.getClass() == this;
    },
    newInstance: function() {
      return new(heap.get(this, "classConstructor"))();
    },
    clone: function() {
      return this;
    },

    isAssignableFrom: function() {
      // TODO
      return false;
    },

    isInterface: function() {
      // TODO
      return heap.get(this, "feature") === "interface";
    },

    isArray: function() {
      // TODO
      return false;
    },
    isPrimitive: function() {
      // TODO
      return false;
    },
    isAnnotation: function() {
      // TODO
      return false;
    }
  };

  Class = function() {};
  Class.forName = function(cls, classloader) {
    return new $class(cls, classloader);
  };
})(this);

// TODO
// Function,Array,String,Boolean,Number,Date,RegExp,Error,EvalError,RangeError,ReferenceError,SyntaxError,TypeError,URIError对象的$class属性
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 10, 2014
 */
"use strict";
(function(global) {
  var currentTimeMillis = function() {
    return new Date().getTime();
  };
  var $class = global.Class.forName({
    name: "class Object",
    alias: "js.lang.Object",
    Object: function() {
      var _hashCode = (currentTimeMillis() + Math.random()).toString(16);
      if (Object.USEECMA) {
        Object.defineProperty(this, "_hashCode", {
          value: _hashCode,
          writable: false,
          enumerable: false,
          configurable: false
        });
      } else {
        this._hashCode = _hashCode;
      }
    },

    "non-writable non-enumerable non-configurable non-proxyable getClass": function() {
      return this.$class || Object.$class;
    },

    "non-writable non-enumerable non-configurable non-proxyable getVersion": (function() {
      /** 主版本号 . 子版本号 [ 修正版本号 [. 编译版本号 ]] */
      var version = "0.1.1.0001";
      return function() {
        return this.version || version;
      };
    })(),

    /** 指示某个其他对象是否与此对象“相等”。 */
    "equals": function(obj) {
      return obj === this;
    },

    "hashCode": function() {
      if (!this._hashCode) {
        this._hashCode = (currentTimeMillis() + Math.random()).toString(16);
      }
      return this._hashCode;
    },

    "toString": function() {
      // TODO String,Number,Boolean,Array等的toString()方法
      return this.getClass().getFullName() + "<" + this.hashCode() + ">";
    },

    "clone": function() {
      var b = null;
      if (this instanceof Number || this instanceof String || this instanceof Boolean) {
        return this.valueOf();
      } else if (this instanceof Function || this instanceof RegExp || this instanceof Error || this instanceof EvalError || this instanceof RangeError || this instanceof ReferenceError || this instanceof SyntaxError || this instanceof TypeError || this instanceof URIError) {
        return this;
      } else if (this instanceof Date) {
        b = new Date();
        b.setTime(this.getTime());
        return b;
      } else if (Object.isNumber(this) || Object.isString(this) || Object.isBoolean(this)) {
        //FIXME
        return this;
      } else if (this instanceof Array) {
        b = [];
        for (var i = 0, len = this.length; i < len; i++) {
          b.push(this[i] ? this[i].clone() : this[i]);
        }
        return b;
      } else {
        b = this.$class ? this.$class.newInstance() : {};
        for (var a in this) {
          if (a === "_hashCode") {
            b[a] = currentTimeMillis().toString(16);
            continue;
          }
          if (this.hasOwnProperty(a)) {
            b[a] = this[a] ? this[a].clone() : this[a];
          }
        }
        return b;
      }
    },

    "toJson": (function() {
      var NATIVE_JSON_STRINGIFY_SUPPORT = typeof JSON !== 'undefined' && JSON && typeof JSON.stringify === "function" && JSON.stringify(0) === "0" && typeof JSON.stringify(function() {}) === "undefined";
      return function() {
        if (NATIVE_JSON_STRINGIFY_SUPPORT) {
          // TODO 只取public属性

          return this;
          // return JSON.stringify(this);
        }
        return this;
      };
    })(),

    "toQueryString": function() {
      // TODO
      var queryString = [];
      for (var attr in this) {
        if (this[attr]) {
          queryString.push(attr + "=" + this[attr]);
        }
      }
      return queryString.join("&");
    }
  });
  if (Object.USEECMA) {
    Object.defineProperty(Object, "$class", {
      value: $class,
      writable: false,
      enumerable: false,
      configurable: false
    });
  } else {
    Object.$class = $class;
  }
})(this);
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 10, 2014
 */

Class.forName({
  name: "class Array",
  alias: "js.lang.Array",
  Array: function() {},
  clear: function() {
    this.splice(0, this.length);
  },
  contains: function(elem) {
    return (this.indexOf(elem) !== -1);
  },
  remove: function(elem) {
    var index = this.indexOf(elem);
    if (index > -1) {
      this.splice(index, 1);
      return true;
    }
    return false;
  },
  peek: function() {
    return this.slice(-1)[0];
  },
  last: function() {
    return this[this.length - 1];
  },
  first: function() {
    return this[0];
  },
  indexOf: Array.prototype.indexOf ? Array.prototype.indexOf : function(elem, start, end) {
    return this.indexOf2(elem, start, end);
  },
  indexOf2: function(elem, start, end) {
    for (var i = start || 0, len = Math.min(end || this.length, this.length); i < len; i++) {
      if (Object.isFunction(elem) ? elem(this[i]) : (this[i] === elem)) {
        return i;
      }
    }
    return -1;
  },
  append: function(array, start, end) {
    if (!Object.isEmpty(array) && Object.isArray(array)) {
      start = start || 0;
      end = Math.min(end || array.length, array.length);

      if (end > start) {
        //end = (end && end > start && end < array.length) ? end : array.length;
        var parameter = Array.prototype.slice.call(array, start, end);
        Array.prototype.splice.call(parameter, 0, 0, this.length, 0);
        Array.prototype.splice.apply(this, parameter);
      }
    }
    return this;
  },
  insert: function(array, start, end) {
    if (!Object.isEmpty(array) && Object.isArray(array)) {
      start = start || 0;
      end = Math.min(end || array.length, array.length);

      if (end > start) {
        //end = (end && end > start && end < array.length) ? end : array.length;
        var parameter = Array.prototype.slice.call(array, start, end);
        Array.prototype.splice.call(parameter, 0, 0, 0, 0);
        Array.prototype.splice.apply(this, parameter);
      }
    }
    return this;
  },
  getLength: function() {
    return this.length;
  },
  size: function() {
    return this.getLength();
  }
});
/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年6月25日
 */
Class.forName({
  name: "class Boolean",
  alias: "js.lang.Boolean",
  Boolean: function() {},
  "public equals": function(s) {
    return Object.isBoolean(s) && this == s;
  }
});
/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年6月25日
 */

Class.forName({
  name: "class Function",
  alias: "js.lang.Function",
  Function: function() {}
});
/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年6月25日
 */

Class.forName({
  name: "class Number",

  alias: "js.lang.Number",
  Number: function() {},
  "public equals": function(s) {
    return Object.isNumber(s) && this == s;
  }

});
/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年6月25日
 */

Class.forName({
  name: "class RegExp",
  alias: "js.lang.RegExp",
  RegExp: function() {}
});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 10, 2014
 */

Class.forName({
  name: "class String",
  alias: "js.lang.String",
  String: function() {},
  "public trim": function() {
    var re = /^\s+|\s+$/g;
    return function() {
      return this.replace(re, "");
    };
  }(),
  "public equals": function(s) {
    return Object.isString(s) && this == s;
  },
  getLength: function() {
    return this.length;
  },
  endsWith: function(str) {
    return new RegExp(str + "$").test(this);
  }

});
/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年6月25日
 */

Class.forName({
  name: "class js.lang.Throwable extends Object",
  "private message": null, // 错误信息,多同description
  "private name": "js.lang.Throwable", // 错误名
  "private number": null, // 错误号
  "private description": null, // 描述
  "private fileName": null, // 错误发生的文件( Only in FF )
  "private stack": null, // 错误发生时的调用堆栈 FF Only 属性
  "private lineNumber": null,
  Throwable: function(message, fileName, lineNumber, stack) {
    this.message = message;
    this.fileName = fileName;
    this.stack = stack;
    this.lineNumber = lineNumber;
  },
  getName: function() {
    return this.name;
  },
  getMessage: function() {
    return this.message;
  },
  getNumber: function() {
    return this.number;
  },
  getDescription: function() {
    return this.description;
  },
  getFileName: function() {
    return this.fileName;
  },
  getStack: function() {
    return this.stack;
  },
  getLineNumber: function() {
    return this.lineNumber;
  }
});
/*Object.extend([ Error, EvalError, RangeError, ReferenceError, SyntaxError,
TypeError, URIError ], js.lang.Throwable.$class.getMethods(),
'prototype', '_value');*/
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 12, 2014
 */
Class.forName({
  name: "class js.lang.Exception extends js.lang.Throwable",

  "private name": "js.lang.Exception", // 错误名
  "private number": 0, // 错误号

  Exception: function(message, fileName, lineNumber, stack) {
    this.message = message;
    this.fileName = fileName;
    this.stack = stack;
    this.lineNumber = lineNumber;
  }

});
/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年6月25日
 */
Class.forName({
  name: "class Error",
  alias: "js.lang.Error",

  "private name": "js.lang.Error", // 错误名
  "private number": 1,

  Error: function(message, fileName, lineNumber, stack) {
    this.message = message;
    this.fileName = fileName;
    this.stack = stack;
    this.lineNumber = lineNumber;
  },
  'static init': function() {
    var methods = {},
      __methods = js.lang.Throwable.$class.getMethods(),
      __length = __methods.length,
      __index = 0;
    for (; __index < __length; __index++) {
      methods[__methods[__index]._name] = __methods[__index]._value;
    }
    Object.extend(Error.prototype, methods);
  }
});

js.lang.Error.init();
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 19, 2014
 */
Class.forName({
  name: "class js.lang.ClassNotFoundException extends js.lang.Exception",
  "private name": "js.lang.ClassNotFoundException", // 错误名
  "private number": 100
    // 错误号
});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 12, 2014
 */

Class.forName({
  name: "class js.lang.NoSuchMethodException extends js.lang.Exception",
  "private name": "js.lang.NoSuchMethodException",
  "private number": 106
});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 12, 2014
 */

Class.forName({
  name: "class js.lang.NoSuchFieldException extends js.lang.Exception",
  "private name": "js.lang.NoSuchFieldException",
  "private number": 105
});
/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2015 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2015年2月10日
 */
Class.forName({
  name: "class js.lang.InternalError extends js.lang.Error",

  "private name": "js.lang.InternalError", // 错误名
  "private number": 99
});
/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年6月25日
 */
Class.forName({
  name: "class EvalError",
  alias: "js.lang.EvalError",

  "private name": "js.lang.EvalError", // 错误名
  "private number": 2,

  EvalError: function() {}
});
/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年6月25日
 */
Class.forName({
  name: "class SyntaxError",
  alias: "js.lang.SyntaxError",

  "private name": "js.lang.SyntaxError", // 错误名
  "private number": 5,

  SyntaxError: function() {}
});
/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年6月25日
 */

Class.forName({
  name: "class RangeError",
  alias: "js.lang.RangeError",

  "private name": "js.lang.RangeError", // 错误名
  "private number": 3,

  RangeError: function() {}
});
/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年6月25日
 */


Class.forName({
  name: "class ReferenceError",
  alias: "js.lang.ReferenceError",

  "private name": "js.lang.ReferenceError", // 错误名
  "private number": 4,

  ReferenceError: function() {}
});
/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年6月25日
 */

Class.forName({
  name: "class TypeError",
  alias: "js.lang.TypeError",

  "private name": "js.lang.TypeError", // 错误名
  "private number": 6,

  TypeError: function() {}
});
/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年6月25日
 */

Class.forName({
  name: "class URIError",
  alias: "js.lang.URIError",

  "private name": "js.lang.URIError", // 错误名
  "private number": 7,

  URIError: function() {}
});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 17, 2014
 */

Class.forName({
  name: "abstract class js.lang.ClassLoader extends Object",

  '@Setter @Getter private parent': null,

  '@Setter @Getter private classes': [],

  "abstract loadClass": function(scriptUrl, callback, scope) {},
  'static getSystemClassLoader': function(scriptUrl) {
    return atom.misc.Launcher.getLauncher().getClassLoader();
  }
});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 14, 2014
 */

Class.forName({
  name: "abstract class js.io.Writer extends Object",
  "protected _writer": null,
  Writer: function(writer) {
    this._writer = writer;
  },

  /** 将指定字符追加到此 writer。 */
  append: function(c) {
    return this;
  },
  /** 写入字符数组,字符,字符串或某一部分 */
  write: function(cbuf, off, len) {}
});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 14, 2014
 */
Class.forName({
  name: "class js.io.PrintWriter extends js.io.Writer",
  PrintWriter: function() {},
  print: function(cbuf, off, len, ln) {},
  println: function(cbuf, off, len) {
    this.print(cbuf, off, len, true);
  }
});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 14, 2014
 */

Class
  .forName({
    name: "class js.io.Console extends js.io.PrintWriter",
    Console: function(writer) {
      if (writer && writer.log && typeof writer.log != 'function') {
        this._ie = true;
      }
      this._writer = writer;
    },
    "private unsupport": function() {
      var msg = null;
      if (arguments.length <= 0) {
        msg = "Your browser console don\'t support the output instruction. Please check your browser version:\"" + js.lang.System.getEnv("userAgent") + "\"";
      } else {
        msg = Array.prototype.slice.call(arguments).join(' ; ');
      }
      alert(msg);
    },
    print: function(buf, off, len, ln) {
      var cbuf = buf;
      if (!Object.isEmpty(cbuf)) {
        if (!Object.isString(cbuf) && !Object.isArray(cbuf)) {
          cbuf = cbuf.toString();
        }
        var str = null;
        if (!off || off < 0)
          off = 0;
        if (!len) {
          len = cbuf.length - off;
        } else if (off + len > cbuf.length)
          len = cbuf.length - off;

        if (Object.isString(cbuf)) {
          str = cbuf.substring(off, len + off);
        } else {
          str = cbuf.slice(off, len + off);
        }
        this.log("%s", ln ? str + "\n" : str);

      }
    },
    /** 判断一个表达式或变量是否为真。如果结果为否，则在控制台输出一条相应信息，并且抛出一个异常 */
    assert: function() {
      return (this._writer.assert || this.unsupport).apply(
        this._writer, arguments);
    },

    /**
     * 打印日志信息，支持printf风格的占位符。只支持字符（%s）、整数（%d或%i）、浮点数（%f）和对象（%o）四种。 比如，
     * log("%d年%d月%d日",2011,3,26); log("圆周率是%f",3.1415926);
     */
    log: function() {

      if (this._ie && this._writer.log) {
        if (arguments.length === 1) {
          this._writer.log(arguments[0]);
        } else if (arguments.length > 1) {
          this._writer.log(arguments[0], arguments[1]);
        }
        return;
      }

      return (this._writer.log || this.unsupport).apply(this._writer,
        arguments);

    },

    /**
     * 打印一般信息，支持printf风格的占位符。
     */
    info: function() {

      if (this._ie && this._writer.info) {
        if (arguments.length === 1) {
          this._writer.info(arguments[0]);
        } else if (arguments.length > 1) {
          this._writer.info(arguments[0], arguments[1]);
        }
        return;
      }

      return (this._writer.info || this.unsupport).apply(
        this._writer, arguments);
    },

    /**
     * 打印警告提示，支持printf风格的占位符。
     */
    warn: function() {

      if (this._ie && this._writer.warn) {
        if (arguments.length === 1) {
          this._writer.warn(arguments[0]);
        } else if (arguments.length > 1) {
          this._writer.warn(arguments[0], arguments[1]);
        }
        return;
      }

      return (this._writer.warn || this.unsupport).apply(
        this._writer, arguments);
    },

    /**
     * 打印误提示，支持printf风格的占位符。
     */
    error: function() {

      if (this._ie && this._writer.error) {
        if (arguments.length === 1) {
          this._writer.error(arguments[0]);
        } else if (arguments.length > 1) {
          this._writer.error(arguments[0], arguments[1]);
        }
        return;
      }

      return (this._writer.error || this.unsupport).apply(
        this._writer, arguments);
    },

    /**
     * 可以显示一个对象所有的属性和方法。
     */
    dir: function() {
      return (this._writer.dir || this.unsupport).apply(this._writer,
        arguments);
    },

    /**
     * profile()和profileEnd()，用来显示代码的性能分析。
     * 
     * profile("性能分析器一"); ----待检测的代码---- profileEnd();
     */
    profile: function() {
      return (this._writer.profile || this.unsupport).apply(
        this._writer, arguments);
    },

    profileEnd: function() {
      return (this._writer.profileEnd || this.unsupport).apply(
        this._writer, arguments);
    },

    /** ie9,firfox */
    clear: function() {
      if (this._ie && this._writer.clear) {
        return this._writer.clear();
      }
      return (this._writer.clear || this.unsupport).apply(
        this._writer, arguments);
    },

    /**
     * 用来追踪函数的调用轨迹。
     * 
     * 
     * 比如，有一个加法器函数。
     * 
     * <pre>
     * function add(a, b) {
     * 	return a + b;
     * }
     * </pre>
     * 
     * 如果想知道这个函数是如何被调用的，在其中加入console.trace()方法就可以了。
     * 
     * <pre>
     * function add(a, b) {
     * 	console.trace();
     * 	return a + b;
     * }
     * </pre>
     * 
     * 假定这个函数的调用代码如下：
     * 
     * <pre>
     * var x = add3(1, 1);
     * function add3(a, b) {
     * 	return add2(a, b);
     * }
     * function add2(a, b) {
     * 	return add1(a, b);
     * }
     * function add1(a, b) {
     * 	return add(a, b);
     * }
     * </pre>
     * 
     * 运行后，会显示add()的调用轨迹，从上到下依次为add()、add1()、add2()、add3()。
     * 
     */
    trace: function() {
      return (this._writer.trace || this.unsupport).apply(
        this._writer, arguments);
    },
    /**
     * 打印调试信息，支持printf风格的占位符。
     */
    debug: function() {
      return (this._writer.debug || this.unsupport).apply(
        this._writer, arguments);
    },

    /**
     * 用来显示网页的某个节点（node）所包含的html/xml代码。比如，先获取一个表格节点，然后，显示该节点包含的代码。
     * dirxml(document.getElementById("ID"));
     */
    dirxml: function() {
      return (this._writer.dirxml || this.unsupport).apply(
        this._writer, arguments);
    },

    /**
     * 如果信息太多，可以分组显示，用到的方法是console.group()和console.groupEnd()。
     */
    group: function() {
      if (this._ie) {
        return this.println(arguments[0] || "***************start*****************");
      }
      return (this._writer.group || this.unsupport).apply(
        this._writer, arguments);
    },
    groupCollapsed: function() {
      return (this._writer.groupCollapsed || this.unsupport).apply(
        this._writer, arguments);
    },
    /**
     * 如果信息太多，可以分组显示，用到的方法是console.group()和console.groupEnd()。
     */
    groupEnd: function() {
      if (this._ie) {
        return this.println(arguments[0] || "***************end*****************");
      }
      return (this._writer.groupEnd || this.unsupport).apply(
        this._writer, arguments);
    },
    markTimeline: function() {
      return (this._writer.markTimeline || this.unsupport).apply(
        this._writer, arguments);
    },
    /**
     * time()和timeEnd()，用来显示代码的运行时间。
     * 
     * time("计时器一"); ----待检测的代码---- timeEnd("计时器一");
     */
    time: function() {
      return (this._writer.time || this.unsupport).apply(
        this._writer, arguments);
    },
    timeEnd: function() {
      return (this._writer.timeEnd || this.unsupport).apply(
        this._writer, arguments);
    },
    timeStamp: function() {
      return (this._writer.timeStamp || this.unsupport).apply(
        this._writer, arguments);
    },
    count: function() {
      return (this._writer.count || this.unsupport).apply(
        this._writer, arguments);
    }
  });
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 13, 2014
 */

Class.forName({
  name: "class js.lang.System extends Object",
  "static err": null, // 错误流
  "static out": null, // 输出流
  "static properties": {},
  "private static _env": (function() {
    var userAgent = navigator.userAgent,
      ua = userAgent.toLowerCase(),
      check = function(r) {
        return r.test(ua);
      },
      DOC = document,
      docMode = DOC.documentMode,
      isStrict = DOC.compatMode === "CSS1Compat",
      isOpera = check(/opera/),
      isChrome = check(/\bchrome\b/),
      isWebKit = check(/webkit/),
      isSafari = !isChrome && check(/safari/),
      isSafari2 = isSafari && check(/applewebkit\/4/), // unique to Safari 2
      isSafari3 = isSafari && check(/version\/3/),
      isSafari4 = isSafari && check(/version\/4/),
      isIE = !isOpera && check(/msie/),
      isIE7 = isIE && (check(/msie 7/) || docMode === 7),
      isIE8 = isIE && (check(/msie 8/) && docMode !== 7),
      isIE6 = isIE && !isIE7 && !isIE8,
      isGecko = !isWebKit && check(/gecko/),
      isGecko2 = isGecko && check(/rv:1\.8/),
      isGecko3 = isGecko && check(/rv:1\.9/),
      isBorderBox = isIE && !isStrict,
      isWindows = check(/windows|win32/),
      isMac = check(/macintosh|mac os x/),
      isAir = check(/adobeair/),
      isLinux = check(/linux/),
      isSecure = /^https/i.test(location.protocol),
      isIE9 = isIE && (check(/msie 9/) || docMode === 7),
      isIE10 = isIE && (check(/msie 10/) || docMode === 7),
      isIETrident = /(msie\s|trident.*rv:)([\w.]+)/.exec(ua);

    return {
      userAgent: userAgent,
      isStrict: isStrict,
      isOpera: isOpera,
      isChrome: isChrome,
      isWebkit: isWebKit,

      isSafari: isSafari,
      safariVersion: isSafari4 ? '4' : (isSafari3 ? '3' : (isSafari2 ? '2' : null)),

      isIE: isIE || !!isIETrident,
      ieVersion: isIE6 ? '6' : (isIE7 ? '7' : (isIE8 ? '8' : (isIE9 ? '9' : (isIE10 ? '10' : (!!isIETrident && Object.isArray(isIETrident) && isIETrident.length > 2 ? isIETrident[2] : null))))),

      isGecko: isGecko,
      geckoVesion: isGecko3 ? '3' : (isGecko2 ? '2' : (isGecko ? '1' : null)),

      isBorderBox: isBorderBox,
      isWindows: isWindows,
      isMac: isMac,
      isAir: isAir,
      isLinux: isLinux,
      isSecure: isSecure
    };
  })(),

  /**
   * 获得指定的环境变量值
   */
  "static getEnv": function(env) {
    return (env) ? this._env[env] : this._env;
  },

  "static setOut": function(out) {
    js.lang.System.out = out;
  },

  "static setError": function(e) {
    js.lang.System.err = e;
  },

  "public static currentTimeMillis": function() {
    return new Date().getTime();
  },

  "public static native arraycopy": function(src, srcPos, dest, destPos, length) {
    var parameter = Array.prototype.slice.call(src, srcPos, srcPos + length);
    Array.prototype.splice.call(parameter, 0, 0, destPos, 0);
    Array.prototype.splice.apply(dest, parameter);
  },

  "public static setProperty": function(name, value) {
    js.lang.System.properties[name] = value;
  },

  "public static getProperty": function(name) {
    return js.lang.System.properties[name];
  },

  "public static setProperties": function(props) {
    js.lang.System.properties = props;
  },

  "public static Properties getProperties": function() {
    return js.lang.System.properties;
  }
});
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
    return js.lang.System.getProperty("version");
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
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 14, 2014
 */
/**
 * Sea.js 3.0.0 | seajs.org/LICENSE.md
 */

/**
 * @namespace org
 */
/**
 * @namespace org.seajs
 */
(function(global, undefined) {

  // Avoid conflicting when `sea.js` is loaded multiple times
  if (global.seajs) {
    return;
  }

  var seajs = global.seajs = {
    // The current version of Sea.js being used
    version: "3.0.0"
  };

  var data = seajs.data = {};


  /**
   * util-lang.js - The minimal language enhancement
   */

  function isType(type) {
    return function(obj) {
      return {}.toString.call(obj) == "[object " + type + "]";
    };
  }

  var isObject = isType("Object");
  var isString = isType("String");
  var isArray = Array.isArray || isType("Array");
  var isFunction = isType("Function");

  var _cid = 0;

  function cid() {
    return _cid++;
  }


  /**
   * util-events.js - The minimal events support
   */

  var events = data.events = {};

  // Bind event
  seajs.on = function(name, callback) {
    var list = events[name] || (events[name] = []);
    list.push(callback);
    return seajs;
  };

  // Remove event. If `callback` is undefined, remove all callbacks for the
  // event. If `event` and `callback` are both undefined, remove all callbacks
  // for all events
  seajs.off = function(name, callback) {
    // Remove *all* events
    if (!(name || callback)) {
      events = data.events = {};
      return seajs;
    }

    var list = events[name];
    if (list) {
      if (callback) {
        for (var i = list.length - 1; i >= 0; i--) {
          if (list[i] === callback) {
            list.splice(i, 1);
          }
        }
      } else {
        delete events[name];
      }
    }

    return seajs;
  };

  // Emit event, firing all bound callbacks. Callbacks receive the same
  // arguments as `emit` does, apart from the event name
  var emit = seajs.emit = function(name, data) {
    var list = events[name];

    if (list) {
      // Copy callback lists to prevent modification
      list = list.slice();

      // Execute event callbacks, use index because it's the faster.
      for (var i = 0, len = list.length; i < len; i++) {
        list[i](data);
      }
    }

    return seajs;
  };

  /**
   * util-path.js - The utilities for operating path such as id, uri
   */

  var DIRNAME_RE = /[^?#]*\//;

  var DOT_RE = /\/\.\//g;
  var DOUBLE_DOT_RE = /\/[^/]+\/\.\.\//;
  var MULTI_SLASH_RE = /([^:/])\/+\//g;

  // Extract the directory portion of a path
  // dirname("a/b/c.js?t=123#xx/zz") ==> "a/b/"
  // ref: http://jsperf.com/regex-vs-split/2
  function dirname(path) {
    return path.match(DIRNAME_RE)[0];
  }

  // Canonicalize a path
  // realpath("http://test.com/a//./b/../c") ==> "http://test.com/a/c"
  function realpath(path) {
    // /a/b/./c/./d ==> /a/b/c/d
    path = path.replace(DOT_RE, "/");

    /*
      @author wh1100717
      a//b/c ==> a/b/c
      a///b/////c ==> a/b/c
      DOUBLE_DOT_RE matches a/b/c//../d path correctly only if replace // with / first
    */
    path = path.replace(MULTI_SLASH_RE, "$1/");

    // a/b/c/../../d  ==>  a/b/../d  ==>  a/d
    while (path.match(DOUBLE_DOT_RE)) {
      path = path.replace(DOUBLE_DOT_RE, "/");
    }

    return path;
  }

  // Normalize an id
  // normalize("path/to/a") ==> "path/to/a.js"
  // NOTICE: substring is faster than negative slice and RegExp
  function normalize(path) {
    var last = path.length - 1;
    var lastC = path.charCodeAt(last);

    // If the uri ends with `#`, just return it without '#'
    if (lastC === 35 /* "#" */ ) {
      return path.substring(0, last);
    }

    path += (path.substring(last - 2) === ".js" ||
      path.indexOf("?") > 0 ||
      lastC === 47 /* "/" */ ) ? "" : ".js";

    var version = js.lang.System.getProperty("version");
    if (version) {
      if (path.indexOf("?") > 0) {
        path += "&v=" + version
      } else {
        path += "?v=" + version
      }
    }

    return path;
  }


  var PATHS_RE = /^([^/:]+)(\/.+)$/;
  var VARS_RE = /{([^{]+)}/g;

  function parseAlias(id) {
    var alias = data.alias;
    return alias && isString(alias[id]) ? alias[id] : id;
  }

  function parsePaths(id) {
    var paths = data.paths;
    var m;

    if (paths && (m = id.match(PATHS_RE)) && isString(paths[m[1]])) {
      id = paths[m[1]] + m[2];
    }

    return id;
  }

  function parseVars(id) {
    var vars = data.vars;

    if (vars && id.indexOf("{") > -1) {
      id = id.replace(VARS_RE, function(m, key) {
        return isString(vars[key]) ? vars[key] : m;
      });
    }

    return id;
  }

  function parseMap(uri) {
    var map = data.map;
    var ret = uri;

    if (map) {
      for (var i = 0, len = map.length; i < len; i++) {
        var rule = map[i];

        ret = isFunction(rule) ?
          (rule(uri) || uri) :
          uri.replace(rule[0], rule[1]);

        // Only apply the first matched rule
        if (ret !== uri) break;
      }
    }

    return ret;
  }


  var ABSOLUTE_RE = /^\/\/.|:\//;
  var ROOT_DIR_RE = /^.*?\/\/.*?\//;

  function addBase(id, refUri) {
    var ret;
    var first = id.charCodeAt(0);

    // Absolute
    if (ABSOLUTE_RE.test(id)) {
      ret = id;
    }
    // Relative
    else if (first === 46 /* "." */ ) {
      ret = (refUri ? dirname(refUri) : data.cwd) + id;
    }
    // Root
    else if (first === 47 /* "/" */ ) {
      var m = data.cwd.match(ROOT_DIR_RE);
      ret = m ? m[0] + id.substring(1) : id;
    }
    // Top-level
    else {
      ret = data.base + id;
    }

    // Add default protocol when uri begins with "//"
    if (ret.indexOf("//") === 0) {
      ret = location.protocol + ret;
    }

    return realpath(ret);
  }

  function id2Uri(id, refUri) {
    if (!id) return "";

    id = parseAlias(id);
    id = parsePaths(id);
    id = parseAlias(id);
    id = parseVars(id);
    id = parseAlias(id);
    id = normalize(id);
    id = parseAlias(id);

    var uri = addBase(id, refUri);
    uri = parseAlias(uri);
    uri = parseMap(uri);

    return uri;
  }

  // For Developers
  seajs.resolve = id2Uri;

  // Check environment
  var isWebWorker = typeof window === 'undefined' && typeof importScripts !== 'undefined' && isFunction(importScripts);

  // Ignore about:xxx and blob:xxx
  var IGNORE_LOCATION_RE = /^(about|blob):/;
  var loaderDir;
  // Sea.js's full path
  var loaderPath, doc;
  // Location is read-only from web worker, should be ok though
  var cwd = (!location.href || IGNORE_LOCATION_RE.test(location.href)) ? '' : dirname(location.href);

  if (isWebWorker) {
    // Web worker doesn't create DOM object when loading scripts
    // Get sea.js's path by stack trace.
    var stack;
    try {
      var up = new Error();
      throw up;
    } catch (e) {
      // IE won't set Error.stack until thrown
      stack = e.stack.split('\n');
    }
    // First line is 'Error'
    stack.shift();

    var m;
    // Try match `url:row:col` from stack trace line. Known formats:
    // Chrome:  '    at http://localhost:8000/script/sea-worker-debug.js:294:25'
    // FireFox: '@http://localhost:8000/script/sea-worker-debug.js:1082:1'
    // IE11:    '   at Anonymous function (http://localhost:8000/script/sea-worker-debug.js:295:5)'
    // Don't care about older browsers since web worker is an HTML5 feature
    var TRACE_RE = /.*?((?:http|https|file)(?::\/{2}[\w]+)(?:[\/|\.]?)(?:[^\s"]*)).*?/i;
    // Try match `url` (Note: in IE there will be a tailing ')')
    var URL_RE = /(.*?):\d+:\d+\)?$/;
    // Find url of from stack trace.
    // Cannot simply read the first one because sometimes we will get:
    // Error
    //  at Error (native) <- Here's your problem
    //  at http://localhost:8000/_site/dist/sea.js:2:4334 <- What we want
    //  at http://localhost:8000/_site/dist/sea.js:2:8386
    //  at http://localhost:8000/_site/tests/specs/web-worker/worker.js:3:1
    while (stack.length > 0) {
      var top = stack.shift();
      m = TRACE_RE.exec(top);
      if (m !== null) {
        break;
      }
    }
    var url;
    if (m !== null) {
      // Remove line number and column number
      // No need to check, can't be wrong at this point
      url = URL_RE.exec(m[1])[1];
    }
    // Set
    loaderPath = url;
    // Set loaderDir
    loaderDir = dirname(url || cwd);
    // This happens with inline worker.
    // When entrance script's location.href is a blob url,
    // cwd will not be available.
    // Fall back to loaderDir.
    if (cwd === '') {
      cwd = loaderDir;
    }
  } else {
    doc = document;
    var scripts = doc.scripts;

    // Recommend to add `seajsnode` id for the `sea.js` script element
    var loaderScript = doc.getElementById("seajsnode") ||
      scripts[scripts.length - 1];

    function getScriptAbsoluteSrc(node) {
      return node.hasAttribute ? // non-IE6/7
        node.src :
        // see http://msdn.microsoft.com/en-us/library/ms536429(VS.85).aspx
        node.getAttribute("src", 4);
    }
    loaderPath = loaderScript ? getScriptAbsoluteSrc(loaderScript) : null;
    // When `sea.js` is inline, set loaderDir to current working directory
    loaderDir = dirname(loaderPath || cwd);
  }

  /**
   * util-request.js - The utilities for requesting script and style files
   * ref: tests/research/load-js-css/test.html
   */
  if (isWebWorker) {
    function requestFromWebWorker(url, callback, charset) {
      // Load with importScripts
      var error;
      try {
        importScripts(url);
      } catch (e) {
        error = e;
      }
      callback(error);
    }
    // For Developers
    seajs.request = requestFromWebWorker;
  } else {
    doc = document;
    var head = doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement;
    var baseElement = head.getElementsByTagName("base")[0];

    var currentlyAddingScript;

    function request(url, callback, charset) {
      var mod = cachedMods[Module.getId(url)];
      if (mod) {
        mod.uri = url;
      }

      var node = doc.createElement("script");

      if (charset) {
        var cs = isFunction(charset) ? charset(url) : charset;
        if (cs) {
          node.charset = cs;
        }
      }

      addOnload(node, callback, url, charset);

      node.async = true;
      node.src = url;

      // For some cache cases in IE 6-8, the script executes IMMEDIATELY after
      // the end of the insert execution, so use `currentlyAddingScript` to
      // hold current node, for deriving url in `define` call
      currentlyAddingScript = node;

      // ref: #185 & http://dev.jquery.com/ticket/2709
      baseElement ?
        head.insertBefore(node, baseElement) :
        head.appendChild(node);

      currentlyAddingScript = null;
    }

    function addOnload(node, callback, url, charset) {
      var supportOnload = "onload" in node;

      if (supportOnload) {
        node.onload = onload;
        node.onerror = function() {
          // Fixed by lico
          var bootstrap = js.lang.System.getProperty("atom.bootstrap.class.path"),
            ext = js.lang.System.getProperty("js.ext.dirs"),
            app = js.lang.System.getProperty("js.class.path");

          if (url.indexOf(app) === 0) {
            url = url.replace(app, ext);
            request(url, callback, charset);
          } else if (url.indexOf(ext) === 0) {
            url = url.replace(ext, bootstrap);
            request(url, callback, charset);
          } else {
            emit("error", {
              uri: url,
              node: node
            });
            onload(true);
          }
        };
      } else {
        node.onreadystatechange = function() {
          if (/loaded|complete/.test(node.readyState)) {
            onload();
          }
        };
      }

      function onload(error) {
        // Ensure only run once and handle memory leak in IE
        node.onload = node.onerror = node.onreadystatechange = null;

        // Remove the script to reduce memory leak
        if (!data.debug) {
          head.removeChild(node);
        }

        // Dereference the node
        node = null;

        callback(error);
      }
    }

    // For Developers
    seajs.request = request;

  }
  var interactiveScript;

  function getCurrentScript() {
    if (currentlyAddingScript) {
      return currentlyAddingScript;
    }

    // For IE6-9 browsers, the script onload event may not fire right
    // after the script is evaluated. Kris Zyp found that it
    // could query the script nodes and the one that is in "interactive"
    // mode indicates the current script
    // ref: http://goo.gl/JHfFW
    if (interactiveScript && interactiveScript.readyState === "interactive") {
      return interactiveScript;
    }

    var scripts = head.getElementsByTagName("script");

    for (var i = scripts.length - 1; i >= 0; i--) {
      var script = scripts[i];
      if (script.readyState === "interactive") {
        interactiveScript = script;
        return interactiveScript;
      }
    }
  }

  /**
   * util-deps.js - The parser for dependencies
   * ref: tests/research/parse-dependencies/test.html
   * ref: https://github.com/seajs/searequire
   */

  function parseDependencies(s) {
    if (s.indexOf('require') == -1) {
      return [];
    }
    var index = 0,
      peek, length = s.length,
      isReg = 1,
      modName = 0,
      parentheseState = 0,
      parentheseStack = [],
      res = [];
    while (index < length) {
      readch();
      if (isBlank()) {} else if (isQuote()) {
        dealQuote();
        isReg = 1;
      } else if (peek == '/') {
        readch();
        if (peek == '/') {
          index = s.indexOf('\n', index);
          if (index == -1) {
            index = s.length;
          }
        } else if (peek == '*') {
          index = s.indexOf('*/', index);
          if (index == -1) {
            index = length;
          } else {
            index += 2;
          }
        } else if (isReg) {
          dealReg();
          isReg = 0;
        } else {
          index--;
          isReg = 1;
        }
      } else if (isWord()) {
        dealWord();
      } else if (isNumber()) {
        dealNumber();
      } else if (peek == '(') {
        parentheseStack.push(parentheseState);
        isReg = 1;
      } else if (peek == ')') {
        isReg = parentheseStack.pop();
      } else {
        isReg = peek != ']';
        modName = 0;
      }
    }
    return res;

    function readch() {
      peek = s.charAt(index++);
    }

    function isBlank() {
      return /\s/.test(peek);
    }

    function isQuote() {
      return peek == '"' || peek == "'";
    }

    function dealQuote() {
      var start = index;
      var c = peek;
      var end = s.indexOf(c, start);
      if (end == -1) {
        index = length;
      } else if (s.charAt(end - 1) != '\\') {
        index = end + 1;
      } else {
        while (index < length) {
          readch();
          if (peek == '\\') {
            index++;
          } else if (peek == c) {
            break;
          }
        }
      }
      if (modName) {
        // Fixed by lico
        var name = s.slice(start, index - 1);
        if (name.indexOf("/") === -1) {
          var p = name.indexOf("!");
          if (p !== -1) {
            if (name.indexOf("css:skin!") === 0 ||
              name.indexOf("css!") === 0 ||
              name.indexOf("css:app!") === 0 ||
              name.indexOf("css:ext!") === 0 ||
              name.indexOf("css:bootstrap!") === 0) {
              return;
            }
            // name = name.substring(p + 1);
          }
          // name = name.replace(/[.]/g, "/");
        }
        res.push(name);
        modName = 0;
      }
    }

    function dealReg() {
      index--;
      while (index < length) {
        readch();
        if (peek == '\\') {
          index++;
        } else if (peek == '/') {
          break;
        } else if (peek == '[') {
          while (index < length) {
            readch();
            if (peek == '\\') {
              index++;
            } else if (peek == ']') {
              break;
            }
          }
        }
      }
    }

    function isWord() {
      return /[a-z_$]/i.test(peek);
    }

    function dealWord() {
      var s2 = s.slice(index - 1);
      var r = /^[\w$]+/.exec(s2)[0];
      parentheseState = {
        'if': 1,
        'for': 1,
        'while': 1,
        'with': 1
      }[r];
      isReg = {
        'break': 1,
        'case': 1,
        'continue': 1,
        'debugger': 1,
        'delete': 1,
        'do': 1,
        'else': 1,
        'false': 1,
        'if': 1,
        'in': 1,
        'instanceof': 1,
        'return': 1,
        'typeof': 1,
        'void': 1
      }[r];
      // Fixed by lico
      // modName = /^require\s*\(\s*(['"]).+?\1\s*\)/.test(s2);
      modName = /^require\s*\(\s*(['"])[^\n\r'"+]+?\1\s*\)/.test(s2);
      if (modName) {
        r = /^require\s*\(\s*['"]/.exec(s2)[0];
        index += r.length - 2;
      } else {
        index += /^[\w$]+(?:\s*\.\s*[\w$]+)*/.exec(s2)[0].length - 1;
      }
    }

    function isNumber() {
      return /\d/.test(peek) || peek == '.' && /\d/.test(s.charAt(index));
    }

    function dealNumber() {
      var s2 = s.slice(index - 1);
      var r;
      if (peek == '.') {
        r = /^\.\d+(?:E[+-]?\d*)?\s*/i.exec(s2)[0];
      } else if (/^0x[\da-f]*/i.test(s2)) {
        r = /^0x[\da-f]*\s*/i.exec(s2)[0];
      } else {
        r = /^\d+\.?\d*(?:E[+-]?\d*)?\s*/i.exec(s2)[0];
      }
      index += r.length - 1;
      isReg = 0;
    }
  }
  /**
   * module.js - The core of module loader
   */

  var cachedMods = seajs.cache = {};
  var anonymousMeta;

  var fetchingList = {};
  var fetchedList = {};
  var callbackList = {};

  var STATUS = Module.STATUS = {
    // 1 - The `module.uri` is being fetched
    FETCHING: 1,
    // 2 - The meta data has been saved to cachedMods
    SAVED: 2,
    // 3 - The `module.dependencies` are being loaded
    LOADING: 3,
    // 4 - The module are ready to execute
    LOADED: 4,
    // 5 - The module is being executed
    EXECUTING: 5,
    // 6 - The `module.exports` is available
    EXECUTED: 6,
    // 7 - 404
    ERROR: 7
  };


  function Module(uri, deps) {
    this.uri = uri;
    this.dependencies = deps || [];
    this.deps = {}; // Ref the dependence modules
    this.status = 0;

    this._entry = [];
  }

  // Resolve module.dependencies
  Module.prototype.resolve = function() {
    var mod = this;
    var ids = mod.dependencies;
    var uris = [];

    var bootstap = js.lang.System.getProperty("atom.bootstrap.class.path"),
      ext = js.lang.System.getProperty("js.ext.dirs"),
      test = js.lang.System.getProperty("js.test.dirs"),
      app = js.lang.System.getProperty("js.class.path");

    for (var i = 0, len = ids.length; i < len; i++) {
      var id = ids[i];

      // Fixed by lico
      var prefix = "",
        url = "";
      var index = id.indexOf("!");
      if (index !== -1) {
        prefix = id.substring(0, index);
        id = id.substring(index + 1);
      }

      id = id.replace(/[.]/g, "/");
      switch (prefix) {
        //bootstrap,ext,app
        case 'js:ext':
        case 'ext':
          url = ext;
          break;
        case 'js:bootstrap':
        case 'bootstrap':
          url = bootstap;
          break;

        case 'js:test':
        case 'test':
          url = test;
          break;

        case 'js:app':
        case 'app':
        default:
          url = app;
          break;
      }

      uris[i] = Module.resolve(url + id, mod.uri);
    }
    return uris;
  };

  Module.prototype.pass = function() {
    var mod = this;

    var len = mod.dependencies.length;

    for (var i = 0; i < mod._entry.length; i++) {
      var entry = mod._entry[i];
      var count = 0;
      for (var j = 0; j < len; j++) {
        var m = mod.deps[mod.dependencies[j]];
        // If the module is unload and unused in the entry, pass entry to it
        if (m.status < STATUS.LOADED && !entry.history.hasOwnProperty(m.uri)) {
          entry.history[m.uri] = true;
          count++;
          m._entry.push(entry);
          if (m.status === STATUS.LOADING) {
            m.pass();
          }
        }
      }
      // If has passed the entry to it's dependencies, modify the entry's count and del it in the module
      if (count > 0) {
        entry.remain += count - 1;
        mod._entry.shift();
        i--;
      }
    }
  };

  // Load module.dependencies and fire onload when all done
  Module.prototype.load = function() {
    var mod = this;

    // If the module is being loaded, just wait it onload call
    if (mod.status >= STATUS.LOADING) {
      return;
    }

    mod.status = STATUS.LOADING;

    // Emit `load` event for plugins such as combo plugin
    var uris = mod.resolve();
    emit("load", uris);

    for (var i = 0, len = uris.length; i < len; i++) {
      mod.deps[mod.dependencies[i]] = Module.get(uris[i]);
    }

    // Pass entry to it's dependencies
    mod.pass();

    // If module has entries not be passed, call onload
    if (mod._entry.length) {
      mod.onload();
      return;
    }

    // Begin parallel loading
    var requestCache = {};
    var m;

    for (i = 0; i < len; i++) {
      m = cachedMods[Module.getId(uris[i])];

      if (m.status < STATUS.FETCHING) {
        m.fetch(requestCache);
      } else if (m.status === STATUS.SAVED) {
        m.load();
      }
    }

    // Send all requests at last to avoid cache bug in IE6-9. Issues#808
    for (var requestUri in requestCache) {
      if (requestCache.hasOwnProperty(requestUri)) {
        requestCache[requestUri]();
      }
    }
  };

  // Call this method when module is loaded
  Module.prototype.onload = function() {
    var mod = this;
    mod.status = STATUS.LOADED;

    // When sometimes cached in IE, exec will occur before onload, make sure len is an number
    for (var i = 0, len = (mod._entry || []).length; i < len; i++) {
      var entry = mod._entry[i];
      if (--entry.remain === 0) {
        entry.callback();
      }
    }

    delete mod._entry;
  };

  // Call this method when module is 404
  Module.prototype.error = function() {
    var mod = this;
    mod.onload();
    mod.status = STATUS.ERROR;
  };

  // Execute a module
  Module.prototype.exec = function() {
    var mod = this;

    // When module is executed, DO NOT execute it again. When module
    // is being executed, just return `module.exports` too, for avoiding
    // circularly calling
    if (mod.status >= STATUS.EXECUTING) {
      return mod.exports;
    }

    mod.status = STATUS.EXECUTING;

    if (mod._entry && !mod._entry.length) {
      delete mod._entry;
    }

    //non-cmd module has no property factory and exports
    if (!mod.hasOwnProperty('factory')) {
      mod.non = true;
      return;
    }

    // Create require
    var uri = mod.uri;

    function require(id) {
      // Fixed by lico
      if (id && Object.isString(id) && id.indexOf("/") === -1) {
        var index = id.indexOf("!");
        if (index !== -1) {
          switch (id.substring(0, index)) {
            //css,css-ext,skin
            case 'css:skin':
              id = id.substring(index + 1);
              global.$import(id, 'CSSClassLoader', atom.misc.Launcher.CSSClassLoader.SKIN);
              return;
            case 'css':
            case 'css:app':
              id = id.substring(index + 1);
              global.$import(id, 'CSSClassLoader');
              return;
            case 'css:ext':
              id = id.substring(index + 1);
              global.$import(id, 'CSSClassLoader', atom.misc.Launcher.CSSClassLoader.EXT);
              return;
            case 'css:bootstrap':
              id = id.substring(index + 1);
              global.$import(id, 'CSSClassLoader', atom.misc.Launcher.CSSClassLoader.BOOTSTRAP);
              return;
            default:
              break;
          }
        }

        // id = id.replace(/[.]/g, "/");
      }
      var m = mod.deps[id] || Module.get(require.resolve(id));
      if (m.status == STATUS.ERROR) {
        throw new Error('module was broken: ' + m.uri);
      }
      return m.exec();
    }

    require.resolve = function(id) {
      return Module.resolve(id, uri);
    };

    require.async = function(ids, callback) {
      Module.use(ids, callback, uri + "_async_" + cid());
      return require;
    };

    // Exec factory
    var factory = mod.factory;

    var exports = isFunction(factory) ?
      factory(require, mod.exports = {}, mod) :
      factory;

    if (exports === undefined) {
      exports = mod.exports;
    }

    // Reduce memory leak
    delete mod.factory;

    mod.exports = exports;
    mod.status = STATUS.EXECUTED;

    // Emit `exec` event
    emit("exec", mod);

    return mod.exports;
  };

  // Fetch a module
  Module.prototype.fetch = function(requestCache) {
    var mod = this;
    var uri = mod.uri;

    mod.status = STATUS.FETCHING;

    // Emit `fetch` event for plugins such as combo plugin
    var emitData = {
      uri: uri
    };
    emit("fetch", emitData);
    var requestUri = emitData.requestUri || uri;

    // Empty uri or a non-CMD module
    if (!requestUri || fetchedList.hasOwnProperty(requestUri)) {
      mod.load();
      return;
    }

    if (fetchingList.hasOwnProperty(requestUri)) {
      callbackList[requestUri].push(mod);
      return;
    }

    fetchingList[requestUri] = true;
    callbackList[requestUri] = [mod];

    // Emit `request` event for plugins such as text plugin
    emit("request", emitData = {
      uri: uri,
      requestUri: requestUri,
      onRequest: onRequest,
      charset: isFunction(data.charset) ? data.charset(requestUri) || 'utf-8' : data.charset
    });

    if (!emitData.requested) {
      requestCache ?
        requestCache[emitData.requestUri] = sendRequest :
        sendRequest();
    }

    function sendRequest() {
      seajs.request(emitData.requestUri, emitData.onRequest, emitData.charset);
    }

    function onRequest(error) {
      delete fetchingList[requestUri];
      fetchedList[requestUri] = true;

      // Save meta data of anonymous module
      if (anonymousMeta) {
        Module.save(uri, anonymousMeta);
        anonymousMeta = null;
      }

      // Call callbacks
      var m, mods = callbackList[requestUri];
      delete callbackList[requestUri];
      while ((m = mods.shift())) {
        // When 404 occurs, the params error will be true
        if (error === true) {
          m.error();
        } else {
          m.load();
        }
      }
    }
  };

  // Resolve id to uri
  Module.resolve = function(id, refUri) {
    // Emit `resolve` event for plugins such as text plugin
    var emitData = {
      id: id,
      refUri: refUri
    };
    emit("resolve", emitData);

    return emitData.uri || seajs.resolve(emitData.id, refUri);
  };

  // Define a module
  Module.define = function(id, deps, factory) {
    var argsLen = arguments.length;

    // define(factory)
    if (argsLen === 1) {
      factory = id;
      id = undefined;
    } else if (argsLen === 2) {
      factory = deps;

      // define(deps, factory)
      if (isArray(id)) {
        deps = id;
        id = undefined;
      }
      // define(id, factory)
      else {
        deps = undefined;
      }
    }

    // Parse dependencies according to the module factory code
    if (!isArray(deps) && isFunction(factory)) {
      deps = typeof parseDependencies === "undefined" ? [] : parseDependencies(factory.toString());
    }

    var meta = {
      id: id,
      uri: Module.resolve(id),
      deps: deps,
      factory: factory
    };

    // Try to derive uri in IE6-9 for anonymous modules
    if (!isWebWorker && !meta.uri && doc.attachEvent && typeof getCurrentScript !== "undefined") {
      var script = getCurrentScript();

      if (script) {
        meta.uri = script.src;
      }

      // NOTE: If the id-deriving methods above is failed, then falls back
      // to use onload event to get the uri
    }

    // Emit `define` event, used in nocache plugin, seajs node version etc
    emit("define", meta);

    meta.uri ? Module.save(meta.uri, meta) :
      // Save information for "saving" work in the script onload event
      anonymousMeta = meta;
  };

  // Save meta data to cachedMods
  Module.save = function(uri, meta) {

    var bootstrap = js.lang.System.getProperty("atom.bootstrap.class.path"),
      ext = js.lang.System.getProperty("js.ext.dirs"),
      test = js.lang.System.getProperty("js.test.dirs"),
      app = js.lang.System.getProperty("js.class.path");

    var index = uri.indexOf(app);
    if (index !== -1) {
      meta.id = uri.substring(index + app.length);
    } else {
      index = uri.indexOf(ext);
      if (index !== -1) {
        meta.id = uri.substring(index + ext.length);
      } else {
        index = uri.indexOf(bootstrap);
        if (index !== -1) {
          meta.id = uri.substring(index + bootstrap.length);
        } else {
          index = uri.indexOf(test);
          if (index !== -1) {
            meta.id = uri.substring(index + test.length);
          }
        }
      }
    }

    var mod = Module.get(uri);

    // Do NOT override already saved modules
    if (mod.status < STATUS.SAVED) {
      mod.id = meta.id || uri;
      mod.dependencies = meta.deps || [];
      mod.factory = meta.factory;
      mod.status = STATUS.SAVED;

      emit("save", mod);
    }
  };

  Module.getId = function(uri) {
    var bootstrap = js.lang.System.getProperty("atom.bootstrap.class.path"),
      ext = js.lang.System.getProperty("js.ext.dirs"),
      test = js.lang.System.getProperty("js.test.dirs"),
      app = js.lang.System.getProperty("js.class.path");

    var index = uri.indexOf(app),
      id = "main";
    if (index !== -1) {
      id = uri.substring(index + app.length);
    } else {
      index = uri.indexOf(ext);
      if (index !== -1) {
        id = uri.substring(index + ext.length);
      } else {
        index = uri.indexOf(bootstrap);
        if (index !== -1) {
          id = uri.substring(index + bootstrap.length);
        } else {
          index = uri.indexOf(test);
          if (index !== -1) {
            id = uri.substring(index + test.length);
          } else {
            id = uri;
          }
        }
      }
    }
    return id;
  };
  // Get an existed module or create a new one
  Module.get = function(uri, deps) {

    var id = Module.getId(uri);
    return cachedMods[id] || (cachedMods[id] = new Module(uri, deps));
  };

  // Use function is equal to load a anonymous module
  Module.use = function(ids, callback, uri) {

    ids = isArray(ids) ? ids : [ids];

    var mod = Module.get(uri, ids);

    mod._entry.push(mod);
    mod.history = {};
    mod.remain = 1;

    mod.callback = function() {
      var exports = [];
      var uris = mod.resolve();

      for (var i = 0, len = uris.length; i < len; i++) {
        exports[i] = cachedMods[Module.getId(uris[i])].exec();
      }

      if (callback) {
        callback.apply(global, exports);
      }

      delete mod.callback;
      delete mod.history;
      delete mod.remain;
      delete mod._entry;
    };

    mod.load();
  };


  // Public API

  seajs.use = function(ids, callback) {
    Module.use(ids, callback, data.cwd + "_use_" + cid());
    return seajs;
  };

  Module.define.cmd = {};
  global.define = Module.define;


  // For Developers

  seajs.Module = Module;
  data.fetchedList = fetchedList;
  data.cid = cid;

  seajs.require = function(id) {
    var mod = Module.get(Module.resolve(id));
    if (mod.status < STATUS.EXECUTING) {
      mod.onload();
      mod.exec();
    }
    return mod.exports;
  };

  /**
   * config.js - The configuration for the loader
   */

  // The root path to use for id2uri parsing
  data.base = loaderDir;

  // The loader directory
  data.dir = loaderDir;

  // The loader's full path
  data.loader = loaderPath;

  // The current working directory
  data.cwd = cwd;

  // The charset for requesting files
  data.charset = "utf-8";

  // data.alias - An object containing shorthands of module id
  // data.paths - An object containing path shorthands in module id
  // data.vars - The {xxx} variables in module id
  // data.map - An array containing rules to map module uri
  // data.debug - Debug mode. The default value is false

  seajs.config = function(configData) {

    for (var key in configData) {
      var curr = configData[key];
      var prev = data[key];

      // Merge object config such as alias, vars
      if (prev && isObject(prev)) {
        for (var k in curr) {
          prev[k] = curr[k];
        }
      } else {
        // Concat array config such as map
        if (isArray(prev)) {
          curr = prev.concat(curr);
        }
        // Make sure that `data.base` is an absolute path
        else if (key === "base") {
          // Make sure end with "/"
          if (curr.slice(-1) !== "/") {
            curr += "/";
          }
          curr = addBase(curr);
        }

        // Set config
        data[key] = curr;
      }
    }

    emit("config", configData);
    return seajs;
  };

})(this);
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 10, 2014
 */

Class.forName({
  name: "class js.dom.Document",

  Document: function() {},

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

  "static getDocument": function() {
    return document;
  }
});
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

  "public getRelative": function() {
    return js.lang.System.getProperty("atom.root.dirs");
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

      switch (type) {
        case atom.misc.Launcher.CSSClassLoader.EXT:
          relative = '/lib/';
          break;
        case atom.misc.Launcher.CSSClassLoader.SKIN:
          relative = (debug ? '/src/main/skin/' : "/classes/skin/") + this.getSkin() + "/css/";
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
        // this.loadClass(mainClass);
        $import(mainClass)
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
    path = null,
    mainClass = null,
    skin = null,
    immediately = true,
    servletpath = null;

  for (var i = 0, len = scripts.length; i < len; i++) {
    var script = scripts[i],
      jsvm = script.getAttribute("jsvm"),
      sp = script.getAttribute("servletpath"),
      hasDebug = script.hasAttribute("debug"),
      debug = script.getAttribute("debug"),
      v = script.getAttribute("version"),
      main = script.getAttribute("main"),
      im = script.getAttribute("immediately"),
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

      if (!im || im.toLowerCase() !== 'true') {
        immediately = false;
      }

      if (main) {
        mainClass = main;
      }
      skin = s || 'default';
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
  js.lang.System.setProperty("immediately", immediately);

  if (immediately) {
    loader.main();
  } else {
    js.dom.Document.ready(loader.main, loader);
  }
})(this);
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 12, 2014
 */

Class.forName({
  name: "class js.lang.NullPointerException extends js.lang.Exception",
  "private name": "js.lang.NullPointerException",
  "private number": 107
});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 12, 2014
 */
Class.forName({
  name: "class js.lang.IllegalArgumentException extends js.lang.Exception",
  "private name": "js.lang.IllegalArgumentException", // 错误名
  "private number": 102
    // 错误号
});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 14, 2014
 */
Class
  .forName({
    name: "class js.lang.reflect.InvocationTargetException extends js.lang.Exception",
    "private name": "InvocationTargetException", // 错误名
    "private number": 100
      // 错误号
  });
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 14, 2014
 */

Class.forName({
  name: "abstract class js.lang.reflect.Constructor extends Object"
});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 14, 2014
 */

Class.forName({
  name: "public final class js.lang.reflect.Field extends Object",
  "@Setter @Getter private _declaringClass": null,
  "@Setter @Getter private _name": null,
  "@Setter @Getter private _modifiers": null,
  "@Setter @Getter private _annotations": null,
  "@Setter @Getter private _value": null,

  Field: function(name, value, declaringClass, modifiers, annotations) {
    this._name = name;
    this._declaringClass = declaringClass;
    this._modifiers = modifiers;
    this._annotations = annotations;
    this._value = value;

  },
  clone: function() {
    return this;
  },
  "set": function(obj, value) {
    obj[this._name] = value;
  },
  "get": function(obj) {
    return obj[this._name];
  }
});
js.lang.reflect.Field.loaded = true;
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 14, 2014
 */

Class.forName({
  name: "public final class js.lang.reflect.Method extends Object",

  "@Setter @Getter private _declaringClass": null,
  "@Setter @Getter private _name": null,
  "@Setter @Getter private _modifiers": null,
  "@Setter @Getter private _annotations": null,
  "@Setter @Getter private _value": null,
  Method: function(name, methodAccessor, declaringClass, modifiers,
    annotations) {
    this._name = name;
    this._declaringClass = declaringClass;
    this._modifiers = modifiers;
    this._annotations = annotations;
    this._value = methodAccessor;
  },
  clone: function() {
    return this;
  },
  /** 对带有指定参数的指定对象调用由此 Method 对象表示的基础方法。 */
  invoke: function() {
    if (arguments.length > 0) {
      var obj = arguments[0];
      if (!obj || !this._value) {
        throw new js.lang.NullPointerException();
      } else if (obj[this._name]) {
        // TODO 判断权限是否可以被调用
        try {
          return this._value.apply(obj, Array.prototype.slice.call(
            arguments, 1));
        } catch (e) {
          throw new js.lang.reflect.InvocationTargetException(e
            .getMessage());
        }
      }
    }
    throw new js.lang.IllegalArgumentException();
  }
});
js.lang.reflect.Method.loaded = true;
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 14, 2014
 */

/**
 * abstract 1024, interface 512, final 16, static 8, protected 4, private 2
 * ,public 1,default 0
 */
Class.forName({
  name: "public class js.lang.reflect.Modifier extends Object",

  /** 表示 abstract 修饰符的 int 的值。 2E10 */
  "public static final ABSTRACT": 1024,

  /** 表示 interface 修饰符的 int 的值。 2E9 */
  "public static final INTERFACE": 512,

  "public static final WRITABLE": 256,
  "public static final ENUMERABLE": 128,
  "public static final CONFIGURABLE": 64,
  "public static final PROXYABLE": 32,

  /** 表示 final 修饰符的 int 值。 2E4 */
  "public static final FINAL": 16,

  /** 表示 static 修饰符的 int 值。 2E3 */
  "public static final STATIC": 8,

  /** 表示 protected 修饰符的 int 值。 2E2 */
  "public static final PROTECTED": 4,

  /** 表示 private 修饰符的 int 值。2E1 */
  "public static final PRIVATE": 2,

  /** 表示 public 修饰符的 int 值。 2E0 */
  "public static final PUBLIC": 1,

  /** 表示 default 修饰符的 int 值。 2E0 */
  "public static final DEFAULT": 0,

  /** 如果整数参数包括 abstract 修饰符，则返回 true，否则返回 false。 */
  "public static isAbstract": function(mod) {
    return (mod & js.lang.reflect.Modifier.ABSTRACT) !== 0;
  },
  /** 如果整数参数包括 final 修饰符，则返回 true，否则返回 false。 */
  "public static isFinal": function(mod) {
    return (mod & js.lang.reflect.Modifier.FINAL) !== 0;
  },
  /** 如果整数参数包括 interface 修饰符，则返回 true，否则返回 false。 */
  "public static isInterface": function(mod) {
    return (mod & js.lang.reflect.Modifier.INTERFACE) !== 0;
  },
  /** 如果整数参数包括 private 修饰符，则返回 true，否则返回 false。 */
  "public static isPrivate": function(mod) {
    return (mod & js.lang.reflect.Modifier.PRIVATE) !== 0;
  },
  /** 如果整数参数包括 protected 修饰符，则返回 true，否则返回 false。 */
  "public static isProtected": function(mod) {
    return (mod & js.lang.reflect.Modifier.PROTECTED) !== 0;
  },
  /** 如果整数参数包括 public 修饰符，则返回 true，否则返回 false。 */
  "public static isPublic": function(mod) {
    return (mod & js.lang.reflect.Modifier.PUBLIC) !== 0;
  },
  /** 如果整数参数包括 static 修饰符，则返回 true，否则返回 false。 */
  "public static isStatic": function(mod) {
    return (mod & js.lang.reflect.Modifier.STATIC) !== 0;
  },
  "public static isDefault": function(mod) {
    return (mod & js.lang.reflect.Modifier.DEFAULT) !== 0;
  },
  "public static isProxyable": function(mod) {
    return (mod & js.lang.reflect.Modifier.PROXYABLE) !== 0;
  },
  "public static isWritable": function(mod) {
    return (mod & js.lang.reflect.Modifier.WRITABLE) !== 0;
  },
  "public static isEnumerable": function(mod) {
    return (mod & js.lang.reflect.Modifier.ENUMERABLE) !== 0;
  },
  "public static isConfigurable": function(mod) {
    return (mod & js.lang.reflect.Modifier.CONFIGURABLE) !== 0;
  },

  clone: function() {
    return this;
  }
});
/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年10月13日
 */

/**
 * Thrown to indicate that the <code>clone</code> method in class
 * <code>Object</code> has been called to clone an object, but that
 * the object's class does not implement the <code>Cloneable</code>
 * interface.
 * <p>
 * Applications that override the <code>clone</code> method can also
 * throw this exception to indicate that an object could not or
 * should not be cloned.
 *
 * @author  unascribed
 * @see     java.lang.Cloneable
 * @see     java.lang.Object#clone()
 * @since   JDK1.0
 */

Class.forName({
  name: "class js.lang.CloneNotSupportedException extends js.lang.Exception",
  "private name": "js.lang.CloneNotSupportedException", // 错误名
  "private number": 109
    // 错误号
});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 12, 2014
 */
Class.forName({
  name: "class js.lang.IllegalAccessException extends js.lang.Exception",
  "private name": "js.lang.IllegalAccessException", // 错误名
  "private number": 101 // 错误号
});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 12, 2014
 */
Class.forName({
  name: "class js.lang.IllegalStateException extends js.lang.Exception",
  "private name": "js.lang.IllegalStateException", // 错误名
  "private number": 103
    // 错误号
});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 12, 2014
 */
Class.forName({
  name: "class js.lang.IndexOutOfBoundsException extends js.lang.Exception",
  "private name": "js.lang.IndexOutOfBoundsException", // 错误名
  "private number": 104 // 错误号
});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 12, 2014
 */
Class
  .forName({
    name: "class js.lang.UnsupportedOperationException extends js.lang.Exception",
    "private name": "js.lang.UnsupportedOperationException", // 错误名
    "private number": 108
      // 错误号
  });
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 13, 2014
 */
Class.forName({
  name: "class js.lang.StringBuffer extends Object",
  "private _strings": [],
  StringBuffer: function() {},
  append: function() {
    this._strings.append(Array.prototype.slice.call(arguments, 0));
    return this;
  },

  insert: function() {
    var args = Array.prototype.slice.call(arguments, 0);
    args.reverse();
    Array.prototype.splice.call(args, 0, 0, 0, 0);
    Array.prototype.splice.apply(this._strings, args);
    return this;
  },

  applys: function(array) {
    this._strings.append(array);
    return this;
  },

  clear: function() {
    this._strings.splice(0, this._strings.length);
  },

  remove: function(start, end) {
    var size = this.length();
    if (start < 0 || start > size || start > end) {
      throw new js.lang.IndexOutOfBoundsException();
    }

    if (!end || end > size) {
      end = size;
    }

    var cursor = 0,
      ele = null;
    for (var i = 0, len = this._strings.length; i < len; i++) {
      ele = this._strings[i];

      if (Object.isNull(ele)) {
        continue;
      }

      if (!Object.isString(ele)) {
        ele = "" + ele;
      }

      var length = ele.length;

      cursor += length;
      if (cursor > start) {
        var index = length - cursor + start;
        if (end <= cursor) {
          this._strings[i] = [
            ele.substring(0, index),
            ele.substring(end - start, length)
          ].join("");
          break;
        } else {
          start = cursor;
          this._strings[i] = ele.substring(0, index);
        }
      }
    }

    return this;
  },

  substring: function(start, end) {
    var size = this.length();
    if (start < 0 || start > size || start > end) {
      throw new js.lang.IndexOutOfBoundsException();
    }

    if (!end || end > size) {
      end = size;
    }

    var cursor = 0,
      substring = [],
      ele = null;
    for (var i = 0, len = this._strings.length; i < len; i++) {

      ele = this._strings[i];

      if (Object.isNull(ele)) {
        continue;
      }

      if (!Object.isString(ele)) {
        ele = "" + ele;
      }

      var length = ele.length;
      cursor += length;
      if (cursor > start) {
        var index = length - cursor + start;
        if (end <= cursor) {
          substring.push(ele.substring(index, end - start));
          break;
        } else {
          start = cursor;
          substring.push(ele.substring(index, length));
        }
      }
    }

    return substring.join("");
  },

  charAt: function(index) {
    var cursor = 0,
      ele = null;
    for (var i = 0, len = this._strings.length; i < len; i++) {
      ele = this._strings[i];

      if (Object.isNull(ele)) {
        continue;
      }

      if (!Object.isString(ele)) {
        ele = "" + ele;
      }

      var length = ele.length;
      cursor += length;
      if (cursor > index) {
        return ele.charAt(length - cursor + index);
      }
    }
    throw new js.lang.IndexOutOfBoundsException();
  },

  indexOf: function(string) {
    return this._strings.join("").indexOf(string);
  },

  length: function() {
    var cursor = 0,
      ele = null;
    for (var i = 0, len = this._strings.length; i < len; i++) {
      ele = this._strings[i];
      if (Object.isNull(ele)) {
        continue;
      }

      if (!Object.isString(ele)) {
        ele = "" + ele;
      }

      cursor += ele.length;
    }
    return cursor;
  },

  getLength: function() {
    return this.length();
  },
  toString: function(sp) {
    return this._strings.join(sp || "");
  }
});