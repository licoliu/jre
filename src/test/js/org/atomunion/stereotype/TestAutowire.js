define(function(require, exports, module) {

  require("bootstrap!js.test.TestCase");
  require("bootstrap!js.test.Assert");

  require("bootstrap!org.atomunion.stereotype.Autowire");
  require("test!org.atomunion.stereotype.TestComponent");

  return Class.forName({
    name: "class org.atomunion.stereotype.TestAutowire",

    "@Autowire('org.atomunion.stereotype.ComponentBean') private bean": null,

    TestAutowire: function() {},
    "@Before public setUp": function() {},

    "@After public tearDown": function() {},

    "@Test public testAutowire": function() {
      js.test.Assert.assertTrue("", this.bean);
      js.test.Assert.assertTrue("", this.bean.getClass() === org.atomunion.stereotype.ComponentBean.$class);
    }

  });
});