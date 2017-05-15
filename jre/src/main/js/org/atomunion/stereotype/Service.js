define(function(require, exports, module) {

  require("bootstrap!org.atomunion.stereotype.Component");

  /** 
   * @abstract
   * @class org.atomunion.stereotype.Service 
   * @extends {org.atomunion.stereotype.Component}
   * @description 
   *  <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * This is a class-level annotation.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Indicates that an annotated class is a "Service", originally defined as "an operation offered as an interface that stands alone in the model, with no encapsulated state."
   * </p>
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * May also indicate that a class is a "Business Service Facade", or something similar. This annotation is a general-purpose stereotype and individual teams may narrow their semantics and use as appropriate.
   * </p>
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * This annotation serves as a specialization of @Component, allowing for implementation classes to be autodetected through annotation-based configuration.
   * </p>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   * @see {@link org.atomunion.stereotype.Component}
   */
  return Class.forName( /** @lends org.atomunion.stereotype.Service.prototype */ {
    name: "@interface org.atomunion.stereotype.Service extends org.atomunion.stereotype.Component",

    execute: function(self, field) {
      this.$super.execute.apply(this.$super, arguments);
    }
  }).getClassConstructor();
});