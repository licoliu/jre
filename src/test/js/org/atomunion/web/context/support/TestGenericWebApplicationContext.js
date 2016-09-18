define(function(require, exports, module) {

  require("bootstrap!js.test.TestCase");

  require("test!js.model.Dog");

  require("bootstrap!org.atomunion.web.context.support.TestGenericWebApplicationContext");

  return Class.forName({
    name: "class org.atomunion.web.context.support.TestGenericWebApplicationContext",
    "@Setter @Getter private context": null,

    TestGenericWebApplicationContext: function() {
      this.context = new org.atomunion.web.context.support.GenericWebApplicationContext();
    },

    "@Before public setUp": function() {},

    "@After public tearDown": function() {},

    "@Test testContainsBean": function() {
      js.test.Assert.assertTrue("", this.context.containsBean("js.model.Dog"));
    },

    "@Test testGetBean": function() {
      var dog = this.context.getBean("js.model.Dog");

      js.test.Assert.assertTrue("", dog !== null);
      js.lang.System.out.println(dog);
    },

    "@Test testGetType": function() {
      var dogClass = this.context.getType("js.model.Dog");

      js.test.Assert.assertTrue("", dogClass !== null);
      js.lang.System.out.println(dogClass);
    },

    "@Test testIsSingleton": function() {
      js.test.Assert.assertTrue("", !this.context.isSingleton("js.model.Dog"));
    }

  });

});