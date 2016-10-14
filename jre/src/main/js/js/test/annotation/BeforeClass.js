define(function(require, exports, module) {

  /** 
   * @class js.test.annotation.BeforeClass 
   * @extends {js.lang.Object}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * This is a method-level annotation.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Sometimes several tests need to share computationally expensive setup (like logging into a database). While this can compromise the independence of tests, sometimes it is a necessary optimization. Annotating a public static void no-arg method with @BeforeClass causes it to be run once before any of the test methods in the class. The @BeforeClass methods of superclasses will be run before those of the current class, unless they are shadowed in the current class.
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
  return Class.forName( /** @lends js.test.annotation.BeforeClass.prototype */ {
    name: "@interface js.test.annotation.BeforeClass",
    execute: function(self, method, Modifier) {}
  }).getClassConstructor();
});