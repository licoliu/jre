(function(global) {
  define(function(require, exports, module) {

    require("bootstrap!org.atomunion.beans.factory.BeanFactory");
    require("bootstrap!js.util.HashMap");

    require("bootstrap!org.atomunion.beans.factory.support.AutowireCapableBeanFactory");

    /** 
     * @class org.atomunion.web.context.support.GenericWebApplicationContext
     * @extends {org.atomunion.beans.factory.BeanFactory}
     * @description 
     * <p>&nbsp;&nbsp;&nbsp;&nbsp;
     * It is suitable for web environments, and designed for programmatic setup, for example for building nested contexts
     * </p>
     *
     * @author lico
     * @version 0.1.1
     * @since 0.0.1
     */
    return Class.forName( /** @lends org.atomunion.web.context.support.GenericWebApplicationContext.prototype */ {
      name: "class org.atomunion.web.context.support.GenericWebApplicationContext extends org.atomunion.beans.factory.BeanFactory",

      "private static instance": null,

      "private beans": new js.util.HashMap(),

      /**
       * @name org.atomunion.web.context.support.GenericWebApplicationContextgetInstance
       * @function
       * @public 
       * @static
       * @summary Return a singleton instance of this class
       * @description 
       *
       * @return {org.atomunion.web.context.support.GenericWebApplicationContext}  the singleton instance of this class 
       */
      "public static getInstance": function() {
        var context = org.atomunion.web.context.support.GenericWebApplicationContext;
        if (context.instance) {
          return context.instance;
        }

        context.instance = new context();
        return context.instance;
      },

      /**
       * @function
       * @public 
       * @summary Does this bean factory contain a bean definition or externally registered singleton instance with the given name?
       * @description 
       *
       * @param {js.lang.String} name - the name of the bean to query
       * @return {js.lang.Boolean} whether a bean with the given name is present
       */
      "containsBean": function(name) {
        return !!this.getBean(name);
      },

      /**
       * @function
       * @public 
       * @summary Return an instance, which may be shared or independent, of the specified bean.
       * @description 
       *
       * @param {js.lang.String} name - the name of the bean to query
       * @param {js.lang.Boolean} forceNew - force to create a new bean instance
       * @return {js.lang.Object} an instance of the bean
       */
      "getBean": function(name, forceNew) {
        var type = this.getType(name);

        if (!type) {
          return null;
        }

        if (forceNew) {
          return type.newInstance();
        }

        var context = org.atomunion.beans.factory.support.AutowireCapableBeanFactory.getInstance();

        if (context.containsBean(name)) {
          return context.getBean(name);
        } else if (this.beans.containsKey(name)) {
          return this.beans.get(name);
        } else {
          var bean = type.newInstance();
          this.beans.put(name, bean);
          return bean;
        }

        return null;
      },

      /**
       * @function
       * @public 
       * @summary Determine the type of the bean with the given name.
       * @description 
       *
       * @param {js.lang.String} name - the name of the bean to query
       * @return {js.lang.Class} the type of the bean, or null if not determinable
       */
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

      /**
       * @function
       * @public 
       * @summary Is this bean a shared singleton?
       * @description 
       *
       * @param {js.lang.String} name - the name of the bean to query
       * @return {js.lang.Boolean} whether this bean corresponds to a singleton instance
       */
      "isSingleton": function(name) {
        return false;
      }
    }).getClassConstructor();
  });
})(this);