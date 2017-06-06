define(function(require, exports, module) {

  require("bootstrap!js.test.TestCase");
  require("bootstrap!js.test.Assert");

  return Class.forName({
    name: "class js.lang.TestNumber",

    "TestNumber": function() {},

    "@Before public setUp": function() {},

    "@After public tearDown": function() {},

    "@Test public testNumberValue": function() {

      var numberValue = new Number(0);
      js.test.Assert.assertTrue("类js.lang.Number中的numberValue方法测试不通过", numberValue.numberValue() == 0);

      numberValue = new Number(0.0);
      js.test.Assert.assertTrue("类js.lang.Number中的numberValue方法测试不通过", numberValue.numberValue() == 0.0);

      numberValue = new Number(-1);
      js.test.Assert.assertTrue("类js.lang.Number中的numberValue方法测试不通过", numberValue.numberValue() == -1);

      numberValue = new Number();
      numberValue.primitiveValue = 1;
      js.test.Assert.assertTrue("类js.lang.Number中的numberValue方法测试不通过", numberValue.numberValue() == 1);
    }

  });

});