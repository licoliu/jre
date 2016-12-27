define(function(require, exports, module) {

  require("test!js.model.Animal");
  require("test!js.model.Dog");
  require("test!js.model.Bean");

  require("bootstrap!js.test.TestCase");
  require("bootstrap!js.test.Assert");

  require("bootstrap!js.lang.reflect.Method");
  require("bootstrap!js.lang.reflect.Field");

  var testReflectObject = new js.model.Dog("dog", "汪汪");

  return Class.forName({
    name: "class js.lang.TestClass",

    "@Setter @Getter private dogClass": testReflectObject.getClass(),

    TestClass: function() {},

    "@Test testGetClassConstructor": function() {
      js.test.Assert.assertTrue("getClassConstructor", !Object.isNull(this.getDogClass().getClassConstructor()));
    },
    "@Test testGetConstructor": function() {
      js.test.Assert.assertTrue("getConstructor", !Object.isNull(this.getDogClass().getConstructor()));
    },
    "@Test testGetInitial": function() {
      js.test.Assert.assertTrue("getInitial", !Object.isNull(this.getDogClass().getInitial()));
    },
    "@Test testGetName": function() {
      js.test.Assert.assertTrue("getName", "Dog" === this.getDogClass().getName());
    },
    "@Test testGetFullName": function() {
      js.test.Assert.assertTrue("getFullName", "js.model.Dog" === this.getDogClass().getFullName());
    },
    "@Test testGetInstance": function() {
      js.test.Assert.assertTrue("getInstance", !Object.isNull(this.getDogClass().getInstance()));
    },
    "@Test testGetAnnotations": function() {
      js.test.Assert.assertTrue("getAnnotations", !Object.isNull(this.getDogClass().getAnnotations()));
    },
    "@Test testGetPackage": function() {
      js.lang.System.out.println(this.getDogClass().getPackage().getName());
      js.lang.System.out.println(this.getDogClass().getPackage().getValue());
    },

    "@Test testGetDeclaredFields": function() {
      js.lang.System.out.println(this.getDogClass().getDeclaredFields());
    },

    "@Test testGetDeclaredField": function() {
      js.test.Assert.assertTrue("getDeclaredField('color')", !!this.getDogClass().getDeclaredField("color"));
      js.test.Assert.assertTrue("getDeclaredField('word')", !!this.getDogClass().getDeclaredField("word"));
    },

    "@Test testGetField": function() {
      js.test.Assert.assertTrue("getField('color')", !!this.getDogClass().getField("color"));

      try {
        this.getDogClass().getField("word");
        js.test.Assert.assertTrue("getField('word')", false);
      } catch (e) {
        js.test.Assert.assertTrue("getField('word')", !!e);
      }
    },

    "@Test testGetFields": function() {
      js.lang.System.out.println(this.getDogClass().getFields());
    },

    "@Test testGetDeclaredMethods": function() {
      js.lang.System.out.println(this.getDogClass().getDeclaredMethods());
    },

    "@Test testGetHeldMethod": function() {
      js.test.Assert.assertTrue("getHeldMethod('sayError')", !!this.getDogClass().getHeldMethod("sayError"));

      js.test.Assert.assertTrue("getHeldMethod('play')", !!this.getDogClass().getHeldMethod("play"));

      js.test.Assert.assertTrue("getHeldMethod('getName')", !!this.getDogClass().getHeldMethod("getName"));
    },

    "@Test testGetDeclaredMethod": function() {
      js.test.Assert.assertTrue("getDeclaredMethod('sayError')", !!this.getDogClass().getDeclaredMethod("sayError"));

      js.test.Assert.assertTrue("getDeclaredMethod('play')", !!this.getDogClass().getDeclaredMethod("play"));

      try {
        this.getDogClass().getDeclaredMethod("getName");
        js.test.Assert.assertTrue("getDeclaredMethod('getName')", false);
      } catch (e) {
        js.test.Assert.assertTrue("getDeclaredMethod('getName')", !!e);
      }
    },

    "@Test testGetMethod": function() {
      js.test.Assert.assertTrue("getMethod('sayError')", !!this.getDogClass().getMethod("sayError"));

      try {
        this.getDogClass().getMethod("play");
        js.test.Assert.assertTrue("getMethod('play')", false);
      } catch (e) {
        js.test.Assert.assertTrue("getMethod('play')", !!e);
      }

      try {
        this.getDogClass().getMethod("getName");
        js.test.Assert.assertTrue("getMethod('getName')", false);
      } catch (e) {
        js.test.Assert.assertTrue("getMethod('getName')", !!e);
      }
    },
    "@Test testGetMethods": function() {
      js.lang.System.out.println(this.getDogClass().getMethods());
    },
    "@Test testGetSuperClass": function() {
      js.lang.System.out.println(this.getDogClass().getSuperClass());
    },
    "@Test testGetModifiers": function() {
      js.lang.System.out.println(this.getDogClass().getModifiers());
    },
    "@Test testAddMethod": function() {
      this.getDogClass().addMethod(new js.lang.reflect.Method("testAddMethod", function() {
        return "我是动态新增的方法";
      }, this.getDogClass(), 1, []));
      js.lang.System.out.println(testReflectObject.testAddMethod());
    },
    "@Test testAddField": function() {
      js.lang.System.out.println(this.getDogClass()
        .addField(new js.lang.reflect.Field("testAddField",
          "我是动态新增的属性", this.getDogClass(), 1, ["@Getter", "@Setter"])));
      js.lang.System.out.println(testReflectObject.getTestAddField());
    },
    "@Test testNewInstance": function() {
      var c = this.getDogClass().newInstance();
      js.lang.System.out.println(c.getColor());
    },
    "@Test testIsAnnotation": function() {
      js.test.Assert.assertTrue("类js.lang.Class中的isAnnotation方法测试不通过", !this.getDogClass().isAnnotation());
      js.test.Assert.assertTrue("类js.lang.Class中的isAnnotation方法测试不通过", js.model.Bean.$class.isAnnotation());
    }
  }).getClassConstructor();
});