define(function(require, exports, module) {
  require("bootstrap!js.test.annotation.After");
  require("bootstrap!js.test.annotation.AfterClass");
  require("bootstrap!js.test.annotation.Before");
  require("bootstrap!js.test.annotation.BeforeClass");
  require("bootstrap!js.test.annotation.Ignore");
  require("bootstrap!js.test.annotation.Test");

  require("bootstrap!js.test.runner.Result");

  require("bootstrap!org.atomunion.web.context.support.GenericWebApplicationContext");

  /** 
   * @class js.test.runner.JUnitCore
   * @extends {js.lang.Object}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * JUnitCore is a facade for running tests. It supports running JUnit 4 tests, JUnit 3.8.x tests, and mixtures. To run tests from the command line, run java org.junit.runner.JUnitCore TestClass1 TestClass2 .... For one-shot test runs, use the static method runClasses(Class[]). If you want to add special listeners, create an instance of JUnitCore first and use it to run the tests.
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
  return Class.forName( /** @lends js.test.runner.JUnitCore.prototype */ {
    name: "class js.test.runner.JUnitCore extends Object",


    /** 
     * @name js.test.runner.JUnitCore.main
     * @function
     * @public 
     * @static
     * @summary Run the tests contained in the classes named in the args.
     * @description Run the tests contained in the classes named in the args. If all tests run successfully, exit with a status of 0. Otherwise exit with a status of 1. Write feedback while tests are running and write stack traces for all failed tests after the tests all complete.
     *
     * @param {js.lang.Array} args - names of classes in which to find tests to run
     */
    "static main": function(args) {
      var context = org.atomunion.web.context.support.GenericWebApplicationContext.getInstance();
      var classes = [];
      for (var i = 0, len = args.length; i < len; i++) {
        var type = context.getType(args[i]);
        if (type) {
          classes.push(type);
        }
      }
      return js.test.runner.JUnitCore.runClasses(classes);
    },

    /** 
     * @name js.test.runner.JUnitCore.runClasses
     * @function
     * @public 
     * @static
     * @summary Run the tests contained in classes.
     * @description Run the tests contained in classes. Write feedback while the tests are running and write stack traces for all failed tests after all tests complete. This is similar to main(String[]), but intended to be used programmatically.
     *
     * @param {js.lang.Class} classes - Classes in which to find tests
     * @return {js.test.runner.Result} a Result describing the details of the test run and the failed tests.
     */
    "static runClasses": function(classes) {

      var result = new js.test.runner.Result();

      var context = org.atomunion.web.context.support.GenericWebApplicationContext.getInstance();

      for (var i = 0, len = classes.length; i < len; i++) {
        var klass = classes[i];
        var methods = klass.getDeclaredMethods();
        var testcaseName = klass.getFullName();
        var bean = context.getBean(testcaseName);

        var method = null;

        var beforeClass = null,
          before = null,
          tests = [],
          after = null,
          afterClass = null;

        for (var j = 0, length = methods.length; j < length; j++) {
          method = methods[j];
          var annotations = method.getDeclaredAnnotations(),
            annotation = null,
            flag = false;
          for (var l = 0, len2 = annotations.length; l < len2; l++) {
            annotation = annotations[l];
            if (annotation.$class === js.test.annotation.Ignore.$class) {
              result._ignoreCount++;
              flag = true;
              break;
            }
          }
          if (!flag) {
            for (l = 0, len2 = annotations.length; l < len2; l++) {
              if (annotation.$class === js.test.annotation.BeforeClass.$class &&
                (method.getModifiers() & 8) !== 0) {
                beforeClass = method;
              } else if (annotation.$class === js.test.annotation.AfterClass.$class &&
                (method.getModifiers() & 8) !== 0) {
                afterClass = method;
              } else if (annotation.$class === js.test.annotation.Before.$class) {
                before = method;
              } else if (annotation.$class === js.test.annotation.After.$class) {
                after = method;
              } else if (annotation.$class === js.test.annotation.Test.$class) {
                tests.push(method);
              }
            }
          }
        }

        js.lang.System.out.group(["########  TestCase { ClassName「", testcaseName, "」 }  ########"].join(""));

        // 1. invoke before class
        if (beforeClass) {
          beforeClass.getValue().call(klass.getClassConstructor());
        }

        var m = 0,
          len3 = tests.length;

        for (; m < len3; m++) {
          method = tests[m];

          js.lang.System.out.println(["        --------  Method「", method.getName(), "」  "].join(""));

          try {
            // 2. invoke before
            if (before) {
              before.getValue().call(bean);
            }

            var startTime = new Date().getTime();
            // 3. invoke test
            method.getValue().call(bean);
            var endTime = new Date().getTime();
            result._runCount++;
            result._runTime += endTime - startTime;

            // 4. invoke after
            if (after) {
              after.getValue().call(bean);
            }

            js.lang.System.out.println("        结果： √ ");
          } catch (e) {
            result._failureCount++;
            js.lang.System.out.error("        结果： ×     详细描述：  %s", ["Name< ", e.getName(), " >;  Number< ", e.getNumber(), " >;  Message< ", e.getMessage(), " >"].join(""));
          }

          js.lang.System.out.println("");
        }

        // 5. invoke after class
        if (afterClass) {
          afterClass.getValue().call(klass.getClassConstructor());
        }

        js.lang.System.out.groupEnd();
      }

      js.lang.System.out.group(["########  测试报告  ########"].join(""));

      js.lang.System.out.println("        --------  测试结果: " + result.wasSuccessful());
      js.lang.System.out.println("        --------  失败测试用例数: " + result.getFailureCount());
      js.lang.System.out.println("        --------  忽略测试用例数: " + result.getIgnoreCount());
      js.lang.System.out.println("        --------  执行测试用例数: " + result.getRunCount());
      js.lang.System.out.println("        --------  所有测试用例执行时间总计: " + result.getRunTime() / 1000 + "s.");

      js.lang.System.out.groupEnd();

      return result;
    },

    /** 
     * @function
     * @public 
     * @summary Run all the tests in classes.
     * @description Run all the tests in classes.
     *
     * @param {js.lang.Class} classes - the classes containing tests
     * @return {js.test.runner.Result} a Result describing the details of the test run and the failed tests.
     */
    "run": function(classes) {
      return js.test.runner.JUnitCore.runClasses(classes);
    }

  }).getClassConstructor();

});