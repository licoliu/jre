define(function(require, exports, module) {


  require("js.test.TestCase");
  console.log("***********1*************");
  //require("js.lang.StringBuffer");
  //console.log("***********2*************");
  //require("js.test.Assert");
  //console.log("***********3*************");
});



/*
$import("js.test.TestCase", "BootstrapClassLoader", false, function() {
  console.log("***********1*************");
  $import("js.lang.StringBuffer", "BootstrapClassLoader", false, function() {
    console.log("***********2*************");
    $import("js.test.Assert", "BootstrapClassLoader", false, function() {
      console.log("***********3*************");
    });
  });
});
//define(function(require, exports, module) {

require("http://10.32.22.143:8000/static/jre/src/main/js/js/net/Http.js");

define(function(require, exports, module) {

  require("./TestOOP");

  define(function(require, exports, module) {
    require("/static/jre/src/main/js/js/net/Rest");
  });

});
console.log("***********test*************");

//});






*/


/*
$import("js.test.TestCase", "BootstrapClassLoader");
$import("js.lang.StringBuffer", "BootstrapClassLoader");
$import("js.lang.System", "BootstrapClassLoader");
$import("js.test.Assert", "BootstrapClassLoader");



$import("js.test.TestCase", "BootstrapClassLoader");
$import("js.lang.StringBuffer", "BootstrapClassLoader");
$import("js.lang.System", "BootstrapClassLoader");
$import("js.test.Assert", "BootstrapClassLoader");


$import("js.test.TestCase", "BootstrapClassLoader");
$import("js.lang.StringBuffer", "BootstrapClassLoader");
$import("js.lang.System", "BootstrapClassLoader");
$import("js.test.Assert", "BootstrapClassLoader");


$import("js.test.TestCase", "BootstrapClassLoader");
$import("js.lang.StringBuffer", "BootstrapClassLoader");
$import("js.lang.System", "BootstrapClassLoader");
$import("js.test.Assert", "BootstrapClassLoader");



Class.forName({
  name: "class test.lang.TestStringBuffer extends js.test.TestCase",
  "@Setter @Getter private stringBuffer": new js.lang.StringBuffer(),

  "TestStringBuffer": function() {},


  "@Before public setUp": function() {
    for (var i = 0; i < 10; i++) {
      this.getStringBuffer().append("" + i);
    }
  },

  "@After public tearDown": function() {
    this.getStringBuffer().clear();
  },


  "@Test testAppend": function() {
    this.getStringBuffer().clear();
    for (var i = 5; i < 10; i++) {
      this.getStringBuffer().append("" + i);
    }
    js.test.Assert.assertTrue("类js.lang.StringBuffer中的append方法测试不通过", "56789".equals(this.getStringBuffer().toString()));
  },

  "@Test testInsert": function() {
    this.getStringBuffer().clear();
    for (var i = 0; i < 5; i++) {
      this.getStringBuffer().insert("" + i);
    }
    js.test.Assert.assertTrue("类js.lang.StringBuffer中的insert方法测试不通过", "43210".equals(this.getStringBuffer().toString()));
  },

  "@Test testApplys": function() {

  },

  "@Test testClear": function() {
    this.getStringBuffer().clear();
    js.test.Assert.assertTrue("类js.lang.StringBuffer中的clear方法测试不通过", "".equals(this.getStringBuffer().toString()));
  },

  "@Test testRemove": function() {
    this.getStringBuffer().remove(0, 3);

    js.test.Assert.assertTrue("类js.lang.StringBuffer中的remove方法测试不通过", "3456789".equals(this.getStringBuffer().toString()));

    this.getStringBuffer().remove(3, 7);
    js.test.Assert.assertTrue("类js.lang.StringBuffer中的remove方法测试不通过", "345".equals(this.getStringBuffer().toString()));

    this.getStringBuffer().remove(0, 3);
    js.test.Assert.assertTrue("类js.lang.StringBuffer中的remove方法测试不通过", "".equals(this.getStringBuffer().toString()));
  },

  "@Test testSubstring": function() {
    js.test.Assert.assertTrue("类js.lang.StringBuffer中的substring方法测试不通过", "012".equals(this.getStringBuffer().substring(0, 3)));
    js.test.Assert.assertTrue("类js.lang.StringBuffer中的substring方法测试不通过", "89".equals(this.getStringBuffer().substring(8, 10)));
    js.test.Assert.assertTrue("类js.lang.StringBuffer中的substring方法测试不通过", "0123456789".equals(this.getStringBuffer().substring(0, 10)));
  },

  "@Test testCharAt": function() {
    js.test.Assert.assertTrue("类js.lang.StringBuffer中的charAt方法测试不通过", "0".equals(this.getStringBuffer().charAt(0)));
    js.test.Assert.assertTrue("类js.lang.StringBuffer中的charAt方法测试不通过", "9".equals(this.getStringBuffer().charAt(9)));
    js.test.Assert.assertTrue("类js.lang.StringBuffer中的charAt方法测试不通过", "5".equals(this.getStringBuffer().charAt(5)));
  },

  "@Test testIndexOf": function() {
    js.test.Assert.assertTrue("类js.lang.StringBuffer中的indexOf方法测试不通过", this.getStringBuffer().indexOf('0') === 0);
    js.test.Assert.assertTrue("类js.lang.StringBuffer中的indexOf方法测试不通过", this.getStringBuffer().indexOf('789') === 7);
    js.test.Assert.assertTrue("类js.lang.StringBuffer中的indexOf方法测试不通过", this.getStringBuffer().indexOf('9876') === -1);
  },

  "@Test testLength": function() {
    js.test.Assert.assertTrue("类js.lang.StringBuffer中的length方法测试不通过", this.getStringBuffer().length() === 10);
  },

  "@Test testGetLength": function() {
    js.test.Assert.assertTrue("类js.lang.StringBuffer中的getLength方法测试不通过", this.getStringBuffer().getLength() === 10);
  },

  "@Test testToString": function() {
    js.test.Assert.assertTrue("类js.lang.StringBuffer中的toString方法测试不通过", "0123456789".equals(this.getStringBuffer().toString()));
    js.test.Assert.assertTrue("类js.lang.StringBuffer中的toString方法测试不通过", "0,1,2,3,4,5,6,7,8,9".equals(this.getStringBuffer().toString(',')));
  }
});

new test.lang.TestStringBuffer();

*/