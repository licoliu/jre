define(function(require, exports, module) {

  require("test!js.model.Animal");
  require("test!js.model.Dog");

  require("bootstrap!js.test.TestCase");
  require("bootstrap!js.test.Assert");

  var dog = new js.model.Dog("dog", "汪汪");

  return Class.forName({
    name: "class js.lang.TestObject",
    "@Setter @Getter private obj": dog,

    "@Test testIsNull": function() {
      js.test.Assert.assertTrue("null", Object.isNull(null));
      js.test.Assert.assertTrue("undefined", Object.isNull(undefined));
      js.test.Assert.assertFalse("{}:", Object.isNull({}));
      js.test.Assert.assertFalse("[]:", Object.isNull([]));
      js.test.Assert.assertFalse("0", Object.isNull(0));
      js.test.Assert.assertFalse("0.0", Object.isNull(0.0));
      js.test.Assert.assertFalse("-1", Object.isNull(-1));
      js.test.Assert.assertFalse("\"\"", Object.isNull(""));
      js.test.Assert.assertFalse("new Date()", Object.isNull(new Date()));
      js.test.Assert.assertFalse("new js.model.Dog()", Object.isNull(dog));
      js.test.Assert.assertFalse("function(){}", Object.isNull(function() {}));
      js.test.Assert.assertFalse("true", Object.isNull(true));
      js.test.Assert.assertFalse("false", Object.isNull(false));
    },

    "@Test testIsEmpty": function() {
      js.test.Assert.assertTrue("null", Object.isEmpty(null));
      js.test.Assert.assertTrue("undefined", Object.isEmpty(undefined));
      js.test.Assert.assertFalse("{}", Object.isEmpty({}));
      js.test.Assert.assertTrue("[]", Object.isEmpty([]));
      js.test.Assert.assertFalse("0", Object.isEmpty(0));
      js.test.Assert.assertFalse("0.0", Object.isEmpty(0.0));
      js.test.Assert.assertFalse("-1", Object.isEmpty(-1));
      js.test.Assert.assertTrue("\"\"", Object.isEmpty(""));
      js.test.Assert.assertFalse("new Date()", Object.isEmpty(new Date()));
      js.test.Assert.assertFalse("new js.model.Dog()", Object.isEmpty(dog));
      js.test.Assert.assertFalse("function(){}", Object.isEmpty(function() {}));
      js.test.Assert.assertFalse("true", Object.isEmpty(true));
      js.test.Assert.assertFalse("false", Object.isEmpty(false));
    },

    "@Test testIsArray": function() {

      js.test.Assert.assertFalse("null", Object.isArray(null));
      js.test.Assert.assertFalse("undefined", Object.isArray(undefined));
      js.test.Assert.assertFalse("{}", Object.isArray({}));
      js.test.Assert.assertTrue("[]", Object.isArray([]));
      js.test.Assert.assertFalse("0", Object.isArray(0));
      js.test.Assert.assertFalse("0.0", Object.isArray(0.0));
      js.test.Assert.assertFalse("-1", Object.isArray(-1));
      js.test.Assert.assertFalse("\"\"", Object.isArray(""));
      js.test.Assert.assertFalse("new Date()", Object.isArray(new Date()));
      js.test.Assert.assertFalse("new js.model.Dog()", Object.isArray(dog));
      js.test.Assert.assertFalse("function(){}", Object.isArray(function() {}));
      js.test.Assert.assertFalse("true", Object.isArray(true));
      js.test.Assert.assertFalse("false", Object.isArray(false));
    },

    "@Test testIsDate": function() {

      js.test.Assert.assertFalse("null", Object.isDate(null));
      js.test.Assert.assertFalse("undefined", Object.isDate(undefined));
      js.test.Assert.assertFalse("{}", Object.isDate({}));
      js.test.Assert.assertFalse("[]", Object.isDate([]));
      js.test.Assert.assertFalse("0", Object.isDate(0));
      js.test.Assert.assertFalse("0.0", Object.isDate(0.0));
      js.test.Assert.assertFalse("-1", Object.isDate(-1));
      js.test.Assert.assertFalse("\"\"", Object.isDate(""));
      js.test.Assert.assertTrue("new Date()", Object.isDate(new Date()));
      js.test.Assert.assertFalse("new js.model.Dog()", Object.isDate(dog));
      js.test.Assert.assertFalse("function(){}", Object.isDate(function() {}));
      js.test.Assert.assertFalse("true", Object.isDate(true));
      js.test.Assert.assertFalse("false", Object.isDate(false));

    },

    "@Test testIsNarrowObject": function() {

      js.test.Assert.assertFalse("null", Object.isNarrowObject(null));
      js.test.Assert.assertFalse("undefined", Object.isNarrowObject(undefined));
      js.test.Assert.assertTrue("{}", Object.isNarrowObject({}));
      js.test.Assert.assertFalse("[]", Object.isNarrowObject([]));
      js.test.Assert.assertFalse("0", Object.isNarrowObject(0));
      js.test.Assert.assertFalse("0.0", Object.isNarrowObject(0.0));
      js.test.Assert.assertFalse("-1", Object.isNarrowObject(-1));
      js.test.Assert.assertFalse("\"\"", Object.isNarrowObject(""));
      js.test.Assert.assertFalse("new Date()", Object.isNarrowObject(new Date()));
      js.test.Assert.assertTrue("new js.model.Dog()", Object.isNarrowObject(dog));
      js.test.Assert.assertFalse("function(){}", Object.isNarrowObject(function() {}));
      js.test.Assert.assertFalse("true:" + Object.isNarrowObject(true));
      js.test.Assert.assertFalse("false:" + Object.isNarrowObject(false));

    },

    "@Test testIsFunction": function() {

      js.test.Assert.assertFalse("null", Object.isFunction(null));
      js.test.Assert.assertFalse("undefined", Object.isFunction(undefined));
      js.test.Assert.assertFalse("{}", Object.isFunction({}));
      js.test.Assert.assertFalse("[]", Object.isFunction([]));
      js.test.Assert.assertFalse("0", Object.isFunction(0));
      js.test.Assert.assertFalse("0.0", Object.isFunction(0.0));
      js.test.Assert.assertFalse("-1", Object.isFunction(-1));
      js.test.Assert.assertFalse("\"\"", Object.isFunction(""));
      js.test.Assert.assertFalse("new Date()", Object.isFunction(new Date()));
      js.test.Assert.assertFalse("new js.model.Dog()", Object.isFunction(dog));
      js.test.Assert.assertTrue("function(){}", Object.isFunction(function() {}));
      js.test.Assert.assertFalse("true", Object.isFunction(true));
      js.test.Assert.assertFalse("false", Object.isFunction(false));
    },

    "@Test testIsNumber": function() {

      js.test.Assert.assertFalse("null", Object.isNumber(null));
      js.test.Assert.assertFalse("undefined", Object.isNumber(undefined));
      js.test.Assert.assertFalse("{}", Object.isNumber({}));
      js.test.Assert.assertFalse("[]", Object.isNumber([]));
      js.test.Assert.assertTrue("0", Object.isNumber(0));
      js.test.Assert.assertTrue("0.0", Object.isNumber(0.0));
      js.test.Assert.assertTrue("new Number(0)", Object.isNumber(new Number(0)));
      js.test.Assert.assertTrue("new Number(0.0)", Object.isNumber(new Number(0.0)));
      js.test.Assert.assertTrue("-1", Object.isNumber(-1));
      js.test.Assert.assertFalse("\"\"", Object.isNumber(""));
      js.test.Assert.assertFalse("new Date()", Object.isNumber(new Date()));
      js.test.Assert.assertFalse("new js.model.Dog()", Object.isNumber(dog));
      js.test.Assert.assertFalse("function(){}", Object.isNumber(function() {}));
      js.test.Assert.assertFalse("true", Object.isNumber(true));
      js.test.Assert.assertFalse("false", Object.isNumber(false));

    },

    "@Test testIsString": function() {

      js.test.Assert.assertFalse("null", Object.isString(null));
      js.test.Assert.assertFalse("undefined", Object.isString(undefined));
      js.test.Assert.assertFalse("{}", Object.isString({}));
      js.test.Assert.assertFalse("[]", Object.isString([]));
      js.test.Assert.assertFalse("0", Object.isString(0));
      js.test.Assert.assertFalse("0.0", Object.isString(0.0));
      js.test.Assert.assertFalse("-1", Object.isString(-1));
      js.test.Assert.assertTrue("\"\"", Object.isString(""));
      js.test.Assert.assertTrue("new String('')", Object.isString(new String('')));
      js.test.Assert.assertFalse("new Date()", Object.isString(new Date()));
      js.test.Assert.assertFalse("new js.model.Dog()", Object.isString(dog));
      js.test.Assert.assertFalse("function(){}", Object.isString(function() {}));
      js.test.Assert.assertFalse("true", Object.isString(true));
      js.test.Assert.assertFalse("false", Object.isString(false));

    },

    "@Test testIsBoolean": function() {

      js.test.Assert.assertFalse("null", Object.isBoolean(null));
      js.test.Assert.assertFalse("undefined", Object.isBoolean(undefined));
      js.test.Assert.assertFalse("{}", Object.isBoolean({}));
      js.test.Assert.assertFalse("[]", Object.isBoolean([]));
      js.test.Assert.assertFalse("0", Object.isBoolean(0));
      js.test.Assert.assertFalse("0.0", Object.isBoolean(0.0));
      js.test.Assert.assertFalse("\"\"", Object.isBoolean(""));
      js.test.Assert.assertFalse("-1", Object.isBoolean(-1));
      js.test.Assert.assertFalse("new Date()", Object.isBoolean(new Date()));
      js.test.Assert.assertFalse("new js.model.Dog()", Object.isBoolean(dog));
      js.test.Assert.assertFalse("function(){}", Object.isBoolean(function() {}));
      js.test.Assert.assertTrue("true", Object.isBoolean(true));
      js.test.Assert.assertTrue("false", Object.isBoolean(false));
      js.test.Assert.assertTrue("new Boolean(true)", Object.isBoolean(new Boolean(true)));
      js.test.Assert.assertTrue("new Boolean(false)", Object.isBoolean(new Boolean(false)));
    },

    "@Test testIsDefined": function() {

      js.test.Assert.assertTrue("null", Object.isDefined(null));
      js.test.Assert.assertFalse("undefined", Object.isDefined(undefined));
      js.test.Assert.assertTrue("{}", Object.isDefined({}));
      js.test.Assert.assertTrue("[]", Object.isDefined([]));
      js.test.Assert.assertTrue("0", Object.isDefined(0));
      js.test.Assert.assertTrue("0.0", Object.isDefined(0.0));
      js.test.Assert.assertTrue("-1", Object.isDefined(-1));
      js.test.Assert.assertTrue("\"\"", Object.isDefined(""));
      js.test.Assert.assertTrue("new Date()", Object.isDefined(new Date()));
      js.test.Assert.assertTrue("new js.model.Dog()", Object.isDefined(dog));
      js.test.Assert.assertTrue("function(){}", Object.isDefined(function() {}));
      js.test.Assert.assertTrue("true", Object.isDefined(true));
      js.test.Assert.assertTrue("false", Object.isDefined(false));

    },
    "@Test testClone": function() {
      js.lang.System.out.println("克隆前：" + this.getObj().toString());
      var c = this.getObj().clone();
      js.lang.System.out.println("克隆后：" + c.toString());

      js.test.Assert.assertNotSame("克隆前后  assertSame ", this.getObj(), c);
    },

    "@Test testExtend": function() {
      var a1 = {
          name: 'a1'
        },
        b1 = {
          name: 'b1'
        };
      var a2 = {
          name: "a2",
          children: [{
            name: "ac2"
          }]
        },
        b2 = {
          name: "b2",
          children: [{
            name: "bc2"
          }]
        };
      var a3 = {
          name: "a3",
          children: [{
            name: "ac3"
          }, {
            name: "ac33"
          }]
        },
        b3 = {
          name: "b3",
          children: [{
            name: "bc3"
          }]
        };
      var a4 = {
          name: "a4",
          children: [{
            name: "ac4"
          }]
        },
        b4 = {
          name: "b4",
          children: [{
            name: "bc4"
          }, {
            name: "bc44"
          }]
        };
      var a5 = {
          name: "a5",
          children: [{
            id: 1,
            name: "ac5"
          }]
        },
        b5 = {
          name: "b5",
          children: [{
            id: 1,
            name: "bc5"
          }, {
            id: 2,
            name: "bc55"
          }]
        };
      var a6 = {
          name: "a6",
          children: [{
            id: 1,
            name: "ac6"
          }]
        },
        b6 = {
          name: "b6",
          children: [{
            id: 1,
            name: "bc6"
          }, {
            id: 2,
            name: "bc66"
          }]
        };

      Object.extend(a1, b1);
      js.test.Assert.assertTrue("Object.extend测试不通过", a1.name === 'b1');

      Object.extend(a2, b2);
      js.test.Assert.assertTrue("Object.extend测试不通过", a2.children[0].name === 'bc2');

      Object.extend(a3, b3);
      js.test.Assert.assertTrue("Object.extend测试不通过", a3.children.length === 1);

      Object.extend(a4, b4);
      js.test.Assert.assertTrue("Object.extend测试不通过", a4.children.length == 2);
      js.test.Assert.assertTrue("Object.extend测试不通过", a4.children[0].hashCode() !== b4.children[0].hashCode());

      Object.extend(a5, b5, "children", "children", {
        comparator: true
      });
      js.test.Assert.assertTrue("Object.extend测试不通过", a5.children[0].hashCode() === b5.children[0].hashCode());

      Object.extend(a6, b6, "children", "children", {
        comparator: function(d, s) {
          return d.id == s.id;
        }
      });
      js.test.Assert.assertTrue("Object.extend测试不通过", a6.children[0].hashCode() !== b6.children[0].hashCode());
    },

    "@Test testEach": function() {
      js.lang.System.out.println("被遍历的对象:" + this.getObj().toString());
      Object.each(this.getObj(), function(i, o, a) {
        js.lang.System.out.println(i + ":" + o + "    被遍历的对象[" + a.toString() + "]");
      }, null);
    },
    "@Test testEnumerate": function() {
      js.lang.System.out.println("被遍历的对象:" + this.getObj().toString());

      Object.enumerate(this.getObj(), function(i, o, a) {
        js.lang.System.out.println(i + ":" + o + "   被遍历的对象[" + a.toString() + "]");
      }, dog, true);
    },
    "@Test testToJson": function() {
      js.lang.System.out.println(this.getObj().toJson());

    },
    "@Test testToQueryString": function() {
      js.lang.System.out.println(this.getObj().toQueryString());
    },
    "@Test testGetClass": function() {
      js.lang.System.out.println(this.getObj().getClass());

      js.test.Assert.assertNotNull("this.getObj().getClass()", this.getObj().getClass());
    },
    "@Test testEquals": function() {

      js.test.Assert.assertTrue("this.getObj().equals(this.getObj())", this.getObj().equals(this.getObj()));
      js.test.Assert.assertFalse("this.getObj().equals(null)", this.getObj().equals(null));
      js.test.Assert.assertFalse("this.getObj().equals(undefined)", this.getObj().equals(undefined));

    },
    "@Test testGetVersion": function() {
      js.test.Assert.assertNotNull("this.getObj().getVersion():", this.getObj().getVersion());
    },
    "@Test testHashCode": function() {
      js.test.Assert.assertNotNull("this.getObj().hashCode():", this.getObj().hashCode());
    },
    "@Test testToString": function() {
      js.test.Assert.assertNotNull("this.getObj().toString()", this.getObj().toString());
    },
    "@Test testForIn": function() {
      for (var i in this.getObj()) {
        js.lang.System.out.println("key:" + i + "    value:" + this.getObj()[i] + "   this.getObj().hasOwnProperty:" + this.getObj().hasOwnProperty(i));
      }

      js.lang.System.out.println("^^^^^^^^^^^^^^^^^^^^^^^test for in Object^^^^^^^^^^^^^^^^^^^^^^^");
      for (var j in Object) {
        js.lang.System.out.println("key:" + j + "    value:" + Object[j] + "   this.getObj().hasOwnProperty:" + this.getObj().hasOwnProperty(j));
      }
      js.lang.System.out.println("^^^^^^^^^^^^^^^^^^^^^^^test for in newObj^^^^^^^^^^^^^^^^^^^^^^^");
      var newObj = Object.create(this.getObj(), {
        add1: {
          value: "add1",
          writable: true,
          enumerable: false,
          configurable: false
        },
        add2: {
          value: "add2",
          writable: false,
          enumerable: true,
          configurable: false
        },
        add3: {
          value: "add3",
          writable: false,
          enumerable: false,
          configurable: true
        },
        add4: {
          value: "add4",
          writable: false,
          enumerable: false,
          configurable: false
        },
        add5: {
          value: "add5",
          writable: true,
          enumerable: true,
          configurable: true
        },
        add6: {
          value: function() {},
          writable: true,
          enumerable: true,
          configurable: true
        }
      });

      for (var m in newObj) {
        js.lang.System.out.println("key:" + m + "    value:" + newObj[m] + "   this.getObj().hasOwnProperty:" + newObj.hasOwnProperty(m));
      }

      js.lang.System.out.println("^^^^^^^^^^^^^^^^^^^^^^^test for in new Object^^^^^^^^^^^^^^^^^^^^^^^");

      Object.defineProperties(Object, {
        add1: {
          value: "add1",
          writable: true,
          enumerable: false,
          configurable: false
        },
        add2: {
          value: "add2",
          writable: false,
          enumerable: true,
          configurable: false
        },
        add3: {
          value: "add3",
          writable: false,
          enumerable: false,
          configurable: true
        },
        add4: {
          value: "add4",
          writable: false,
          enumerable: false,
          configurable: false
        },
        add5: {
          value: "add5",
          writable: true,
          enumerable: true,
          configurable: true
        },
        add6: {
          value: function() {},
          writable: true,
          enumerable: true,
          configurable: true
        }
      });

      for (var n in Object) {
        js.lang.System.out.println("key:" + n + "    value:" + Object[n] + "   this.getObj().hasOwnProperty:" + this.getObj().hasOwnProperty(n));
      }
      var obj = {};
      for (var q in obj) {
        js.lang.System.out.println("key:" + q + "    value:" + obj[q] + "   this.getObj().hasOwnProperty:" + this.getObj().hasOwnProperty(q));
      }

    }
  }).getClassConstructor();

});