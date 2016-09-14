define(function(require, exports, module) {
  require("bootstrap!org.atomunion.aspect.Resource");
  Class.forName({
    name: "@interface org.atomunion.aspect.Autowire extends org.atomunion.aspect.Resource",
    execute: function(self, field, Modifier, Attribute) {
      this.$super.execute.apply(this, arguments);
    }
  });
});