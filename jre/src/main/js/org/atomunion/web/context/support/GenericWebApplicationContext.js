(function(global) {
  define(function(require, exports, module) {

    require("bootstrap!org.atomunion.beans.factory.BeanFactory");
    require("bootstrap!js.util.HashMap");

    return Class.forName({
      name: "class org.atomunion.web.context.support.GenericWebApplicationContext extends org.atomunion.beans.factory.BeanFactory",

      "private static instance": null,

      "private beans": new js.util.HashMap(),

      "public static getInstance": function() {
        var context = org.atomunion.web.context.support.GenericWebApplicationContext;
        if (context.instance) {
          return context.instance;
        }

        context.instance = new context();
        return context.instance;
      },

      "containsBean": function(name) {
        return !!this.getType(name);
      },

      "getBean": function(name, forceNew) {
        var type = this.getType(name);

        if (!type) {
          return null;
        }

        if (forceNew) {
          return type.newInstance();
        }

        var beanName = type.getFullName();
        if (this.beans.containsKey(beanName)) {
          return this.beans.get(beanName);
        } else {
          var bean = type.newInstance();
          this.beans.put(beanName, bean);
          return bean;
        }

        return null;
      },

      "getType": function(name) {
        if (!Object.isString(name)) {
          throw new js.lang.IllegalArgumentException("");
        }

        var ns = name.split("."),
          bean = global;

        for (var i = 0, len = ns.length; i < len; i++) {
          if (bean) {
            bean = bean[ns[i]];
          } else {
            break;
          }
        }

        return bean ? bean.$class : null;
      },

      "isSingleton": function(name) {
        return false;
      }
    }).getClassConstructor();
  });
})(this);