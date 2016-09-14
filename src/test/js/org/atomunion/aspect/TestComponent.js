define(function(require, exports, module) {

  require("bootstrap!js.test.TestCase");
  require("bootstrap!js.test.Assert");

  require("bootstrap!org.atomunion.aspect.Component");
  require("bootstrap!org.atomunion.beans.factory.support.AutowireCapableBeanFactory");

  Class.forName({
    name: "@Component class org.atomunion.aspect.ComponentBean",

    ComponentBean: function() {},

    getName: function() {
      return this.getClass().getFullName();
    }
  });


  return Class.forName({
    name: "class org.atomunion.aspect.TestComponent extends js.test.TestCase",

    TestComponent: function() {},

    "@Before public setUp": function() {},

    "@After public tearDown": function() {},

    "@Test public testGetName": function() {
      var instance = org.atomunion.beans.factory.support.AutowireCapableBeanFactory.getInstance();
      js.test.Assert.assertTrue("", instance.getBean("org.atomunion.aspect.ComponentBean"));
      js.test.Assert.assertTrue("", "org.atomunion.aspect.ComponentBean" === instance.getBean("org.atomunion.aspect.ComponentBean").getName());
    }
  });
});