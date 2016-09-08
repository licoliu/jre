define(function(require, exports, module) {

  require("bootstrap!js.test.TestCase");

  require("bootstrap!org.atomunion.util.PatternMatchUtils");

  return Class.forName({
    name: "class org.atomunion.util.TestPatternMatchUtils extends js.test.TestCase",

    "@Before public setUp": function() {},

    "@After public tearDown": function() {},

    "@Test testSimpleMatch": function() {
      js.test.Assert.assertTrue("", org.atomunion.util.PatternMatchUtils.simpleMatch("*get", "get"));
      js.test.Assert.assertTrue("", org.atomunion.util.PatternMatchUtils.simpleMatch("*get", "_get"));
      js.test.Assert.assertTrue("", !org.atomunion.util.PatternMatchUtils.simpleMatch("*get", "_getName"));
      js.test.Assert.assertTrue("", !org.atomunion.util.PatternMatchUtils.simpleMatch("*get", "getName"));
      js.test.Assert.assertTrue("", !org.atomunion.util.PatternMatchUtils.simpleMatch("*get", "setName"));

      js.test.Assert.assertTrue("", org.atomunion.util.PatternMatchUtils.simpleMatch("get*", "get"));
      js.test.Assert.assertTrue("", !org.atomunion.util.PatternMatchUtils.simpleMatch("get*", "_get"));
      js.test.Assert.assertTrue("", !org.atomunion.util.PatternMatchUtils.simpleMatch("get*", "_getName"));
      js.test.Assert.assertTrue("", org.atomunion.util.PatternMatchUtils.simpleMatch("get*", "getName"));
      js.test.Assert.assertTrue("", !org.atomunion.util.PatternMatchUtils.simpleMatch("get*", "setName"));

      js.test.Assert.assertTrue("", org.atomunion.util.PatternMatchUtils.simpleMatch("*get*", "get"));
      js.test.Assert.assertTrue("", org.atomunion.util.PatternMatchUtils.simpleMatch("*get*", "_get"));
      js.test.Assert.assertTrue("", org.atomunion.util.PatternMatchUtils.simpleMatch("*get*", "_getName"));
      js.test.Assert.assertTrue("", org.atomunion.util.PatternMatchUtils.simpleMatch("*get*", "getName"));
      js.test.Assert.assertTrue("", !org.atomunion.util.PatternMatchUtils.simpleMatch("*get*", "setName"));

      js.test.Assert.assertTrue("", org.atomunion.util.PatternMatchUtils.simpleMatch("*g*e*t*", "get"));
      js.test.Assert.assertTrue("", org.atomunion.util.PatternMatchUtils.simpleMatch("*g*e*t*", "_get"));
      js.test.Assert.assertTrue("", org.atomunion.util.PatternMatchUtils.simpleMatch("*g*e*t*", "_getName"));
      js.test.Assert.assertTrue("", org.atomunion.util.PatternMatchUtils.simpleMatch("*g*e*t*", "getName"));
      js.test.Assert.assertTrue("", !org.atomunion.util.PatternMatchUtils.simpleMatch("*g*e*t*", "setName"));

      js.test.Assert.assertTrue("", org.atomunion.util.PatternMatchUtils.simpleMatch("**get**", "get"));
      js.test.Assert.assertTrue("", org.atomunion.util.PatternMatchUtils.simpleMatch("**get**", "_get"));
      js.test.Assert.assertTrue("", org.atomunion.util.PatternMatchUtils.simpleMatch("**get**", "_getName"));
      js.test.Assert.assertTrue("", org.atomunion.util.PatternMatchUtils.simpleMatch("**get**", "getName"));
      js.test.Assert.assertTrue("", !org.atomunion.util.PatternMatchUtils.simpleMatch("**get**", "setName"));

      js.test.Assert.assertTrue("", org.atomunion.util.PatternMatchUtils.simpleMatch("org.atomunion.*Dao.*get", "org.atomunion.TestDao.get"));
      js.test.Assert.assertTrue("", !org.atomunion.util.PatternMatchUtils.simpleMatch("org.atomunion.*Dao.*get", "org.atomunion.TestDao2.get"));
      js.test.Assert.assertTrue("", !org.atomunion.util.PatternMatchUtils.simpleMatch("org.atomunion.*Dao.*get", "org.atomunion.Dao2.get"));
      js.test.Assert.assertTrue("", !org.atomunion.util.PatternMatchUtils.simpleMatch("org.atomunion.*Dao.*get", "org.TestDao.get"));
      js.test.Assert.assertTrue("", org.atomunion.util.PatternMatchUtils.simpleMatch("org.atomunion.*Dao.*get", "org.atomunion.Dao.get"));


      js.test.Assert.assertTrue("", org.atomunion.util.PatternMatchUtils.simpleMatch("org.atomunion.*Dao.*get", "org.atomunion.test.TestDao.get"));
      js.test.Assert.assertTrue("", !org.atomunion.util.PatternMatchUtils.simpleMatch("org.atomunion.*Dao.*get", "org.atomunion.test.TestDao2.get"));
      js.test.Assert.assertTrue("", !org.atomunion.util.PatternMatchUtils.simpleMatch("org.atomunion.*Dao.*get", "org.atomunion.test.Dao2.get"));

      js.test.Assert.assertTrue("", org.atomunion.util.PatternMatchUtils.simpleMatch("org.atomunion.**.*Dao.*get", "org.atomunion.test.app.dao.TestDao.get"));
      js.test.Assert.assertTrue("", org.atomunion.util.PatternMatchUtils.simpleMatch("org.atomunion.**.*Dao.*get", "org.atomunion.test.app.TestDao.get"));
      js.test.Assert.assertTrue("", org.atomunion.util.PatternMatchUtils.simpleMatch("org.atomunion.**.*Dao.*get", "org.atomunion.test.TestDao.get"));
      js.test.Assert.assertTrue("", !org.atomunion.util.PatternMatchUtils.simpleMatch("org.atomunion.**.*Dao.*get", "org.atomunion.TestDao.get"));

      js.test.Assert.assertTrue("", org.atomunion.util.PatternMatchUtils.simpleMatch("org.atomunion.**.*Dao.*", "org.atomunion.test.app.dao.TestDao.get"));
      js.test.Assert.assertTrue("", org.atomunion.util.PatternMatchUtils.simpleMatch("org.atomunion.**.*Dao.*", "org.atomunion.test.app.TestDao.get"));
      js.test.Assert.assertTrue("", org.atomunion.util.PatternMatchUtils.simpleMatch("org.atomunion.**.*Dao.*", "org.atomunion.test.TestDao.get"));
      js.test.Assert.assertTrue("", !org.atomunion.util.PatternMatchUtils.simpleMatch("org.atomunion.**.*Dao.*", "org.atomunion.TestDao.get"));

    },

    "@Test testSimpleMatches": function() {
      js.test.Assert.assertTrue("", org.atomunion.util.PatternMatchUtils.simpleMatches(["*get", "get*"], "get"));
      js.test.Assert.assertTrue("", org.atomunion.util.PatternMatchUtils.simpleMatches(["*get", "get*"], "_get"));
      js.test.Assert.assertTrue("", !org.atomunion.util.PatternMatchUtils.simpleMatches(["*get", "get*"], "_getName"));
      js.test.Assert.assertTrue("", org.atomunion.util.PatternMatchUtils.simpleMatches(["*get", "get*"], "getName"));
      js.test.Assert.assertTrue("", !org.atomunion.util.PatternMatchUtils.simpleMatches(["*get", "get*"], "setName"));
    }

  });
});