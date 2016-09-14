(function(global) {
  define(function(require, exports, module) {

    require("bootstrap!org.atomunion.beans.factory.BeanFactory");
    require("bootstrap!js.util.HashMap");

    return Class.forName({
      name: "class org.atomunion.beans.factory.support.AutowireCapableBeanFactory extends org.atomunion.beans.factory.BeanFactory",

      "private beans": new js.util.HashMap(),

      "private static instance": null,

      "public static getInstance": function() {
        var context = org.atomunion.beans.factory.support.AutowireCapableBeanFactory;
        if (context.instance) {
          return context.instance;
        }

        context.instance = new context();
        return context.instance;
      },

      "containsBean": function(beanName) {
        return this.beans.contains(beanName);
      },

      "getBean": function(beanName) {
        if (!Object.isString(beanName)) {
          throw new js.lang.IllegalArgumentException("");
        }
        return this.beans.get(beanName);
      },

      "getType": function(beanName) {
        var bean = this.getBean(beanName);
        return bean ? bean.$class : null;
      },

      "registerSingleton": function(beanName, singletonObject) {
        this.beans.put(beanName, singletonObject);
      },

      "destroySingleton": function(beanName) {
        this.beans.remove(beanName);
      },

      "destroySingletons": function() {
        this.beans.clear();
      }

    }).getClassConstructor();
  });
})(this);