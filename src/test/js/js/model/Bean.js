define(function(require, exports, module) {

  return Class.forName({
    name: "@interface js.model.Bean extends Object",
    Bean: function() {}
  }).getClassConstructor();
});