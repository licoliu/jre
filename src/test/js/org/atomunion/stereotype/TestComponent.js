define(function(require, exports, module) {

  require("bootstrap!js.test.TestCase");
  require("bootstrap!js.test.Assert");

  require("bootstrap!org.atomunion.stereotype.Component");
  require("bootstrap!org.atomunion.beans.factory.support.AutowireCapableBeanFactory");

  Class.forName({
    name: "@Component class org.atomunion.stereotype.ComponentBean",

    ComponentBean: function() {},

    getName: function() {
      return this.getClass().getFullName();
    }
  });


  return Class.forName({
    name: "class org.atomunion.stereotype.TestComponent",

    TestComponent: function() {},

    "@Before public setUp": function() {},

    "@After public tearDown": function() {},

    "@Test public testGetName": function() {
      var instance = org.atomunion.beans.factory.support.AutowireCapableBeanFactory.getInstance();
      js.test.Assert.assertTrue("", instance.getBean("org.atomunion.stereotype.ComponentBean"));
      js.test.Assert.assertTrue("", "org.atomunion.stereotype.ComponentBean" === instance.getBean("org.atomunion.stereotype.ComponentBean").getName());
    }
  });
});