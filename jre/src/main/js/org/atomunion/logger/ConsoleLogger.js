Class.forName({
  name: "class org.atomunion.logger.ConsoleLogger extends org.atomunion.logger.Logger",

  "ConsoleLogger": function(name) {
    this.name = name;
    this.out = new js.io.Console(console);
  },

  "debug": function(message) {
    return this.out.debug(message);
  },

  "info": function(message) {
    return this.out.info(message);
  },

  "warn": function(message) {
    return this.out.warn(message);
  },

  "error": function(message) {
    return this.out.error(message);
  },

  "fatal": function(message) {
    return this.error(message);
  }

});