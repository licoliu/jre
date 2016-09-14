define(function(require, exports, module) {

  require("bootstrap!org.atomunion.aspect.Component");

  Class.forName({
    name: "@interface org.atomunion.aspect.Service extends org.atomunion.aspect.Component",
    execute: function(self, field, Modifier, Attribute) {
      this.$super.execute.apply(this, arguments);
    }
  });
});