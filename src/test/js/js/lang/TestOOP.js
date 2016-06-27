/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年6月27日
 */
define(function(require, exports, module) {

  require("test!js.model.Animal");
  require("test!js.model.Dog");

  require("bootstrap!js.test.TestCase");
  require("bootstrap!js.test.Assert");

  var dog1 = new js.model.Dog("dog1", "汪汪1");
  var dog2 = js.model.Dog.$class.newInstance();

  var animal1 = new js.model.Animal("animal1");
  var animal2 = js.model.Animal.$class.newInstance();

  return Class.forName({
    name: "class js.lang.TestOOP extends js.test.TestCase",
    "@Setter @Getter private dog": dog1,

    "@Test testConstrator": function() {
      js.lang.System.out.println("this.getDog().getName():" + this.getDog().getName());
    },

    "@Test testClone": function() {
      js.test.Assert.assertEquals("this.getDog().getName()", this.getDog().getName(), "dog1");
      js.test.Assert.assertEquals("this.getDog().say()", this.getDog().say(), "汪汪1");

      var c = this.getDog().clone();
      js.test.Assert.assertNotSame("克隆前后值相等", this.getDog(), c);
      js.test.Assert.assertEquals("clone.getName()", c.getName(), "dog1");
      js.test.Assert.assertEquals("clone.say()", c.say(), "汪汪1");

      // TODO 进一步测试深拷贝
    }
  }).getClassConstructor();

});