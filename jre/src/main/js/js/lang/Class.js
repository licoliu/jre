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
 * @namespace atom
 */
/**
 * @namespace org
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
/**
 * @namespace atom.misc
 */
/**
 * @namespace org.aopalliance
 */
/**
 * @namespace org.atomunion
 */
/**
 * @namespace org.seajs
 */

/**
 * @namespace js.lang.reflect
 */
/**
 * @namespace js.lang.annotation
 */
/**
 * @namespace js.test.annotation
 */
/**
 * @namespace js.test.runner
 */
/**
 * @namespace js.test.runners
 */
/**
 * @namespace org.aopalliance.aop
 */
/**
 * @namespace org.atomunion.aop
 */
/**
 * @namespace org.atomunion.beans
 */
/**
 * @namespace org.atomunion.stereotype
 */
/**
 * @namespace org.atomunion.util
 */
/**
 * @namespace org.atomunion.web
 */

/**
 * @namespace org.atomunion.aop.framework
 */
/**
 * @namespace org.atomunion.aop.support
 */
/**
 * @namespace org.atomunion.beans.factory
 */
/**
 * @namespace org.atomunion.web.context
 */

/**
 * @namespace org.atomunion.beans.factory.support
 */
/**
 * @namespace org.atomunion.web.context.support
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
              if (USEECMA && typeof d[k][i] === "undefined") {
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
              if (USEECMA && typeof d[i] === "undefined") {
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
                if (USEECMA && typeof d[j][k][t] === "undefined") {
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
                if (USEECMA && typeof d[j][t] === "undefined") {
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
      /** @lends js.lang.Object.prototype */
      return {
        /** 
         * @memberof js.lang.Object
         * @function
         * @public 
         * @static
         * @summary Determines whether the specified object is null(undefined). 
         * @description Determines whether the specified object is null(undefined). 
         *
         * @param {js.lang.Object} v - The object to determine.
         * @return {js.lang.Boolean} A Boolean indicating whether or not the specified object is null(undefined).
         */
        isNull: function(v) {
          return typeof v === 'undefined' || v === null;
        },

        /** 
         * @memberof js.lang.Object
         * @function
         * @public 
         * @static
         * @summary Determines whether the specified object is empty. 
         * @description 
         * <p>
         * Determines whether the specified object is empty. The Criteria for judgment is:
         * <ul>
         * <li>the specified is null(undefined)</li>
         * <li>the specified is a array, and it's length is 0.</li>
         * <li>the specified is a string, and it's length is 0 after any leading and trailing whitespace removed</li>
         * </ul>
         * </p>
         *
         * @param {js.lang.Object} v - The object to determine.
         * @return {js.lang.Boolean} A Boolean indicating whether or not the specified object is empty.
         */
        isEmpty: function(v) {
          return typeof v === 'undefined' || v === null || ((Object.isArray(v) && !v.length)) || (Object.isString(v) && !(v.trim ? v.trim() : v.replace(/^\s+|\s+$/g, "")));
        },

        /** 
         * @memberof js.lang.Object
         * @function
         * @public 
         * @static
         * @summary Determines whether the specified object is an array. 
         * @description Determines whether the specified object is an array.
         *
         * @param {js.lang.Object} v - The object to determine.
         * @return {js.lang.Boolean} A Boolean indicating whether or not the specified object is an array.
         */
        isArray: function(v) {
          return Object.prototype.toString.apply(v) === "[object Array]";
        },

        /** 
         * @memberof js.lang.Object
         * @function
         * @public
         * @static 
         * @summary Determines whether the specified object is a date. 
         * @description Determines whether the specified object is a date. 
         *
         * @param {js.lang.Object} v - The object to determine.
         * @return {js.lang.Boolean} A Boolean indicating whether or not the specified object is a date.
         */
        isDate: function(v) {
          return Object.prototype.toString.apply(v) === "[object Date]";
        },

        /** 
         * @memberof js.lang.Object
         * @function
         * @public 
         * @static
         * @summary Determines whether the specified object is a narrow object.
         * @description Determines whether the specified object is a narrow object.
         *
         * @param {js.lang.Object} v - The object to determine.
         * @return {js.lang.Boolean} A Boolean indicating whether or not the specified object is a narrow object.
         */
        isNarrowObject: function(v) {
          return !!v && Object.prototype.toString.call(v) === "[object Object]";
        },

        /** 
         * @memberof js.lang.Object
         * @function
         * @public
         * @static 
         * @summary Determines whether the specified object is a function.
         * @description Determines whether the specified object is a function.
         *
         * @param {js.lang.Object} v - The object to determine.
         * @return {js.lang.Boolean} A Boolean indicating whether or not the specified object is a function.
         */
        isFunction: function(v) {
          return Object.prototype.toString.apply(v) === "[object Function]";
        },

        /** 
         * @memberof js.lang.Object
         * @function
         * @public
         * @static 
         * @summary Determines whether the specified object is a number.
         * @description Determines whether the specified object is a number.
         *
         * @param {js.lang.Object} v - The object to determine.
         * @return {js.lang.Boolean} A Boolean indicating whether or not the specified object is a number.
         */
        isNumber: function(v) {
          return typeof v === "number" && isFinite(v);
        },

        /** 
         * @memberof js.lang.Object
         * @function
         * @public 
         * @static
         * @summary Determines whether the specified object is a string.
         * @description Determines whether the specified object is a string.
         *
         * @param {js.lang.Object} v - The object to determine.
         * @return {js.lang.Boolean} A Boolean indicating whether or not the specified object is a string.
         */
        isString: function(v) {
          return typeof v === "string";
        },

        /** 
         * @memberof js.lang.Object
         * @function
         * @public 
         * @static
         * @summary Determines whether the specified object is a Boolean object.
         * @description Determines whether the specified object is a Boolean object.
         *
         * @param {js.lang.Object} v - The object to determine.
         * @return {js.lang.Boolean} A Boolean indicating whether or not the specified object is a Boolean object.
         */
        isBoolean: function(v) {
          return typeof v === "boolean";
        },

        /** 
         * @memberof js.lang.Object
         * @function
         * @public 
         * @static
         * @summary Determines whether the specified object has already been defined.
         * @description Determines whether the specified object has already been defined.
         *
         * @param {js.lang.Object} v - The object to determine.
         * @return {js.lang.Boolean} A Boolean indicating whether or not the specified object has already been defined.
         */
        isDefined: function(v) {
          return typeof v !== "undefined";
        },

        /** 
         * @memberof js.lang.Object
         * @function
         * @public 
         * @static
         * @summary 
         * @description 
         *
         * @param {js.lang.Object} sub - The object to determine.
         * @param {js.lang.Class} sup - The type of a class.
         * @return {js.lang.Boolean} Determines whether the specified object is the specified class type.
         */
        isInstanceof: function(sub, sup) {
          return sub instanceof sup;
        },

        /*
         * extend2 : function(d, s) { if (!Object.isEmpty(d) &&
         * Object.isArray(d)) { for (var i = 0; i < d.length;
         * i++) { Object.each(s, function(j, v, o) {
         * d[i].prototype[j] = v.value; }); } } return d; },
         */
        /** 
         * @memberof js.lang.Object
         * @function
         * @public 
         * @static
         * @summary When called it iterates over the enumerated properties that are part of the specified object.
         * @description 
         * This method is designed to enumerate looping constructs concise and less error-prone. 
         * When called it iterates over the enumerated properties that are part of the specified object. 
         * Each time the callback runs, it is passed the current loop iteration. 
         * More importantly, the callback is fired in the context of the specified scope, so the keyword this refers to it.
         * You can stop the loop from within the callback function by returning false.
         *
         * @param {js.lang.Object} obj - The object to enumerate.
         * @param {js.lang.Function} callback - the callback is fired when executing the loop.
         * @param {js.lang.Object} scope - the context of the callback execution.
         * @return {js.lang.String|js.lang.Boolean|js.lang.Number} the key index when exits the loop.
         */
        each: function(obj, callback, scope) {
          return Object.enumerate(obj, callback, scope, false);
        },

        /** 
         * @memberof js.lang.Object
         * @function
         * @public 
         * @static
         * @summary When called it iterates over the enumerated properties that are part of the specified object.
         * @description 
         * This method is designed to enumerate looping constructs concise and less error-prone. 
         * When called it iterates over the enumerated properties that are part of the specified object. 
         * Each time the callback runs, it is passed the current loop iteration. 
         * More importantly, the callback is fired in the context of the specified scope, so the keyword this refers to it.
         * You can stop the loop from within the callback function by returning false.
         *
         * @param {js.lang.Object} obj - The object to enumerate.
         * @param {js.lang.Function} callback - the callback is fired when executing the loop.
         * @param {js.lang.Object} scope - the context of the callback execution.
         * @param {js.lang.Boolean} pt - whether the specified object has a property as a direct property of that object; unlike the in operator, does not check down the object's prototype chain.
         * @return {js.lang.String|js.lang.Boolean|js.lang.Number} the key index when exits the loop.
         */
        enumerate: function(obj, callback, scope, pt) {
          if (Object.isEmpty(obj) || Object.isNumber(obj) || Object.isString(obj) || Object.isBoolean(obj)) {
            return;
          }
          if (Object.isArray(obj)) {
            for (var i = 0, len = obj.length; i < len; i++) {

              if (callback
                .call(scope || obj[i], i, obj[i],
                  obj) === false) {
                return i;
              }
            }
          } else {
            for (var p in obj) {
              if (pt || obj.hasOwnProperty(p)) {
                if (callback.call(scope || obj[p], p, obj[p],
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
    "ANNOTATION": "annotation",
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
    getDeclaredAnnotations: function() {
      return this._annotations;
    },
    getAnnotation: function(annotationClass) {
      var annotations = this.getDeclaredAnnotations(),
        annotation = null;
      if (annotations) {
        for (var i = 0, len = annotations.length; i < len; i++) {
          annotation = annotations[i];
          if (annotation.getClass() === annotationClass) {
            return annotation;
          }
        }
      }
      return null;
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
      var index2 = m.indexOf("@interface ");
      var index3 = m.indexOf("interface ");

      index = null;
      if (index1 != -1) {
        index = index1;
        feature = FEATURE.CLASS;
      } else if (index2 != -1) {
        index = index2;
        feature = FEATURE.ANNOTATION;
      } else {
        index = index3;
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
     *    属性默认为writable,enumerable,non-configurable,non-proxyable
     *    方法默认为writable,proxyable,non-enumerable,non-configurable, 如果final方法则为non-writable,non-enumerable,non-configurable,non-proxyable
     *    构造器默认为proxyable,non-writable,non-enumerable,non-configurable
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
    var ans = m.match(regx) || [],
      an = null,
      annotations = [],
      annotation = null;
    for (var i = 0, length = ans.length; i < length; i++) {
      an = ans[i];
      if (an === "@interface") {
        continue;
      }
      annotation = heap.findByName(an);
      if (annotation) {
        annotations.push(annotation);
      }
    }
    return {
      annotations: annotations,
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
          annotationBit: 2048,
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
          isAnnotation: function(modifiers) {
            return (modifiers & Modifier.annotationBit) !== 0;
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

      // var thisClass = this.getClass(),
      //   superClass = thisClass.getSuperClass();
      // var $this = isStatic ? thisClass.getClassConstructor() : this;
      // $this.$super = superClass ? (isStatic ? superClass.getClassConstructor() : superClass.getClassConstructor().prototype) : null;
      //var args = Array.prototype.slice.call(arguments,0).concat([$super,$this]);

      // before
      if (!Object.isEmpty(b) && Object.isFunction(b)) {
        b.apply(this, arguments);
      }

      var result = null;
      try {
        result = (!Object.isEmpty(f) && Object.isFunction(f)) ? f.apply(this, arguments) : f;
      } catch (e) {
        if (Object.isEmpty(t)) {
          throw e;
        } else {
          // throw
          if (Object.isFunction(t)) {
            t.apply(this, arguments);
          }
        }
      }

      // after
      if (!Object.isEmpty(a) && Object.isFunction(a)) {
        var parameter = Array.prototype.slice.call(arguments);
        parameter.unshift(result);
        a.apply(this, parameter);
      }

      return result;
    } : f;
  };

  var doAnnotations = function(self, m) {
    var annotations = m.getDeclaredAnnotations(),
      annotation = null,
      ans = [],
      results = {};
    for (var i = 0, len = annotations.length; i < len; i++) {
      annotation = annotations[i];
      if (Object.isString(annotation)) {
        annotation = heap.findByName(annotation);
        if (annotation) {
          ans.push(annotation);
        }
      }

      if (annotation && Object.isFunction(annotation.execute)) {
        results[annotation.getClass().getFullName()] = annotation.execute(self, m, Modifier, Attribute);
        /*
        if (self == m) {
          // 类上的注解
        } else if (Object.isFunction(m.getValue())) {
          // 方法上的注解
        } else {
          // 属性上的注解
          if (m.getName() && m.getName().length > 1 && m.getName().length != "_") {
            var name = m.getName().indexOf("_") === 0 ? m.getName()
              .substring(1) : m.getName();
            name = name.charAt(0).toUpperCase() + name.substring(1);

            var modifier = Modifier.publicBit + Modifier.writableBit + Modifier.proxyableBit;
            //(((m.getModifiers() & 8) != 0) ? 8 : 0) + 1;

            if (m.getDeclaredAnnotations().indexOf("@Getter") != -1) {
              var getName = "get" + name;
              if (!self.hasDeclaredField(getName)) {
                self.addMethod(new Attribute(getName, function() {
                  return this[m.getName()];
                }, self, modifier, []));
              }
            }
            if (m.getDeclaredAnnotations().indexOf("@Setter") != -1) {
              var setName = "set" + name;
              if (!self.hasDeclaredField(setName)) {
                self.addMethod(new Attribute(setName, function(value) {
                  this[m.getName()] = value;
                }, self, modifier, []));
              }
            }
          }
        }
        */
      }
    }
    if (ans.length > 0) {
      m.setAnnotations(ans);
    }
    return results;
  };

  var empty = function() {};

  var CodeHeap = function() {
    this.heap = [];
  };
  CodeHeap.prototype = {
    findByName: function(key) {
      var results = null,
        i = 0,
        len = 0,
        hp = null,
        _$class = null,
        _value = null,
        regSuffix = ")([(]*)([0-9A-z._,'\" \$]*)([)]*)";

      for (i = 0, len = this.heap.length; i < len; i++) {
        hp = this.heap[i];
        _$class = hp.key;
        _value = hp.value;
        if (_$class.isAnnotation()) {
          var fullName = new RegExp("(^@" + _value.fullName + regSuffix, 'g');
          results = fullName.exec(key);
          if (results) {
            return new _value.classConstructor(results[3]) || null;
          }
        }
      }

      for (i = 0; i < len; i++) {
        hp = this.heap[i];
        _$class = hp.key;
        _value = hp.value;
        if (_$class.isAnnotation()) {
          var alias = new RegExp("(^@" + _value.alias + regSuffix, 'g');
          var name = new RegExp("(^@" + _value.name + regSuffix, 'g');
          results = alias.exec(key) || name.exec(key);
          if (results) {
            return new _value.classConstructor(results[3]) || null;
          }
        }
      }

      return undefined;
    },
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
          classConstructor: classConstructor,
          $class: $class
        }
      });
    }
  };

  var heap = new CodeHeap();

  /** 
   * @class js.lang.Class
   * @extends {js.lang.Object}
   * @alias Class
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Instances of the class Class represent classes and interfaces in a running Java application. An enum is a kind of class and an annotation is a kind of interface. Every array also belongs to a class that is reflected as a Class object that is shared by all arrays with the same element type and number of dimensions. The primitive Java types (boolean, byte, char, short, int, long, float, and double), and the keyword void are also represented as Class objects.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Class has no public constructor. Instead Class objects are constructed automatically by the js engine as classes are loaded and by calls to the defineClass method in the class loader.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * The following example uses a Class object to print the class name of an object:
   * <code>System.out.println("The class of " + obj + " is " + obj.getClass().getName());</code>
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp; 
   * It is also possible to get the Class object for a named type (or for void) using a class literal. For example:
   * <code>System.out.println("The name of class Foo is: "+Foo.class.getName());</code>
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
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

          var _hashCode = (new Date().getTime() + Math.random()).toString(16);
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

          // 2.2初始化继承父类属性
          // TODO protected以上的属性
          var each = function(j, v, o) {
            var i = v.getName(),
              value = v.getValue(),
              modifiers = v.getModifiers(),
              annotation = null;

            if (global.org &&
              global.org.atomunion &&
              global.org.atomunion.stereotype &&
              global.org.atomunion.stereotype.Resource) {
              annotation = v.getAnnotation(org.atomunion.stereotype.Resource.$class);
            }

            value = value && !annotation ? value.clone() : value;

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
          };
          var sc = classObj.getSuperClass(),
            superClasses = [];
          while (sc) {
            superClasses.unshift(sc);
            sc = sc.getSuperClass();
          }
          Object.each(superClasses, function(j, sc, o) {
            var f = sc.getDeclaredFields();
            Object.each(f, function(t, v, a) {
              var i = v.getName();
              if (!classObj.hasDeclaredField(i)) {
                each.call(this, t, v, a);
              }
            }, this);
            // sc.getConstructor().getValue().apply(this, arguments);
          }, this);

          // 3.初始化自身定义属性
          Object.each(classObj.getDeclaredFields(), each, this);

          // 4.用户构造器,先调用父类构造器以及constructor2方法
          var constructor2 = classObj.getConstructor().getValue();
          if (constructor2) {
            var rs = doAnnotations(this, heap.get(classObj, "constructor2"));
            if (rs["org.atomunion.stereotype.Resource"]) {
              constructor2.apply(this, rs["org.atomunion.stereotype.Resource"]);
            } else {
              constructor2.apply(this, arguments);
            }
          }

          // 5.设置$super对象
          sc = classObj.getSuperClass();
          if (sc) {
            var $super = new(sc.getClassConstructor())();
            if (Object.USEECMA) {
              Object.defineProperty(this, "$super", {
                value: $super,
                writable: false,
                enumerable: false,
                configurable: false
              });
            } else {
              this.$super = $super;
            }
          }

          // 6.执行默认初始化方法
          var initial = classObj.getInitial();
          (initial = initial || this.initial || empty).apply(this,
            arguments);

          // 7.防止用户构造器修改class对象
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

    var packageName = fullName.split(".").slice(0, -1).join(".");
    if (typeof js !== 'undefined' && !Object.isNull(js) &&
      !Object.isNull(js.lang) && !Object.isNull(js.lang.Package) && js.lang.Package.loaded) {
      heap.set(this, "packages", new js.lang.Package(packageName, packages));
    }

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

      var $super = (fetch(superClassDef, function(name, value) {
          return value[name];
        })),
        superClass = $super.$class;

      heap.set(this, "superClass", superClass);

      if (Object.USEECMA) {
        Object.defineProperty(classConstructor, "$super", {
          value: $super,
          writable: false,
          enumerable: false,
          configurable: false
        });
      } else {
        classConstructor.$super = $super;
      }

      // TODO 判断父类是否final
      if (!isKernel) {
        var instanceClass = heap.get(this, "instanceClass");
        // $super === heap.get(superClass, "instance")
        instanceClass.prototype = ((superClass) ? $super : Object).prototype;

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
            var m = Object.$class.getDeclaredMethod("toString"),
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
              .getDeclaredMethod("toString").getValue();
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
            if (typeof js !== 'undefined' && !Object.isNull(js) &&
              !Object.isNull(js.lang) && !Object.isNull(js.lang.reflect) &&
              !Object.isNull(js.lang.reflect.Constructor) &&
              js.lang.reflect.Constructor.loaded) {
              m = new js.lang.reflect.Constructor(m.getName(), m.getValue(),
                this, m.getModifiers(), m.getDeclaredAnnotations());
            }

            if (name !== "Object") {
              // 将构造器代理，默认调用父类构造器
              m.setValue(proxy(m, this
                .getSuperClass().getConstructor().getValue()));
            }

            heap.set(this, "constructor2", m);

            break;

          case FEATURE.METHOD:
            // 确保toString为原生
            if (isKernel && m.getName() === "toString") {
              this.getDeclaredMethods().push(m);
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
      var cs2 = new Attribute(name, empty,
        this, Modifier.publicBit + Modifier.proxyableBit, []);
      cs2.setValue(proxy(cs2, this.getSuperClass().getConstructor().getValue()));
      heap.set(this, "constructor2", cs2);
    }

    fetch(alias, function(name, value) {
      value[name] = classConstructor;
    }, this);

    doAnnotations(this, this);

    return this;
  };

  $class.prototype = {
    /** 
     * @memberof js.lang.Class.prototype
     * @function
     * @public 
     * @summary Returns the class loader for the class.
     * @description Returns the class loader for the class. Some implementations may use null to represent the bootstrap class loader. This method will return null in such implementations if this class was loaded by the bootstrap class loader. If this object represents a primitive type or void, null is returned.
     *
     * @return {js.lang.ClassLoader} the class loader that loaded the class or interface represented by this object.
     */
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

    /** 
     * @memberof js.lang.Class.prototype
     * @function
     * @public 
     * @summary Gets the package for this class.
     * @description 
     * <p>
     * Gets the package for this class. The class loader of this class is used to find the package. If the class was loaded by the bootstrap class loader the set of packages loaded from CLASSPATH is searched to find the package of the class. Null is returned if no package object was created by the class loader of this class.
     * </p><p>
     * Packages have attributes for versions and specifications only if the information was defined in the manifests that accompany the classes, and if the class loader created the package instance with the attributes from the manifest.
     * </p>
     *
     * @return {js.lang.Package} the package of the class, or null if no package information is available from the archive or codebase.
     */
    getPackage: function() {
      return heap.get(this, "packages");
    },

    /** 
     * @memberof js.lang.Class.prototype
     * @function
     * @public 
     * @summary Returns a Field object that reflects the specified declared field of the class or interface represented by this Class object.
     * @description Returns a Field object that reflects the specified declared field of the class or interface represented by this Class object. The name parameter is a String that specifies the simple name of the desired field. If this Class object represents an array type, then this method does not find the length field of the array type.
     *
     * @param {js.lang.String} name - the name of the field
     * @return {js.lang.reflect.Field} the Field object for the specified field in this class
     */
    getDeclaredField: function(name) {
      var v = heap.get(this, "fields", name);
      if (Object.isDefined(v)) {
        return v;
      }
      throw new js.lang.NoSuchFieldException();
    },

    /** 
     * @memberof js.lang.Class.prototype
     * @function
     * @public 
     * @summary Returns an array of Field objects reflecting all the fields declared by the class or interface represented by this Class object.
     * @description 
     * <p>
     * Returns an array of Field objects reflecting all the fields declared by the class or interface represented by this Class object. This includes public, protected, default (package) access, and private fields, but excludes inherited fields.
     * </p><p>
     * If this Class object represents a class or interface with no declared fields, then this method returns an array of length 0.
     * </p><p>
     * If this Class object represents an array type, a primitive type, or void, then this method returns an array of length 0.
     * </p><p>
     * The elements in the returned array are not sorted and are not in any particular order.
     * </p>
     *
     * @return {js.lang.Array} the array of Field objects representing all the declared fields of this class
     */
    getDeclaredFields: function() {
      return heap.get(this, "fields");
    },

    /** 
     * @memberof js.lang.Class.prototype
     * @function
     * @public 
     * @summary Wither this class has the field with the specified name or not.
     * @description 
     *
     * @param {js.lang.String} name - the name of the field 
     * @return {js.lang.Boolean} true if this class has the field with the specified name.
     */
    hasDeclaredField: function(name) {
      var field = heap.get(this, "fields", name);
      return Object.isDefined(field);
    },

    /** 
     * @memberof js.lang.Class.prototype
     * @function
     * @public 
     * @summary Wither this class has the public field with the specified name or not.
     * @description 
     *
     * @param {js.lang.String} name - the name of the field 
     * @return {js.lang.Boolean} true if this class has the field with the specified name.
     */
    hasField: function(name) {
      var field = heap.get(this, "fields", name);
      return Object.isDefined(field) && Modifier.isPublic(field.getModifiers());
    },

    /** 
     * @memberof js.lang.Class.prototype
     * @function
     * @public 
     * @summary Returns a Field object that reflects the specified public member field of the class or interface represented by this Class object.
     * @description 
     *
     * @param {js.lang.String} name - the field name
     * @return {js.lang.reflect.Field} the Field object of this class specified by name
     */
    getField: function(name) {
      var v = heap.get(this, "fields", name);
      if (Object.isDefined(v) && Modifier.isPublic(v.getModifiers())) {
        return v;
      }
      throw new js.lang.NoSuchFieldException();
    },

    /** 
     * @memberof js.lang.Class.prototype
     * @function
     * @public 
     * @summary Returns an array containing Field objects reflecting all the accessible public fields of the class or interface represented by this Class object.
     * @description 
     *
     * @return {js.lang.Array} the array of Field objects representing the public fields
     */
    getFields: function() {
      var result = [];

      var fields = heap.get(this, "fields");
      for (var i = 0, len = fields.length; i < len; i++) {
        var field = fields[i];
        if (Modifier.isPublic(field.getModifiers())) {
          result.push(field);
        }
      }

      return result;
    },

    /** 
     * @memberof js.lang.Class.prototype
     * @function
     * @public 
     * @summary 
     * @description Returns a Method object that reflects the specified declared method of the class or interface represented by this Class object. The name parameter is a String that specifies the simple name of the desired method, and the parameterTypes parameter is an array of Class objects that identify the method's formal parameter types, in declared order. If more than one method with the same parameter types is declared in a class, and one of these methods has a return type that is more specific than any of the others, that method is returned; otherwise one of the methods is chosen arbitrarily. If the name is "<init>"or "<clinit>" a NoSuchMethodException is raised. If this Class object represents an array type, then this method does not find the clone() method.
     *
     * @param {js.lang.String} name - the name of the method
     * @return {js.lang.reflect.Method} the Method object for the method of this class matching the specified name and parameters
     */
    getDeclaredMethod: function(name) {
      if (!name || !Object.isString(name)) {
        throw new js.lang.IllegalArgumentException();
      }
      var v = heap.get(this, "methods", name);
      if (Object.isDefined(v)) {
        return v;
      }
      throw new js.lang.NoSuchMethodException();
    },

    /** 
     * @memberof js.lang.Class.prototype
     * @function
     * @public 
     * @summary Returns a Method object that reflects the specified public member method of the class/super-classes or interface/super-interfaces represented by this Class object.
     * @description 
     *
     * @param {js.lang.String} name - the name of the method
     * @return {js.lang.reflect.Method} the Method object that matches the specified name and parameterTypes
     */
    getHeldMethod: function(name) {
      if (!name || !Object.isString(name)) {
        throw new js.lang.IllegalArgumentException();
      }
      if (name !== 'clone') {
        var cls = this,
          hasSuper = true;

        while (cls && cls != Object.$class) {
          try {
            return cls.getMethod(name);
          } catch (e) {
            cls = cls.getSuperClass();
          }
        }
      }

      throw new js.lang.NoSuchMethodException();
    },

    /** 
     * @memberof js.lang.Class.prototype
     * @function
     * @public 
     * @summary 
     * @description Returns a Method object that reflects the specified declared method of the class/super-classes or interface/super-interfaces represented by this Class object. The name parameter is a String that specifies the simple name of the desired method, and the parameterTypes parameter is an array of Class objects that identify the method's formal parameter types, in declared order. If more than one method with the same parameter types is declared in a class, and one of these methods has a return type that is more specific than any of the others, that method is returned; otherwise one of the methods is chosen arbitrarily. If the name is "<init>"or "<clinit>" a NoSuchMethodException is raised. If this Class object represents an array type, then this method does not find the clone() method.
     *
     * @param {js.lang.String} name - the name of the method
     * @return {js.lang.reflect.Method} the Method object for the method of this class matching the specified name and parameters
     */
    getHeldDeclaredMethod: function(name) {
      if (!name || !Object.isString(name)) {
        throw new js.lang.IllegalArgumentException();
      }
      if (name !== 'clone') {
        var cls = this,
          hasSuper = true;

        while (cls && cls != Object.$class) {
          try {
            return cls.getDeclaredMethod(name);
          } catch (e) {
            cls = cls.getSuperClass();
          }
        }
      }

      throw new js.lang.NoSuchMethodException();
    },

    /** 
     * @memberof js.lang.Class.prototype
     * @function
     * @public 
     * @summary Returns an array containing Method objects reflecting all the declared methods of the class or interface represented by this Class object, including public, protected, default (package) access, and private methods, but excluding inherited methods.
     * @description 
     *
     * @return {js.lang.Array} the array of Method objects representing all the declared methods of this class
     */
    getDeclaredMethods: function() {
      return heap.get(this, "methods");
    },

    /** 
     * @memberof js.lang.Class.prototype
     * @function
     * @public 
     * @summary Returns an array containing Method objects reflecting all the declared methods of the class/super-classes or interface/super-interfaces represented by this Class object, including public, protected, default (package) access, and private methods, but excluding inherited methods.
     * @description 
     *
     * @return {js.lang.Array} the array of Method objects representing all the declared methods of this class
     */
    getHeldDeclaredMethods: function() {
      var cls = this,
        methods = [],
        ms = null,
        m1 = null,
        m2 = null,
        flag = false;

      while (cls && cls != Object.$class) {
        ms = cls.getDeclaredMethods();
        for (var i = 0, len1 = ms.length; i < len1; i++) {
          m1 = ms[i];
          flag = false;
          for (var j = 0, len2 = methods.length; j < len2; j++) {
            m2 = methods[j];

            if (m1.getName() === m2.getName()) {
              flag = true;
              break;
            }
          }
          if (!flag) {
            methods.unshift(m1);
          }
        }
        cls = cls.getSuperClass();
      }
      return methods;
    },

    /** 
     * @memberof js.lang.Class.prototype
     * @function
     * @public 
     * @summary Returns an array containing Method objects reflecting all the public methods of the class or interface represented by this Class object, including those declared by the class/super-classes or interface/super-interfaces and those inherited from superclasses and superinterfaces.
     * @description 
     *
     * @return {js.lang.Array} the array of Method objects representing the public methods of this class
     */
    getHeldMethods: function() {
      var cls = this,
        methods = [],
        ms = null,
        m1 = null,
        m2 = null,
        flag = false;

      while (cls && cls != Object.$class) {
        ms = cls.getMethods();
        for (var i = 0, len1 = ms.length; i < len1; i++) {
          m1 = ms[i];
          flag = false;
          for (var j = 0, len2 = methods.length; j < len2; j++) {
            m2 = methods[j];

            if (m1.getName() === m2.getName()) {
              flag = true;
              break;
            }
          }
          if (!flag) {
            methods.unshift(m1);
          }
        }
        cls = cls.getSuperClass();
      }
      return methods;
    },

    /** 
     * @memberof js.lang.Class.prototype
     * @function
     * @public 
     * @summary Wither this class has the method with the specified name or not.
     * @description 
     *
     * @param {js.lang.String} name - the name of the method 
     * @return {js.lang.Boolean} true if this class has the method with the specified name.
     */
    hasDeclaredMethod: function(name) {
      var method = heap.get(this, "methods", name);
      return Object.isDefined(method);
    },

    /** 
     * @memberof js.lang.Class.prototype
     * @function
     * @public 
     * @summary Wither this class has the public method with the specified name or not.
     * @description 
     *
     * @param {js.lang.String} name - the name of the method 
     * @return {js.lang.Boolean} true if this class has the method with the specified name.
     */
    hasMethod: function(name) {
      var method = heap.get(this, "methods", name);
      return Object.isDefined(method) && Modifier.isPublic(method.getModifiers());
    },

    /** 
     * @memberof js.lang.Class.prototype
     * @function
     * @public 
     * @summary Returns a Method object that reflects the specified public member method of the class or interface represented by this Class object.
     * @description 
     *
     * @param {js.lang.String} name - the name of the method
     * @return {js.lang.reflect.Method} the Method object that matches the specified name and parameterTypes
     */
    getMethod: function(name) {
      if (name !== 'clone') {
        var v = heap.get(this, "methods", name);
        if (Object.isDefined(v) && Modifier.isPublic(v.getModifiers())) {
          return v;
        }
      }
      throw new js.lang.NoSuchMethodException();
    },

    /** 
     * @memberof js.lang.Class.prototype
     * @function
     * @public 
     * @summary Returns an array containing Method objects reflecting all the public methods of the class or interface represented by this Class object, including those declared by the class or interface and those inherited from superclasses and superinterfaces.
     * @description 
     *
     * @return {js.lang.Array} the array of Method objects representing the public methods of this class
     */
    getMethods: function() {
      var result = [];

      var methods = heap.get(this, "methods");
      for (var i = 0, len = methods.length; i < len; i++) {
        var method = methods[i];
        if (Modifier.isPublic(method.getModifiers())) {
          result.push(method);
        }
      }

      return result;
    },

    /** 
     * @memberof js.lang.Class.prototype
     * @function
     * @public 
     * @summary Returns the name of the entity (class, interface, array class, primitive type, or void) represented by this Class object, as a String.
     * @description 
     *
     * @return {js.lang.String} the name of the class or interface represented by this object.
     */
    getName: function() {
      return heap.get(this, "name");
    },

    /** 
     * @memberof js.lang.Class.prototype
     * @function
     * @public 
     * @summary Returns the alias name of the entity (class, interface, array class, primitive type, or void) represented by this Class object, as a String. 
     * @description 
     *
     * @return {js.lang.String} the alias name of the class or interface represented by this object.
     */
    getAlias: function() {
      return heap.get(this, "alias");
    },

    /** 
     * @memberof js.lang.Class.prototype
     * @function
     * @public 
     * @summaryReturns the full name of the entity (class, interface, array class, primitive type, or void) represented by this Class object, as a String. 
     * @description 
     *
     * @return {js.lang.String} the full name of the class or interface represented by this object.
     */
    getFullName: function() {
      return heap.get(this, "fullName");
    },

    /** 
     * @memberof js.lang.Class.prototype
     * @function
     * @public 
     * @summary Returns the Class representing the superclass of the entity (class, interface, primitive type or void) represented by this Class.
     * @description Returns the Class representing the superclass of the entity (class, interface, primitive type or void) represented by this Class. If this Class represents either the Object class, an interface, a primitive type, or void, then null is returned. If this object represents an array class then the Class object representing the Object class is returned.
     *
     * @return {js.lang.Class} the superclass of the class represented by this object.
     */
    getSuperClass: function() {
      return heap.get(this, "superClass");
    },

    /** 
     * @memberof js.lang.Class.prototype
     * @function
     * @public 
     * @summary Returns the modifiers for this class or interface, encoded in an number.
     * @description 
     *
     * @return {js.lang.Number} the number representing the modifiers for this class
     */
    getModifiers: function() {
      return heap.get(this, "modifiers");
    },

    /** 
     * @memberof js.lang.Class.prototype
     * @function
     * @public 
     * @summary Returns annotations that are present on this element.
     * @description 
     *
     * @return {js.lang.Array} annotations present on this element
     */
    getAnnotations: function() {
      return this.getDeclaredAnnotations();
    },

    /** 
     * @memberof js.lang.Class.prototype
     * @function
     * @public 
     * @summary Returns annotations that are directly present on this element.
     * @description Returns annotations that are directly present on this element. This method ignores inherited annotations. If there are no annotations directly present on this element, the return value is an array of length 0. The caller of this method is free to modify the returned array; it will have no effect on the arrays returned to other callers.
     *
     * @return {js.lang.Array} annotations directly present on this element
     */
    getDeclaredAnnotations: function() {
      return heap.get(this, "annotations");
    },

    /** 
     * @memberof js.lang.Class.prototype
     * @function
     * @public 
     * @summary Adding the specified method for this class dynamicly.
     * @description Adding the specified method for this class dynamicly.
     *
     * @param {js.lang.reflect.Method} m - the specified method
     */
    addMethod: function(m) {
      if (!Object.isEmpty(m) && Object.isFunction(m.getValue())) {
        if (m.getDeclaredAnnotations() && m.getDeclaredAnnotations().length > 0) {
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

        if (typeof js !== 'undefined' && !Object.isNull(js) &&
          !Object.isNull(js.lang) && !Object.isNull(js.lang.reflect) &&
          !Object.isNull(js.lang.reflect.Method) && js.lang.reflect.Method.loaded &&
          !Object.isNull(js.lang.reflect.Field) && js.lang.reflect.Field.loaded
        ) {
          m = new js.lang.reflect.Method(n, m.getValue(),
            this, m.getModifiers(), m.getDeclaredAnnotations());
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
        this.getDeclaredMethods().push(m);

        if (n === "initial") {
          heap.set(this, "initial", m.getValue());
        }
      }
    },

    /** 
     * @memberof js.lang.Class.prototype
     * @function
     * @public 
     * @summary Adding the specified field for this class dynamicly.
     * @description Adding the specified field for this class dynamicly.
     *
     * @param {js.lang.reflect.Field} f - the specified field
     */
    addField: function(f) {
      if (!Object.isEmpty(f) && !Object.isFunction(f.getValue())) {
        if (f.getDeclaredAnnotations() && f.getDeclaredAnnotations().length > 0) {
          doAnnotations(this, f);
        }
        f.setDeclaringClass(this);
        if (typeof js !== 'undefined' && !Object.isNull(js) &&
          !Object.isNull(js.lang) && !Object.isNull(js.lang.reflect) &&
          !Object.isNull(js.lang.reflect.Field) && js.lang.reflect.Field.loaded &&
          !Object.isNull(js.lang.reflect.Method) && js.lang.reflect.Method.loaded) {
          f = new js.lang.reflect.Field(f.getName(), f
            .getValue(), this, f.getModifiers(), f
            .getDeclaredAnnotations());
        }
        var modifiers = f.getModifiers(),
          isStatic = Modifier.isStatic(modifiers);
        if (isStatic) {
          if (Object.USEECMA) {
            Object.defineProperty(this.getClassConstructor(), f
              .getName(), {
                value: f.getValue(),

                writable: Modifier.isWritable(modifiers),
                enumerable: Modifier.isEnumerable(modifiers),
                configurable: Modifier.isConfigurable(modifiers)
              });
          } else {
            this.getClassConstructor()[f.getName()] = f.getValue();
          }
        }
        this.getDeclaredFields().push(f);
      }
    },

    getInstance: function() {
      return heap.get(this, "instance");
    },

    isInstance: function(obj) {
      return Object.isNull(obj) ? false : obj.getClass() == this;
    },

    /** 
     * @memberof js.lang.Class.prototype
     * @function
     * @public 
     * @summary Creates a new instance of the class represented by this Class object.
     * @description 
     *
     * @return {js.lang.Object} a newly allocated instance of the class represented by this object.
     */
    newInstance: function() {
      var cc = heap.get(this, "classConstructor"),
        instance = new cc();

      if (arguments.length > 0) {
        instance.apply(instance, arguments);
      }

      return instance;
    },

    /** 
     * @memberof js.lang.Class.prototype
     * @function
     * @public 
     * @summary return itself
     * @description 
     *
     * @return {js.lang.Class} itself
     */
    clone: function() {
      return this;
    },

    /** 
     * @memberof js.lang.Class.prototype
     * @function
     * @public 
     * @summary Determines if the class or interface represented by this Class object is either the same as, or is a superclass or superinterface of, the class or interface represented by the specified Class parameter.
     * @description 
     *
     * @param {js.lang.Class} cls - the Class object to be checked
     * @return {js.lang.Boolean} the boolean value indicating whether objects of the type cls can be assigned to objects of this class
     */
    isAssignableFrom: function(cls) {
      var cls2 = this;
      while (cls && cls2 && cls !== cls2) {
        cls2 = cls2.getSuperClass();
      }
      return cls !== cls2;
    },

    /** 
     * @memberof js.lang.Class.prototype
     * @function
     * @public 
     * @summary Determines if the specified Class object represents an interface type.
     * @description 
     *
     * @return {js.lang.Boolean} true if this object represents an interface; false otherwise.
     */
    isInterface: function() {
      return heap.get(this, "feature") === FEATURE.INTERFACE;
    },

    /** 
     * @memberof js.lang.Class.prototype
     * @function
     * @public 
     * @summary Determines if this Class object represents an array class.
     * @description 
     *
     * @return {js.lang.Boolean} true if this object represents an array class; false otherwise.
     */
    isArray: function() {
      return this === js.lang.Array.$class;
    },

    /** 
     * @memberof js.lang.Class.prototype
     * @function
     * @public 
     * @summary Determines if the specified Class object represents a primitive type.
     * @description 
     *
     * @return {js.lang.Boolean} true if and only if this class represents a primitive type
     */
    isPrimitive: function() {
      // TODO
      return false;
    },

    /** 
     * @memberof js.lang.Class.prototype
     * @function
     * @public 
     * @summary Returns true if this Class object represents an annotation type. Note that if this method returns true, isInterface() would also return true, as all annotation types are also interfaces.
     * @description 
     *
     * @return {js.lang.Boolean} true if this class object represents an annotation type; false otherwise
     */
    isAnnotation: function() {
      return heap.get(this, "feature") === FEATURE.ANNOTATION;
    }
  };

  global.Class = $class;

  /** 
   * @name js.lang.Class.forName
   * @function
   * @public 
   * @static 
   * @summary Returns the Class object associated with the class or interface with the given class definition.
   * @description 
   * 
   * @param {js.lang.Object} cls - class definition
   * @param {js.lang.ClassLoader} class loader
   * @return {js.lang.Class} the Class object for the class with the specified name.
   */
  global.Class.forName = function(cls, classloader) {
    return new $class(cls, classloader);
  };

  if (Object.isNull(global.js)) {
    global.js = {};
  }
  if (Object.isNull(global.js.lang)) {
    global.js.lang = {};
  }
  if (Object.isNull(global.js.lang.Class)) {
    global.js.lang.Class = Class;
  }

})(this);

// TODO
// Function,Array,String,Boolean,Number,Date,RegExp,Error,EvalError,RangeError,ReferenceError,SyntaxError,TypeError,URIError对象的$class属性