define(function(require, exports, module) {

  /** 
   * @abstract
   * @class org.atomunion.stereotype.Repository 
   * @extends {js.lang.Object}
   * @description 
   *  <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * This is a field-level and method-level annotation.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Indicates that an annotated class is a "Repository", originally defined as "a mechanism for encapsulating storage, retrieval, and search behavior which emulates a collection of objects".
   * </p>
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * this annotation also serves as a specialization of @Component, allowing for implementation classes to be autodetected through annotation-based configuration.
   * </p>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */

  var regx = /['\" ]?([^\"' ]*)['\" ]?/g;

  return Class.forName( /** @lends org.atomunion.stereotype.Repository.prototype */ {
    name: "@interface org.atomunion.stereotype.Repository",

    "protected beanNames": [],

    Repository: function() {
      for (var i = 0, len = arguments.length; i < len; i++) {
        var beanNames = ("" + arguments[i]).replace(regx, "$1").split(","),
          beanName = null;
        for (var j = 0, length = beanNames.length; j < length; j++) {
          beanName = beanNames[j].trim();
          if (beanName) {
            this.beanNames.push(beanName);
          }
        }
      }
    },

    execute: function(self, field) {
      var context = org.atomunion.beans.factory.support.AutowireCapableBeanFactory.getInstance();
      var beans = [];

      // 判断注解是在构造器上还是在属性上
      var flag = field.getName() === field.getDeclaringClass().getName(),
        name = field.getDeclaringClass().getFullName();

      for (var i = 0, len = this.beanNames.length; i < len; i++) {
        var bn = this.beanNames[i];
        if (flag) {
          beans.push(context.getBean(bn));
        } else {
          field.setValue(context.getBean(bn));
          break;
        }
      }
      if (flag) {
        return beans;
      }

      return null;
    }
  }).getClassConstructor();
});