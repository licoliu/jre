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
    var copyObject = function(d, s, pros) {
      if (d == s) {
        return;
      }

      var writable = !!pros.writable,
        enumerable = !!pros.enumerable,
        configurable = !!pros.configurable;

      for (var i in s) {
        if (s.hasOwnProperty(i) &&
          (!pros.includes || pros.includes.test(i)) &&
          (!pros.excludes || !pros.excludes.test(i))) {

          var value = s[i];

          if (typeof value === 'undefined' || value === null ||
            typeof value === 'number' || typeof value === 'string' || typeof value === 'boolean' ||
            value instanceof Number || value instanceof String || value instanceof Boolean ||
            typeof value === 'function' || value instanceof Function ||
            value instanceof RegExp ||
            value instanceof Date ||
            value instanceof Error ||
            value instanceof EvalError || value instanceof RangeError || value instanceof ReferenceError || value instanceof SyntaxError || value instanceof TypeError || value instanceof URIError) {

            if (USEECMA && typeof d[i] === "undefined") {
              Object.defineProperty(d, i, {
                value: value,
                writable: writable,
                enumerable: enumerable,
                configurable: configurable
              });
            } else {
              d[i] = value;
            }
          } else {
            extend(d, s, i, i, pros);
          }
        }
      }
    };

    var copy = function(d, s, k, m, pros) {

      var dd = d,
        ss = s;

      if (d.hasOwnProperty(k)) {
        dd = d[k];
      } else if (k || k === 0) {
        dd = null;
      }

      if (s.hasOwnProperty(m)) {
        ss = s[m];
      } else if (m || m === 0) {
        ss = null;
      }

      if (!dd) {
        d[k] = ss;
        dd = ss;
      }

      if (Object.prototype.toString.apply(ss) !== "[object Array]") {
        if (dd == ss) {
          return;
        } else {
          if (pros.comparator) {
            var comparatorResult = false;

            if (pros.comparator == true && typeof dd.equals === 'function') {
              comparatorResult = dd.equals(ss);
            } else if (typeof pros.comparator === 'function') {
              comparatorResult = pros.comparator.call(dd, dd, ss)
            }

            if (comparatorResult) {
              copyObject(dd, ss, pros);
            } else {
              if (k || k === 0) {
                d[k] = ss;
              } else {
                d = ss;
                if (global.js && global.js.lang && global.js.lang.IllegalStateException) {
                  throw new js.lang.IllegalStateException("errors occour when extend objects with a comparator.");
                } else {
                  throw Error("errors occour when extend objects with a comparator.");
                }
              }
            }
          } else {
            copyObject(dd, ss, pros);
          }
        }
      } else {
        if (Object.prototype.toString.apply(dd) !== "[object Array]") {
          if (global.js && global.js.lang && global.js.lang.IllegalStateException) {
            throw new js.lang.IllegalStateException("errors occour because of extend a different data structor from another.");
          } else {
            throw Error("errors occour because of extend a different data structor from another.");
          }
        }

        for (var j in ss) {
          if (ss.hasOwnProperty(j) &&
            (!pros.includes || pros.includes.test(j)) &&
            (!pros.excludes || !pros.excludes.test(j))) {
            if (!dd[j]) {
              dd[j] = ss[j];
            } else if (typeof ss[j] === 'undefined' || ss[j] === null || typeof ss[j] === "number" || typeof ss[j] === "string" || typeof ss[j] === "boolean") {
              dd[j] = ss[j];
            } else {
              copy(dd, ss, j, j, pros);
            }
          }
        }

        if (dd.length > ss.length) {
          dd.splice(ss.length, dd.length - ss.length);
        }
      }
    };

    return function(d, s, k, m, pros) {
      if (typeof d === 'undefined' || d === null || typeof d === "number" || typeof d === "string" || typeof d === "boolean" ||
        typeof s === 'undefined' || s === null || typeof s === "number" || typeof s === "string" || typeof s === "boolean" ||
        d == s || (typeof d.equals === 'function' && d.equals(s))) {
        return d;
      }

      pros = pros || {
        writable: true,
        enumerable: true,
        configurable: true,
        comparator: false
      };

      copy(d, s, k, m, pros);

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
          return (typeof v === "number" && isFinite(v)) || v instanceof Number;
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
          return typeof v === "string" || v instanceof String;
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
          return typeof v === "boolean" || v instanceof Boolean;
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
      ans = [];
    for (var i = 0, len = annotations.length; i < len; i++) {
      annotation = annotations[i];
      if (Object.isString(annotation)) {
        annotation = heap.findByName(annotation);
        if (annotation) {
          ans.push(annotation);
        }
      }

      if (annotation && Object.isFunction(annotation.execute)) {
        annotation.execute(self, m, Modifier, Attribute);
      }
    }
    if (ans.length > 0) {
      m.setAnnotations(ans);
    }
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

  var defineProperty = function(j, v, o) {
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
          var sc = classObj.getSuperClass(),
            superClasses = [];
          while (sc) {
            superClasses.unshift(sc);
            sc = sc.getSuperClass();
          }
          Object.each(superClasses, function(j, sc, o) {
            var f = sc.getDeclaredFields();
            Object.each(f, function(t, v, a) {
              var i = v.getName(),
                _modifiers = v.getModifiers();
              if (!classObj.hasDeclaredField(i)) {
                // protected以上的属性，非静态属性
                if (!Modifier.isStatic(_modifiers) /* && !Modifier.isPrivate(_modifiers) */ ) {
                  defineProperty.call(this, t, v, a);
                }
              }
            }, this);
            // sc.getConstructor().getValue().apply(this, arguments);
          }, this);

          // 3.初始化自身定义属性
          Object.each(classObj.getDeclaredFields(), defineProperty, this);

          // 4.用户构造器,先调用父类构造器以及constructor2方法
          var constructor2 = classObj.getConstructor().getValue();
          if (constructor2) {
            constructor2.apply(this, arguments);
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

      var sc = superClass,
        superClasses = [];
      while (sc) {
        superClasses.unshift(sc);
        sc = sc.getSuperClass();
      }
      Object.each(superClasses, function(j, sc, o) {
        Object.each(sc.getDeclaredFields(), function(t, v, a) {
          var i = v.getName(),
            _modifiers = v.getModifiers();
          if (!classObj.hasDeclaredField(i)) {
            // protected以上的属性，静态属性
            if (Modifier.isStatic(_modifiers) && !Modifier.isPrivate(_modifiers)) {
              defineProperty.call(classConstructor, t, v, a);
            }
          }
        }, this);

        Object.each(sc.getDeclaredMethods(), function(t, v, a) {
          var i = v.getName(),
            _modifiers = v.getModifiers();
          if (!classObj.hasDeclaredMethod(i)) {
            // protected以上的方法，静态属性
            if (Modifier.isStatic(_modifiers) && !Modifier.isPrivate(_modifiers)) {
              defineProperty.call(classConstructor, t, v, a);
            }
          }
        }, this);
      }, this);

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
        parameters = arguments;

      Array.prototype.splice.call(parameters, 0, 0, null);
      return new(Function.prototype.bind.apply(cc, parameters));
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
  /**
   * @class js.lang.Object
   * @alias Object
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Class Object is the root of the class hierarchy. Every class has Object as a superclass. All objects, including arrays, implement the methods of this class.
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
  var $class = global.Class.forName( /** @lends js.lang.Object.prototype */ {

    name: "class Object",

    alias: "js.lang.Object",

    Object: function() {},

    /** 
     * @name js.lang.Object.prototype.getClass
     * @function
     * @public 
     * @summary Returns the runtime class of this Object.
     * @description 
     *
     * @return {js.lang.Class} The Class object that represents the runtime class of this object.
     */
    "non-writable non-enumerable non-configurable non-proxyable getClass": function() {
      if (this.$class) {
        return this.$class;
      } else {
        if (Object.isArray(this)) {
          return global.js.lang.Array.$class;
        } else if (Object.isDate(this)) {
          return global.js.lang.Date.$class;
        } else if (Object.isFunction(this)) {
          return global.js.lang.Function.$class;
        } else if (Object.isNumber(this)) {
          return global.js.lang.Number.$class;
        } else if (Object.isString(this)) {
          return global.js.lang.String.$class;
        } else if (Object.isBoolean(this)) {
          return global.js.lang.Boolean.$class;
        } else if (this instanceof RegExp) {
          return global.js.lang.RegExp.$class;
        } else if (this instanceof Error) {
          return global.js.lang.Error.$class;
        } else if (this instanceof EvalError) {
          return global.js.lang.EvalError.$class;
        } else if (this instanceof RangeError) {
          return global.js.lang.RangeError.$class;
        } else if (this instanceof ReferenceError) {
          return global.js.lang.ReferenceError.$class;
        } else if (this instanceof SyntaxError) {
          return global.js.lang.SyntaxError.$class;
        } else if (this instanceof TypeError) {
          return global.js.lang.TypeError.$class;
        } else if (this instanceof URIError) {
          return global.js.lang.URIError.$class;
        }
      }
      return Object.$class;
    },

    /** 
     * @name js.lang.Object.prototype.getVersion
     * @function
     * @public 
     * @summary Returns the version of this object.
     * @description 
     *
     * @return {js.lang.String} The version of this object.
     */
    "non-writable non-enumerable non-configurable non-proxyable getVersion": (function() {
      /** 主版本号 . 子版本号 [ 修正版本号 [. 编译版本号 ]] */
      var version = "0.1.1.0001";
      return function() {
        return this.version || version;
      };
    })(),

    /** 
     * @function
     * @public 
     * @summary Indicates whether some other object is "equal to" this one.
     * @description 
     * <p>
     * Indicates whether some other object is "equal to" this one.
     * </p><p>
     * The equals method implements an equivalence relation on non-null object references:
     * </p><ul>
     * <li>It is reflexive: for any non-null reference value x, x.equals(x) should return true.</li>
     * <li>It is symmetric: for any non-null reference values x and y, x.equals(y) should return true if and only if y.equals(x) returns true.</li>
     * <li>It is transitive: for any non-null reference values x, y, and z, if x.equals(y) returns true and y.equals(z) returns true, then x.equals(z) should return true.</li>
     * <li>It is consistent: for any non-null reference values x and y, multiple invocations of x.equals(y) consistently return true or consistently return false, provided no information used in equals comparisons on the objects is modified.</li>
     * <li>For any non-null reference value x, x.equals(null) should return false.</li>
     * </ul><p>
     * The equals method for class Object implements the most discriminating possible equivalence relation on objects; that is, for any non-null reference values x and y, this method returns true if and only if x and y refer to the same object (x == y has the value true).
     * </p><p>
     * Note that it is generally necessary to override the hashCode method whenever this method is overridden, so as to maintain the general contract for the hashCode method, which states that equal objects must have equal hash codes.
     * </p>
     *
     * @param {js.lang.Object} obj - the reference object with which to compare.
     * @return {js.lang.Boolean} true if this object is the same as the obj argument; false otherwise.
     */
    "equals": function(obj) {
      return obj === this;
    },

    /** 
     * @function
     * @public 
     * @summary Returns a hash code value for the object.
     * @description 
     *
     * @return {js.lang.String} a hash code value for this object.
     */
    "hashCode": function() {
      if (!this._hashCode) {
        this._hashCode = (currentTimeMillis() + Math.random()).toString(16);
      }
      return this._hashCode;
    },

    /** 
     * @function
     * @public 
     * @summary Returns a string representation of the object.
     * @description 
     * <p>
     * Returns a string representation of the object. In general, the toString method returns a string that "textually represents" this object. The result should be a concise but informative representation that is easy for a person to read. It is recommended that all subclasses override this method.
     * </p><p>
     * The toString method for class Object returns a string consisting of the name of the class of which the object is an instance, the at-sign character `@', and the unsigned hexadecimal representation of the hash code of the object. In other words, this method returns a string equal to the value of:
     * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
     * getClass().getName() + '@' + Integer.toHexString(hashCode())
     * </p>
     *
     * @return {js.lang.String} a string representation of the object.
     */
    "toString": function() {
      // TODO String,Number,Boolean,Array等的toString()方法
      return this.getClass().getFullName() + "<" + this.hashCode() + ">";
    },

    /** 
     * @function
     * @public 
     * @summary Creates and returns a copy of this object.
     * @description 
     *
     * @return {js.lang.Object} a clone of this instance.
     */
    "clone": function() {
      var b = null;
      if (this instanceof Number || this instanceof String || this instanceof Boolean) {
        return this.valueOf();
      } else if (this instanceof Function || this instanceof RegExp || this instanceof Error || this instanceof EvalError || this instanceof RangeError || this instanceof ReferenceError || this instanceof SyntaxError || this instanceof TypeError || this instanceof URIError) {
        return this;
      } else if (this instanceof Date) {
        b = new Date(0);
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
            b[a] = (currentTimeMillis() + Math.random()).toString(16);
            continue;
          }
          if (this.hasOwnProperty(a)) {
            b[a] = this[a] ? this[a].clone() : this[a];
          }
        }
        return b;
      }
    },

    /** 
     * @function
     * @public 
     * @summary 
     * @description 
     *
     * @return {js.lang.String} a json representation of the object
     */
    "toJson": (function() {
      var NATIVE_JSON_STRINGIFY_SUPPORT = typeof JSON !== 'undefined' && JSON && typeof JSON.stringify === "function" && JSON.stringify(0) === "0" && typeof JSON.stringify(function() {}) === "undefined";
      return function() {
        if (NATIVE_JSON_STRINGIFY_SUPPORT) {
          // TODO 只取public属性
          return JSON.stringify(this);
        }
        return this;
      };
    })(),

    /** 
     * @function
     * @public 
     * @summary 
     * @description 
     *
     * @return {js.lang.String} a query string representation of the object
     */
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
 * Date: Feb 10, 2016
 */

/** 
 * @abstract
 * @class js.lang.Package 
 * @extends {js.lang.Object}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Within each ClassLoader instance all classes from the same js package have the same Package object. The static methods allow a package to be found by name or the set of all packages known to the current class loader to be found.
 * </p><br/>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
(function(global) {
  Class.forName( /** @lends js.lang.Package.prototype */ {
    name: "public final class js.lang.Package extends Object",
    "private _name": null,
    "private _value": null,

    Package: function(name, value) {
      this._name = name;
      this._value = value;
    },

    /** 
     * @function
     * @public 
     * @summary Return the name of this package.
     * @description Return the name of this package.
     *
     * @return {js.lang.String} 
     */
    getName: function() {
      return this._name;
    },

    /** 
     * @function
     * @public 
     * @summary get the package in the callers ClassLoader instance.
     * @description get the package in the callers ClassLoader instance.
     *
     * @return {js.lang.Object} 
     */
    getValue: function() {
      return this._value;
    },

    /** 
     * @name js.lang.Package.getPackage
     * @function
     * @public 
     * @static
     * @summary Find a package by name in the callers ClassLoader instance.
     * @description Find a package by name in the callers ClassLoader instance.
     *
     * @return {js.lang.Object} 
     */
    "static getPackage": function(name) {
      if (!Object.isString(name)) {
        return null;
      }

      var emp = name.split("."),
        length = emp.length,
        temp = global;

      for (var j = 0; j < length - 1; j++) {
        if (!emp[j] || !temp[emp[j]]) {
          return null;
        }
        temp = temp[emp[j]];
      }

      return temp;
    }
  });
  js.lang.Package.loaded = true;
})(this);
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 10, 2014
 */

