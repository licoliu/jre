define(function(require, exports, module) {

  /**
   * @requires org.atomunion.aop.Advisor
   */
  require("bootstrap!org.atomunion.aop.Advisor");

  /** 
   * @abstract
   * @class org.atomunion.aop.support.AbstractPointcutAdvisor
   * @extends {org.atomunion.aop.Advisor}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Abstract base class for PointcutAdvisor implementations. Can be subclassed for returning a specific pointcut/advice or a freely configurable pointcut/advice.
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
  return Class.forName( /** @lends org.atomunion.aop.support.AbstractPointcutAdvisor.prototype */ {
    name: "abstract class org.atomunion.aop.support.AbstractPointcutAdvisor extends org.atomunion.aop.Advisor",

    /**
     * @name org.atomunion.aop.support.AbstractPointcutAdvisor.prototype.pointcut
     * @property {org.atomunion.aop.Pointcut}
     * @private
     */
    "private pointcut": null,

    /**
     * @name org.atomunion.aop.support.AbstractPointcutAdvisor.prototype.advice
     * @property {org.aopalliance.aop.Advice}
     * @private
     */
    "private advice": null,

    AbstractPointcutAdvisor: function(pointcut, advice) {
      this.pointcut = pointcut;
      this.advice = advice;
    },

    /** 
     * @function
     * @public
     * @summary get pointcut.
     * @description get pointcut.
     *
     * @return {org.atomunion.aop.Pointcut} 
     */
    getPointcut: function() {
      return this.pointcut;
    },

    /** 
     * @function
     * @public
     * @summary set pointcut.
     * @description set pointcut.
     *
     * @param {org.atomunion.aop.Pointcut} 
     */
    setPointcut: function(pointcut) {
      this.pointcut = pointcut;
    },

    /** 
     * @function
     * @public
     * @summary get advice.
     * @description get advice.
     *
     * @return {org.aopalliance.aop.Advice} 
     */
    getAdvice: function() {
      return this.advice;
    },

    /** 
     * @function
     * @public
     * @summary set advice.
     * @description set advice.
     *
     * @param {org.aopalliance.aop.Advice} 
     */
    setAdvice: function(advice) {
      this.advice = advice;
    },

    /**
     * @function
     * @public 
     * @summary Get the order value of this object.
     * @description Get the order value of this object.
     *
     * @return {js.lang.Number}  
     */
    getOrder: function() {},

    /**
     * @function
     * @public
     * @param {js.lang.Number}  
     */
    setOrder: function(order) {},

    /**
     * @function
     * @public
     * @param {js.lang.Number} 
     * @summary Return whether this advice is associated with a particular instance (for example, creating a mixin) or shared with all instances of the advised class obtained from the same Spring bean factory.
     * @description Return whether this advice is associated with a particular instance (for example, creating a mixin) or shared with all instances of the advised class obtained from the same Spring bean factory.
     *
     * @return {js.lang.Bollean}  
     */
    isPerInstance: function() {}

  }).getClassConstructor();
});