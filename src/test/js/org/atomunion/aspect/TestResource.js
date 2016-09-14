define(function(require, exports, module) {

  require("bootstrap!js.test.TestCase");
  require("bootstrap!js.test.Assert");

  require("bootstrap!org.atomunion.aspect.Resource");
  require("test!org.atomunion.aspect.TestComponent");

  return Class.forName({
    name: "class org.atomunion.aspect.TestResource extends js.test.TestCase",

    "@Resource('org.atomunion.aspect.ComponentBean') private bean": null,

    TestResource: function() {},

    "@Before public setUp": function() {},

    "@After public tearDown": function() {},

    "@Test public testResource": function() {
      js.test.Assert.assertTrue("", this.bean);
      js.test.Assert.assertTrue("", this.bean.getClass() === org.atomunion.aspect.ComponentBean.$class);
    }

  });
});