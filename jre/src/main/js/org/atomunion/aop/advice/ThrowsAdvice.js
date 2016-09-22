define(function(require, exports, module) {
  return Class.forName({
    name: "class org.atomunion.aop.advice.ThrowsAdvice extends Object",

    "public abstract afterThrowing": function(method, args, target, e, returnValue) {}

  }).getClassConstructor();
});