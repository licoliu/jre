(function(global) {
  define(function(require, exports, module) {

    require("bootstrap!org.atomunion.beans.factory.BeanFactory");

    return Class.forName({
      name: "class org.atomunion.web.context.support.GenericWebApplicationContext extends org.atomunion.beans.factory.BeanFactory",

      "containsBean": function(name) {
        return !!this.getBean(name);
      },

      "getBean": function(name) {
        var type = this.getType(name)
        return type ? type.newInstance() : null;
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