define(function(require, exports, module) {

  require("bootstrap!js.test.TestCase");

  Class.forName({
    name: "class js.lang.TestArray extends js.test.TestCase",
    "@Setter @Getter private array": [],

    "TestArray": function() {},

    "@Before public setUp": function() {
      for (var i = 0; i < 3; i++) {
        this.getArray().push("测试" + i);
      }
    },

    "@After public tearDown": function() {
      this.setArray([]);
    },

    "@Test testClear": function() {
      this.getArray().clear();
      js.test.Assert.assertTrue("类js.lang.Array中的clear方法测试不通过", this.getArray().length === 0);
    },

    "@Test testContains": function() {
      js.test.Assert.assertTrue("类js.lang.Array中的contains方法测试不通过", this.getArray().contains("测试1"));
    },

    "@Test testRemove": function(elem) {
      var flag = this.getArray().remove("测试1");
      js.test.Assert.assertTrue("类js.lang.Array中的remove方法测试不通过", flag);
      js.test.Assert.assertTrue("类js.lang.Array中的remove方法测试不通过", this.getArray()[1] === "测试2");
    },

    "@Test testPeek": function() {
      var ele = this.getArray().peek();
      js.test.Assert.assertTrue("类js.lang.Array中的peek方法测试不通过", ele === '测试2');
    },

    "@Test testLast": function() {
      var ele = this.getArray().last();
      js.test.Assert.assertTrue("类js.lang.Array中的last方法测试不通过", ele === '测试2');
    },

    "@Test testFirst": function() {
      var ele = this.getArray().first();
      js.test.Assert.assertTrue("类js.lang.Array中的first方法测试不通过", ele === "测试0");
    },

    "@Test testIndexOf": function() {
      var index = this.getArray().indexOf("测试1");
      js.test.Assert.assertTrue("类js.lang.Array中的indexOf方法测试不通过", index === 1);

      index = this.getArray().indexOf("测试1", 1, 2);
      js.test.Assert.assertTrue("类js.lang.Array中的indexOf方法测试不通过", index === 1);

      index = this.getArray().indexOf("测试1", 2, 2);
      js.test.Assert.assertTrue("类js.lang.Array中的indexOf方法测试不通过", index === -1);

      index = this.getArray().indexOf(function(ele) {
        return ele === "测试1";
      });
      js.test.Assert.assertTrue("类js.lang.Array中的indexOf方法测试不通过", index === 1);

      index = this.getArray().indexOf(function(ele) {
        return ele === "测试1";
      }, 1, 2);
      js.test.Assert.assertTrue("类js.lang.Array中的indexOf方法测试不通过", index === 1);

      index = this.getArray().indexOf(function(ele) {
        return ele === "测试1";
      }, 2, 2);

      js.test.Assert.assertTrue("类js.lang.Array中的indexOf方法测试不通过", index === -1);
    },

    "@Test testAppend": function() {
      this.getArray().append(["测试3", "测试4", "测试5"]);
      js.test.Assert.assertTrue("类js.lang.Array中的append方法测试不通过", this.getArray()[0] === "测试0");
      js.test.Assert.assertTrue("类js.lang.Array中的append方法测试不通过", this.getArray()[1] === "测试1");
      js.test.Assert.assertTrue("类js.lang.Array中的append方法测试不通过", this.getArray()[2] === "测试2");
      js.test.Assert.assertTrue("类js.lang.Array中的append方法测试不通过", this.getArray()[3] === "测试3");
      js.test.Assert.assertTrue("类js.lang.Array中的append方法测试不通过", this.getArray()[4] === "测试4");
      js.test.Assert.assertTrue("类js.lang.Array中的append方法测试不通过", this.getArray()[5] === "测试5");
    },

    "@Test testInsert": function() {
      this.getArray().insert(["测试-3", "测试-2", "测试-1"]);
      js.test.Assert.assertTrue("类js.lang.Array中的insert方法测试不通过", this.getArray()[0] === "测试-3");
      js.test.Assert.assertTrue("类js.lang.Array中的insert方法测试不通过", this.getArray()[1] === "测试-2");
      js.test.Assert.assertTrue("类js.lang.Array中的insert方法测试不通过", this.getArray()[2] === "测试-1");
      js.test.Assert.assertTrue("类js.lang.Array中的insert方法测试不通过", this.getArray()[3] === "测试0");
      js.test.Assert.assertTrue("类js.lang.Array中的insert方法测试不通过", this.getArray()[4] === "测试1");
      js.test.Assert.assertTrue("类js.lang.Array中的insert方法测试不通过", this.getArray()[5] === "测试2");
    },

    "@Test testGetLength": function() {
      js.test.Assert.assertTrue("类js.lang.Array中的getLength方法测试不通过", this.getArray().getLength() === 3);
    },

    "@Test testSize": function() {
      js.test.Assert.assertTrue("类js.lang.Array中的size方法测试不通过", this.getArray().size() === 3);
    }

  });

});