define(function(require, exports, module) {
  return Class.forName({
    name: "@interface js.test.annotation.AfterClass",
    execute: function(self, method) {}
  }).getClassConstructor();
});