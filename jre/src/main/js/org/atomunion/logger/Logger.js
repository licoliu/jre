define(function(require, exports, module) {

  Class.forName({
    name: "abstract class org.atomunion.logger.Logger extends Object",

    "private loglevels": ["debug", "info", "warn", "error", "fatal"],

    "abstract debug": function(message) {},

    "abstract info": function(message) {},

    "abstract warn": function(message) {},

    "abstract error": function(message) {},

    "abstract fatal": function(message) {},

    "isDebugEnabled": function() {
      var loglevel = js.lang.System.getProperty("loglevel");
      var index = this.loglevels.indexOf(loglevel);
      return index <= 0;
    },

    "isInfoEnabled": function() {
      var loglevel = js.lang.System.getProperty("loglevel");
      var index = this.loglevels.indexOf(loglevel);
      return index <= 1;
    },

    "isWarnEnabled": function() {
      var loglevel = js.lang.System.getProperty("loglevel");
      var index = this.loglevels.indexOf(loglevel);
      return index <= 2;
    },

    "isErrorEnabled": function() {
      var loglevel = js.lang.System.getProperty("loglevel");
      var index = this.loglevels.indexOf(loglevel);
      return index <= 3;
    },

    "isFatalEnabled": function() {
      var loglevel = js.lang.System.getProperty("loglevel");
      var index = this.loglevels.indexOf(loglevel);
      return index <= 4;
    }
  });
});