/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 11, 2014
 */
define(function(require, exports, module) {

  require("bootstrap!js.util.Set");

  /** 
   * @class js.util.TreeSet 
   * @extends {js.util.Set}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * The elements are ordered using their natural ordering, or by a Comparator provided at set creation time, depending on which constructor is used.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * This class is not been implemented yet.
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
  return Class.forName( /** @lends js.util.TreeSet.prototype */ {
    name: "class js.util.TreeSet extends js.util.Set"
  }).getClassConstructor();
});