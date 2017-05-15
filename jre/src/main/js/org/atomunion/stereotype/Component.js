define(function(require, exports, module) {

  require("bootstrap!org.atomunion.beans.factory.support.AutowireCapableBeanFactory");

  /** 
   * @abstract
   * @class org.atomunion.stereotype.Component
   * @extends {js.lang.Object}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * This is a class-level annotation.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Indicates that an annotated class is a "component". Such classes are considered as candidates for auto-detection when using annotation-based configuration. Other class-level annotations may be considered as identifying a component as well, typically a special kind of component: e.g. the @Resource, @Repository annotation.
   * </p>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   * 
   */
  return Class.forName( /** @lends org.atomunion.stereotype.Component.prototype */ {
    name: "@interface org.atomunion.stereotype.Component",
    execute: function(self, field) {
      var context = org.atomunion.beans.factory.support.AutowireCapableBeanFactory.getInstance();
      context.registerSingleton(self.getFullName(), self.newInstance());
    }
  }).getClassConstructor();
});