define(function(require, exports, module) {

  require("bootstrap!org.atomunion.stereotype.Component");

  /** 
   * @abstract
   * @class org.atomunion.stereotype.Controller
   * @extends {org.atomunion.stereotype.Component}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * This is a class-level annotation.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Indicates that an annotated class is a "Controller" (e.g. a web controller).
   * </p>
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * This annotation serves as a specialization of @Component, allowing for implementation classes to be autodetected through annotation-based configuration.
   * </p>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   * * @see {@link org.atomunion.stereotype.Component}
   */
  return Class.forName( /** @lends org.atomunion.stereotype.Controller.prototype */ {
    name: "@interface org.atomunion.stereotype.Controller extends org.atomunion.stereotype.Component",

    execute: function(self, field, Modifier, Attribute) {
      this.$super.execute.apply(this.$super, arguments);
    }
  }).getClassConstructor();
});