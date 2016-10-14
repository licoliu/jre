define(function(require, exports, module) {
  /** 
   * @abstract
   * @class org.atomunion.aop.Pointcut - interface
   * @extends {js.lang.Object}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * A pointcut is composed of a class-filter and a method-matcher. Both these basic terms and a Pointcut itself can be combined to build up combinations.
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
  return Class.forName( /** @lends org.atomunion.aop.Pointcut.prototype */ {
    name: "interface org.atomunion.aop.Pointcut"
  }).getClassConstructor();
});