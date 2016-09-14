define(function(require, exports, module) {

  require("bootstrap!js.test.TestCase");
  require("bootstrap!js.test.Assert");

  require("bootstrap!org.atomunion.aspect.Autowire");
  require("test!org.atomunion.aspect.TestComponent");

  return Class.forName({
    name: "class org.atomunion.aspect.TestAutowire extends js.test.TestCase",

    "@Autowire('org.atomunion.aspect.ComponentBean') private bean": null,

    TestAutowire: function() {},
    "@Before public setUp": function() {},

    "@After public tearDown": function() {},

    "@Test public testAutowire": function() {
      js.test.Assert.assertTrue("", this.bean);
      js.test.Assert.assertTrue("", this.bean.getClass() === org.atomunion.aspect.ComponentBean.$class);
    }

  });
});