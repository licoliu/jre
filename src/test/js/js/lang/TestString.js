define(function(require, exports, module) {

  require("bootstrap!js.test.TestCase");
  require("bootstrap!js.test.Assert");

  return Class.forName({
    name: "class js.lang.TestString",

    "TestString": function() {},

    "@Before public setUp": function() {},

    "@After public tearDown": function() {},

    "@Test public testStringValue": function() {

      var stringValue = new String("");
      js.test.Assert.assertTrue("类js.lang.String中的stringValue方法测试不通过", stringValue.stringValue() == '');

      stringValue = new String("-");
      js.test.Assert.assertTrue("类js.lang.String中的stringValue方法测试不通过", stringValue.stringValue() == '-');

      stringValue = new String();
      stringValue.primitiveValue = "+";
      js.test.Assert.assertTrue("类js.lang.String中的stringValue方法测试不通过", stringValue.stringValue() == '+');
    }

  });

});