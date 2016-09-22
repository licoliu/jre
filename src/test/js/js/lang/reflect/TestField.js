define(function(require, exports, module) {

  require("test!js.model.Animal");
  require("test!js.model.Dog");

  require("bootstrap!js.test.TestCase");
  require("bootstrap!js.test.Assert");

  var testReflectObject = new js.model.Dog("dog", "汪汪");

  return Class.forName({
    name: "class js.lang.reflect.TestField",
    "@Setter @Getter private field": testReflectObject.getClass()
      .getField("color"),
    TestField: function() {},
    "@Test testGetDeclaringClass": function() {
      js.lang.System.out.println(this.getField().getDeclaringClass());
    },
    "@Test testGetName": function() {
      js.lang.System.out.println(this.getField().getName());
    },
    "@Test testGetModifiers": function() {
      js.lang.System.out.println(this.getField().getModifiers());
    },
    "@Test testGetAnnotations": function() {
      js.lang.System.out.println(this.getField().getAnnotations());
    },
    "@Test testGetValue": function() {
      js.lang.System.out.println(this.getField().getValue());
    },
    "@Test testGet": function() {
      js.lang.System.out.println(this.getField().get(testReflectObject));
    },
    "@Test testSet": function() {
      js.lang.System.out.println("set(\"red\")");
      this.getField().set(testReflectObject, "red");
      js.lang.System.out.println(this.getField().get(testReflectObject));
    }
  }).getClassConstructor();
});