define(function(require, exports, module) {
  require("bootstrap!js.test.annotation.After");
  require("bootstrap!js.test.annotation.AfterClass");
  require("bootstrap!js.test.annotation.Before");
  require("bootstrap!js.test.annotation.BeforeClass");
  require("bootstrap!js.test.annotation.Ignore");
  require("bootstrap!js.test.annotation.Test");

  require("bootstrap!js.test.runner.Result");

  require("bootstrap!org.atomunion.web.context.support.GenericWebApplicationContext");

  return Class.forName({
    name: "class js.test.runner.JUnitCore extends Object",

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

    "static runClasses": function(classes) {

      var result = new js.test.runner.Result();

      var context = org.atomunion.web.context.support.GenericWebApplicationContext.getInstance();

      for (var i = 0, len = classes.length; i < len; i++) {
        var klass = classes[i];
        var methods = klass.getMethods();
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
          var annotations = method.getAnnotations(),
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

    "run": function(classes) {
      return js.test.runner.JUnitCore.runClasses(classes);
    }

  }).getClassConstructor();

});