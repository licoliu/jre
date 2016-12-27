define(function(require, exports, module) {

  require("test!js.model.Animal");

  return Class.forName({
    name: "public class js.model.Dog extends js.model.Animal",
    "@Getter @Setter public color": "black",
    "@Getter @Setter private word": "汪汪",

    "public Dog": function(name, word) {
      this.word = word;

      console.log("js.model.Dog constructor")
    },

    initial: function() {
      console.log("js.model.Dog initial")
    },

    "private play": function() {
      js.lang.System.out.println("i am playing very happy.")
    },
    say: function() {
      this.$super.say();

      js.lang.System.out.println("say:" + this.word);
      return this.word;
    },
    sayError: function() {
      throw new js.lang.Exception("我是个哑巴");
    },
    "static say": function() {
      this.$super.say();
      js.lang.System.out.println("static say: i am dog");
    }
  }).getClassConstructor();
});