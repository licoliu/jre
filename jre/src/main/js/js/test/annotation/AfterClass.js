define(function(require, exports, module) {

  /** 
   * @class js.test.annotation.AfterClass 
   * @extends {js.lang.Object}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * This is a method-level annotation.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * If you allocate expensive external resources in a BeforeClass method you need to release them after all the tests in the class have run. Annotating a public static void method with @AfterClass causes that method to be run after all the tests in the class have been run. All @AfterClass methods are guaranteed to run even if a BeforeClass method throws an exception. The @AfterClass methods declared in superclasses will be run after those of the current class, unless they are shadowed in the current class.
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
  return Class.forName( /** @lends js.test.annotation.AfterClass.prototype */ {
    name: "@interface js.test.annotation.AfterClass",
    execute: function(self, method) {}
  }).getClassConstructor();
});