define(function(require, exports, module) {

  require("bootstrap!js.test.TestCase");
  require("bootstrap!js.test.Assert");

  require("bootstrap!org.atomunion.stereotype.Dao");
  require("bootstrap!org.atomunion.beans.factory.support.AutowireCapableBeanFactory");

  Class.forName({
    name: "@Component class org.atomunion.stereotype.DaoBean",

    DaoBean: function() {},

    getName: function() {
      return this.getClass().getFullName();
    }
  });

  return Class.forName({
    name: "class org.atomunion.stereotype.TestDao",

    TestDao: function() {},

    "@Before public setUp": function() {},

    "@After public tearDown": function() {},

    "@Test public testGetName": function() {
      var instance = org.atomunion.beans.factory.support.AutowireCapableBeanFactory.getInstance();
      js.test.Assert.assertTrue("", instance.getBean("org.atomunion.stereotype.DaoBean"));

      js.test.Assert.assertTrue("", "org.atomunion.stereotype.DaoBean" === instance.getBean("org.atomunion.stereotype.DaoBean").getName());
    }

  });
});