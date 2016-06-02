define(function(require, exports, module) {

  require("bootstrap!js.util.ArrayList");

  require("bootstrap!js.test.TestCase");
  require("bootstrap!js.test.Assert");

  Class.forName({
    name: "class js.util.TestList extends js.test.TestCase",
    "@Setter @Getter private list": new js.util.ArrayList(),
    TestList: function() {
      for (var i = 0; i < 3; i++) {
        this.getList().add("测试List接口" + i);
      }
    },
    "@Test testListIterator": function() {
      var itr = this.getList().listIterator();
      while (itr.hasNext()) {
        js.lang.System.out.println(itr.next());
      }

      while (itr.hasPrevious()) {
        js.lang.System.out.println(itr.previous());
      }
    },
    "@Test testIterator": function() {
      var itr = this.getList().iterator();
      while (itr.hasNext()) {
        js.lang.System.out.println(itr.next());
      }
    },
    "@Test testIndexOf": function() {
      for (var i = 0; i < 3; i++) {
        js.lang.System.out.println("********indexOf:" + i + "   value:" + this.getList().indexOf("测试" + i));
      }
    },
    "@Test testLastIndexOf": function() {
      for (var i = 0; i < 3; i++) {
        js.lang.System.out.println("********lastIndexOf:" + i + "   value:" + this.getList().lastIndexOf("测试" + i));
      }
    },
    "@Test testSubList": function() {
      js.lang.System.out.println("********subList(1,2)->" + "   value:" + this.getList().subList(1, 2));
    },
    "@Test testClear": function() {
      js.lang.System.out.println("clear前：" + this.getList().size());
      this.getList().clear();
      js.lang.System.out.println("clear后：" + this.getList().size());
    }
  });
});