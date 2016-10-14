define(function(require, exports, module) {

  /**
   * @requires org.aopalliance.aop.Advice
   */
  require("bootstrap!org.aopalliance.aop.Advice");

  /** 
   * @abstract
   * @class org.atomunion.aop.BeforeAdvice
   * @extends {org.aopalliance.aop.Advice}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Common marker interface for before advice, such as MethodBeforeAdvice.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Spring supports only method before advice. Although this is unlikely to change, this API is designed to allow field advice in future if desired.
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   * 
   * @see {@link org.aopalliance.aop.Advice}
   * @see {@link org.atomunion.aop.MethodBeforeAdvice}
   */
  return Class.forName( /** @lends org.atomunion.aop.BeforeAdvice.prototype */ {
    name: "class org.atomunion.aop.BeforeAdvice extends org.aopalliance.aop.Advice"
  }).getClassConstructor();
});