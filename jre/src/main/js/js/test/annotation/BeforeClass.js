define(function(require, exports, module) {
  return Class.forName({
    name: "@interface js.test.annotation.BeforeClass",
    execute: function(self, method, Modifier) {}
  }).getClassConstructor();
});