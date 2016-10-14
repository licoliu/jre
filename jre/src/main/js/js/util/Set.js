/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 11, 2014
 */
define(function(require, exports, module) {

  require("bootstrap!js.util.Collection");

  /** 
   * @abstract
   * @class js.util.Set
   * @extends {js.util.Collection}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * A collection that contains no duplicate elements. More formally, sets contain no pair of elements e1 and e2 such that e1.equals(e2), and at most one null element. As implied by its name, this interface models the mathematical set abstraction.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * The Set interface places additional stipulations, beyond those inherited from the Collection interface, on the contracts of all constructors and on the contracts of the add, equals and hashCode methods. Declarations for other inherited methods are also included here for convenience. (The specifications accompanying these declarations have been tailored to the Set interface, but they do not contain any additional stipulations.)
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * The additional stipulation on constructors is, not surprisingly, that all constructors must create a set that contains no duplicate elements (as defined above).
   * </p><p>
   * This interface is a member of the jsrt Collections Framework.
   * </p>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
  return Class.forName( /** @lends js.util.Set.prototype */ {
    name: "abstract class js.util.Set extends js.util.Collection"
  }).getClassConstructor();
});