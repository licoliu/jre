 define(function(require, exports, module) {

   require("bootstrap!js.test.TestCase");
   require("bootstrap!js.test.Assert");

   require("bootstrap!org.atomunion.aspect.Controller");
   require("bootstrap!org.atomunion.beans.factory.support.AutowireCapableBeanFactory");

   Class.forName({
     name: "@Component class org.atomunion.aspect.ControllerBean",

     ControllerBean: function() {},

     getName: function() {
       return this.getClass().getFullName();
     }
   });

   return Class.forName({
     name: "class org.atomunion.aspect.TestController extends js.test.TestCase",

     TestController: function() {},

     "@Before public setUp": function() {},

     "@After public tearDown": function() {},

     "@Test public testGetName": function() {
       var instance = org.atomunion.beans.factory.support.AutowireCapableBeanFactory.getInstance();
       js.test.Assert.assertTrue("", instance.getBean("org.atomunion.aspect.ControllerBean"));

       js.test.Assert.assertTrue("", "org.atomunion.aspect.ControllerBean" === instance.getBean("org.atomunion.aspect.ControllerBean").getName());
     }
   });
 });