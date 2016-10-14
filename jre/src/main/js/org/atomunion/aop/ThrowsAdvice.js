define(function(require, exports, module) {
  /**
   * @requires org.atomunion.aop.AfterAdvice
   */
  require("bootstrap!org.atomunion.aop.AfterAdvice");

  /**
   * @abstract
   * @class org.atomunion.aop.ThrowsAdvice
   * @extends {org.atomunion.aop.AfterAdvice}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Tag interface for throws advice.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Note: If a throws-advice method throws an exception itself, it will override the original exception (i.e. change the exception thrown to the user). The overriding exception will typically be a RuntimeException; this is compatible with any method signature. However, if a throws-advice method throws a checked exception, it will have to match the declared exceptions of the target method and is hence to some degree coupled to specific target method signatures. Do not throw an undeclared checked exception that is incompatible with the target method's signature!
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   * 
   * @see {@link org.atomunion.aop.AfterAdvice}
   */
  return Class.forName( /** @lends org.atomunion.aop.ThrowsAdvice.prototype */ {
    name: "class org.atomunion.aop.ThrowsAdvice extends org.atomunion.aop.AfterAdvice",

    /**
     * @function
     * @public 
     * @abstract
     * @summary Callback once catching exceptions from a given method.
     * @description Callback once catching exceptions from a given method.
     *
     * @param {js.lang.reflect.Method} method - method being invoked
     * @param {js.lang.Array} args - arguments to the method
     * @param {js.lang.Object} target - target of the method invocation. May be null.
     * @param {js.lang.Throwable} e - an exception is thrown.
     * @param {js.lang.Object} returnValue - the value returned by the method, if any(mostly accour with an asynchronous call)
     */
    "public abstract afterThrowing": function(method, args, target, e, returnValue) {}

  }).getClassConstructor();
});