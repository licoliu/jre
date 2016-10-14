define(function(require, exports, module) {

  require("bootstrap!org.atomunion.aop.ThrowsAdvice");

  return Class.forName({
    name: "class org.atomunion.model.advice.ThrowsAdvice extends org.atomunion.aop.ThrowsAdvice",

    "public afterThrowing": function(method, args, target, e) {
      js.lang.System.out.println("*************afterThrowing****************" + e.getMessage());
    }
  });

});