/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 11, 2014
 */
define(function(require, exports, module) {

  require("bootstrap!js.util.Map");

  /** 
   * @class js.util.TreeMap 
   * @extends {js.util.Map}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * The map is sorted according to the natural ordering of its keys, or by a Comparator provided at map creation time, depending on which constructor is used.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * This class is not been implemented yet.
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
  return Class.forName( /** @lends js.util.TreeMap.prototype */ {
    name: "class js.util.TreeMap extends js.util.Map"
  }).getClassConstructor();
});