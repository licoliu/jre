define(function(require, exports, module) {

  return Class.forName({
    name: "class js.model.Animal extends Object",
    "@Getter @Setter private age": 0,
    "private name": "",

    "public static final TYPE": "type",

    Animal: function(name) {
      this.name = name;
    },
    setName: function(name) {
      this.name = name;
    },
    getName: function() {
      return this.name;
    },
    say: function() {
      console.log("i am a animal");
      return "i am a animal";
    },

    "static getType": function() {
      return js.model.Animal.TYPE;
    },

    "static say": function() {
      js.lang.System.out.println("static say: i am animal");
    }
  }).getClassConstructor();
});