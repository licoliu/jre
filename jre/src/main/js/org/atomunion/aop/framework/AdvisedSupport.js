define(function(require, exports, module) {
  return Class.forName({
    name: "class org.atomunion.aop.framework.AdvisedSupport extends Object",

    "@Getter private advisors": [],

    "public addAdvisor": function(advisor) {
      var pos = this.advisors.length;

      if (pos > this.advisors.length) {
        throw new js.lang.IllegalArgumentException(
          "Illegal position " + pos + " in advisor list with size " + this.advisors.length);
      }
      this.advisors[pos] = advisor;
    },

    "public removeAdvisor": function(advisor) {
      var index = this.advisors.indexOf(advisor);
      if (index === -1) {
        return false;
      } else {
        this.advisors.splice(index, 1);
        return true;
      }
    }
  }).getClassConstructor();
});