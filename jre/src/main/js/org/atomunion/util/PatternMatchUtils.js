define(function(require, exports, module) {

  /** 
   * @abstract
   * @public
   * @class org.atomunion.util.PatternMatchUtils
   * @extends {js.lang.Object}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Utility methods for simple pattern matching, in particular for typical "xxx*", "*xxx" and "*xxx*" pattern styles.
   * </p>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
  return Class.forName( /** @lends org.atomunion.util.PatternMatchUtils.prototype */ {
    name: "public abstract class org.atomunion.util.PatternMatchUtils extends Object",

    /**
     * @name org.atomunion.util.PatternMatchUtils.simpleMatch
     * @function
     * @public 
     * @static
     * @summary Match a String against the given pattern, supporting the following simple pattern styles: "xxx*", "*xxx", "*xxx*" and "xxx*yyy" matches (with an arbitrary number of pattern parts), as well as direct equality.
     * @description Match a String against the given pattern, supporting the following simple pattern styles: "xxx*", "*xxx", "*xxx*" and "xxx*yyy" matches (with an arbitrary number of pattern parts), as well as direct equality.
     *
     * @param {js.lang.String} pattern - the pattern to match against
     * @param {js.lang.String} str - the String to match
     * @return whether the String matches the given pattern
     */
    "public static simpleMatch": function(pattern, str) {
      if (pattern === null || str === null) {
        return false;
      }
      var firstIndex = pattern.indexOf('*');
      if (firstIndex === -1) {
        return pattern.equals(str);
      }
      if (firstIndex === 0) {
        if (pattern.length === 1) {
          return true;
        }

        var nextIndex = pattern.indexOf('*', firstIndex + 1);
        if (nextIndex === -1) {
          return str.endsWith(pattern.substring(1));
        }

        var part = pattern.substring(1, nextIndex);
        if ("".equals(part)) {
          return this.simpleMatch(pattern.substring(nextIndex), str);
        }

        var partIndex = str.indexOf(part);
        while (partIndex !== -1) {
          if (this.simpleMatch(pattern.substring(nextIndex), str.substring(partIndex + part.length))) {
            return true;
          }
          partIndex = str.indexOf(part, partIndex + 1);
        }
        return false;
      }
      return (str.length >= firstIndex &&
        pattern.substring(0, firstIndex).equals(str.substring(0, firstIndex)) &&
        this.simpleMatch(pattern.substring(firstIndex), str.substring(firstIndex)));
    },

    /**
     * @name org.atomunion.util.PatternMatchUtils.simpleMatches
     * @function
     * @public 
     * @static
     * @summary Match a String against the given patterns, supporting the following simple pattern styles: "xxx*", "*xxx", "*xxx*" and "xxx*yyy" matches (with an arbitrary number of pattern parts), as well as direct equality.
     * @description Match a String against the given patterns, supporting the following simple pattern styles: "xxx*", "*xxx", "*xxx*" and "xxx*yyy" matches (with an arbitrary number of pattern parts), as well as direct equality.
     *
     * @param {js.lang.String} patterns - the patterns to match against
     * @param {js.lang.String} str - the String to match
     * @return whether the String matches any of the given patterns
     */
    "public static simpleMatches": function(patterns, str) {
      if (patterns !== null) {
        for (var i = 0, len = patterns.length; i < len; i++) {
          var pattern = patterns[i];
          if (this.simpleMatch(pattern, str)) {
            return true;
          }
        }
      }
      return false;
    }
  }).getClassConstructor();
});