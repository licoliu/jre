define(function(require, exports, module) {
  return Class.forName({
    name: "@interface js.test.annotation.Before",
    execute: function(self, method) {}
  }).getClassConstructor();
});