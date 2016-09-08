define(function(require, exports, module) {

  require("bootstrap!js.test.TestCase");

  return Class.forName({
    name: "class org.atomunion.aop.support.TestDefaultPointcutAdvisor extends js.test.TestCase"
  });

});