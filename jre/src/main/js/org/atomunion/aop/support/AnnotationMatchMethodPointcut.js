define(function(require, exports, module) {

  require("bootstrap!org.atomunion.util.PatternMatchUtils");
  require("bootstrap!org.atomunion.aop.Pointcut");

  /** 
   * @class org.atomunion.aop.support.AnnotationMatchMethodPointcut
   * @extends {org.atomunion.aop.Pointcut}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Pointcut bean for simple method annotation matches.
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
  return Class.forName( /** @lends org.atomunion.aop.support.AnnotationMatchMethodPointcut.prototype */ {
    name: "class org.atomunion.aop.support.AnnotationMatchMethodPointcut extends org.atomunion.aop.Pointcut",

    "private mappedAnnotations": [],
    "private ignoredAnnotations": [],

    NameMatchMethodPointcut: function(mappedAnnotations, ignoredAnnotations) {
      this.setMappedAnnotations(mappedAnnotations);
      this.setIgnoredAnnotations(ignoredAnnotations);
    },

    /**
     * @function
     * @public
     * @summary Convenience method when we have only a single method annotation to match. Use either this method or {@code setMappedAnnotations}, not both.
     * 
     * @param {js.lang.Object} mappedAnnotation - the single method annotation to match
     * @see #setMappedAnnotations
     */
    "setMappedAnnotation": function(mappedAnnotation) {
      this.setMappedAnnotations(mappedAnnotation);
    },

    /**
     * @function
     * @public
     * @summary Convenience method when we have only a single method annotation to match. Use either this method or {@code setIgnoredAnnotations}, not both.
     * 
     * @param {js.lang.Object} ignoredAnnotation - the single method annotation to ignore
     * @see #setIgnoredAnnotations
     */
    "setIgnoredAnnotation": function(ignoredAnnotation) {
      this.setIgnoredAnnotations(ignoredAnnotation);
    },

    /**
     * @function
     * @public
     * @summary Set the method annotations defining methods to match. Matching will be the union of all these; if any match, the pointcut matches.
     *
     * @param {js.lang.Array} mappedAnnotations - method annotations to match
     */
    "setMappedAnnotations": function(mappedAnnotations) {
      if (mappedAnnotations !== null) {
        if (Object.isString(mappedAnnotations)) {
          this.mappedAnnotations.push(mappedAnnotations);
        } else if (Object.isArray(mappedAnnotations)) {
          this.mappedAnnotations.concat(mappedAnnotations);
        }
      }
    },

    /**
     * @function
     * @public
     * @summary Set the method annotations defining methods to ignore. If any match, the pointcut ignores.
     *
     * @param {js.lang.Array} ignoredAnnotations - method annotations to ignore
     */
    "setIgnoredAnnotations": function(ignoredAnnotations) {
      if (ignoredAnnotations !== null) {
        if (Object.isString(ignoredAnnotations)) {
          this.ignoredAnnotations.push(ignoredAnnotations);
        } else if (Object.isArray(ignoredAnnotations)) {
          this.ignoredAnnotations.concat(ignoredAnnotations);
        }
      }
    },

    /**
     * @function
     * @public
     * @summary Add another eligible method annotation, in addition to those already named. Like the set methods, this method is for use when configuring proxies, before a proxy is used. <p><b>NB:</b> This method does not work after the proxy is in use, as advice chains will be cached.
     *
     * @param {js.lang.Object} annotation - annotation of the additional method that will match
     * @return {org.atomunion.aop.support.AnnotationMatchMethodPointcut} this pointcut to allow for multiple additions in one line
     */
    "addMethodAnnotation": function(annotation) {
      this.mappedAnnotations.add(annotation);
      return this;
    },

    /**
     * @function
     * @public
     * @summary 
     *
     * @param {js.lang.Object} annotation - annotation of the additional method that will ignore
     * @return {org.atomunion.aop.support.AnnotationMatchMethodPointcut} this pointcut to allow for multiple additions in one line
     */
    "ignoreMethodAnnotation": function(annotation) {
      this.ignoredAnnotations.add(annotation);
      return this;
    },

    /**
     * @function
     * @public 
     * @summary Perform static checking whether the given method matches.
     *
     * @param {js.lang.reflect.Method} method - the candidate method
     * @return {js.lang.Boolean} whether or not this method matches statically
     */
    "matches": function(method) {
      var i = 0,
        len = 0,
        j = 0,
        length = 0,
        annotations = null,
        annotationClass = null,
        fullName = null,
        name = null;
      for (i = 0, len = this.ignoredAnnotations.length; i < len; i++) {
        var ignoredAnnotation = this.ignoredAnnotations[i];

        annotations = method.getDeclaredAnnotations();
        for (j = 0, length = annotations.length; j < length; j++) {
          annotationClass = annotations[j].getClass();
          fullName = annotationClass.getFullName();
          name = annotationClass.getName();

          if (ignoredAnnotation.equals(fullName) || ignoredAnnotation.equals(name)) {
            return false;
          }
        }
      }

      for (i = 0, len = this.mappedAnnotations.length; i < len; i++) {
        var mappedAnnotation = this.mappedAnnotations[i];
        annotations = method.getDeclaredAnnotations();
        for (j = 0, length = annotations.length; j < length; j++) {
          annotationClass = annotations[j].getClass();
          fullName = annotationClass.getFullName();
          name = annotationClass.getName();

          if (mappedAnnotation.equals(fullName) || mappedAnnotation.equals(name)) {
            return true;
          }
        }
      }
      return false;
    }

  }).getClassConstructor();
});