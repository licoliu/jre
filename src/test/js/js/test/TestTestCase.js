/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年9月29日
 */
define(function(require, exports, module) {

  require("bootstrap!js.test.TestCase");
  require("bootstrap!js.test.Assert");

  Class.forName({
    name: "class js.test.TestTestCase extends js.test.TestCase",
    "@Setter @Getter private calendar": null,

    "@Setter @Getter private static staticField": 1,

    "@Setter @Getter private field": 2,

    TestTestCase: function() {},

    "@BeforeClass public static setUpBeforeClass": function() {
      js.test.Assert.assertTrue("类js.test.TestCase中的setUpBeforeClass方法测试不通过", this.staticField === 1);
      js.test.Assert.assertTrue("类js.test.TestCase中的setUpBeforeClass方法测试不通过", !this.field);
    },

    "@AfterClass public static tearDownAfterClass": function() {
      js.test.Assert.assertTrue("类js.test.TestCase中的tearDownAfterClass方法测试不通过", this.staticField === 11);
      js.test.Assert.assertTrue("类js.test.TestCase中的tearDownAfterClass方法测试不通过", !this.field);
    },

    "@Before public setUp": function() {
      js.test.Assert.assertTrue("类js.test.TestCase中的setUp方法测试不通过", js.test.TestTestCase.staticField === 1);
      js.test.Assert.assertTrue("类js.test.TestCase中的setUp方法测试不通过", this.field === 2);
    },

    "@After public tearDown": function() {
      js.test.Assert.assertTrue("类js.test.TestCase中的tearDown方法测试不通过", js.test.TestTestCase.staticField === 11);
      js.test.Assert.assertTrue("类js.test.TestCase中的tearDown方法测试不通过", this.field === 22);
    },

    "@Test public test": function() {
      js.test.TestTestCase.staticField = 11;
      this.field = 22;
    }
  });
});