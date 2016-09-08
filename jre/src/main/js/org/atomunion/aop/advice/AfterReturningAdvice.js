define(function(require, exports, module) {
  return Class.forName({
    name: "class org.atomunion.aop.advice.AfterReturningAdvice extends Object",

    "public abstract afterReturning": function(returnValue, method, args, target) {}

  }).getClassConstructor();
});