define(function(require, exports, module) {
  /** 
   * @abstract
   * @class org.aopalliance.aop.Advice - interface
   * @extends {js.lang.Object}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Tag interface for Advice. Implementations can be any type of advice, such as Interceptors.
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
  return Class.forName( /** @lends org.aopalliance.aop.Advice.prototype */ {
    name: "interface org.aopalliance.aop.Advice"
  }).getClassConstructor();
});