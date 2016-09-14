define(function(require, exports, module) {

  require("bootstrap!org.atomunion.beans.factory.support.AutowireCapableBeanFactory")

  Class.forName({
    name: "@interface org.atomunion.aspect.Resource",
    "private beanName": null,
    Resource: function(beanName) {
      this.beanName = beanName;
    },
    execute: function(self, field, Modifier, Attribute) {
      var context = org.atomunion.beans.factory.support.AutowireCapableBeanFactory.getInstance();
      field.setValue(context.getBean(this.beanName));
    }
  });
});