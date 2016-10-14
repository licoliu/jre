define(function(require, exports, module) {

  /** 
   * @abstract
   * @class org.atomunion.aop.Advisor - interface
   * @extends {js.lang.Object}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Base interface holding AOP advice (action to take at a joinpoint) and a filter determining the applicability of the advice (such as a pointcut). This interface is not for use by Spring users, but to allow for commonality in support for different types of advice.
   * </p>
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * AOP is based around around advice delivered via method interception, compliant with the AOP Alliance interception API. The Advisor interface allows support for different types of advice, such as before and after advice, which need not be implemented using interception.
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
  return Class.forName( /** @lends org.atomunion.aop.Advisor.prototype */ {
    name: "class org.atomunion.aop.Advisor extends Object",

    /**
     * @abstract
     * @function
     * @public 
     * @summary Return the advice part of this aspect.
     * @description Return the advice part of this aspect.
     *
     * @return {org.aopalliance.aop.Advice} 
     */
    getAdvice: function() {},

    /**
     * @abstract
     * @function
     * @public 
     * @summary Return whether this advice is associated with a particular instance (for example, creating a mixin) or shared with all instances of the advised class obtained from the same Spring bean factory.
     * @description Return whether this advice is associated with a particular instance (for example, creating a mixin) or shared with all instances of the advised class obtained from the same Spring bean factory.
     *
     * @return {js.lang.Boolean} 
     */
    isPerInstance: function() {}
  }).getClassConstructor();
});