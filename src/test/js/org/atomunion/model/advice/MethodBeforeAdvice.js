define(function(require, exports, module) {

  require("bootstrap!org.atomunion.aop.advice.MethodBeforeAdvice");

  return Class.forName({
    name: "class org.atomunion.model.advice.MethodBeforeAdvice extends org.atomunion.aop.advice.MethodBeforeAdvice",

    "public before": function(method, args, target) {
      js.lang.System.out.println("*************before****************");
    }
  });

});