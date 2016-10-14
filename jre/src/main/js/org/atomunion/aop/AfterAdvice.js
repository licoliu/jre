define(function(require, exports, module) {

  /**
   * @requires org.aopalliance.aop.Advice
   */
  require("bootstrap!org.aopalliance.aop.Advice");

  /** 
   * @abstract
   * @class org.atomunion.aop.AfterAdvice
   * @extends {org.aopalliance.aop.Advice}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Common marker interface for after advice, such as AfterReturningAdvice and ThrowsAdvice.
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   * 
   * @see {@link org.aopalliance.aop.Advice}
   */
  return Class.forName( /** @lends org.atomunion.aop.AfterAdvice.prototype */ {
    name: "class org.atomunion.aop.AfterAdvice extends org.aopalliance.aop.Advice"
  }).getClassConstructor();
});