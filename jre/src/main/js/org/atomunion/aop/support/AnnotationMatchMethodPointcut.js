define(function(require, exports, module) {

  require("bootstrap!org.atomunion.util.PatternMatchUtils");

  return Class.forName({
    name: "class org.atomunion.aop.support.AnnotationMatchMethodPointcut extends Object",

    "private mappedAnnotations": [],
    "private ignoredAnnotations": [],

    NameMatchMethodPointcut: function(mappedAnnotations, ignoredAnnotations) {
      this.setMappedAnnotations(mappedAnnotations);
      this.setIgnoredAnnotations(ignoredAnnotations);
    },

    /**
     * Convenience method when we have only a single method annotation to match.
     * Use either this method or {@code setMappedAnnotations}, not both.
     * @see #setMappedAnnotations
     */
    "public setMappedAnnotation": function(mappedAnnotation) {
      this.setMappedAnnotations(mappedAnnotation);
    },

    "public setIgnoredAnnotation": function(ignoredAnnotation) {
      this.setIgnoredAnnotations(ignoredAnnotation);
    },

    /**
     * Set the method annotations defining methods to match.
     * Matching will be the union of all these; if any match,
     * the pointcut matches.
     */
    "public setMappedAnnotations": function(mappedAnnotations) {
      if (mappedAnnotations !== null) {
        if (Object.isString(mappedAnnotations)) {
          this.mappedAnnotations.push(mappedAnnotations);
        } else if (Object.isArray(mappedAnnotations)) {
          this.mappedAnnotations.concat(mappedAnnotations);
        }
      }
    },

    "public setIgnoredAnnotations": function(ignoredAnnotations) {
      if (ignoredAnnotations !== null) {
        if (Object.isString(ignoredAnnotations)) {
          this.ignoredAnnotations.push(ignoredAnnotations);
        } else if (Object.isArray(ignoredAnnotations)) {
          this.ignoredAnnotations.concat(ignoredAnnotations);
        }
      }
    },

    /**
     * Add another eligible method annotation, in addition to those already named.
     * Like the set methods, this method is for use when configuring proxies,
     * before a proxy is used.
     * <p><b>NB:</b> This method does not work after the proxy is in
     * use, as advice chains will be cached.
     * @param annotation annotation of the additional method that will match
     * @return this pointcut to allow for multiple additions in one line
     */
    "public addMethodAnnotation": function(annotation) {
      this.mappedAnnotations.add(annotation);
      return this;
    },

    "public ignoreMethodAnnotation": function(annotation) {
      this.ignoredAnnotations.add(annotation);
      return this;
    },

    "public matches": function(method) {
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

        annotations = method.getAnnotations();
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
        annotations = method.getAnnotations();
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