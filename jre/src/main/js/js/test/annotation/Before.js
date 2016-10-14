define(function(require, exports, module) {

  /** 
   * @class js.test.annotation.Before 
   * @extends {js.lang.Object}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * This is a method-level annotation.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * When writing tests, it is common to find that several tests need similar objects created before they can run. Annotating a public void method with @Before causes that method to be run before the Test method. The @Before methods of superclasses will be run before those of the current class, unless they are overridden in the current class. No other ordering is defined.
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
  return Class.forName( /** @lends js.test.annotation.Before.prototype */ {
    name: "@interface js.test.annotation.Before",
    execute: function(self, method) {}
  }).getClassConstructor();
});