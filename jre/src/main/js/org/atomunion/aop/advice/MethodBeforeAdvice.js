define(function(require, exports, module) {
  return Class.forName({
    name: "class org.atomunion.aop.advice.MethodBeforeAdvice extends Object",

    "public abstract before": function(method, args, target) {}

  }).getClassConstructor();
});