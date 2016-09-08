define(function(require, exports, module) {
  return Class.forName({
    name: "class org.atomunion.beans.factory.BeanFactory extends Object",

    "abstract containsBean": function(name) {},

    "abstract getBean": function(name) {},

    "abstract getType": function(name) {},

    "abstract isSingleton": function(name) {}

  }).getClassConstructor();
});