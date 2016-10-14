define(function(require, exports, module) {
  /** 
   * @abstract
   * @class org.aopalliance.aop.AspectException - interface
   * @extends {js.lang.Exception}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Superclass for all AOP infrastructure exceptions. Unchecked, as such exceptions are fatal and end user code shouldn't be forced to catch them.
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
  return Class.forName( /** @lends org.aopalliance.aop.AspectException.prototype */ {
    name: "class org.aopalliance.aop.AspectException extends js.lang.Exception",
    "private name": "org.aopalliance.aop.AspectException", // 错误名
    "private number": 800 // 错误号
  }).getClassConstructor();
});