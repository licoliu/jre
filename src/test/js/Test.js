define(function(require, exports, module) {

  require("test!js.test.TestTestCase");

  require("test!js.lang.TestObject");
  require("test!js.lang.TestOOP");

  require("test!js.lang.TestStringBuffer");
  require("test!js.lang.TestArray");

  require("test!js.lang.reflect.TestClass");
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

  require("test!org.atomunion.aspect.TestAspect");

  new js.test.TestTestCase();

  new js.lang.TestObject();
  new js.lang.TestOOP();

  new js.lang.TestStringBuffer();
  new js.lang.TestArray();

  new js.lang.reflect.TestClass();
  new js.lang.reflect.TestField();
  new js.lang.reflect.TestMethod();

  new js.text.TestDateFormat();

  new js.util.TestMap();
  new js.util.TestHashMap();

  new js.util.TestList();
  new js.util.TestArrayList();

  new js.util.TestHashSet();

  new js.util.TestDate();
  new js.util.TestCalendar();
  new js.util.TestGregorianCalendar();

  new org.atomunion.web.context.support.TestGenericWebApplicationContext();
  new org.atomunion.aop.framework.TestProxyFactoryBean();
  new org.atomunion.util.TestPatternMatchUtils();

  new org.atomunion.aspect.TestAspect();
});