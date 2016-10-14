/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: 2015年2月10日
 */

/**
 * @class js.lang.InternalError 
 * @extends {js.lang.Error}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The InternalError object indicates an error that occurred internally in the JavaScript engine or jre framework. 
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.InternalError.prototype */ {
  name: "class js.lang.InternalError extends js.lang.Error",

  "private name": "js.lang.InternalError", // 错误名
  "private number": 99
});