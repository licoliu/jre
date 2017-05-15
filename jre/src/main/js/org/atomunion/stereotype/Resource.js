define(function(require, exports, module) {

  require("bootstrap!org.atomunion.beans.factory.support.AutowireCapableBeanFactory");
  require("bootstrap!org.atomunion.stereotype.Repository");

  /** 
   * @abstract
   * @class org.atomunion.stereotype.Resource 
   * @extends {org.atomunion.stereotype.Repository}
   * @description 
   *  <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * This is a field-level and method-level annotation.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Indicates that an annotated class is a "Resource".
   * </p>
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * this annotation also serves as a specialization of @Component, allowing for implementation classes to be autodetected through annotation-based configuration.
   * </p>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   * 
   */
  return Class.forName( /** @lends org.atomunion.stereotype.Resource.prototype */ {
    name: "@interface org.atomunion.stereotype.Resource extends org.atomunion.stereotype.Repository",

    execute: function(self, field) {
      return this.$super.execute.apply(this, arguments);
    }
  }).getClassConstructor();
});