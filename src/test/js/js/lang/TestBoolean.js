define(function(require, exports, module) {

  require("bootstrap!js.test.TestCase");
  require("bootstrap!js.test.Assert");

  return Class.forName({
    name: "class js.lang.TestBoolean",

    "TestBoolean": function() {},

    "@Before public setUp": function() {},

    "@After public tearDown": function() {},

    "@Test public testBooleanValue": function() {

      var booleanValue = new Boolean(true);
      js.test.Assert.assertTrue("类js.lang.Boolean中的booleanValue方法测试不通过", booleanValue.booleanValue());

      booleanValue = new Boolean(false);
      js.test.Assert.assertTrue("类js.lang.Boolean中的booleanValue方法测试不通过", !booleanValue.booleanValue());

      booleanValue = new Boolean();
      booleanValue.primitiveValue = true;
      js.test.Assert.assertTrue("类js.lang.Boolean中的booleanValue方法测试不通过", booleanValue.booleanValue());
    }

  });

});