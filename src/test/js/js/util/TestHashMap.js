define(function(require, exports, module) {
  require("bootstrap!js.util.HashMap");

  require("bootstrap!js.test.TestCase");
  require("bootstrap!js.test.Assert");

  return Class.forName({
    name: "class js.util.TestHashMap",
    "@Setter @Getter private map": new js.util.HashMap(),
    TestHashMap: function() {
      for (var i = 0; i < 6; i++) {
        this.getMap().put(i, "测试Map" + i);
      }
    },
    "@Test testEntrySet": function() {
      var itr = this.getMap().entrySet().iterator();
      while (itr.hasNext()) {
        var entry = itr.next();
        js.lang.System.out.println("key:" + entry.getKey() + ",value:" + entry.getValue());
      }
    },
    "@Test testKeySet": function() {
      var itr = this.getMap().keySet().iterator();
      while (itr.hasNext()) {
        var key = itr.next();
        js.lang.System.out
          .println("key:" + key + ",value:" + this.getMap().get(key));
      }
    },
    "@Test testValues": function() {
      var itr = this.getMap().values().iterator();
      while (itr.hasNext()) {
        var value = itr.next();
        js.lang.System.out.println("value:" + value);
      }
    }
  }).getClassConstructor();
});