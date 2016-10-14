define(function(require, exports, module) {

  /** 
   * @class js.test.annotation.Test 
   * @extends {js.lang.Object}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * This is a method-level annotation.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * The Test annotation tells JUnit that the public void method to which it is attached can be run as a test case. To run the method, JUnit first constructs a fresh instance of the class then invokes the annotated method. Any exceptions thrown by the test will be reported by JUnit as a failure. If no exceptions are thrown, the test is assumed to have succeeded.
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
  return Class.forName( /** @lends js.test.annotation.Test.prototype */ {
    name: "@interface js.test.annotation.Test",
    execute: function(self, method) {}
  }).getClassConstructor();
});