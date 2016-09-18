define(function(require, exports, module) {

  require("bootstrap!js.test.TestCase");

  require("test!org.atomunion.aspect.TestComponent");
  require("test!org.atomunion.aspect.TestController");
  require("test!org.atomunion.aspect.TestService");
  require("test!org.atomunion.aspect.TestDao");

  require("test!org.atomunion.aspect.TestResource");
  require("test!org.atomunion.aspect.TestAutowire");


  new org.atomunion.aspect.TestComponent();
  new org.atomunion.aspect.TestController();
  new org.atomunion.aspect.TestService();
  new org.atomunion.aspect.TestDao();

  new org.atomunion.aspect.TestResource();
  new org.atomunion.aspect.TestAutowire();

  return Class.forName({
    name: "class org.atomunion.aspect.TestAspect",

    "@Resource('org.atomunion.aspect.ComponentBean') componentBean1": null,
    "@Resource('org.atomunion.aspect.ControllerBean') controllerBean1": null,
    "@Resource('org.atomunion.aspect.ServiceBean') serviceBean1": null,
    "@Resource('org.atomunion.aspect.DaoBean') daoBean1": null,

    "@Autowire('org.atomunion.aspect.ComponentBean') componentBean2": null,
    "@Autowire('org.atomunion.aspect.ControllerBean') controllerBean2": null,
    "@Autowire('org.atomunion.aspect.ServiceBean') serviceBean2": null,
    "@Autowire('org.atomunion.aspect.DaoBean') daoBean2": null,

    "@org.atomunion.aspect.Resource('org.atomunion.aspect.ComponentBean') componentBean3": null,
    "@org.atomunion.aspect.Resource('org.atomunion.aspect.ControllerBean') controllerBean3": null,
    "@org.atomunion.aspect.Resource('org.atomunion.aspect.ServiceBean') serviceBean3": null,
    "@org.atomunion.aspect.Resource('org.atomunion.aspect.DaoBean') daoBean3": null,

    "@org.atomunion.aspect.Autowire('org.atomunion.aspect.ComponentBean') componentBean4": null,
    "@org.atomunion.aspect.Autowire('org.atomunion.aspect.ControllerBean') controllerBean4": null,
    "@org.atomunion.aspect.Autowire('org.atomunion.aspect.ServiceBean') serviceBean4": null,
    "@org.atomunion.aspect.Autowire('org.atomunion.aspect.DaoBean') daoBean4": null,

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