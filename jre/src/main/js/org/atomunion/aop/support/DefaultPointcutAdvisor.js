define(function(require, exports, module) {

  /**
   * @requires org.atomunion.aop.support.AbstractPointcutAdvisor
   */
  require("bootstrap!org.atomunion.aop.support.AbstractPointcutAdvisor");

  /** 
   * @class org.atomunion.aop.support.DefaultPointcutAdvisor 
   * @extends {org.atomunion.aop.support.AbstractPointcutAdvisor}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Convenient Pointcut-driven Advisor implementation.
   * </p>
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * This is the most commonly used Advisor implementation. It can be used with any pointcut and advice type, except for introductions. There is normally no need to subclass this class, or to implement custom Advisors.
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
  return Class.forName( /** @lends org.atomunion.aop.support.DefaultPointcutAdvisor.prototype */ {
    name: "class org.atomunion.aop.support.DefaultPointcutAdvisor extends org.atomunion.aop.support.AbstractPointcutAdvisor"
  }).getClassConstructor();
});