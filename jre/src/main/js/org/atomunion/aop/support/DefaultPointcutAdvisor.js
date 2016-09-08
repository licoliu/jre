define(function(require, exports, module) {
  return Class.forName({
    name: "class org.atomunion.aop.support.DefaultPointcutAdvisor extends Object",

    "@Getter @Setter pointcut": null,
    "@Getter @Setter advice": null,

    DefaultPointcutAdvisor: function(pointcut, advice) {
      this.pointcut = pointcut;
      this.advice = advice;
    }
  }).getClassConstructor();
});