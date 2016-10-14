define(function(require, exports, module) {

  /** 
   * @class js.test.runners.Suite
   * @extends {js.lang.Object}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
  return Class.forName( /** @lends js.test.runners.Suite.prototype */ {
    name: "class js.test.runners.Suite extends Object",

    "private suiteClasses": [],

    Suite: function(suiteClasses) {
      this.suiteClasses = suiteClasses;
    },

    emptySuite: function() {
      this.suiteClasses.clear();
    }

  }).getClassConstructor();

});