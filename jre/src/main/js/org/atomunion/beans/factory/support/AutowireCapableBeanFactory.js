(function(global) {
  define(function(require, exports, module) {

    require("bootstrap!org.atomunion.beans.factory.BeanFactory");
    require("bootstrap!js.util.HashMap");

    /** 
     * @class org.atomunion.beans.factory.support.AutowireCapableBeanFactory
     * @extends {org.atomunion.beans.factory.BeanFactory}
     * @description 
     * <p>&nbsp;&nbsp;&nbsp;&nbsp;
     * Provides bean creation (with constructor resolution), property population, wiring (including autowiring), and initialization. Handles runtime bean references, resolves managed collections, calls initialization methods, etc. Supports autowiring properties by name.
     * </p>
     *
     * @author lico
     * @version 0.1.1
     * @since 0.0.1
     */
    return Class.forName( /** @lends org.atomunion.beans.factory.support.AutowireCapableBeanFactory.prototype */ {
      name: "class org.atomunion.beans.factory.support.AutowireCapableBeanFactory extends org.atomunion.beans.factory.BeanFactory",

      "private beans": new js.util.HashMap(),

      "private static instance": null,

      /**
       * @name org.atomunion.beans.factory.support.AutowireCapableBeanFactory.getInstance
       * @function
       * @public 
       * @static
       * @summary Return a singleton instance of this class
       * @description 
       *
       * @return {org.atomunion.web.context.support.AutowireCapableBeanFactory}  the singleton instance of this class 
       */
      "public static getInstance": function() {
        var context = org.atomunion.beans.factory.support.AutowireCapableBeanFactory;
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
       * @param {js.lang.String} beanName - the name of the bean to query
       * @return {js.lang.Boolean} whether a bean with the given name is present
       */
      "containsBean": function(beanName) {
        return this.beans.containsKey(beanName);
      },

      /**
       * @function
       * @public 
       * @summary Return an instance, which may be shared or independent, of the specified bean.
       * @description 
       *
       * @param {js.lang.String} beanName - the name of the bean to query
       * @return {js.lang.Object} an instance of the bean
       */
      "getBean": function(beanName) {
        if (!Object.isString(beanName)) {
          throw new js.lang.IllegalArgumentException("");
        }
        return this.beans.get(beanName);
      },

      /**
       * @function
       * @public 
       * @summary Determine the type of the bean with the given name.
       * @description 
       *
       * @param {js.lang.String} beanName - the name of the bean to query
       * @return {js.lang.Class} the type of the bean, or null if not determinable
       */
      "getType": function(beanName) {
        var bean = this.getBean(beanName);
        return bean ? bean.$class : null;
      },

      /**
       * @function
       * @public 
       * @summary Register the given existing object as singleton in the bean registry, under the given bean name.
       * @description 
       *
       * @param {js.lang.String} beanName - the name of the bean
       * @param {js.lang.Object} singletonObject - the existing singleton object
       */
      "registerSingleton": function(beanName, singletonObject) {
        this.beans.put(beanName, singletonObject);
      },

      /**
       * @function
       * @public 
       * @summary Destroy the given bean.
       * @description Destroy the given bean. Delegates to destroyBean if a corresponding disposable bean instance is found.
       *
       * @param {js.lang.String} beanName - the name of the bean
       */
      "destroySingleton": function(beanName) {
        this.beans.remove(beanName);
      },

      /**
       * @function
       * @public 
       * @summary Destroy all singleton beans in this factory, including inner beans that have been registered as disposable.
       * @description Destroy all singleton beans in this factory, including inner beans that have been registered as disposable. To be called on shutdown of a factory.
       */
      "destroySingletons": function() {
        this.beans.clear();
      }

    }).getClassConstructor();
  });
})(this);