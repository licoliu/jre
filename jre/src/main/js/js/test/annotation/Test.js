define(function(require, exports, module) {
  return Class.forName({
    name: "@interface js.test.annotation.Test",
    execute: function(self, method) {}
  }).getClassConstructor();
});