/**
 * @class js.lang.Array
 * @extends {js.lang.Object}
 * @alias Array
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The JavaScript Array object is a global object that is used in the construction of arrays; which are high-level, list-like objects.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Arrays are list-like objects whose prototype has methods to perform traversal and mutation operations. Neither the length of a JavaScript array nor the types of its elements are fixed. Since an array's length can change at any time, and data can be stored at non-contiguous locations in the array, JavaScript arrays are not guaranteed to be dense; this depends on how the programmer chooses to use them. In general, these are convenient characteristics; but if these features are not desirable for your particular use, you might consider using typed arrays.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Some people think that you shouldn't use an array as an associative array. In any case, you can use plain objects instead, although doing so comes with its own caveats. See the post Lightweight JavaScript dictionaries with arbitrary keys as an example.
 *</p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.Array.prototype */ {
  name: "class Array",

  alias: "js.lang.Array",

  Array: function() {},

  /** 
   * @function
   * @public 
   * @summary Removes all of the elements from this array (optional operation).
   * @description Removes all of the elements from this array (optional operation). The array will be empty after this call returns.
   */
  clear: function() {
    this.splice(0, this.length);
  },

  /** 
   * @function
   * @public 
   * @summary Returns true if this array contains the specified element.
   * @description Returns true if this array contains the specified element. More formally, returns true if and only if this array contains at least one element e such that (o==null ? e==null : o.equals(e)).
   * 
   * @param {js.lang.Object} elem - element whose presence in this array is to be tested
   * @return {js.lang.Boolean} 
   */
  contains: function(elem) {
    return (this.indexOf2(elem) !== -1);
  },

  /** 
   * @function
   * @public 
   * @summary Returns the first (least) index of an element within the array equal to the specified value, or -1 if none is found.
   * @description indexOf() compares searchElement to elements of the Array using strict equality (the same method used by the === or triple-equals operator).
   *
   * @param {js.lang.Object} elem - Element to locate in the array.
   * @return {js.lang.Number} 
   */
  indexOf: Array.prototype.indexOf ? Array.prototype.indexOf : function(elem, start, end) {
    return this.indexOf2(elem, start, end);
  },

  /** 
   * @function
   * @public 
   * @summary Returns the index of the first occurrence of the specified element in this array, or -1 if this array does not contain the element.
   * @description Returns the index of the first occurrence of the specified element in this array, or -1 if this array does not contain the element. More formally, returns the lowest index i such that (o==null ? get(i)==null : o.equals(get(i))), or -1 if there is no such index.
   *
   * @param {(Object | js.lang.Function)} elem - element to search for or a function which decides the search result by its return value.
   * @param {js.lang.Number} start - The index to start the search at. If the index is greater than or equal to the array's length, -1 is returned, which means the array will not be searched. Note: if the provided index is negative, the array is still searched from front to back. If the calculated index is less than 0 or not set, then the whole array will be searched. Default: 0 (entire array is searched).
   * @param {js.lang.Number} end - The index to stop the search at. If the index is greater than the array's length, the index will be set to the array's length. If the provided index value is less than or equal to the start index, -1 is returned, which means the array will not be searched. Note: If the calculated index is not set, then the whole array will be searched. Default: the array's length (entire array is searched).
   * @return {js.lang.Number} 
   */
  indexOf2: function(elem, start, end) {
    for (var i = Math.max(start || 0, 0), len = Math.min(end || this.length, this.length); i < len; i++) {
      if (Object.isFunction(elem) ? elem(this[i]) :
        ((this[i] && Object.isFunction(this[i].equals)) ? this[i].equals(elem) : this[i] === elem)) {
        return i;
      }
    }
    return -1;
  },

  /** 
   * @function
   * @public 
   * @summary Removes the first occurrence of the specified element from this array, if it is present (optional operation).
   * @description Removes the first occurrence of the specified element from this array, if it is present (optional operation). If this array does not contain the element, it is unchanged. More formally, removes the element with the lowest index i such that (o==null ? get(i)==null : o.equals(get(i))) (if such an element exists). Returns true if this array contained the specified element (or equivalently, if this array changed as a result of the call).
   *
   * @param {js.lang.Object} elem - element to be removed from this array, if present
   * @return {js.lang.Boolean} true if this array contained the specified element
   */
  remove: function(elem) {
    var index = this.indexOf2(elem);
    if (index > -1) {
      this.splice(index, 1);
      return true;
    }
    return false;
  },

  /** 
   * @function
   * @public 
   * @summary Removes the element at the specified position in this array (optional operation).
   * @description Removes the element at the specified position in this array (optional operation). Shifts any subsequent elements to the left (subtracts one from their indices). Returns the element that was removed from the array.
   * 
   * @param {js.lang.Number} index - the index of the element to be removed
   * @return {js.lang.Object} the element previously at the specified position
   * @throws {js.lang.IndexOutOfBoundsException} if the index is out of range (index < 0 || index >= size())
   */
  removeByIndex: function(index) {
    if (index < 0 || index >= this.length) {
      throw new js.lang.IndexOutOfBoundsException();
    }
    return this.splice(index, 1)[0];
  },

  /** 
   * @function
   * @public 
   * @summary Replaces the element at the specified position in this array with the specified element (optional operation).
   * @description Replaces the element at the specified position in this array with the specified element (optional operation).
   *
   * @param {js.lang.Number} index - index of the element to replace
   * @param {js.lang.Number} elem - element to be stored at the specified position
   * @return {js.lang.Object} the element previously at the specified position
   * @throws {js.lang.IndexOutOfBoundsException} if the index is out of range (index < 0 || index >= size())
   */
  set: function(index, elem) {
    if (index < 0 || index >= this.length) {
      throw new js.lang.IndexOutOfBoundsException();
    }
    var element = this[index];
    this[index] = elem;
    return element;
  },

  /** 
   * @function
   * @public 
   * @summary Returns the element at the specified position in this array.
   * @description Returns the element at the specified position in this array.
   *
   * @param {js.lang.Number} index - index of the element to return
   * @return {js.lang.Object} the element at the specified position in this array
   * @throws {js.lang.IndexOutOfBoundsException} if the index is out of range (index < 0 || index >= size())
   */
  get: function(index) {
    if (index < 0 || index >= this.length) {
      throw new js.lang.IndexOutOfBoundsException();
    }
    return this[index];
  },

  /** 
   * @function
   * @public 
   * @summary Get the first element of this array.
   * @description Get the first element of this array.
   *
   * @return {js.lang.Object} the element at the first position in this array
   */
  first: function() {
    return this.length > 0 ? this[0] : null;
  },

  /** 
   * @function
   * @public 
   * @summary Get the last element of this array.
   * @description Get the last element of this array.
   *
   * @return {js.lang.Object} the element at the last position in this array
   */
  last: function() {
    return this.length > 0 ? this[this.length - 1] : null;
  },

  /** 
   * @function
   * @public 
   * @summary Appends the given array to this array at the last position.
   * @description 
   *
   * @param {js.lang.Array} array - array to be appended
   * @param {js.lang.Number} start - the start position of the given array to be inserted
   * @param {js.lang.Number} end - the end position of the given array to be inserted
   * @return {js.lang.Array} this array
   */
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

  /** 
   * @function
   * @public 
   * @summary Inserts the given array into this array at the first position.
   * @description 
   *
   * @param {js.lang.Array} array - array to be inserted
   * @param {js.lang.Number} start - the start position of the given array to be inserted
   * @param {js.lang.Number} end - the end position of the given array to be inserted
   * @return {js.lang.Array} this array
   */
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

  /** 
   * @function
   * @public 
   * @summary Returns the number of elements in this array.
   * @description 
   *
   * @return {js.lang.Object} the number of elements in this array
   */
  getLength: function() {
    return this.length;
  },

  /** 
   * @function
   * @public 
   * @summary Returns the number of elements in this array.
   * @description 
   *
   * @return {js.lang.Object} the number of elements in this array
   */
  size: function() {
    return this.getLength();
  },

  /** 
   * @function
   * @public 
   * @summary The concat() method returns a new array comprised of the array on which it is called joined with the array(s) and/or value(s) provided as arguments.
   * @description 
   * <p>
   * concat creates a new array consisting of the elements in the object on which it is called, followed in order by, for each argument, the elements of that argument (if the argument is an array) or the argument itself (if the argument is not an array).
   * </p><p>
   * concat does not alter this or any of the arrays provided as arguments but instead returns a shallow copy that contains copies of the same elements combined from the original arrays. Elements of the original arrays are copied into the new array as follows:
   * </p><p>
   * Object references (and not the actual object): concat copies object references into the new array. Both the original and new array refer to the same object. That is, if a referenced object is modified, the changes are visible to both the new and original arrays.
   * </p><p>
   * Strings, numbers and booleans (not String, Number, and Boolean objects): concat copies the values of strings and numbers into the new array.
   * </p>
   *  
   * @param {js.lang.Array|js.lang.Object} valueN - Arrays and/or values to concatenate into a new array. See the description below for details.
   * @return {js.lang.Array} A new Array instance.
   */
  concat: Array.prototype.concat,

  /** 
   * @function
   * @public 
   * @summary The join() method joins all elements of an array into a string.
   * @description The string conversions of all array elements are joined into one string. If an element is undefined or null, it is converted to the empty string.
   *
   * @param {js.lang.String} separator - Optional. Specifies a string to separate each element of the array. The separator is converted to a string if necessary. If omitted, the array elements are separated with a comma. If separator is an empty string, all elements are joined without any characters in between them.
   * @return {js.lang.String} A string with all array elements joined.
   */
  join: Array.prototype.join,

  /** 
   * @function
   * @public 
   * @summary The pop() method removes the last element from an array and returns that element.
   * @description 
   * <p>
   * The pop method removes the last element from an array and returns that value to the caller.
   * </p><p>
   * pop is intentionally generic; this method can be called or applied to objects resembling arrays. Objects which do not contain a length property reflecting the last in a series of consecutive, zero-based numerical properties may not behave in any meaningful manner.
   * </p><p>
   * If you call pop() on an empty array, it returns undefined.
   * </p>
   
   * @return {js.lang.Object} The last element from the array; undefined if the array is empty.
   */
  pop: Array.prototype.pop,

  /** 
   * @function
   * @public 
   * @summary The push() method adds one or more elements to the end of an array and returns the new length of the array.
   * @description 
   * <p>
   * The push method appends values to an array.
   * </p><p>
   * push is intentionally generic. This method can be used with call() or apply() on objects resembling arrays. The push method relies on a length property to determine where to start inserting the given values. If the length property cannot be converted into a number, the index used is 0. This includes the possibility of length being nonexistent, in which case length will also be created.
   * </p><p>
   * The only native, array-like objects are strings, although they are not suitable in applications of this method, as strings are immutable.
   * </p>
   *
   * @param {js.lang.Object} elementN - The elements to add to the end of the array.
   * @return {js.lang.Number} The new length property of the object upon which the method was called.
   */
  push: Array.prototype.push,

  /** 
   * @function
   * @public 
   * @summary The reverse() method reverses an array in place. The first array element becomes the last and the last becomes the first.
   * @description The reverse method transposes the elements of the calling array object in place, mutating the array, and returning a reference to the array.
   *
   * @return {js.lang.Array} The reversed array.
   */
  reverse: Array.prototype.reverse,

  /** 
   * @function
   * @public 
   * @summary The shift() method removes the first element from an array and returns that element. This method changes the length of the array.
   * @description 
   * <p>
   * The shift method removes the element at the zeroeth index and shifts the values at consecutive indexes down, then returns the removed value. If the length property is 0, undefined is returned.
   * </p><p>
   * shift is intentionally generic; this method can be called or applied to objects resembling arrays. Objects which do not contain a length property reflecting the last in a series of consecutive, zero-based numerical properties may not behave in any meaningful manner.
   * </p>
   *
   * @return {js.lang.Object} The removed element.
   */
  shift: Array.prototype.shift,

  /** 
   * @function
   * @public 
   * @summary The slice() method returns a shallow copy of a portion of an array into a new array object.
   * @description 
   * <p>
   * slice does not alter. It returns a shallow copy of elements from the original array. Elements of the original array are copied into the returned array as follows:
   * <ul>
   * <li>For object references (and not the actual object), slice copies object references into the new array. Both the original and new array refer to the same object. If a referenced object changes, the changes are visible to both the new and original arrays.</li>
   * <li>For strings, numbers and booleans (not String, Number and Boolean objects), slice copies the values into the new array. Changes to the string, number or boolean in one array does not affect the other array.</li>
   * </ul>
   * If a new element is added to either array, the other array is not affected.
   * </p>
   *
   * @param {js.lang.Number} begin - Zero-based index at which to begin extraction. As a negative index, begin indicates an offset from the end of the sequence. slice(-2) extracts the last two elements in the sequence. If begin is undefined, slice begins from index 0.
   * @param {js.lang.Number} end - Zero-based index at which to end extraction. slice extracts up to but not including end. slice(1,4) extracts the second element through the fourth element (elements indexed 1, 2, and 3). As a negative index, end indicates an offset from the end of the sequence. slice(2,-1) extracts the third element through the second-to-last element in the sequence. If end is omitted, slice extracts through the end of the sequence (arr.length).
   * @return {js.lang.Array} A new array containing the extracted elements.
   */
  slice: Array.prototype.slice,

  /** 
   * @function
   * @public 
   * @summary The sort() method sorts the elements of an array in place and returns the array. The sort is not necessarily stable. The default sort order is according to string Unicode code points.
   * @description 
   * <p>
   * If compareFunction is not supplied, elements are sorted by converting them to strings and comparing strings in Unicode code point order. For example, "Banana" comes before "cherry". In a numeric sort, 9 comes before 80, but because numbers are converted to strings, "80" comes before "9" in Unicode order.
   * If compareFunction is supplied, the array elements are sorted according to the return value of the compare function. If a and b are two elements being compared, then:
   * <ul>
   * <li>If compareFunction(a, b) is less than 0, sort a to a lower index than b, i.e. a comes first.</li>
   * <li>If compareFunction(a, b) returns 0, leave a and b unchanged with respect to each other, but sorted with respect to all different elements. Note: the ECMAscript standard does not guarantee this behaviour, and thus not all browsers (e.g. Mozilla versions dating back to at least 2003) respect this.</li>
   * <li>If compareFunction(a, b) is greater than 0, sort b to a lower index than a.</li>
   * <li>compareFunction(a, b) must always return the same value when given a specific pair of elements a and b as its two arguments. If inconsistent results are returned then the sort order is undefined.</li>
   * </ul>
   * To compare numbers instead of strings, the compare function can simply subtract b from a. The following function will sort the array ascending (if it doesn't contain Infinity and NaN).
   * </p>
   *
   * @param {js.lang.Function} compareFunction - Optional. Specifies a function that defines the sort order. If omitted, the array is sorted according to each character's Unicode code point value, according to the string conversion of each element.
   * @return {js.lang.Array} - The sorted array.
   */
  sort: Array.prototype.sort,

  /** 
   * @function
   * @public 
   * @summary The splice() method changes the content of an array by removing existing elements and/or adding new elements.
   * @description If you specify a different number of elements to insert than the number you're removing, the array will have a different length at the end of the call.
   *
   * @param {js.lang.Number} start - Index at which to start changing the array (with origin 0). If greater than the length of the array, actual starting index will be set to the length of the array. If negative, will begin that many elements from the end.
   * @param {js.lang.Number} deleteCount - An integer indicating the number of old array elements to remove. If deleteCount is 0, no elements are removed. In this case, you should specify at least one new element. If deleteCount is greater than the number of elements left in the array starting at start, then all of the elements through the end of the array will be deleted. If deleteCount is omitted, deleteCount will be equal to (arr.length - start).
   * @param {js.lang.Object} item1, item2, ... - The elements to add to the array, beginning at the start index. If you don't specify any elements, splice() will only remove elements from the array.
   * @return {js.lang.Object} An array containing the deleted elements. If only one element is removed, an array of one element is returned. If no elements are removed, an empty array is returned.
   */
  splice: Array.prototype.splice,

  /** 
   * @function
   * @public 
   * @summary The toSource() method returns a string representing the source code of the array.
   * @description This method is usually called internally by JavaScript and not explicitly in code. You can call toSource while debugging to examine the contents of an array.
   *
   * @return {js.lang.String} A string representing the source code of the array.
   */
  toSource: Array.prototype.toSource,

  /** 
   * @function
   * @public 
   * @summary The toString() method returns a string representing the specified array and its elements.
   * @description The Array object overrides the toString method of Object. For Array objects, the toString method joins the array and returns one string containing each array element separated by commas. For example, the following code creates an array and uses toString to convert the array to a string. JavaScript calls the toString method automatically when an array is to be represented as a text value or when an array is referred to in a string concatenation.
   *
   * @return {js.lang.Object} A string representing the elements of the array.
   */
  toString: Array.prototype.toString,

  /** 
   * @function
   * @public 
   * @summary 把数组转换为本地数组，并返回结果。
   * @description 
   *
   * @return {js.lang.Object} 
   */
  toLocaleString: Array.prototype.toLocaleString,

  /** 
   * @function
   * @public 
   * @summary The unshift() method adds one or more elements to the beginning of an array and returns the new length of the array.
   * @description 
   * <p>
   * The unshift method inserts the given values to the beginning of an array-like object.
   * </p><p> 
   * unshift is intentionally generic; this method can be called or applied to objects resembling arrays. Objects which do not contain a length property reflecting the last in a series of consecutive, zero-based numerical properties may not behave in any meaningful manner.
   * </p>
   *
   * @parma {js.lang.Object} elementN - The elements to add to the front of the array.
   * @return {js.lang.Number}  The new length property of the object upon which the method was called.
   */
  unshift: Array.prototype.unshift,

  /** 
   * @function
   * @public 
   * @summary 返回数组对象的原始值
   * @description 
   *
   * @return {js.lang.Object} 
   */
  valueOf: Array.prototype.valueOf
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

/**
 * @class js.lang.Boolean 
 * @extends {js.lang.Object}
 * @alias Boolean
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The Boolean object is an object wrapper for a boolean value.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The value passed as the first parameter is converted to a boolean value, if necessary. If value is omitted or is 0, -0, null, false, NaN, undefined, or the empty string (""), the object has an initial value of false. All other values, including any object or the string "false", create an object with an initial value of true.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Do not confuse the primitive Boolean values true and false with the true and false values of the Boolean object.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Any object whose value is not undefined or null, including a Boolean object whose value is false, evaluates to true when passed to a conditional statement.
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.Boolean.prototype */ {
  name: "class Boolean",

  alias: "js.lang.Boolean",

  Boolean: function() {},

  /** 
   * @function
   * @public 
   * @summary Returns true if and only if the argument is not null and is a Boolean object that represents the same boolean value as this object.
   * @description Returns true if and only if the argument is not null and is a Boolean object that represents the same boolean value as this object.
   * 
   * @param {js.lang.Object} the object to compare with.
   * @return {js.lang.Boolean} true if the Boolean objects represent the same value; false otherwise.
   */
  "equals": function(obj) {
    return Object.isBoolean(obj) && this == obj;
  },

  booleanValue: function() {
    return this.primitiveValue || this.valueOf();
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

/**
 * @class js.lang.Function 
 * @extends {js.lang.Object}
 * @alias Function
 * @description The Function constructor creates a new Function object. In JavaScript every function is actually a Function object.
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Function objects created with the Function constructor are parsed when the function is created. This is less efficient than declaring a function with a function expression or function statement and calling it within your code, because such functions are parsed with the rest of the code.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * All arguments passed to the function are treated as the names of the identifiers of the parameters in the function to be created, in the order in which they are passed.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Invoking the Function constructor as a function (without using the new operator) has the same effect as invoking it as a constructor.
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.Function.prototype */ {
  name: "class Function",

  alias: "js.lang.Function",

  Function: function() {},

  getName: function() {
    return this.name || this.toString().match(/function\s*([^(]*)\(/)[1]
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

/**
 * @class js.lang.Number 
 * @extends {js.lang.Object}
 * @alias Number
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The Number JavaScript object is a wrapper object allowing you to work with numerical values. A Number object is created using the Number() constructor.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The primary uses for the Number object are:
 * <ul><li>If the argument cannot be converted into a number, it returns NaN.</li>
 * <li>In a non-constructor context (i.e., without the new operator), Number can be used to perform a type conversion.</li>
 * </ul></p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.Number.prototype */ {
  name: "class Number",

  alias: "js.lang.Number",

  Number: function() {},

  /** 
   * @function
   * @public 
   * @summary Compares this number against the specified object.
   * @description Compares this number against the specified object. The result is true if and only if the argument is not null and is a Number object that represents a number that has the same value as the number represented by this object.
   *
   * @param {js.lang.Object} the object to compare with.
   * @return {js.lang.Boolean} true if the Number objects represent the same value; false otherwise.
   */
  "equals": function(obj) {
    return Object.isNumber(obj) && this == obj;
  },

  /** 
   * @function
   * @public 
   * @summary The toExponential() method returns a string representing the Number object in exponential notation.
   * @description 
   * <p>
   * If the fractionDigits argument is omitted, the number of digits after the decimal point defaults to the number of digits necessary to represent the value uniquely.
   * </p><p>
   * If you use the toExponential() method for a numeric literal and the numeric literal has no exponent and no decimal point, leave whitespace(s) before the dot that precedes the method call to prevent the dot from being interpreted as a decimal point.
   * </p><p>
   * If a number has more digits than requested by the fractionDigits parameter, the number is rounded to the nearest number represented by fractionDigits digits. See the discussion of rounding in the description of the toFixed() method, which also applies to toExponential().
   * </p>
   *
   * @param {js.lang.Number} fractionDigits - Optional. An integer specifying the number of digits after the decimal point. Defaults to as many digits as necessary to specify the number.
   * @return {js.lang.String} A string representing the given Number object in exponential notation with one digit before the decimal point, rounded to fractionDigits digits after the decimal point.
   */
  toExponential: Number.prototype.toExponential,

  /** 
   * @function
   * @public 
   * @summary The toFixed() method formats a number using fixed-point notation.
   * @description 
   *
   * @param {js.lang.Number} digits - Optional. The number of digits to appear after the decimal point; this may be a value between 0 and 20, inclusive, and implementations may optionally support a larger range of values. If this argument is omitted, it is treated as 0.
   * @return {js.lang.String} A string representing the given number using fixed-point notation.
   */
  toFixed: Number.prototype.toFixed,

  /** 
   * @function
   * @public 
   * @summary The toPrecision() method returns a string representing the Number object to the specified precision.
   * @description 
   * <p>
   * A string representing a Number object in fixed-point or exponential notation rounded to precision significant digits. See the discussion of rounding in the description of the Number.prototype.toFixed() method, which also applies to toPrecision().
   * </p><p>
   * If the precision argument is omitted, behaves as Number.prototype.toString(). If the precision argument is a non-integer value, it is rounded to the nearest integer.
   * </p><p>
   *
   * @param {js.lang.Number} precision - Optional. An integer specifying the number of significant digits.
   * @return {js.lang.Boolean} A string representing a Number object in fixed-point or exponential notation rounded to precision significant digits.
   */
  toPrecision: Number.prototype.toPrecision,

  numberValue: function() {
    return this.primitiveValue || this.valueOf();
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

/**
 * @class js.lang.RegExp 
 * @extends {js.lang.Object}
 * @alias RegExp
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The RegExp constructor creates a regular expression object for matching text with a pattern.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * For an introduction to regular expressions, read the Regular Expressions chapter in the JavaScript Guide.
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.RegExp.prototype */ {
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

/** 
 * @class js.lang.String 
 * @extends {js.lang.Object}
 * @alias String
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * JavaScript strings are used for storing and manipulating text.
 * </p><br/>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.String.prototype */ {
  name: "class String",

  alias: "js.lang.String",

  String: function() {},

  /** 
   * @function
   * @public 
   * @summary Returns a string whose value is this string, with any leading and trailing whitespace removed.
   * @description Returns a string whose value is this string, with any leading and trailing whitespace removed.
   *
   * @return {js.lang.String} 
   */
  "trim": function() {
    var re = /^\s+|\s+$/g;
    return function() {
      return this.replace(re, "");
    };
  }(),

  /** 
   * @function
   * @public 
   * @summary Compares this string to the specified object. The result is true if and only if the argument is not null and is a String object that represents the same sequence of characters as this object.
   * @description Compares this string to the specified object. The result is true if and only if the argument is not null and is a String object that represents the same sequence of characters as this object.
   *
   * @return {js.lang.Boolean} 
   */
  "equals": function(s) {
    return Object.isString(s) && this == s;
  },

  /** 
   * @function
   * @public 
   * @summary Returns the length of this string.
   * @description Returns the length of this string.
   *
   * @return {js.lang.Boolean} 
   */
  getLength: function() {
    return this.length;
  },

  /** 
   * @function
   * @public 
   * @summary Tests if this string ends with the specified suffix.
   * @description Tests if this string ends with the specified suffix.
   *
   * @return {js.lang.Boolean} 
   */
  endsWith: function(str) {
    return new RegExp(str + "$").test(this);
  },

  /** 
   * @function
   * @public 
   * @summary The charAt() method returns the specified character from a string.
   * @description 
   * <p>
   * Characters in a string are indexed from left to right. The index of the first character is 0, and the index of the last character in a string called stringName is stringName.length - 1. If the index you supply is out of range, JavaScript returns an empty string.
   * </p><p>
   * If no index is provided to .charAt(), 0 will be used as default.
   * </p>
   *
   * @param {js.lang.Number} index - An integer between 0 and 1-less-than the length of the string. If no index is provided, charAt() will use 0.
   * @return {js.lang.String} A string representing the character at the specified index; empty string if index is out of range.
   */
  charAt: String.prototype.charAt,

  /** 
   * @function
   * @public 
   * @summary The charCodeAt() method returns an integer between 0 and 65535 representing the UTF-16 code unit at the given index (the UTF-16 code unit matches the Unicode code point for code points representable in a single UTF-16 code unit, but might also be the first code unit of a surrogate pair for code points not representable in a single UTF-16 code unit, e.g. Unicode code points > 0x10000). If you want the entire code point value, use codePointAt().
   * @description 
   * <p>
   * Unicode code points range from 0 to 1114111 (0x10FFFF). The first 128 Unicode code points are a direct match of the ASCII character encoding. For information on Unicode, see the JavaScript Guide.
   * </p><p>
   * Note that charCodeAt() will always return a value that is less than 65536. This is because the higher code points are represented by a pair of (lower valued) "surrogate" pseudo-characters which are used to comprise the real character. Because of this, in order to examine or reproduce the full character for individual characters of value 65536 and above, for such characters, it is necessary to retrieve not only charCodeAt(i), but also charCodeAt(i+1) (as if examining/reproducing a string with two letters), or to use codePointAt(i) instead. See example 2 and 3 below.
   * </p><p>
   * charCodeAt() returns NaN if the given index is less than 0 or is equal to or greater than the length of the string.
   * </p><p>
   * Backward compatibilty: In historic versions (like JavaScript 1.2) the charCodeAt() method returns a number indicating the ISO-Latin-1 codeset value of the character at the given index. The ISO-Latin-1 codeset ranges from 0 to 255. The first 0 to 127 are a direct match of the ASCII character set.
   * </p>
   *
   * @param {js.lang.Number} index - An integer greater than or equal to 0 and less than the length of the string; if it is not a number, it defaults to 0.
   * @return {js.lang.Number} A number representing the UTF-16 code unit value of the character at the given index; NaN if index is out of range.
   */
  charCodeAt: String.prototype.charCodeAt,

  /** 
   * @function
   * @public 
   * @summary The concat() method combines the text of one or more strings and returns a new string.
   * @description The concat() function combines the text from one or more strings and returns a new string. Changes to the text in one string do not affect the other string.
   *
   * @param {js.lang.String} string2...stringN - Strings to concatenate to this string.
   * @return {js.lang.String} A new string containing the combined text of the strings provided.
   */
  concat: String.prototype.concat,

  /** 
   * @function
   * @public 
   * @summary The indexOf() method returns the index within the calling String object of the first occurrence of the specified value, starting the search at fromIndex. Returns -1 if the value is not found.
   * @description Characters in a string are indexed from left to right. The index of the first character is 0, and the index of the last character of a string called stringName is stringName.length - 1.
   *
   * @param {js.lang.String} searchValue - A string representing the value to search for.
   * @param {js.lang.Number} fromIndex - Optional, The index at which to start the searching forwards in the string. It can be any integer. The default value is 0. If fromIndex <= 0 the entire string is searched. If fromIndex >= str.length, the string is not searched and -1 is returned. Unless searchValue is an empty string, then str.length is returned.
   * @return {js.lang.Number} The index of the first occurrence of the specified value; -1 if not found. The indexOf() method is case sensitive. For example, the following expression returns -1:
   */
  indexOf: String.prototype.indexOf,

  /** 
   * @function
   * @public 
   * @summary The lastIndexOf() method returns the index within the calling String object of the last occurrence of the specified value, searching backwards from fromIndex. Returns -1 if the value is not found.
   * @description Characters in a string are indexed from left to right. The index of the first character is 0, and the index of the last character is str.length - 1. The lastIndexOf() method is case sensitive. For example, the following expression returns -1:
   *
   * @param {js.lang.String} searchValue - A string representing the value to search for. If searchValue is an empty string, then fromIndex is returned.
   * @param {js.lang.Number} fromIndex - Optional, The index at which to start searching backwards in the string. Starting with this index, the left part of the string will be searched. It can be any integer. The default value is +Infinity. If fromIndex >= str.length, the whole string is searched. If fromIndex < 0,  the behavior will be the same as if it would be 0.
   * @return {js.lang.Number} The index of the last occurrence of the specified value; -1 if not found.
   */
  lastIndexOf: String.prototype.lastIndexOf,

  /** 
   * @function
   * @public 
   * @summary The match() method retrieves the matches when matching a string against a regular expression.
   * @description 
   * <p>
   * If the regular expression does not include the g flag, returns the same result as RegExp.exec(). The returned Array has an extra input property, which contains the original string that was parsed. In addition, it has an index property, which represents the zero-based index of the match in the string.
   * </p><p>
   * If the regular expression includes the g flag, the method returns an Array containing all matched substrings rather than match objects. Captured groups are not returned. If there were no matches, the method returns null.
   * </p>
   *
   * @param {js.lang.RegExp} regexp - A regular expression object. If a non-RegExp object obj is passed, it is implicitly converted to a RegExp by using new RegExp(obj).
   * @return {js.lang.Array} An Array containing the entire match result and any parentheses-captured matched results; null if there were no matches.
   */
  match: String.prototype.match,

  /** 
   * @function
   * @public 
   * @summary The replace() method returns a new string with some or all matches of a pattern replaced by a replacement. The pattern can be a string or a RegExp, and the replacement can be a string or a function to be called for each match.
   * @description 
   * <p>This method does not change the String object it is called on. It simply returns a new string.</p>
   * <p>To perform a global search and replace, include the g switch in the regular expression.</p>
   *
   * @param {js.lang.RegExp|js.lang.String} regexp | substr (pattern) - 
   * <p>A RegExp object or literal. The match is replaced by the return value of parameter #2.</p>
   * <p>A String that is to be replaced by newSubStr. It is treated as a verbatim string and is not interpreted as a regular expression. Only the first occurrence will be replaced.</p>
   * @param {js.lang.String|js.lang.Function} newSubStr | function (replacement) - 
   * <p>The String that replaces the substring received from parameter #1. A number of special replacement patterns are supported; see the "Specifying a string as a parameter" section below.</p>
   * <p>function to be invoked to create the new substring (to put in place of the substring received from parameter #1). The arguments supplied to this function are described in the "Specifying a function as a parameter" section below.</p>
   * @return {js.lang.String} A new string with some or all matches of a pattern replaced by a replacement.
   */
  replace: String.prototype.replace,

  /** 
   * @function
   * @public 
   * @summary The search() method executes a search for a match between a regular expression and this String object.
   * @description When you want to know whether a pattern is found and also its index in a string use search() (if you only want to know it exists, use the similar test() method, which returns a boolean); for more information (but slower execution) use match() (similar to the regular expression exec() method).
   *
   * @param {js.lang.RegExp} regexp - A regular expression object. If a non-RegExp object obj is passed, it is implicitly converted to a RegExp by using new RegExp(obj).
   * @return {js.lang.Number} The index of the first match between the regular expression and the given string; if not found, -1.
   */
  search: String.prototype.search,

  /** 
   * @function
   * @public 
   * @summary 
   * @description 
   *
   * @return {js.lang.String} 
   */
  slice: String.prototype.slice,

  /** 
   * @function
   * @public 
   * @summary The split() method splits a String object into an array of strings by separating the string into substrings.
   * @description 
   * <p>When found, separator is removed from the string and the substrings are returned in an array. If separator is not found or is omitted, the array contains one element consisting of the entire string. If separator is an empty string, str is converted to an array of characters.
   * <p>If separator is a regular expression that contains capturing parentheses, then each time separator is matched, the results (including any undefined results) of the capturing parentheses are spliced into the output array. However, not all browsers support this capability.
   *
   * @param {js.lang.String} separator - Optional. Specifies the character(s) to use for separating the string. The separator is treated as a string or a regular expression. If separator is omitted, the array returned contains one element consisting of the entire string. If separator is an empty string, str is converted to an array of characters.
   * @param {js.lang.Number} limit - Optional. Integer specifying a limit on the number of splits to be found. The split() method still splits on every match of separator, until the number of split items match the limit or the string falls short of separator.
   * @return {js.lang.Array} An array of strings split at each point where the separator occurs in the given string.
   */
  split: String.prototype.split,

  /** 
   * @function
   * @public 
   * @summary The substr() method returns the characters in a string beginning at the specified location through the specified number of characters. 
   * @description 
   * <p>
   * start is a character index. The index of the first character is 0, and the index of the last character is 1 less than the length of the string. substr() begins extracting characters at start and collects length characters (unless it reaches the end of the string first, in which case it will return fewer).
   * <p></p>
   * If start is positive and is greater than or equal to the length of the string, substr() returns an empty string.
   * <p></p>
   * If start is negative, substr() uses it as a character index from the end of the string. If start is negative and abs(start) is larger than the length of the string, substr() uses 0 as the start index. Note: the described handling of negative values of the start argument is not supported by Microsoft JScript.
   * <p></p>
   * If length is 0 or negative, substr() returns an empty string. If length is omitted, substr() extracts characters to the end of the string.
   * <p>
   * 
   * @param {js.lang.Number} start - Location at which to begin extracting characters. If a negative number is given, it is treated as strLength + start where strLength is the length of the string (for example, if start is -3 it is treated as strLength - 3.)
   * @param {js.lang.Number} length - Optional. The number of characters to extract.
   * @return {js.lang.String} A new string containing the extracted section of the given string. If length is 0 or a negative number, an empty string is returned.
   */
  substr: String.prototype.substr,

  /** 
   * @function
   * @public 
   * @summary The substring() method returns a subset of a string between one index and another, or through the end of the string.
   * @description 
   * <p>
   * substring() extracts characters from indexStart up to but not including indexEnd. In particular:
   * <li>If indexStart equals indexEnd, substring() returns an empty string.</li>
   * <li>If indexEnd is omitted, substring() extracts characters to the end of the string.</li>
   * <li>If either argument is less than 0 or is NaN, it is treated as if it were 0.</li>
   * <li>If either argument is greater than stringName.length, it is treated as if it were stringName.length.</li>
   * If indexStart is greater than indexEnd, then the effect of substring() is as if the two arguments were swapped; for example, str.substring(1, 0) == str.substring(0, 1).
   * </p>
   * 
   * @param {js.lang.Number} indexStart - An integer between 0 and the length of the string, specifying the offset into the string of the first character to include in the returned substring.
   * @param {js.lang.Number} indexEnd - Optional. An integer between 0 and the length of the string, which specifies the offset into the string of the first character not to include in the returned substring.
   * @return {js.lang.String} A new string containing the extracted section of the given string.
   */
  substring: String.prototype.substring,

  /** 
   * @function
   * @public 
   * @summary The toLowerCase() method returns the calling string value converted to lower case.
   * @description The toLowerCase() method returns the value of the string converted to lower case. toLowerCase() does not affect the value of the string str itself.
   *
   * @return {js.lang.String} A new string representing the calling string converted to lower case.
   */
  toLowerCase: String.prototype.toLowerCase,

  /** 
   * @function
   * @public 
   * @summary A new string representing the calling string converted to upper case.
   * @description The toUpperCase() method returns the value of the string converted to upper case. toUpperCase() does not affect the value of the string itself.
   *
   * @return {js.lang.String} A new string representing the calling string converted to upper case.
   */
  toUpperCase: String.prototype.toUpperCase,

  stringValue: function() {
    return this.primitiveValue || this.valueOf();
  }

});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 14, 2014
 */

/** 
 * @abstract
 * @class js.io.Writer 
 * @extends {js.lang.Object}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Abstract class for writing to character streams. The only methods that a subclass must implement are write(array, off, len). Most subclasses, however, will override some of the methods defined here in order to provide higher efficiency, additional functionality, or both.
 * </p><br/>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.io.Writer.prototype */ {
  name: "abstract class js.io.Writer extends Object",
  "protected _writer": null,

  Writer: function(writer) {
    this._writer = writer;
  },

  /** 
   * @function
   * @public 
   * @summary Appends the specified character to this writer.
   * @description Appends the specified character to this writer.
   *
   * @param {js.lang.String} c - the specified character
   * @return {js.io.Writer} This writer
   */
  append: function(c) {
    return this;
  },

  /** 
   * @function
   * @public 
   * @summary Writes an array of characters.
   * @description Writes an array of characters.
   *
   * @param {js.lang.Array} cbuf - Array of characters
   * @param {js.lang.Number} off - Offset from which to start writing characters
   * @param {js.lang.Number} len - Number of characters to write
   */
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

/** 
 * @class js.io.PrintWriter 
 * @extends {js.io.Writer}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Prints formatted representations of objects to a text-output stream.
 * </p><br/>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.io.PrintWriter.prototype */ {
  name: "class js.io.PrintWriter extends js.io.Writer",
  PrintWriter: function() {},

  /** 
   * @function
   * @public 
   * @summary Prints a character.
   * @description 
   *
   * @param {js.lang.Array|js.lang.String} cbuf - The characters array or a string to be printed
   * @param {js.lang.Number} off - Offset from which to start writing characters
   * @param {js.lang.Number} len - Number of characters to write
   * @param {js.lang.Boolean} ln - Whether to add a newline or not
   */
  print: function(cbuf, off, len, ln) {},

  /** 
   * @function
   * @public 
   * @summary Prints a character, and add a newline at the end.
   * @description 
   *
   * @param {js.lang.Array|js.lang.String} cbuf - The characters array or a string to be printed
   * @param {js.lang.Number} off - Offset from which to start writing characters
   * @param {js.lang.Number} len - Number of characters to write
   */
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

/** 
 * @class js.io.Console 
 * @extends {js.io.PrintWriter}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The Console object provides access to the browser's debugging console (e.g., the Web Console in Firefox). The specifics of how it works vary from browser to browser, but there is a de facto set of features that are typically provided.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The Console object can be accessed from any global object, Window on browsing scopes, WorkerGlobalScope, and its specific variants in workers via property console. It's exposed as Window.console, and can be referenced as simply console.
 * </p><br/>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.io.Console.prototype */ {
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

  /** 
   * @function
   * @public 
   * @summary Prints a character.
   * @description 
   *
   * @param {js.lang.Array|js.lang.String} buf - The characters array or a string to be printed
   * @param {js.lang.Number} off - Offset from which to start writing characters
   * @param {js.lang.Number} len - Number of characters to write
   * @param {js.lang.Boolean} ln - Whether to add a newline or not
   */
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

  /** 
   * @function
   * @public 
   * @summary Writes an error message to the console if the assertion is false. If the assertion is true, nothing happens.
   * @description 
   *
   * @param {js.lang.Boolean} assertion - Any boolean expression. If the assertion is false, the message is written to the console.
   * @param {js.lang.Object} obj1 ... objN - A list of JavaScript objects to output. The string representations of each of these objects are appended together in the order listed and output.
   * @param {js.lang.String} msg - A JavaScript string containing zero or more substitution strings.
   * @param {js.lang.String} subst1 ... substN - JavaScript objects with which to replace substitution strings within msg. This parameter gives you additional control over the format of the output.
   */
  assert: function() {
    return (this._writer.assert || this.unsupport).apply(
      this._writer, arguments);
  },

  /** 
   * @function
   * @public 
   * @summary Outputs a message to the Web Console.
   * @description 打印日志信息，支持printf风格的占位符。只支持字符（%s）、整数（%d或%i）、浮点数（%f）和对象（%o）四种。 比如，log("%d年%d月%d日",2011,3,26); log("圆周率是%f",3.1415926);
   *
   * @param {js.lang.Object} obj1 ... objN - A list of JavaScript objects to output. The string representations of each of these objects are appended together in the order listed and output.
   * @param {js.lang.String} msg - A JavaScript string containing zero or more substitution strings. 
   * @param {js.lang.String} subst1 ... substN - JavaScript objects with which to replace substitution strings within msg. This gives you additional control over the format of the output.
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
   * @function
   * @public 
   * @summary Outputs an informational message to the Web Console. In Firefox and Chrome, a small "i" icon is displayed next to these items in the Web Console's log.
   * @description 打印一般信息，支持printf风格的占位符。
   *
   * @param {js.lang.Object} obj1 ... objN - A list of JavaScript objects to output. The string representations of each of these objects are appended together in the order listed and output.
   * @param {js.lang.String} msg - A JavaScript string containing zero or more substitution strings.
   * @param {js.lang.String} subst1 ... substN - JavaScript objects with which to replace substitution strings within msg. This gives you additional control over the format of the output.
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
   * @function
   * @public 
   * @summary Outputs a warning message to the Web Console.
   * @description 打印警告提示，支持printf风格的占位符。
   *
   * @param {js.lang.Object} obj1 ... objN - A list of JavaScript objects to output. The string representations of each of these objects are appended together in the order listed and output.
   * @param {js.lang.String} msg - A JavaScript string containing zero or more substitution strings.
   * @param {js.lang.String} subst1 ... substN - JavaScript objects with which to replace substitution strings within msg. This gives you additional control over the format of the output.
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
   * @function
   * @public 
   * @summary Outputs an error message to the Web Console.
   * @description 打印误提示，支持printf风格的占位符。
   *
   * @param {js.lang.Object} obj1 ... objN - A list of JavaScript objects to output. The string representations of each of these objects are appended together in the order listed and output.
   * @param {js.lang.String} msg - A JavaScript string containing zero or more substitution strings.
   * @param {js.lang.String} subst1 ... substN - JavaScript objects with which to replace substitution strings within msg. This gives you additional control over the format of the output.
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
   * @function
   * @public 
   * @summary Displays an interactive list of the properties of the specified JavaScript object. The output is presented as a hierarchical listing with disclosure triangles that let you see the contents of child objects.
   * @description Displays an interactive list of the properties of the specified JavaScript object. The output is presented as a hierarchical listing with disclosure triangles that let you see the contents of child objects.
   *
   * @param {js.lang.Object} object - A JavaScript object whose properties should be output.
   */
  dir: function() {
    return (this._writer.dir || this.unsupport).apply(this._writer,
      arguments);
  },

  /** 
   * @function
   * @public 
   * @summary Starts recording a performance profile.
   * @description 
   * <p>
   * Starts recording a performance profile (for example, the Firefox performance tool).
   * </p><p>
   * You can optionally supply an argument to name the profile and this then enables you to stop only that profile if multiple profiles being recorded. See Console.profileEnd() to see how this argument is interpreted.
   * </p><p>
   * To stop recording call Console.profileEnd().
   * </p>
   *
   * @param {js.lang.String} profileName - The name to give the profile. Optional.
   */
  profile: function() {
    return (this._writer.profile || this.unsupport).apply(
      this._writer, arguments);
  },

  /** 
   * @function
   * @public 
   * @summary The profileEnd method stops recording a profile previously started with Console.profile().
   * @description 
   * <p>
   * The profileEnd method stops recording a profile previously started with Console.profile().
   * </p><p>
   * You can optionally supply an argument to name the profile. Doing so enables you to stop only that profile if you have multiple profiles being recorded.
   * </p><p><ul>
   * <li>if Console.profileEnd() is passed a profile name, and it matches the name of a profile being recorded, then that profile is stopped.</li>
   * <li>if Console.profileEnd() is passed a profile name and it does not match the name of a profile being recorded, no changes will be made.</li>
   * <li>if Console.profileEnd() is not passed a profile name, the most recently started profile is stopped.</li>
   * </ul></p>
   *
   * @param {js.lang.String} profileName - The name to give the profile. This parameter is optional.
   */
  profileEnd: function() {
    return (this._writer.profileEnd || this.unsupport).apply(
      this._writer, arguments);
  },

  /** 
   * @function
   * @public 
   * @summary Clears the console.
   * @description 
   * <p>
   * Clears the console.
   * </p><p>
   * The Console's contents will be replaced with an informational message like "Console was cleared".
   * </p><p>
   * Note that in Google Chrome, console.clear() has no effect if the user has selected "Preserve log upon navigation" in the settings.
   * </p>
   */
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
  /** 
   * @function
   * @public 
   * @summary Outputs a stack trace to the Web Console.
   * @description Outputs a stack trace to the Web Console.
   */
  trace: function() {
    return (this._writer.trace || this.unsupport).apply(
      this._writer, arguments);
  },

  /** 
   * @function
   * @public 
   * @summary Outputs a debug message to the Web Console.
   * @description 打印调试信息，支持printf风格的占位符。
   *
   * @param {js.lang.Object} obj1 ... objN - A list of JavaScript objects to output. The string representations of each of these objects are appended together in the order listed and output.
   * @param {js.lang.String} msg - A JavaScript string containing zero or more substitution strings.
   * @param {js.lang.String} subst1 ... substN - JavaScript objects with which to replace substitution strings within msg. This gives you additional control over the format of the output.
   */
  debug: function() {
    return (this._writer.debug || this.unsupport).apply(
      this._writer, arguments);
  },

  /** 
   * @function
   * @public 
   * @summary 用来显示网页的某个节点（node）所包含的html/xml代码。比如，先获取一个表格节点，然后，显示该节点包含的代码。dirxml(document.getElementById("ID"));
   * @description Displays an interactive tree of the descendant elements of the specified XML/HTML element. If it is not possible to display as an element the JavaScript Object view is shown instead. The output is presented as a hierarchical listing of expandable nodes that let you see the contents of child nodes.
   *
   * @param {js.lang.Object} object - A JavaScript object whose properties should be output.
   */
  dirxml: function() {
    return (this._writer.dirxml || this.unsupport).apply(
      this._writer, arguments);
  },

  /** 
   * @function
   * @public 
   * @summary Creates a new inline group in the Web Console log.
   * @description Creates a new inline group in the Web Console log. This indents all following output by an additional level, until console.groupEnd() is called.
   */
  group: function() {
    if (this._ie) {
      return this.println(arguments[0] || "***************start*****************");
    }
    return (this._writer.group || this.unsupport).apply(
      this._writer, arguments);
  },

  /** 
   * @function
   * @public 
   * @summary Exits the current inline group in the Web Console. 
   * @description Exits the current inline group in the Web Console. See Using groups in the console in the console documentation for details and examples.
   */
  groupCollapsed: function() {
    return (this._writer.groupCollapsed || this.unsupport).apply(
      this._writer, arguments);
  },

  /** 
   * @function
   * @public 
   * @summary Creates a new inline group in the Web Console.
   * @description Creates a new inline group in the Web Console. Unlike console.group(), however, the new group is created collapsed. The user will need to use the disclosure button next to it to expand it, revealing the entries created in the group. Call console.groupEnd() to back out to the parent group. See Using groups in the console in the console documentation for details and examples.
   */
  groupEnd: function() {
    if (this._ie) {
      return this.println(arguments[0] || "***************end*****************");
    }
    return (this._writer.groupEnd || this.unsupport).apply(
      this._writer, arguments);
  },

  /** 
   * @function
   * @public 
   * @summary 
   * @description 
   */
  markTimeline: function() {
    return (this._writer.markTimeline || this.unsupport).apply(
      this._writer, arguments);
  },

  /**
   * time()和timeEnd()，用来显示代码的运行时间。
   * 
   * time("计时器一"); ----待检测的代码---- timeEnd("计时器一");
   */
  /** 
   * @function
   * @public 
   * @summary Starts a timer you can use to track how long an operation takes.
   * @description Starts a timer you can use to track how long an operation takes. You give each timer a unique name, and may have up to 10,000 timers running on a given page. When you call console.timeEnd() with the same name, the browser will output the time, in milliseconds, that elapsed since the timer was started.
   *
   * @param {js.lang.String} label - The name to give the new timer. This will identify the timer; use the same name when calling console.timeEnd() to stop the timer and get the time output to the console.
   */
  time: function() {
    return (this._writer.time || this.unsupport).apply(
      this._writer, arguments);
  },

  /** 
   * @function
   * @public 
   * @summary Stops a timer that was previously started by calling console.time().
   * @description Stops a timer that was previously started by calling console.time().
   *
   * @param {js.lang.String} label - The name of the timer to stop. Once stopped, the elapsed time is automatically displayed in the Web Console.
   */
  timeEnd: function() {
    return (this._writer.timeEnd || this.unsupport).apply(
      this._writer, arguments);
  },

  /** 
   * @function
   * @public 
   * @summary Adds a single marker to the browser's Timeline or Waterfall tool.
   * @description 
   * <p>
   * Adds a single marker to the browser's Timeline or Waterfall tool. This lets you correlate a point in your code with the other events recorded in the timeline, such as layout and paint events.
   * </p><p>
   * You can optionally supply an argument to label the timestamp, and this label will then be shown alongside the marker.
   * </p>
   *
   * @param {}
   * @return {} 
   */
  timeStamp: function() {
    return (this._writer.timeStamp || this.unsupport).apply(
      this._writer, arguments);
  },

  /** 
   * @function
   * @public 
   * @summary Logs the number of times that this particular call to count() has been called.
   * @description 
   * <p>
   * Logs the number of times that this particular call to count() has been called. This function takes an optional argument label.
   * </p><p>
   * Note: This feature is available in Web Workers.
   * </p><p>
   * If label is supplied, this function logs the number of times count() has been called with that particular label.
   * </p><p>
   * If label is omitted, the function logs the number of times count() has been called at this particular line.
   * </p>
   *
   * @param {js.lang.String} label - A string. If this is supplied, count() outputs the number of times it has been called at this line and with that label.
   */
  count: function() {
    return (this._writer.count || this.unsupport).apply(
      this._writer, arguments);
  },

  /** 
   * @function
   * @public 
   * @summary Displays tabular data as a table.
   * @description 
   * <p>
   * Displays tabular data as a table.
   * </p><p>
   * This function takes one mandatory argument data, which must be an array or an object, and one additional optional parameter columns.
   * </p><p>
   * It logs data as a table. Each element in the array (or enumerable property if data is an object) will be a row in the table.
   * </p><p>
   * The first column in the table will be labeled (index). If data is an array, then its values will be the array indices. If data is an object, then its values will be the property names. Note that (in Firefox) console.table is limited to displaying 1000 rows (first row is the labeled index).
   * </p>
   *
   * @param {js.lang.Object} data - The data to display. This must be either an array or an object.
   * @param {js.lang.Array} columns - An array containing the names of columns to include in the output.
   */
  table: function() {
    return (this._writer.table || this.unsupport).apply(
      this._writer, arguments);
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

/**
 * @class js.lang.Throwable 
 * @extends {js.lang.Object}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The Throwable class is the superclass of all errors and exceptions in the jre framework. Only objects that are instances of this class (or one of its subclasses) are thrown by the JavaScript engine or can be thrown by the Java throw statement. Similarly, only this class or one of its subclasses can be the argument type in a catch clause.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Instances of two subclasses, Error and Exception, are conventionally used to indicate that exceptional situations have occurred. Typically, these instances are freshly created in the context of the exceptional situation so as to include relevant information (such as stack trace data).
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * A throwable contains a snapshot of the execution stack. It can also contain a message string that gives more information about the error. Over time, a throwable can suppress other throwables from being propagated. Finally, the throwable can also contain a cause: another throwable that caused this throwable to be constructed. The recording of this causal information is referred to as the chained exception facility, as the cause can, itself, have a cause, and so on, leading to a "chain" of exceptions, each caused by another.
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.Throwable.prototype */ {
  name: "class js.lang.Throwable extends Object",

  /** 
   * @name js.lang.Throwable.prototype.name
   * @private
   * @property {js.lang.String} the name of the error
   */
  "private name": "js.lang.Throwable",

  /** 
   * @name js.lang.Throwable.prototype.number
   * @private
   * @property {js.lang.Number} the code no. of the error
   */
  "private number": null,

  /** 
   * @name js.lang.Throwable.prototype.message
   * @private
   * @property {js.lang.String} Optional. Human-readable description of the error
   */
  "private message": null,

  /** 
   * @name js.lang.Throwable.prototype.description
   * @private
   * @property {js.lang.String} Optional. Error description. Similar to message.
   */
  "private description": null,

  /** 
   * @name js.lang.Throwable.prototype.fileName
   * @private
   * @property {js.lang.String} Optional. The name of the file containing the code that caused the exception
   */
  "private fileName": null, // 错误发生的文件( Only in FF )

  /** 
   * @name js.lang.Throwable.prototype.lineNumber
   * @private
   * @property {js.lang.String} Optional. The line number of the code that caused the exception
   */
  "private lineNumber": null,

  /** 
   * @name js.lang.Throwable.prototype.stack
   * @private
   * @property {js.lang.String} Stack trace.
   */
  "private stack": null, // 错误发生时的调用堆栈 FF Only 属性

  Throwable: function(message, fileName, lineNumber, stack, description) {
    this.message = message;
    this.fileName = fileName;
    this.stack = stack;
    this.lineNumber = lineNumber;
    this.description = description;
  },

  /** 
   * @function
   * @public 
   * @summary get the name of the error.
   * @description get the name of the error.
   *
   * @return {js.lang.String} the name of the error.
   */
  getName: function() {
    return this.name;
  },

  /** 
   * @function
   * @public 
   * @summary get the code no. of the error.
   * @description get the code no. of the error.
   *
   * @return {js.lang.String} the code no. of the error
   */
  getNumber: function() {
    return this.number;
  },

  /** 
   * @function
   * @public 
   * @summary get human-readable description of the error.
   * @description get human-readable description of the error.
   *
   * @return {js.lang.String} human-readable description of the error
   */
  getMessage: function() {
    return this.message;
  },

  /** 
   * @function
   * @public 
   * @summary get the error description(Similar to message).
   * @description get the error description(Similar to message).
   *
   * @return {js.lang.String} error description(Similar to message)
   */
  getDescription: function() {
    return this.description;
  },

  /** 
   * @function
   * @public 
   * @summary get the name of the file containing the code that caused the exception.
   * @description get the name of the file containing the code that caused the exception.
   *
   * @return {js.lang.String} Path to file that raised this error
   */
  getFileName: function() {
    return this.fileName;
  },

  /** 
   * @function
   * @public 
   * @summary 
   * @description
   *
   * @return {js.lang.String} Line number in file that raised this error.
   */
  getLineNumber: function() {
    return this.lineNumber;
  },

  /** 
   * @function
   * @public 
   * @summary get the stack trace of the error.
   * @description get the stack trace of the error.
   *
   * @return {js.lang.String} Stack trace.
   */
  getStack: function() {
    return this.stack;
  },

  /** 
   * @function
   * @public 
   * @summary get the stack trace of the error.
   * @description get the stack trace of the error.
   *
   * @return {js.lang.String} Stack trace.
   */
  getStackTrace: function() {
    return this.getStack();
  },

  /** 
   * @function
   * @public 
   * @summary 
   * @description
   *
   * @return {js.lang.String}
   */
  printStackTrace: function(printWriter) {
    if (!printWriter) {
      printWriter = js.lang.System.out;
    }

    if (!(printWriter instanceof js.io.PrintWriter)) {
      throw new js.lang.IllegalArgumentException("You can only print this throwable and its backtrace to the specified print writer.");
    }

    printWriter.println(this.stack);
  }
});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 12, 2014
 */

/**
 * @class js.lang.Exception 
 * @extends {js.lang.Throwable}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The class Exception and its subclasses are a form of Throwable that indicates conditions that a reasonable application might want to catch.
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.Exception.prototype */ {
  name: "class js.lang.Exception extends js.lang.Throwable",

  "private name": "js.lang.Exception", // 错误名

  "private number": 0, // 错误号

  Exception: function(message, fileName, lineNumber, stack, description) {
    this.message = message;
    this.fileName = fileName;
    this.stack = stack;
    this.lineNumber = lineNumber;
    this.description = description;
  },

  "toString": function() {
    var name = this.getClass().getFullName();
    return this.message ? name + ": " + this.message : name;
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

/**
 * @class js.lang.Error 
 * @extends {js.lang.Object}
 * @alias Error
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The Error constructor creates an error object. Instances of Error objects are thrown when runtime errors occur.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The Error object can also be used as a base object for user-defined exceptions. See below for standard built-in error types.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Runtime errors result in new Error objects being created and thrown.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * This page documents the use of the Error object itself and its use as a constructor function. For a list of properties and methods inherited by Error instances, see Error.prototype.
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.Error.prototype */ {
  name: "class Error",
  alias: "js.lang.Error",

  "private name": "js.lang.Error", // 错误名
  "private number": 1,

  Error: function(message, fileName, lineNumber, stack, description) {
    this.message = message;
    this.fileName = fileName;
    this.stack = stack;
    this.lineNumber = lineNumber;
    this.description = description;
  },

  'static init': function() {
    var methods = {},
      __methods = js.lang.Throwable.$class.getDeclaredMethods(),
      __length = __methods.length,
      __index = 0;
    for (; __index < __length; __index++) {
      methods[__methods[__index]._name] = __methods[__index]._value;
    }
    Object.extend(Error.prototype, methods, null, null, {
      writable: false,
      enumerable: false,
      configurable: false
    });
  }
});

js.lang.Error.init();
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 12, 2014
 */

/**
 * @class js.lang.IllegalArgumentException 
 * @extends {js.lang.Exception}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Thrown to indicate that a method has been passed an illegal or inappropriate argument.
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.IllegalArgumentException.prototype */ {
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
 * Date: Feb 19, 2014
 */

/** 
 * @class js.lang.ClassNotFoundException 
 * @extends {js.lang.Exception}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Thrown when an application tries to load in a class through its string name using:
 * <ul><li>The loadClass method in class ClassLoader.</li></ul>
 * but no definition for the class with the specified name could be found.
 * </p><br/>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.ClassNotFoundException.prototype */ {
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

/**
 * @class js.lang.NoSuchMethodException 
 * @extends {js.lang.Exception}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Thrown when a particular method cannot be found.
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.NoSuchMethodException.prototype */ {
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

/**
 * @class js.lang.NoSuchFieldException 
 * @extends {js.lang.Exception}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Signals that the class doesn't have a field of a specified name.
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.NoSuchFieldException.prototype */ {
  name: "class js.lang.NoSuchFieldException extends js.lang.Exception",
  "private name": "js.lang.NoSuchFieldException",
  "private number": 105
});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: 2015年2月10日
 */

/**
 * @class js.lang.InternalError 
 * @extends {js.lang.Error}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The InternalError object indicates an error that occurred internally in the JavaScript engine or jre framework. 
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.InternalError.prototype */ {
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

/**
 * @class js.lang.EvalError 
 * @extends {js.lang.Object}
 * @alias EvalError
 * @description
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The EvalError object indicates an error regarding the global eval() function.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * This exception is not thrown by JavaScript anymore, however the EvalError object remains for compatibility.
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.EvalError.prototype */ {
  name: "class EvalError",
  alias: "js.lang.EvalError",

  "private name": "js.lang.EvalError", // 错误名
  "private number": 2,

  /**
   * @name js.lang.EvalError.prototype.message
   * @private
   * @property {js.lang.String} Error message. Although ECMA-262 specifies that EvalError should provide its own message property, in SpiderMonkey, it inherits Error.prototype.message.
   */

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

/**
 * @class js.lang.SyntaxError 
 * @extends {js.lang.Object}
 * @alias SyntaxError
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The SyntaxError object represents an error when trying to interpret syntactically invalid code.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * A SyntaxError is thrown when the JavaScript engine encounters tokens or token order that does not conform to the syntax of the language when parsing code.
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.SyntaxError.prototype */ {
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

/**
 * @class js.lang.RangeError 
 * @extends {js.lang.Object}
 * @alias RangeError
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The RangeError object indicates an error when a value is not in the set or range of allowed values.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * A RangeError is thrown when trying to pass a number as an argument to a function that does not allow a range that includes that number. 
 * This can be encountered when attempting to create an array of an illegal length with the Array constructor, or when passing bad values to the numeric methods Number.toExponential(), Number.toFixed() or Number.toPrecision().
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.RangeError.prototype */ {
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


/**
 * @class js.lang.ReferenceError 
 * @extends {js.lang.Object}
 * @alias ReferenceError
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The ReferenceError object represents an error when a non-existent variable is referenced.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * A ReferenceError is thrown when trying to dereference a variable that has not been declared.
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.ReferenceError.prototype */ {
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

/**
 * @class js.lang.TypeError 
 * @extends {js.lang.Object}
 * @alias TypeError
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The TypeError object represents an error when a value is not of the expected type.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * A TypeError is thrown when an operand or argument passed to a function is incompatible with the type expected by that operator or function.
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.TypeError.prototype */ {
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
/** 
 * @abstract
 * @class js.lang.annotation.Getter
 * @extends {js.lang.Object}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * This is a field-level annotation.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Dynamic add a get method for this class, which to be named after the field property name. The get method is a pattern of data encapsulation. Instead of accessing the field directly, we define get methods to access it.
 * </p>
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The get method follows the following rules:
 * <ul>
 * <li>To convert the first letter of the field property name to uppercase, then prepend get to construct the read method name;</li>
 * <li>If the field property name starts with "_", ignore it;</li>
 * </ul>
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * For example:
 * <code>
 * Class.forName({
 *   name: "class GetterTest",
 *   "@Getter private name": "getter",
 *   "@Getter private _alias": "alias"
 * });
 * var test = new GetterTest();
 * test.getName();   //return value is "getter".
 * test.getAlias();  //return value is "alias".
 * </code>
 * </p><br/>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.annotation.Getter.prototype */ {
  name: "@interface js.lang.annotation.Getter",
  execute: function(self, field, Modifier, Attribute) {
    if (!field || Object.isFunction(field.getValue())) {
      throw new Error("ElemenetType must be field in js.lang.annotation.Getter");
    } else {
      // 属性上的注解
      if (field.getName() && field.getName().length > 1 && field.getName().length != "_") {
        var name = field.getName().indexOf("_") === 0 ? field.getName()
          .substring(1) : field.getName();
        name = name.charAt(0).toUpperCase() + name.substring(1);

        var modifier = Modifier.publicBit + Modifier.writableBit + Modifier.proxyableBit;
        // var modifier = 1 + 256 + 32;

        var getName = "get" + name;
        if (!self.hasDeclaredField(getName)) {
          self.addMethod(new Attribute(getName, function() {
            return this[field.getName()];
          }, self, modifier, []));
        }
      }
    }
  }
});
/** 
 * @abstract
 * @class js.lang.annotation.Setter
 * @extends {js.lang.Object}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * This is a field-level annotation.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Dynamic add a set method for this class, which to be named after the field property name. The set method is a pattern of data encapsulation. Instead of accessing the field directly, we define set methods to modify it.
 * </p>
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The set method follows the following rules:
 * <ul>
 * <li>To convert the first letter of the field property name to uppercase, then prepend set to construct the write method name;</li>
 * <li>If the field property name starts with "_", ignore it;</li>
 * </ul>
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * For example:
 * <code>
 * Class.forName({
 * name: "class SetterTest",
 *   "@Setter private name": "setter",
 *   "@Setter private _alias": "alias"
 * });
 * var test = new SetterTest();
 * test.setName();   //return value is "setter".
 * test.setAlias();  //return value is "alias".
 * </code>
 * </p><br/>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName({
  name: "@interface js.lang.annotation.Setter",
  execute: function(self, field, Modifier, Attribute) {
    if (!field || Object.isFunction(field.getValue())) {
      throw new Error("ElemenetType must be field in js.lang.annotation.Setter");
    } else {
      // 属性上的注解
      if (field.getName() && field.getName().length > 1 && field.getName().length != "_") {
        var name = field.getName().indexOf("_") === 0 ? field.getName()
          .substring(1) : field.getName();
        name = name.charAt(0).toUpperCase() + name.substring(1);

        var modifier = Modifier.publicBit + Modifier.writableBit + Modifier.proxyableBit;
        // var modifier = 1 + 256 + 32;

        var setName = "set" + name;
        if (!self.hasDeclaredField(setName)) {
          self.addMethod(new Attribute(setName, function(value) {
            this[field.getName()] = value;
          }, self, modifier, []));
        }
      }
    }
  }
});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 17, 2014
 */

/**
 * @class js.lang.ClassLoader 
 * @extends {js.lang.Object}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * A class loader is an object that is responsible for loading classes. The class ClassLoader is an abstract class. Given the binary name of a class, a class loader should attempt to locate or generate data that constitutes a definition for the class. A typical strategy is to transform the name into a file name or a url and then read a "class file" of that name from a file system or a remote resources.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Every Class object contains a reference to the ClassLoader that defined it.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Applications implement subclasses of ClassLoader in order to extend the manner in which the js engine dynamically loads classes.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The ClassLoader class uses a delegation model to search for classes and resources. Each instance of ClassLoader has an associated parent class loader. When requested to find a class or resource, a ClassLoader instance will delegate the search for the class or resource to its parent class loader after attempting to find the class or resource itself. The jre framework built-in class loader, called the "bootstrap class loader", does not itself have a parent but may serve as the parent of a ClassLoader instance.
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.ClassLoader.prototype */ {
  name: "abstract class js.lang.ClassLoader extends Object",

  '@Setter @Getter private parent': null,

  '@Setter @Getter private classes': [],

  /** 
   * @name js.lang.ClassLoader.prototype.loadClass
   * @function
   * @abstract 
   * @summary Loads the class with the specified unqiue url.
   * @description 
   *
   * @param {js.lang.String} scriptUrl - the url of the class file
   * @param {js.lang.Function} callback - callback after class file loaded
   * @param {js.lang.Object} scope - the callback function's execution context
   */
  "abstract loadClass": function(scriptUrl, callback, scope) {},

  /** 
   * @name js.lang.ClassLoader.getSystemClassLoader
   * @function
   * @static 
   * @summary Returns the system class loader for delegation.
   * @description 
   *
   * @return {js.lang.ClassLoader} The system ClassLoader for delegation, or null if none
   */
  'static getSystemClassLoader': function() {
    return atom.misc.Launcher.getLauncher().getClassLoader();
  }
});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 13, 2014
 */

/**
 * @class js.lang.System 
 * @extends {js.lang.Object}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The System class contains several useful class fields and methods. It cannot be instantiated.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Among the facilities provided by the System class are standard input, standard output, and error output streams; access to externally defined properties and environment variables; a means of loading files and libraries; and a utility method for quickly copying a portion of an array.
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.System.prototype */ {
  name: "class js.lang.System extends Object",

  /**
   * @name js.lang.System.err
   * @public
   * @static
   * @property {js.io.PrintWriter} 
   * @summary The "standard" error output stream. 
   * @description The "standard" error output stream. This stream is already open and ready to accept output data. Typically this stream corresponds to display output or another output destination specified by the host environment or user. By convention, this output stream is used to display error messages or other information that should come to the immediate attention of a user even if the principal output stream, the value of the variable out, has been redirected to a file or other destination that is typically not continuously monitored.
   */
  "static err": null, // 错误流

  /**
   * @name js.lang.System.out
   * @public
   * @static
   * @property {js.io.PrintWriter} 
   * @summary The "standard" output stream. 
   * @description The "standard" output stream. This stream is already open and ready to accept output data. Typically this stream corresponds to display output or another output destination specified by the host environment or user.
   */
  "static out": null, // 输出流

  "private static properties": {},

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
   * @name js.lang.System.getEnv
   * @function
   * @public
   * @static
   * @summary 
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Gets the value of the specified environment variable, or returns an unmodifiable string map view of the current system environment.
   * </p>
   *
   * @param {js.lang.String} env - Optional. the name of the environment variable
   * @return {js.lang.Object} 
   */
  "static getEnv": function(env) {
    return (env) ? this._env[env] : this._env;
  },

  /**
   * @name js.lang.System.setOut
   * @function
   * @public
   * @static
   * @summary Reassigns the "standard" output stream.
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Reassigns the "standard" output stream.
   * </p>
   *
   * @param {js.io.PrintWriter} out - the new standard output stream 
   */
  "static setOut": function(out) {
    js.lang.System.out = out;
  },

  /**
   * @name js.lang.System.setError
   * @function
   * @public
   * @static
   * @summary Reassigns the "standard" error output stream.
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Reassigns the "standard" error output stream.
   * </p>
   *
   * @param {js.io.PrintWriter} err - the new standard error output stream.
   */
  "static setError": function(err) {
    js.lang.System.err = err;
  },

  /**
   * @name js.lang.System.currentTimeMillis
   * @function
   * @public
   * @static
   * @summary Returns the current time in milliseconds.
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Returns the current time in milliseconds. Note that while the unit of time of the return value is a millisecond, the granularity of the value depends on the underlying operating system and may be larger. For example, many operating systems measure time in units of tens of milliseconds.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;See the description of the class Date for a discussion of slight discrepancies that may arise between "computer time" and coordinated universal time (UTC).
   * </p>
   *
   * @param {Number} the difference, measured in milliseconds, between the current time and midnight, January 1, 1970 UTC.
   */
  "public static currentTimeMillis": function() {
    return new Date().getTime();
  },

  /**
   * @name js.lang.System.arraycopy
   * @function
   * @public
   * @static
   * @summary Copies an array from the specified source array, beginning at the specified position, to the specified position of the destination array.
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Copies an array from the specified source array, beginning at the specified position, to the specified position of the destination array. A subsequence of array components are copied from the source array referenced by src to the destination array referenced by dest. The number of components copied is equal to the length argument. The components at positions srcPos through srcPos+length-1 in the source array are copied into positions destPos through destPos+length-1, respectively, of the destination array.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * If the src and dest arguments refer to the same array object, then the copying is performed as if the components at positions srcPos through srcPos+length-1 were first copied to a temporary array with length components and then the contents of the temporary array were copied into positions destPos through destPos+length-1 of the destination array.
   * </p>
   *
   * @param {Array} src - the source array.
   * @param {Number} srcPos - starting position in the source array.
   * @param {Number} dest - the destination array.
   * @param {Number} destPos - starting position in the destination data.
   * @param {Number} length - the number of array elements to be copied.
   */
  "public static arraycopy": function(src, srcPos, dest, destPos, length) {
    var parameter = Array.prototype.slice.call(src, srcPos, srcPos + length);
    Array.prototype.splice.call(parameter, 0, 0, destPos, 0);
    Array.prototype.splice.apply(dest, parameter);
  },

  /**
   * @name js.lang.System.setProperty
   * @function
   * @public
   * @static
   * @summary Sets the system property indicated by the specified key.
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Sets the system property indicated by the specified key.
   * </p>
   *
   * @param {js.lang.String} key - the name of the system property.
   * @param {js.lang.String} value - the value of the system property.
   */
  "public static setProperty": function(name, value) {
    js.lang.System.properties[name] = value;
  },

  /**
   * @name js.lang.System.getProperty
   * @function
   * @public
   * @static
   * @summary Gets the system property indicated by the specified key.
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Gets the system property indicated by the specified key.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * If there is no current set of system properties, a set of system properties is first created and initialized in the same manner as for the getProperties method.
   * </p>
   *
   * @param {js.lang.String} key - the name of the system property.
   * @return {js.lang.String} the string value of the system property, or null if there is no property with that key.
   */
  "public static getProperty": function(key) {
    return js.lang.System.properties[key];
  },

  /**
   * @name js.lang.System.setProperties
   * @function
   * @public
   * @static
   * @summary Sets the system properties to the Properties argument.
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Sets the system properties to the Properties argument. 
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * The argument becomes the current set of system properties for use by the getProperty(String) method. If the argument is null, then the current set of system properties is forgotten.
   * </p>
   *
   * @param {js.lang.Object} props - the new system properties.
   */
  "public static setProperties": function(props) {
    js.lang.System.properties = props;
  },

  /**
   * @name js.lang.System.getProperties
   * @function
   * @public
   * @static
   * @summary Determines the current system properties.
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Determines the current system properties.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * The current set of system properties for use by the getProperty(String) method is returned as a Properties object. If there is no current set of system properties, a set of system properties is first created and initialized. This set of system properties always includes values for the following keys:
   * <ul>
   * <li>atom.root.dirs - project root path</li>
   * <li>atom.bootstrap.class.path - jre class path</li>
   * <li>js.ext.dirs - List of paths to search when loading libraries</li>
   * <li>js.class.path - project class path</li>
   * <li>js.test.dirs - project test class path</li>
   * <li>css.bootstrap.dirs - jre css path</li>
   * <li>css.ext.dirs - List of css paths to search when loading libraries</li>
   * <li>css.class.path - project css path</li>
   * <li>css.skin.path - project skin path</li>
   * <li>template.bootstrap.dirs - jre template path</li>
   * <li>template.ext.dirs - List of template paths to search when loading libraries</li>
   * <li>template.class.path - project template path</li>
   * <li>main - project main class path</li>
   * <li>debug - project debug switch</li>
   * <li>version - project version</li>
   * <li>loglevel - project log level</li>
   * <li>target - project runtime target</li>
   * <li>servletpath - project servlet path</li>
   * <li>skin - project skin name</li>
   * <li>immediately - if execute main class immediately or not</li>
   * </ul>
   * </p>
   *
   * @return {js.lang.Object} the system properties
   */
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
   * @param {js.lang.Object}
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
 * @class org.seajs.SeaClassLoader
 * @extends {js.lang.Object} 
 * @description Sea.js 3.0.0 | seajs.org/LICENSE.md
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
(function(global, undefined) /** @lends org.seajs.SeaClassLoader.prototype */ {

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
        path += "&v=" + version;
      } else {
        path += "?v=" + version;
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
        (requestCache[emitData.requestUri] = sendRequest) :
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
      (anonymousMeta = meta);
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
 * Date: Feb 12, 2014
 */

/**
 * @class js.lang.NullPointerException 
 * @extends {js.lang.Exception}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Thrown when an application attempts to use null in a case where an object is required. These include:
 * <ul><li>Calling the instance method of a null object.</li>
 * <li>Accessing or modifying the field of a null object.</li>
 * <li>Taking the length of null as if it were an array.</li>
 * <li>Accessing or modifying the slots of null as if it were an array.</li>
 * <li>Throwing null as if it were a Throwable value.</li>
 * </ul></p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Applications should throw instances of this class to indicate other illegal uses of the null object. 
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.NullPointerException.prototype */ {
  name: "class js.lang.NullPointerException extends js.lang.Exception",
  "private name": "js.lang.NullPointerException",
  "private number": 107
});
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
    path = null,
    mainClass = null,
    skin = null,
    loglevel = null,
    target = null,
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
      s = script.getAttribute("skin"),
      t = script.getAttribute("target"),
      ll = script.getAttribute("loglevel");

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
      target = t || 'local';
      loglevel = ll || 'error';
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
  js.lang.System.setProperty("loglevel", loglevel);
  js.lang.System.setProperty("target", target);
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
 * Date: Feb 14, 2014
 */

/** 
* @class js.lang.reflect.InvocationTargetException 
* @extends {js.lang.Exception}
* @description 
* <p>&nbsp;&nbsp;&nbsp;&nbsp;
* InvocationTargetException is a checked exception that wraps an exception thrown by an invoked method or constructor.
* </p><br/>
 
* @author lico
* @version 0.1.1
* @since 0.0.1
*/
Class
  .forName( /** @lends js.lang.reflect.InvocationTargetException.prototype */ {
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

/** 
 * @class js.lang.reflect.Constructor 
 * @extends {js.lang.Object}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Constructor provides information about, and access to, a single constructor for a class.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Constructor permits widening conversions to occur when matching the actual parameters to newInstance() with the underlying constructor's formal parameters, but throws an IllegalArgumentException if a narrowing conversion would occur.
 * </p><br/>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.reflect.Constructor.prototype */ {
  name: "class js.lang.reflect.Constructor extends Object",

  "@Setter private _declaringClass": null,
  "@Setter private _name": null,
  "@Setter private _modifiers": null,
  "@Setter @Getter private _annotations": null,
  "@Setter private _value": null,

  Constructor: function(name, value, declaringClass, modifiers, annotations) {
    this._name = name;
    this._declaringClass = declaringClass;
    this._modifiers = modifiers;
    this._annotations = annotations;
    this._value = value;
  },

  /** 
   * @function
   * @public 
   * @summary Gets the constructor.
   * @description 
   * 
   * @return {js.lang.Object} the value of the constructor
   */
  getValue: function() {
    return this._value;
  },

  /** 
   * @function
   * @public 
   * @summary Returns this element's annotation for the specified type if such an annotation is present, else null.
   * @description 
   *
   * @param {js.lang.Class} annotationClass - the Class object corresponding to the annotation type
   * @return {js.lang.Object} this element's annotation for the specified annotation type if present on this element, else null
   */
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

  /** 
   * @function
   * @public 
   * @summary return itself
   * @description 
   *
   * @return {js.lang.reflect.Constructor} itself
   */
  clone: function() {
    return this;
  },

  /** 
   * @function
   * @public 
   * @summary Returns all this element's annotations.
   * @description 
   *
   * @return {js.lang.Array} 
   */
  getDeclaredAnnotations: function() {
    return this._annotations;
  },

  /** 
   * @function
   * @public 
   * @summary Returns the Class object representing the class or interface that declares the constructor represented by this constructor object.
   * @description 
   *
   * @return {js.lang.Class} an object representing the declaring class of the underlying member
   */
  getDeclaringClass: function() {
    return this._declaringClass;
  },

  /** 
   * @function
   * @public 
   * @summary Returns the name of the constructor represented by this constructor object.
   * @description 
   *
   * @return {js.lang.String} the simple name of the underlying member
   */
  getName: function() {
    return this._name;
  },

  /** 
   * @function
   * @public 
   * @summary Returns the modifiers for the constructor represented by this constructor object, as an integer.
   * @description 
   *
   * @return {js.lang.Number} the modifiers for the underlying member
   */
  getModifiers: function() {
    return this._modifiers;
  }

});

js.lang.reflect.Constructor.loaded = true;
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 14, 2014
 */

/** 
 * @class js.lang.reflect.Field 
 * @extends {js.lang.Object}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * A Field provides information about, and dynamic access to, a single field of a class or an interface. The reflected field may be a class (static) field or an instance field.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * A Field permits widening conversions to occur during a get or set access operation, but throws an IllegalArgumentException if a narrowing conversion would occur.
 * </p><br/>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.reflect.Field.prototype */ {
  name: "public final class js.lang.reflect.Field extends Object",
  "@Setter private _declaringClass": null,
  "@Setter private _name": null,
  "@Setter private _modifiers": null,
  "@Setter @Getter private _annotations": null,
  "@Setter private _value": null,

  Field: function(name, value, declaringClass, modifiers, annotations) {
    this._name = name;
    this._declaringClass = declaringClass;
    this._modifiers = modifiers;
    this._annotations = annotations;
    this._value = value;
  },

  /** 
   * @function
   * @public 
   * @summary Sets the field represented by this Field object on the specified object argument to the specified new value.
   * @description
   * <p> 
   * Sets the field represented by this Field object on the specified object argument to the specified new value. The new value is automatically unwrapped if the underlying field has a primitive type.
   * </p><p>
   * The operation proceeds as follows:
   * </p><p>
   * If the underlying field is static, the obj argument is ignored; it may be null.
   * </p><p>
   * Otherwise the underlying field is an instance field. If the specified object argument is null, the method throws a NullPointerException. If the specified object argument is not an instance of the class or interface declaring the underlying field, the method throws an IllegalArgumentException.
   * </p><p>
   * If this Field object is enforcing Java language access control, and the underlying field is inaccessible, the method throws an IllegalAccessException.
   * </p><p>
   * If the underlying field is final, the method throws an IllegalAccessException unless setAccessible(true) has succeeded for this Field object and the field is non-static. Setting a final field in this way is meaningful only during deserialization or reconstruction of instances of classes with blank final fields, before they are made available for access by other parts of a program. Use in any other context may have unpredictable effects, including cases in which other parts of a program continue to use the original value of this field.
   * </p><p>
   * If the underlying field is of a primitive type, an unwrapping conversion is attempted to convert the new value to a value of a primitive type. If this attempt fails, the method throws an IllegalArgumentException.
   * </p><p>
   * If, after possible unwrapping, the new value cannot be converted to the type of the underlying field by an identity or widening conversion, the method throws an IllegalArgumentException.
   * </p><p>
   * If the underlying field is static, the class that declared the field is initialized if it has not already been initialized.
   * </p><p>
   * The field is set to the possibly unwrapped and widened new value.
   * </p><p>
   * If the field is hidden in the type of obj, the field's value is set according to the preceding rules.
   * </p>
   *
   * @param {js.lang.Object} obj - the object whose field should be modified
   * @param {js.lang.Object} value - the new value for the field of obj being modified 
   */
  "set": function(obj, value) {
    obj[this._name] = value;
  },

  /** 
   * @function
   * @public 
   * @summary Returns the value of the field represented by this Field, on the specified object.  
   * @description 
   * <p>
   * Returns the value of the field represented by this Field, on the specified object. The value is automatically wrapped in an object if it has a primitive type.
   * </p><p>
   * The underlying field's value is obtained as follows:
   * </p><p>
   * If the underlying field is a static field, the obj argument is ignored; it may be null.
   * </p><p>
   * Otherwise, the underlying field is an instance field. If the specified obj argument is null, the method throws a NullPointerException. If the specified object is not an instance of the class or interface declaring the underlying field, the method throws an IllegalArgumentException.
   * </p><p>
   * If this Field object is enforcing Java language access control, and the underlying field is inaccessible, the method throws an IllegalAccessException. If the underlying field is static, the class that declared the field is initialized if it has not already been initialized.
   * </p><p>
   * Otherwise, the value is retrieved from the underlying instance or static field. If the field has a primitive type, the value is wrapped in an object before being returned, otherwise it is returned as is.
   * </p><p>
   * If the field is hidden in the type of obj, the field's value is obtained according to the preceding rules.
   * </p>
   *
   * @param {js.lang.Object} obj - object from which the represented field's value is to be extracted
   * @return {js.lang.Object} the value of the represented field in object obj; primitive values are wrapped in an appropriate object before being returned
   */
  "get": function(obj) {
    return obj[this._name];
  },

  /** 
   * @function
   * @public 
   * @summary Gets the value of a static or instance field.
   * @description 
   * 
   * @param {js.lang.Object} obj - the object to extract the value from
   * @return {js.lang.Object} the value of the field
   */
  getValue: function(obj) {
    return obj ? this.get(obj) : this._value;
  },

  /** 
   * @function
   * @public 
   * @summary Returns this element's annotation for the specified type if such an annotation is present, else null.
   * @description 
   *
   * @param {js.lang.Class} annotationClass - the Class object corresponding to the annotation type
   * @return {js.lang.Object} this element's annotation for the specified annotation type if present on this element, else null
   */
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

  /** 
   * @function
   * @public 
   * @summary return itself
   * @description 
   *
   * @return {js.lang.reflect.Field} itself
   */
  clone: function() {
    return this;
  },

  /** 
   * @function
   * @public 
   * @summary Returns all this element's annotations.
   * @description 
   *
   * @return {js.lang.Array} 
   */
  getDeclaredAnnotations: function() {
    return this._annotations;
  },

  /** 
   * @function
   * @public 
   * @summary Returns the Class object representing the class or interface that declares the field represented by this Field object.
   * @description 
   *
   * @return {js.lang.Class} an object representing the declaring class of the underlying member
   */
  getDeclaringClass: function() {
    return this._declaringClass;
  },

  /** 
   * @function
   * @public 
   * @summary Returns the name of the field represented by this Field object.
   * @description 
   *
   * @return {js.lang.String} the simple name of the underlying member
   */
  getName: function() {
    return this._name;
  },

  /** 
   * @function
   * @public 
   * @summary Returns the modifiers for the field represented by this Field object, as an integer.
   * @description 
   *
   * @return {js.lang.Number} the modifiers for the underlying member
   */
  getModifiers: function() {
    return this._modifiers;
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

/** 
 * @class js.lang.reflect.Method 
 * @extends {js.lang.Object}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * A Method provides information about, and access to, a single method on a class or interface. The reflected method may be a class method or an instance method (including an abstract method).
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * A Method permits widening conversions to occur when matching the actual parameters to invoke with the underlying method's formal parameters, but it throws an IllegalArgumentException if a narrowing conversion would occur.
 * </p><br/>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.reflect.Method.prototype */ {
  name: "public final class js.lang.reflect.Method extends Object",

  "@Setter private _declaringClass": null,
  "@Setter private _name": null,
  "@Setter private _modifiers": null,
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

  /** 
   * @function
   * @public 
   * @summary return itself
   * @description 
   *
 * @return {    js.lang.reflect.Method
  }
  itself
   */
  clone: function() {
    return this;
  },

  /** 
   * @function
   * @public 
   * @summary Invokes the underlying method represented by this Method object, on the specified object with the specified parameters.
   * @description 
   * <p>
   * Invokes the underlying method represented by this Method object, on the specified object with the specified parameters. Individual parameters are automatically unwrapped to match primitive formal parameters, and both primitive and reference parameters are subject to method invocation conversions as necessary.
   * </p><p>
   * If the underlying method is static, then the specified obj argument is ignored. It may be null.
   * </p><p>
   * If the number of formal parameters required by the underlying method is 0, the supplied args array may be of length 0 or null.
   * </p><p>
   * If the underlying method is an instance method, it is invoked using dynamic method lookup as documented in The Java Language Specification, Second Edition, section 15.12.4.4; in particular, overriding based on the runtime type of the target object will occur.
   * </p><p>
   * If the underlying method is static, the class that declared the method is initialized if it has not already been initialized.
   * </p><p>
   * If the method completes normally, the value it returns is returned to the caller of invoke; if the value has a primitive type, it is first appropriately wrapped in an object. However, if the value has the type of an array of a primitive type, the elements of the array are not wrapped in objects; in other words, an array of primitive type is returned. If the underlying method return type is void, the invocation returns null.
   * </p>
   *
   * @param {js.lang.Object} obj - the object the underlying method is invoked from
   * @param {js.lang.Object} args - the arguments used for the method call
   * @return {js.lang.Object} the result of dispatching the method represented by this object on obj with parameters args
   */
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
  },

  /** 
   * @function
   * @public 
   * @summary Returns all this element's annotations.
   * @description 
   *
   * @return {js.lang.Array} 
   */
  getDeclaredAnnotations: function() {
    return this._annotations;
  },

  /** 
   * @function
   * @public 
   * @summary Returns the name of the method represented by this Method object, as a String.
   * @description 
   *
   * @return {js.lang.String} the simple name of the underlying member
   */
  getName: function() {
    return this._name;
  },

  /** 
   * @function
   * @public 
   * @summary Returns the Class object representing the class or interface that declares the executable represented by this object.
   * @description 
   *
   * @return {js.lang.Class} an object representing the declaring class of the underlying member
   */
  getDeclaringClass: function() {
    return this._declaringClass;
  },

  /** 
   * @function
   * @public 
   * @summary Returns the modifiers for the executable represented by this object.
   * @description 
   *
   * @return {js.lang.Number} the modifiers for the underlying member
   */
  getModifiers: function() {
    return this._modifiers;
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
 * @class js.lang.reflect.Modifier 
 * @extends {js.lang.Object}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The Modifier class provides static methods and constants to decode class and member access modifiers. The sets of modifiers are represented as numbers with distinct bit positions representing different modifiers. The values for the constants representing the modifiers are taken from the tables in sections 4.1, 4.4, 4.5, and 4.7 of The Java™ Virtual Machine Specification.
 * </p><br/>
 
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName({
  name: "public class js.lang.reflect.Modifier extends Object",

  /** 
   * @name js.lang.reflect.Modifier.ANNOTATION
   * @public
   * @static
   * @constant
   * @property {js.lang.Number} The value representing the annotation modifier.
   */
  "public static final ANNOTATION": 2048,

  /** 
   * @name js.lang.reflect.Modifier.ABSTRACT
   * @public
   * @static
   * @constant
   * @property {js.lang.Number} The value representing the abstract modifier.
   */
  "public static final ABSTRACT": 1024,

  /** 
   * @name js.lang.reflect.Modifier.INTERFACE
   * @public
   * @static
   * @constant
   * @property {js.lang.Number} The value representing the interface modifier.
   */
  "public static final INTERFACE": 512,

  /** 
   * @name js.lang.reflect.Modifier.WRITABLE
   * @public
   * @static
   * @constant
   * @property {js.lang.Number} The value representing the writable modifier.
   */
  "public static final WRITABLE": 256,

  /** 
   * @name js.lang.reflect.Modifier.ENUMERABLE
   * @public
   * @static
   * @constant
   * @property {js.lang.Number} The value representing the enumerable modifier.
   */
  "public static final ENUMERABLE": 128,

  /** 
   * @name js.lang.reflect.Modifier.CONFIGURABLE
   * @public
   * @static
   * @constant
   * @property {js.lang.Number} The value representing the configurable modifier.
   */
  "public static final CONFIGURABLE": 64,

  /** 
   * @name js.lang.reflect.Modifier.PROXYABLE
   * @public
   * @static
   * @constant
   * @property {js.lang.Number} The value representing the proxyable modifier.
   */
  "public static final PROXYABLE": 32,

  /** 
   * @name js.lang.reflect.Modifier.FINAL
   * @public
   * @static
   * @constant
   * @property {js.lang.Number} The value representing the final modifier.
   */
  "public static final FINAL": 16,

  /** 
   * @name js.lang.reflect.Modifier.STATIC
   * @public
   * @static
   * @constant
   * @property {js.lang.Number} The value representing the static modifier.
   */
  "public static final STATIC": 8,

  /**
   * @name js.lang.reflect.Modifier.PROTECTED
   * @public
   * @static
   * @constant
   * @property {js.lang.Number} The value representing the protected modifier.
   */
  "public static final PROTECTED": 4,

  /** 
   * @name js.lang.reflect.Modifier.PRIVATE
   * @public
   * @static
   * @constant
   * @property {js.lang.Number} The value representing the private modifier.
   */
  "public static final PRIVATE": 2,

  /** 
   * @name js.lang.reflect.Modifier.PUBLIC
   * @public
   * @static
   * @constant
   * @property {js.lang.Number} The value representing the public modifier.
   */
  "public static final PUBLIC": 1,

  /** 
   * @name js.lang.reflect.Modifier.DEFAULT
   * @public
   * @static
   * @constant
   * @property {js.lang.Number} The value representing the default modifier.
   */
  "public static final DEFAULT": 0,

  /** 
   * @name js.lang.reflect.Modifier.isInterface
   * @function
   * @public 
   * @static 
   * @summary Return true if the number argument includes the interface modifier, false otherwise.
   * @description 
   *
   * @param {js.lang.Number} mod - a set of modifiers
   * @return {js.lang.Boolean} true if mod includes the interface modifier; false otherwise.
   */
  "public static isInterface": function(mod) {
    return (mod & js.lang.reflect.Modifier.INTERFACE) !== 0;
  },

  /** 
   * @name js.lang.reflect.Modifier.isAnnotation
   * @function
   * @public 
   * @static 
   * @summary Return true if the number argument includes the annotation modifier, false otherwise.
   * @description 
   *
   * @param {js.lang.Number} mod - a set of modifiers
   * @return {js.lang.Boolean} true if mod includes the annotation modifier; false otherwise.
   */
  "public static isAnnotation": function(mod) {
    return (modifiers & js.lang.reflect.Modifier.ANNOTATION) !== 0;
  },

  /** 
   * @name js.lang.reflect.Modifier.isAbstract
   * @function
   * @public 
   * @static 
   * @summary Return true if the number argument includes the abstract modifier, false otherwise.
   * @description 
   *
   * @param {js.lang.Number} mod - a set of modifiers
   * @return {js.lang.Boolean} true if mod includes the abstract modifier; false otherwise.
   */
  "public static isAbstract": function(mod) {
    return (mod & js.lang.reflect.Modifier.ABSTRACT) !== 0;
  },

  /** 
   * @name js.lang.reflect.Modifier.isFinal
   * @function
   * @public 
   * @static 
   * @summary Return true if the number argument includes the final modifier, false otherwise.
   * @description 
   *
   * @param {js.lang.Number} mod - a set of modifiers
   * @return {js.lang.Boolean} true if mod includes the final modifier; false otherwise.
   */
  "public static isFinal": function(mod) {
    return (mod & js.lang.reflect.Modifier.FINAL) !== 0;
  },

  /** 
   * @name js.lang.reflect.Modifier.isPrivate
   * @function
   * @public 
   * @static 
   * @summary Return true if the number argument includes the private modifier, false otherwise.
   * @description 
   *
   * @param {js.lang.Number} mod - a set of modifiers
   * @return {js.lang.Boolean} true if mod includes the private modifier; false otherwise.
   */
  "public static isPrivate": function(mod) {
    return (mod & js.lang.reflect.Modifier.PRIVATE) !== 0;
  },

  /** 
   * @name js.lang.reflect.Modifier.isProtected
   * @function
   * @public 
   * @static 
   * @summary Return true if the number argument includes the protected modifier, false otherwise.
   * @description 
   *
   * @param {js.lang.Number} mod - a set of modifiers
   * @return {js.lang.Boolean} true if mod includes the protected modifier; false otherwise.
   */
  "public static isProtected": function(mod) {
    return (mod & js.lang.reflect.Modifier.PROTECTED) !== 0;
  },

  /** 
   * @name js.lang.reflect.Modifier.isPublic
   * @function
   * @public 
   * @static 
   * @summary Return true if the number argument includes the public modifier, false otherwise.
   * @description 
   *
   * @param {js.lang.Number} mod - a set of modifiers
   * @return {js.lang.Boolean} true if mod includes the public modifier; false otherwise.
   */
  "public static isPublic": function(mod) {
    return (mod & js.lang.reflect.Modifier.PUBLIC) !== 0;
  },

  /** 
   * @name js.lang.reflect.Modifier.isStatic
   * @function
   * @public 
   * @static 
   * @summary Return true if the number argument includes the static modifier, false otherwise.
   * @description 
   *
   * @param {js.lang.Number} mod - a set of modifiers
   * @return {js.lang.Boolean} true if mod includes the static modifier; false otherwise.
   */
  "public static isStatic": function(mod) {
    return (mod & js.lang.reflect.Modifier.STATIC) !== 0;
  },

  /** 
   * @name js.lang.reflect.Modifier.isDefault
   * @function
   * @public 
   * @static 
   * @summary Return true if the number argument includes the default modifier, false otherwise.
   * @description 
   *
   * @param {js.lang.Number} mod - a set of modifiers
   * @return {js.lang.Boolean} true if mod includes the default modifier; false otherwise.
   */
  "public static isDefault": function(mod) {
    return (mod & js.lang.reflect.Modifier.DEFAULT) !== 0;
  },

  /** 
   * @name js.lang.reflect.Modifier.isProxyable
   * @function
   * @public 
   * @static 
   * @summary Return true if the number argument includes the proxyable modifier, false otherwise.
   * @description 
   *
   * @param {js.lang.Number} mod - a set of modifiers
   * @return {js.lang.Boolean} true if mod includes the proxyable modifier; false otherwise.
   */
  "public static isProxyable": function(mod) {
    return (mod & js.lang.reflect.Modifier.PROXYABLE) !== 0;
  },

  /**
   * @name js.lang.reflect.Modifier.isWritable
   * @function
   * @public 
   * @static 
   * @summary Return true if the number argument includes the writable modifier, false otherwise.
   * @description 
   *
   * @param {js.lang.Number} mod - a set of modifiers
   * @return {js.lang.Boolean} true if mod includes the writable modifier; false otherwise.
   */
  "public static isWritable": function(mod) {
    return (mod & js.lang.reflect.Modifier.WRITABLE) !== 0;
  },

  /** 
   * @name js.lang.reflect.Modifier.isEnumerable
   * @function
   * @public 
   * @static 
   * @summary Return true if the number argument includes the enumerable modifier, false otherwise.
   * @description 
   *
   * @param {js.lang.Number} mod - a set of modifiers
   * @return {js.lang.Boolean} true if mod includes the enumerable modifier; false otherwise.
   */
  "public static isEnumerable": function(mod) {
    return (mod & js.lang.reflect.Modifier.ENUMERABLE) !== 0;
  },

  /** 
   * @name js.lang.reflect.Modifier.isConfigurable
   * @function
   * @public 
   * @static 
   * @summary Return true if the number argument includes the configurable modifier, false otherwise.
   * @description 
   *
   * @param {js.lang.Number} mod - a set of modifiers
   * @return {js.lang.Boolean} true if mod includes the configurable modifier; false otherwise.
   */
  "public static isConfigurable": function(mod) {
    return (mod & js.lang.reflect.Modifier.CONFIGURABLE) !== 0;
  },

  /** 
   * @function
   * @public 
   * @summary return itself
   * @description 
   *
   * @return {js.lang.reflect.Modifier} itself
   */
  clone: function() {
    return this;
  }
});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 19, 2014
 */

/**
 * @class js.lang.CloneNotSupportedException 
 * @extends {js.lang.Exception}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Thrown to indicate that the <code>clone</code> method in class
 * <code>Object</code> has been called to clone an object, but that
 * the object's class does not implement the <code>Cloneable</code>
 * interface.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Applications that override the <code>clone</code> method can also
 * throw this exception to indicate that an object could not or
 * should not be cloned.
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 *
 * @see java.lang.Object#clone()
 */
Class.forName( /** @lends js.lang.CloneNotSupportedException.prototype */ {
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

/**
 * @class js.lang.IllegalAccessException 
 * @extends {js.lang.Exception}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * An IllegalAccessException is thrown when an application tries to reflectively create an instance (other than an array), set or get a field, or invoke a method, but the currently executing method does not have access to the definition of the specified class, field, method or constructor.
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.IllegalAccessException.prototype */ {
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

/**
 * @class js.lang.IllegalStateException 
 * @extends {js.lang.Exception}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Signals that a method has been invoked at an illegal or inappropriate time. In other words, the Java environment or Java application is not in an appropriate state for the requested operation.
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.IllegalStateException.prototype */ {
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

/**
 * @class js.lang.IndexOutOfBoundsException 
 * @extends {js.lang.Exception}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Thrown to indicate that an index of some sort (such as to an array, to a string, or to a vector) is out of range.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Applications can subclass this class to indicate similar exceptions.
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.IndexOutOfBoundsException.prototype */ {
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

/**
 * @class js.lang.UnsupportedOperationException 
 * @extends {js.lang.Exception}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Thrown to indicate that the requested operation is not supported.
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.UnsupportedOperationException.prototype */ {
  name: "class js.lang.UnsupportedOperationException extends js.lang.Exception",

  "private name": "js.lang.UnsupportedOperationException",

  "private number": 108
});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 13, 2014
 */

/** 
 * @class js.lang.StringBuffer 
 * @extends {js.lang.Object}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * A mutable sequence of characters. A string buffer is like a String, but can be modified. At any point in time it contains some particular sequence of characters, but the length and content of the sequence can be changed through certain method calls.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The principal operations on a StringBuffer are the append and insert methods, which are overloaded so as to accept data of any type. Each effectively converts a given datum to a string and then appends or inserts the characters of that string to the string buffer. The append method always adds these characters at the end of the buffer; the insert method adds the characters at a specified point.
 * </p><br/>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.StringBuffer.prototype */ {
  name: "class js.lang.StringBuffer extends Object",

  "private _strings": [],

  StringBuffer: function() {},

  /** 
   * @function
   * @public 
   * @summary Appends the string representation of arguments to the sequence.
   * @description Appends the string representation of arguments to the sequence. The overall effect is exactly as if the argument were converted to a string by the method argument.toString(), and the characters of that string were then appended to this character sequence.
   * @return {js.lang.StringBuffer} this string buffer
   */
  append: function() {
    this._strings.append(Array.prototype.slice.call(arguments, 0));
    return this;
  },

  /** 
   * @function
   * @public 
   * @summary Inserts the string representation of the arguments into this sequence.
   * @description Inserts the string representation of arguments into this sequence. The overall effect is exactly as if the argument were converted to a string by the method argument.toString(), and the characters of that string were then appended to this character sequence.
   *
   * @return {js.lang.StringBuffer} this string buffer
   */
  insert: function() {
    var args = Array.prototype.slice.call(arguments, 0);
    args.reverse();
    Array.prototype.splice.call(args, 0, 0, 0, 0);
    Array.prototype.splice.apply(this._strings, args);
    return this;
  },

  /** 
   * @function
   * @public 
   * @summary Appends the string representation of a array to the sequence.
   * @description Appends the string representation of a array to the sequence.
   *
   * @param {js.lang.Array}
   * @return {js.lang.StringBuffer} this string buffer
   */
  applys: function(array) {
    if (Object.isArray(array)) {
      throw new js.lang.IllegalArgumentException("this string buffer only applys a array");
    }
    this._strings.append(array);
    return this;
  },

  /** 
   * @function
   * @public 
   * @summary Removes all the characters of this sequence.
   * @description Removes all the characters of this sequence.
   *
   * @return {js.lang.StringBuffer} this string buffer
   */
  clear: function() {
    this._strings.splice(0, this._strings.length);
  },

  /** 
   * @function
   * @public 
   * @summary Removes the characters in a substring of this sequence.
   * @description Removes the characters in a substring of this sequence.
   * 
   * @param {js.lang.Number} The beginning index, inclusive.
   * @param {js.lang.Number} The ending index, exclusive.
   * @return {js.lang.StringBuffer} this string buffer
   * @throws {js.lang.IndexOutOfBoundsException} if start is negative, greater than length(), or greater than end.
   */
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

  /** 
   * @function
   * @public 
   * @summary Removes the char at the specified position in this sequence.
   * @description Removes the char at the specified position in this sequence. This sequence is shortened by one char.
   * 
   * @param {js.lang.Number} Index of char to remove
   * @return {js.lang.StringBuffer} this string buffer
   */
  deleteCharAt: function(index) {
    return this.remove(index, index + 1);
  },

  /** 
   * @function
   * @public 
   * @summary Returns a new String that contains a subsequence of characters currently contained in this sequence.
   * @description Returns a new String that contains a subsequence of characters currently contained in this sequence. The substring begins at the specified start and extends to the character at index end - 1.
   *
   * @param {js.lang.Number} The beginning index, inclusive.
   * @param {js.lang.Number} The ending index, exclusive. default value is the length of this sequence.
   * @return {js.lang.StringBuffer} this string buffer
   */
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

  /** 
   * @function
   * @public 
   * @summary Returns the char value in this sequence at the specified index.
   * @description Returns the char value in this sequence at the specified index. The first char value is at index 0, the next at index 1, and so on, as in array indexing. The index argument must be greater than or equal to 0, and less than the length of this sequence.
   *
   * @param {js.lang.Number} the index of the desired char value.
   * @return {js.lang.String} the char value at the specified index.
   * @throws {js.lang.IndexOutOfBoundsException} if index is negative or greater than or equal to length().
   */
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

  /** 
   * @function
   * @public 
   * @summary Returns the index within this string of the first occurrence of the specified substring.
   * @description Returns the index within this string of the first occurrence of the specified substring. The integer returned is the smallest value.
   *
   * @param {js.lang.String} any string.
   * @return {js.lang.String} if the string argument occurs as a substring within this object, then the index of the first character of the first such substring is returned; if it does not occur as a substring, -1 is returned.
   */
  indexOf: function(str) {
    return this._strings.join("").indexOf(str);
  },

  /** 
   * @function
   * @public 
   * @summary Returns the length (character count).
   * @description Returns the length (character count).
   *
   * @return {js.lang.Number} the length of the sequence of characters currently represented by this object
   */
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

  /** 
   * @function
   * @public 
   * @summary Returns the length (character count).
   * @description Returns the length (character count).
   *
   * @return {js.lang.Number} the length of the sequence of characters currently represented by this object
   */
  getLength: function() {
    return this.length();
  },

  /** 
   * @function
   * @public 
   * @summary Returns a string representing the data in this sequence.
   * @description Returns a string representing the data in this sequence. A new String object is allocated and initialized to contain the character sequence currently represented by this object. This String is then returned. Subsequent changes to this sequence do not affect the contents of the String.
   *
   * @param {js.lang.String} the split quote among each sequence.
   * @return {js.lang.String} a string representation of this sequence of characters.
   */
  toString: function(sp) {
    return this._strings.join(sp || "");
  }
});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 19, 2014
 */

/**
 * @class js.lang.AsynchronousCallException 
 * @extends {js.lang.Exception}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Thrown because of a failed synchronous call.
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.AsynchronousCallException.prototype */ {
  name: "class js.lang.AsynchronousCallException extends js.lang.Exception",
  "private name": "js.lang.AsynchronousCallException", // 错误名
  "private number": 500, // 错误号

  "toString": function() {
    var name = this.getClass().getFullName(),
      desc = this.description;
    return (desc && desc.status) ? name + ": " + desc.statusText + "-" + desc.status : name;
  }
});