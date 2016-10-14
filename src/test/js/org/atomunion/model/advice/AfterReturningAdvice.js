define(function(require, exports, module) {

  require("bootstrap!org.atomunion.aop.AfterReturningAdvice");

  return Class.forName({
    name: "class org.atomunion.model.advice.AfterReturningAdvice extends org.atomunion.aop.AfterReturningAdvice",

    "public afterReturning": function(returnValue, method, args, target) {
      js.lang.System.out.println("*************afterReturning****************");
    }
  });

});