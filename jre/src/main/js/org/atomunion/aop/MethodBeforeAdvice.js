define(function(require, exports, module) {
  /**
   * @requires org.atomunion.aop.BeforeAdvice
   */
  require("bootstrap!org.atomunion.aop.BeforeAdvice");

  /** 
   * @abstract
   * @class org.atomunion.aop.MethodBeforeAdvice
   * @extends {org.atomunion.aop.BeforeAdvice}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Advice invoked before a method is invoked. Such advices cannot prevent the method call proceeding, unless they throw a Throwable.
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   * 
   * @see {@link org.atomunion.aop.BeforeAdvice}
   */
  return Class.forName( /** @lends org.atomunion.aop.MethodBeforeAdvice.prototype */ {
    name: "class org.atomunion.aop.MethodBeforeAdvice extends org.atomunion.aop.BeforeAdvice",

    /**
     * @function
     * @public 
     * @abstract
     * @summary Callback before a given method is invoked.
     * @description Callback before a given method is invoked.
     *
     * @param {js.lang.reflect.Method} method - method being invoked
     * @param {js.lang.Array} args - arguments to the method
     * @param {js.lang.Object} target - target of the method invocation. May be null.
     */
    "public abstract before": function(method, args, target) {}

  }).getClassConstructor();
});