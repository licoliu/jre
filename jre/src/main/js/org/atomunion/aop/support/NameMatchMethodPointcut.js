define(function(require, exports, module) {

  require("bootstrap!org.atomunion.util.PatternMatchUtils");
  require("bootstrap!org.atomunion.aop.Pointcut");

  /** 
   * @class org.atomunion.aop.support.NameMatchMethodPointcut
   * @extends {org.atomunion.aop.Pointcut}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Pointcut bean for simple method name matches, as alternative to regexp patterns. Does not handle overloaded methods: all methods *with a given name will be eligible.
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
  return Class.forName( /** @lends org.atomunion.aop.support.NameMatchMethodPointcut.prototype */ {
    name: "class org.atomunion.aop.support.NameMatchMethodPointcut extends org.atomunion.aop.Pointcut",

    "private mappedNames": [],

    NameMatchMethodPointcut: function(mappedNames) {
      this.setMappedNames(mappedNames);
    },

    /**
     * @function
     * @public
     * @summary Convenience method when we have only a single method name to match. Use either this method or {@code setMappedNames}, not both.
     * @description Convenience method when we have only a single method name to match. Use either this method or {@code setMappedNames}, not both.
     *
     * @param {js.lang.String} mappedName - the single method name to match
     * @see #setMappedNames
     */
    "setMappedName": function(mappedName) {
      this.setMappedNames(mappedName);
    },

    /**
     * @function
     * @public
     * @summary Set the method names defining methods to match. Matching will be the union of all these; if any match, the pointcut matches.
     * @description Set the method names defining methods to match. Matching will be the union of all these; if any match, the pointcut matches.
     *
     * @param {js.lang.Array} mappedAnnotation - method names to match
     */
    "setMappedNames": function(mappedNames) {
      if (mappedNames !== null) {
        if (Object.isString(mappedNames)) {
          this.mappedNames.push(mappedNames);
        } else if (Object.isArray(mappedNames)) {
          this.mappedNames.concat(mappedNames);
        }
      }
    },

    /**
     * @function
     * @public
     * @summary Add another eligible method name, in addition to those already named.
     * @description Add another eligible method name, in addition to those already named. Like the set methods, this method is for use when configuring proxies, before a proxy is used. <p><b>NB:</b> This method does not work after the proxy is in use, as advice chains will be cached.
     *
     * @param {js.lang.String} name - name of the additional method that will match
     * @return {org.atomunion.aop.support.NameMatchMethodPointcut} this pointcut to allow for multiple additions in one line
     */
    "addMethodName": function(name) {
      this.mappedNames.add(name);
      return this;
    },

    /**
     * @function
     * @public 
     * @summary Perform static checking whether the given method matches.
     *
     * @param {js.lang.reflect.Method} method - the candidate method
     * @param {js.lang.Class} targetClass - the target class (may be null, in which case the candidate class must be taken to be the method's declaring class)
     * @return {js.lang.Boolean} whether or not this method matches statically
     */
    "matches": function(method, targetClass) {
      for (var i = 0, len = this.mappedNames.length; i < len; i++) {
        var mappedName = this.mappedNames[i];
        var methodName = method.getName();
        var fullName = targetClass.getFullName() + "." + methodName;
        if (mappedName.equals(methodName) || mappedName.equals(fullName) || this.isMatch(fullName, mappedName)) {
          return true;
        }
      }
      return false;
    },

    /**
     * @name org.atomunion.aop.support.NameMatchMethodPointcut.prototype.isMatch
     * @function
     * @protected
     * @summary Return if the given method name matches the mapped name.
     * @description Return if the given method name matches the mapped name. <p>The default implementation checks for "xxx*", "*xxx" and "*xxx*" matches, as well as direct equality. Can be overridden in subclasses.
     *
     * @param {js.lang.String} methodName the method name of the class
     * @param {js.lang.String} mappedName the name in the descriptor
     * @return {js.lang.Boolean} if the names match
     * @see org.springframework.util.PatternMatchUtils#simpleMatch(String, String)
     */
    "protected isMatch": function(methodName, mappedName) {
      return org.atomunion.util.PatternMatchUtils.simpleMatch(mappedName, methodName);
    }
  }).getClassConstructor();
});