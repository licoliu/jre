define(function(require, exports, module) {

  require("bootstrap!org.atomunion.util.PatternMatchUtils");

  return Class.forName({
    name: "class org.atomunion.aop.support.NameMatchMethodPointcut extends Object",

    "private mappedNames": [],

    NameMatchMethodPointcut: function(mappedNames) {
      this.setMappedNames(mappedNames);
    },
    /**
     * Convenience method when we have only a single method name to match.
     * Use either this method or {@code setMappedNames}, not both.
     * @see #setMappedNames
     */
    "public setMappedName": function(mappedName) {
      this.setMappedNames(mappedName);
    },

    /**
     * Set the method names defining methods to match.
     * Matching will be the union of all these; if any match,
     * the pointcut matches.
     */
    "public setMappedNames": function(mappedNames) {
      if (mappedNames != null) {
        if (Object.isString(mappedNames)) {
          this.mappedNames.push(mappedNames);
        } else if (Object.isArray(mappedNames)) {
          this.mappedNames.concat(mappedNames);
        }
      }
    },

    /**
     * Add another eligible method name, in addition to those already named.
     * Like the set methods, this method is for use when configuring proxies,
     * before a proxy is used.
     * <p><b>NB:</b> This method does not work after the proxy is in
     * use, as advice chains will be cached.
     * @param name name of the additional method that will match
     * @return this pointcut to allow for multiple additions in one line
     */
    "public addMethodName": function(name) {
      this.mappedNames.add(name);
      return this;
    },

    "public matches": function(method, targetClass) {
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
     * Return if the given method name matches the mapped name.
     * <p>The default implementation checks for "xxx*", "*xxx" and "*xxx*" matches,
     * as well as direct equality. Can be overridden in subclasses.
     * @param methodName the method name of the class
     * @param mappedName the name in the descriptor
     * @return if the names match
     * @see org.springframework.util.PatternMatchUtils#simpleMatch(String, String)
     */
    "protected isMatch": function(methodName, mappedName) {
      return org.atomunion.util.PatternMatchUtils.simpleMatch(mappedName, methodName);
    }
  }).getClassConstructor();
});