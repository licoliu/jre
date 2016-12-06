define(function(require, exports, module) {

  require("bootstrap!js.test.TestCase");

  require("test!org.atomunion.stereotype.TestComponent");
  require("test!org.atomunion.stereotype.TestController");
  require("test!org.atomunion.stereotype.TestService");
  require("test!org.atomunion.stereotype.TestDao");

  require("test!org.atomunion.stereotype.TestResource");
  require("test!org.atomunion.stereotype.TestAutowire");

  return Class.forName({
    name: "class org.atomunion.stereotype.TestAspect",

    "@Resource('org.atomunion.stereotype.ComponentBean') componentBean1": null,
    "@Resource('org.atomunion.stereotype.ControllerBean') controllerBean1": null,
    "@Resource('org.atomunion.stereotype.ServiceBean') serviceBean1": null,
    "@Resource('org.atomunion.stereotype.DaoBean') daoBean1": null,

    "@Autowire('org.atomunion.stereotype.ComponentBean') componentBean2": null,
    "@Autowire('org.atomunion.stereotype.ControllerBean') controllerBean2": null,
    "@Autowire('org.atomunion.stereotype.ServiceBean') serviceBean2": null,
    "@Autowire('org.atomunion.stereotype.DaoBean') daoBean2": null,

    "@org.atomunion.stereotype.Resource('org.atomunion.stereotype.ComponentBean') componentBean3": null,
    "@org.atomunion.stereotype.Resource('org.atomunion.stereotype.ControllerBean') controllerBean3": null,
    "@org.atomunion.stereotype.Resource('org.atomunion.stereotype.ServiceBean') serviceBean3": null,
    "@org.atomunion.stereotype.Resource('org.atomunion.stereotype.DaoBean') daoBean3": null,

    "@org.atomunion.stereotype.Autowire('org.atomunion.stereotype.ComponentBean') componentBean4": null,
    "@org.atomunion.stereotype.Autowire('org.atomunion.stereotype.ControllerBean') controllerBean4": null,
    "@org.atomunion.stereotype.Autowire('org.atomunion.stereotype.ServiceBean') serviceBean4": null,
    "@org.atomunion.stereotype.Autowire('org.atomunion.stereotype.DaoBean') daoBean4": null,

    TestAspect: function() {},

    "@Before public setUp": function() {},

    "@After public tearDown": function() {},

    "@Test public testResource1": function() {
      js.test.Assert.assertTrue("", this.componentBean1);
      js.test.Assert.assertTrue("", this.controllerBean1);
      js.test.Assert.assertTrue("", this.serviceBean1);
      js.test.Assert.assertTrue("", this.daoBean1);
    },

    "@Test public testAutowire1": function() {
      js.test.Assert.assertTrue("", this.componentBean2);
      js.test.Assert.assertTrue("", this.controllerBean2);
      js.test.Assert.assertTrue("", this.serviceBean2);
      js.test.Assert.assertTrue("", this.daoBean2);
    },

    "@Test public testResource2": function() {
      js.test.Assert.assertTrue("", this.componentBean3);
      js.test.Assert.assertTrue("", this.controllerBean3);
      js.test.Assert.assertTrue("", this.serviceBean3);
      js.test.Assert.assertTrue("", this.daoBean3);
    },

    "@Test public testAutowire2": function() {
      js.test.Assert.assertTrue("", this.componentBean4);
      js.test.Assert.assertTrue("", this.controllerBean4);
      js.test.Assert.assertTrue("", this.serviceBean4);
      js.test.Assert.assertTrue("", this.daoBean4);
    }

  });
});