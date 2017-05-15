define(function(require, exports, module) {

  require("bootstrap!org.atomunion.stereotype.Component");

  /** 
   * @abstract
   * @class org.atomunion.stereotype.Dao 
   * @extends {org.atomunion.stereotype.Component}
   * @description 
   *  <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * This is a class-level annotation.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Indicates that an annotated class is a "Dao(data access object)", originally defined as "an operation offered as an interface that connets with back-end api service."
   * </p>
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * May also indicate that a class is a "Data Access Facade", or something similar.
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
  return Class.forName( /** @lends org.atomunion.stereotype.Dao.prototype */ {
    name: "@interface org.atomunion.stereotype.Dao extends org.atomunion.stereotype.Component",

    execute: function(self, field) {
      this.$super.execute.apply(this.$super, arguments);
    }
  }).getClassConstructor();
});