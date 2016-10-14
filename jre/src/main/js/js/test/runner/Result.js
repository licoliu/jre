define(function(require, exports, module) {

  /** 
   * @class js.test.runner.Result
   * @extends {js.lang.Object}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * A Result collects and summarizes information from running multiple tests. All tests are counted -- additional information is collected from tests that fail.
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
  return Class.forName( /** @lends js.test.runner.Result.prototype */ {
    name: "class js.test.runner.Result extends Object",

    "private _failureCount": 0,
    "private _ignoreCount": 0,
    "private _runCount": 0,
    "private _runTime": 0,

    /** 
     * @function
     * @public 
     * @summary Get the number of tests that failed during the run.
     * @description 
     *
     * @return {js.lang.Number} the number of tests that failed during the run
     */
    getFailureCount: function() {
      return this._failureCount;
    },

    /** 
     * @function
     * @public 
     * @summary Get the number of tests ignored during the run.
     * @description 
     *
     * @return {js.lang.Number} the number of tests ignored during the run
     */
    getIgnoreCount: function() {
      return this._ignoreCount;
    },

    /** 
     * @function
     * @public 
     * @summary Get the number of tests run.
     * @description 
     *
     * @return {js.lang.Number} the number of tests run
     */
    getRunCount: function() {
      return this._runCount;
    },

    /** 
     * @function
     * @public 
     * @summary Get the number of milliseconds it took to run the entire suite to run.
     * @description 
     *
     * @return {js.lang.Number} the number of milliseconds it took to run the entire suite to run
     */
    getRunTime: function() {
      return this._runTime;
    },

    /** 
     * @function
     * @public 
     * @summary Test if all tests succeeded or not.
     * @description 
     *
     * @return {js.lang.Boolean} true if all tests succeeded
     */
    wasSuccessful: function() {
      return this._failureCount <= 0;
    }

  });
});