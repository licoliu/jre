define(function(require, exports, module) {

  return Class.forName({
    name: "class js.test.runner.Result extends Object",

    "private _failureCount": 0,
    "private _ignoreCount": 0,
    "private _runCount": 0,
    "private _runTime": 0,

    getFailureCount: function() {
      return this._failureCount;
    },

    getIgnoreCount: function() {
      return this._ignoreCount;
    },

    getRunCount: function() {
      return this._runCount;
    },

    getRunTime: function() {
      return this._runTime;
    },

    wasSuccessful: function() {
      return this._failureCount <= 0;
    }

  });
});