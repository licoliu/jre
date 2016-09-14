define(function(require, exports, module) {

  require("test!js.model.Dog");

  return Class.forName({
    name: "public class js.model.Taidi extends js.model.Dog",
    "public Taidi": function(name, word) {
      this.word = word;
    },
    say: function() {
      this.$super.say();

      js.lang.System.out.println("say: i am taidi");
      return this.word;
    },
    "static say": function() {
      this.$super.say();
      js.lang.System.out.println("static say: i am taidi");
    }

  }).getClassConstructor();
});