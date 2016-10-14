define(function(require, exports, module) {

  require("bootstrap!js.test.TestCase");
  require("bootstrap!js.test.Assert");

  require("bootstrap!org.atomunion.stereotype.Resource");
  require("test!org.atomunion.stereotype.TestComponent");

  return Class.forName({
    name: "class org.atomunion.stereotype.TestResource",

    "@Resource('org.atomunion.stereotype.ComponentBean') private bean": null,

    TestResource: function() {},

    "@Before public setUp": function() {},

    "@After public tearDown": function() {},

    "@Test public testResource": function() {
      js.test.Assert.assertTrue("", this.bean);
      js.test.Assert.assertTrue("", this.bean.getClass() === org.atomunion.stereotype.ComponentBean.$class);
    }

  });
});