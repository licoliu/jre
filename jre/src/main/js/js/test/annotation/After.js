define(function(require, exports, module) {

  /** 
   * @class js.test.annotation.After
   * @extends {js.lang.Object}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * This is a method-level annotation.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * If you allocate external resources in a Before method you need to release them after the test runs. Annotating a public void method with @After causes that method to be run after the Test method. All @After methods are guaranteed to run even if a Before or Test method throws an exception. The @After methods declared in superclasses will be run after those of the current class, unless they are overridden in the current class.
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
  return Class.forName( /** @lends js.test.annotation.After.prototype */ {
    name: "@interface js.test.annotation.After",
    execute: function(self, method) {}
  }).getClassConstructor();
});