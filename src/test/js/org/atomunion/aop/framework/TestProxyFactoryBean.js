define(function(require, exports, module) {

  require("bootstrap!js.test.TestCase");
  require("test!js.model.Dog");

  require("bootstrap!org.atomunion.aop.support.DefaultPointcutAdvisor");
  require("bootstrap!org.atomunion.aop.support.NameMatchMethodPointcut");
  require("bootstrap!org.atomunion.aop.framework.ProxyFactoryBean");

  require("test!org.atomunion.model.advice.AfterReturningAdvice");
  require("test!org.atomunion.model.advice.MethodBeforeAdvice");
  require("test!org.atomunion.model.advice.ThrowsAdvice");

  return Class.forName({
    name: "class org.atomunion.aop.framework.TestProxyFactoryBean",
    "@Setter @Getter private proxy": null,

    TestProxyFactoryBean: function() {

      var afterAdvisor = new org.atomunion.aop.support.DefaultPointcutAdvisor();
      afterAdvisor.setPointcut(new org.atomunion.aop.support.NameMatchMethodPointcut("js.model.*Dog.say*"));
      afterAdvisor.setAdvice(new org.atomunion.model.advice.AfterReturningAdvice());

      var beforeAdvisor = new org.atomunion.aop.support.DefaultPointcutAdvisor();
      beforeAdvisor.setPointcut(new org.atomunion.aop.support.NameMatchMethodPointcut("js.model.*Dog.say*"));
      beforeAdvisor.setAdvice(new org.atomunion.model.advice.MethodBeforeAdvice());

      var throwsAdvisor = new org.atomunion.aop.support.DefaultPointcutAdvisor();
      throwsAdvisor.setPointcut(new org.atomunion.aop.support.NameMatchMethodPointcut("js.model.*Dog.say*"));
      throwsAdvisor.setAdvice(new org.atomunion.model.advice.ThrowsAdvice());

      this.proxy = new org.atomunion.aop.framework.ProxyFactoryBean("js.model.Dog");
      this.proxy.addAdvisor(afterAdvisor);
      this.proxy.addAdvisor(beforeAdvisor);
      this.proxy.addAdvisor(throwsAdvisor);
    },

    "@Before public setUp": function() {},

    "@After public tearDown": function() {},

    "@Test testGetObject": function() {
      var target = this.proxy.getObject();
      js.test.Assert.assertTrue("", !!target);

      target.say();

      target.sayError();
    },

    "@Test testGetObjectType": function() {
      js.test.Assert.assertTrue("", !!this.proxy.getObjectType());
    },

    "@Test testGetProxy": function() {
      js.test.Assert.assertTrue("", !!this.proxy.getProxy());
    },

    "@Test testSetTargetName": function(targetName) {},

    "@Test testIsSingleton": function() {},

    "@Test testSetSingletonInstance": function() {},

    "@Test testGetSingletonInstance": function() {}

  });

});