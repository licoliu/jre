define(function(require, exports, module) {

  /**
   * @requires org.atomunion.aop.AfterAdvice
   */
  require("bootstrap!org.atomunion.aop.AfterAdvice");

  /**
   * @abstract
   * @class org.atomunion.aop.AfterReturningAdvice
   * @extends {org.atomunion.aop.AfterAdvice}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * After returning advice is invoked only on normal method return, not if an exception is thrown. Such advice can see the return value, but cannot change it.
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   * 
   * @see {@link org.atomunion.aop.AfterAdvice}
   */
  return Class.forName( /** @lends org.atomunion.aop.AfterReturningAdvice.prototype */ {
    name: "class org.atomunion.aop.AfterReturningAdvice extends org.atomunion.aop.AfterAdvice",

    /**
     * @function
     * @public 
     * @abstract
     * @summary Callback after a given method successfully returned.
     * @description Callback after a given method successfully returned.
     *
     * @param {js.lang.Object} returnValue - the value returned by the method, if any
     * @param {js.lang.reflect.Method} method - method being invoked
     * @param {js.lang.Array} args - arguments to the method
     * @param {js.lang.Object} target - target of the method invocation. May be null.
     */
    "public abstract afterReturning": function(returnValue, method, args, target) {}

  }).getClassConstructor();
});