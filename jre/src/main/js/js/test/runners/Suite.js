define(function(require, exports, module) {

  return Class.forName({
    name: "class js.test.runners.Suite extends Object",

    "private suiteClasses": [],

    Suite: function(suiteClasses) {
      this.suiteClasses = suiteClasses;
    },

    emptySuite: function() {
      this.suiteClasses.clear();
    }

  }).getClassConstructor();
}

});