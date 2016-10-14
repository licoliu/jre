define(function(require, exports, module) {


  /** 
   * @class org.atomunion.beans.factory.BeanFactory
   * @extends {js.lang.Object}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * The root interface for accessing a Spring bean container. This is the basic client view of a bean container; further interfaces are available for specific purposes.
   * </p>
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * This interface is implemented by objects that hold a number of bean definitions, each uniquely identified by a String name. Depending on the bean definition, the factory will return either an independent instance of a contained object (the Prototype design pattern), or a single shared instance (a superior alternative to the Singleton design pattern, in which the instance is a singleton in the scope of the factory). Which type of instance will be returned depends on the bean factory configuration: the API is the same.
   * </p>
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * The point of this approach is that the BeanFactory is a central registry of application components, and centralizes configuration of application components (no more do individual objects need to read properties files, for example).
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
  return Class.forName( /** @lends org.atomunion.beans.factory.BeanFactory.prototype */ {
    name: "class org.atomunion.beans.factory.BeanFactory extends Object",

    /** 
     * @name org.atomunion.beans.factory.BeanFactory.prototype.containsBean
     * @abstract
     * @function
     * @public
     * @summary Does this bean factory contain a bean definition or externally registered singleton instance with the given name?
     * @description Does this bean factory contain a bean definition or externally registered singleton instance with the given name?
     *
     * @param {js.lang.String} the given bean name
     * @return {js.lang.Boolean} 
     */
    "abstract containsBean": function(name) {},

    /** 
     * @name org.atomunion.beans.factory.BeanFactory.prototype.getBean
     * @abstract
     * @function
     * @public
     * @summary Return an instance, which may be shared or independent, of the specified bean.
     * @description Return an instance, which may be shared or independent, of the specified bean.
     *
     * @param {js.lang.String} the given bean name
     * @return {js.lang.Object} 
     */
    "abstract getBean": function(name) {},

    /** 
     * @name org.atomunion.beans.factory.BeanFactory.prototype.getType
     * @abstract
     * @function
     * @public
     * @summary Determine the type of the bean with the given name.
     * @description Determine the type of the bean with the given name.
     *
     * @param {js.lang.String} the given bean name
     * @return {js.lang.Class} 
     */
    "abstract getType": function(name) {},

    /** 
     * @name org.atomunion.beans.factory.BeanFactory.prototype.isSingleton
     * @abstract
     * @function
     * @public
     * @summary Is this bean a shared singleton? That is, will getBean(java.lang.String) always return the same instance?
     * @description Is this bean a shared singleton? That is, will getBean(java.lang.String) always return the same instance?
     *
     * @param {js.lang.String} the given bean name
     * @return {js.lang.Boolean} 
     */
    "abstract isSingleton": function(name) {},

    /** 
     * @name org.atomunion.beans.factory.BeanFactory.prototype.isPrototype
     * @abstract
     * @function
     * @public
     * @summary Is this bean a prototype? That is, will getBean(java.lang.String) always return independent instances?
     * @description Is this bean a prototype? That is, will getBean(java.lang.String) always return independent instances?
     *
     * @param {js.lang.String} the given bean name
     * @return {js.lang.Boolean} 
     */
    "abstract isPrototype": function(name) {},

  }).getClassConstructor();
});