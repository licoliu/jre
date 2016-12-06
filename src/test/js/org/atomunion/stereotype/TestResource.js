define(function(require, exports, module) {

  require("bootstrap!js.test.TestCase");
  require("bootstrap!js.test.Assert");

  require("bootstrap!org.atomunion.stereotype.Resource");
  require("test!org.atomunion.stereotype.TestComponent");

  return Class.forName({
    name: "class org.atomunion.stereotype.TestResource",

    "@Resource('org.atomunion.stereotype.ComponentBean') private bean": null,
    "@Resource('org.atomunion.stereotype.ComponentBean') private bean1": null,
    "private bean2": null,

    "@Resource('org.atomunion.stereotype.ComponentBean') TestResource": function(bean) {
      this.bean2 = bean;
    },

    "@Before public setUp": function() {},

    "@After public tearDown": function() {},

    "@Test public testResourceField": function() {
      js.test.Assert.assertTrue("", this.bean);
      js.test.Assert.assertTrue("", this.bean.getClass() === org.atomunion.stereotype.ComponentBean.$class);
    },

    "@Test public testResourceConstructor": function() {
      js.test.Assert.assertTrue("", this.bean2);
      js.test.Assert.assertTrue("", this.bean2.getClass() === org.atomunion.stereotype.ComponentBean.$class);
    },

    "@Test public testResourceConsistency": function() {
      js.test.Assert.assertTrue("", this.bean === this.bean1);
      js.test.Assert.assertTrue("", this.bean === this.bean2);
    }

  });
});