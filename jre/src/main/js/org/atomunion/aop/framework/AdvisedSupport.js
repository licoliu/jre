define(function(require, exports, module) {

  /** 
   * @class org.atomunion.aop.framework.AdvisedSupport
   * @extends {js.lang.Object}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Base class for AOP proxy configuration managers. These are not themselves AOP proxies, but subclasses of this class are normally factories from which AOP proxy instances are obtained directly.
   * </p>
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * This class frees subclasses of the housekeeping of Advices and Advisors, but doesn't actually implement proxy creation methods, which are provided by subclasses.
   * </p>
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * This class is serializable; subclasses need not be. This class is used to hold snapshots of proxies.
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
  return Class.forName( /** @lends org.atomunion.aop.framework.AdvisedSupport.prototype */ {
    name: "class org.atomunion.aop.framework.AdvisedSupport extends Object",

    /**
     * @name org.atomunion.aop.framework.AdvisedSupport.prototype.advisors
     * @property {js.lang.Array}
     * @protected
     */
    "protected advisors": [],

    /** 
     * @function
     * @public
     * @summary get advisors.
     * @description get advisors.
     *
     * @return {js.lang.Array} 
     */
    getAdvisors: function() {
      return this.advisors;
    },

    /**
     * @function
     * @public 
     * @summary Add an advisor at the end of the advisor chain.
     * @description Add an advisor at the end of the advisor chain.
     *
     * @param {js.lang.Number} 
     * @param {org.atomunion.aop.Advisor} 
     */
    "setAdvisor": function(pos, advisor) {
      if (pos > this.advisors.length) {
        throw new js.lang.IllegalArgumentException(
          "Illegal position " + pos + " in advisor list with size " + this.advisors.length);
      }
      this.advisors[pos] = advisor;
    },

    /**
     * @function
     * @public 
     * @summary Add an advisor at the end of the advisor chain.
     * @description Add an advisor at the end of the advisor chain.
     *
     * @param {org.atomunion.aop.Advisor} 
     */
    "addAdvisor": function(advisor) {
      var pos = this.advisors.length;
      this.setAdvisor(pos, advisor);
    },

    /**
     * @function
     * @public 
     * @summary Remove the given advisor.
     * @description Remove the given advisor.
     *
     * @param {org.atomunion.aop.Advisor} advisor - the advisor to remove
     * @return {js.lang.Boolean} true if the advisor was removed; false if the advisor was not found and hence could not be removed
     */
    "removeAdvisor": function(advisor) {
      var index = this.advisors.indexOf(advisor);
      if (index === -1) {
        return false;
      } else {
        this.advisors.splice(index, 1);
        return true;
      }
    }
  }).getClassConstructor();
});