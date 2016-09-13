define(function(require, exports, module) {
  return Class.forName({
    name: "@interface js.test.annotation.After",
    execute: function(self, method) {}
  }).getClassConstructor();
});