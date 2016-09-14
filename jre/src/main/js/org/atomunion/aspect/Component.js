define(function(require, exports, module) {

  require("bootstrap!org.atomunion.beans.factory.support.AutowireCapableBeanFactory");

  Class.forName({
    name: "@interface org.atomunion.aspect.Component",
    execute: function(self, field, Modifier, Attribute) {
      var context = org.atomunion.beans.factory.support.AutowireCapableBeanFactory.getInstance();
      context.registerSingleton(self.getFullName(), self.newInstance());
    }
  });
});