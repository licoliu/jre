define(function(require, exports, module) {

  require("test!js.test.TestTestCase");

  require("test!js.lang.TestObject");
  require("test!js.lang.TestOOP");

  require("test!js.lang.TestNumber");
  require("test!js.lang.TestBoolean");
  require("test!js.lang.TestString");

  require("test!js.lang.TestStringBuffer");
  require("test!js.lang.TestArray");

  require("test!js.lang.TestClass");
  require("test!js.lang.reflect.TestField");
  require("test!js.lang.reflect.TestMethod");

  require("test!js.text.TestDateFormat");

  require("test!js.util.TestMap");
  require("test!js.util.TestHashMap");

  require("test!js.util.TestList");
  require("test!js.util.TestArrayList");

  require("test!js.util.TestHashSet");

  require("test!js.util.TestDate");
  require("test!js.util.TestCalendar");
  require("test!js.util.TestGregorianCalendar");

  require("test!org.atomunion.web.context.support.TestGenericWebApplicationContext");
  require("test!org.atomunion.aop.framework.TestProxyFactoryBean");
  require("test!org.atomunion.util.TestPatternMatchUtils");

  require("test!org.atomunion.stereotype.TestComponent");
  require("test!org.atomunion.stereotype.TestController");
  require("test!org.atomunion.stereotype.TestService");
  require("test!org.atomunion.stereotype.TestDao");

  require("test!org.atomunion.stereotype.TestResource");
  require("test!org.atomunion.stereotype.TestAutowire");

  require("test!org.atomunion.stereotype.TestAspect");


  require("bootstrap!js.test.runner.JUnitCore");

  var result = js.test.runner.JUnitCore.runClasses([
    js.test.TestTestCase.$class,
    js.lang.TestObject.$class,
    js.lang.TestOOP.$class,
    js.lang.TestNumber.$class,
    js.lang.TestBoolean.$class,
    js.lang.TestString.$class,
    js.lang.TestStringBuffer.$class,
    js.lang.TestArray.$class,
    js.lang.TestClass.$class,
    js.lang.reflect.TestField.$class,
    js.lang.reflect.TestMethod.$class,
    js.text.TestDateFormat.$class,
    js.util.TestMap.$class,
    js.util.TestHashMap.$class,
    js.util.TestList.$class,
    js.util.TestArrayList.$class,
    js.util.TestHashSet.$class,
    js.util.TestDate.$class,
    js.util.TestCalendar.$class,
    js.util.TestGregorianCalendar.$class,
    org.atomunion.web.context.support.TestGenericWebApplicationContext.$class,
    org.atomunion.aop.framework.TestProxyFactoryBean.$class,


    org.atomunion.stereotype.TestComponent.$class,
    org.atomunion.stereotype.TestController.$class,
    org.atomunion.stereotype.TestService.$class,
    org.atomunion.stereotype.TestDao.$class,

    org.atomunion.stereotype.TestResource.$class,
    org.atomunion.stereotype.TestAutowire.$class,

    org.atomunion.util.TestPatternMatchUtils.$class, org.atomunion.stereotype.TestAspect.$class
  ]);

});