define(function(require, exports, module) {
  require("bootstrap!org.atomunion.stereotype.Repository");

  /** 
   * @abstract
   * @class org.atomunion.stereotype.Autowire 
   * @extends {org.atomunion.stereotype.Resource}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * This is a field-level and method-level annotation.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Indicates that an annotated class is a "Autowire".
   * </p>
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * this annotation also serves as a specialization of @Component, allowing for implementation classes to be autodetected through classpath scanning and annotation-based configuration.
   * </p>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   * @see {@link org.atomunion.stereotype.Resource}
   */
  return Class.forName( /** @lends org.atomunion.stereotype.Autowire.prototype */ {
    name: "@interface org.atomunion.stereotype.Autowire extends org.atomunion.stereotype.Repository",

    execute: function(self, field, Modifier, Attribute) {
      return this.$super.execute.apply(this, arguments);
    }
  }).getClassConstructor();
});