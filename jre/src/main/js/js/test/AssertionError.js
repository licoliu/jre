/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年6月25日
 */
define(function(require, exports, module) {

  /** 
   * @class js.test.AssertionError
   * @extends {js.lang.Error}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
  return Class.forName( /** @lends js.test.AssertionError.prototype */ {
    name: "class js.test.AssertionError extends js.lang.Error",
    "private name": "js.test.AssertionError", // 错误名
    "private number": -1
  }).getClassConstructor();

});