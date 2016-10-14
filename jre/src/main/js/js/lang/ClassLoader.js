/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 17, 2014
 */

/**
 * @class js.lang.ClassLoader 
 * @extends {js.lang.Object}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * A class loader is an object that is responsible for loading classes. The class ClassLoader is an abstract class. Given the binary name of a class, a class loader should attempt to locate or generate data that constitutes a definition for the class. A typical strategy is to transform the name into a file name or a url and then read a "class file" of that name from a file system or a remote resources.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Every Class object contains a reference to the ClassLoader that defined it.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Applications implement subclasses of ClassLoader in order to extend the manner in which the js engine dynamically loads classes.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The ClassLoader class uses a delegation model to search for classes and resources. Each instance of ClassLoader has an associated parent class loader. When requested to find a class or resource, a ClassLoader instance will delegate the search for the class or resource to its parent class loader after attempting to find the class or resource itself. The jre framework built-in class loader, called the "bootstrap class loader", does not itself have a parent but may serve as the parent of a ClassLoader instance.
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.ClassLoader.prototype */ {
  name: "abstract class js.lang.ClassLoader extends Object",

  '@Setter @Getter private parent': null,

  '@Setter @Getter private classes': [],

  /** 
   * @name js.lang.ClassLoader.prototype.loadClass
   * @function
   * @abstract 
   * @summary Loads the class with the specified unqiue url.
   * @description 
   *
   * @param {js.lang.String} scriptUrl - the url of the class file
   * @param {js.lang.Function} callback - callback after class file loaded
   * @param {js.lang.Object} scope - the callback function's execution context
   */
  "abstract loadClass": function(scriptUrl, callback, scope) {},

  /** 
   * @name js.lang.ClassLoader.getSystemClassLoader
   * @function
   * @static 
   * @summary Returns the system class loader for delegation.
   * @description 
   *
   * @return {js.lang.ClassLoader} The system ClassLoader for delegation, or null if none
   */
  'static getSystemClassLoader': function() {
    return atom.misc.Launcher.getLauncher().getClassLoader();
  }
});