define(function(require, exports, module) {
  return Class.forName({
    name: "@interface js.test.annotation.Ignore",
    execute: function(self, method) {}
  }).getClassConstructor();
});