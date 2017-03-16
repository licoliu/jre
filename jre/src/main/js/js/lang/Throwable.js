/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年6月25日
 */

/**
 * @class js.lang.Throwable 
 * @extends {js.lang.Object}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The Throwable class is the superclass of all errors and exceptions in the jre framework. Only objects that are instances of this class (or one of its subclasses) are thrown by the JavaScript engine or can be thrown by the Java throw statement. Similarly, only this class or one of its subclasses can be the argument type in a catch clause.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Instances of two subclasses, Error and Exception, are conventionally used to indicate that exceptional situations have occurred. Typically, these instances are freshly created in the context of the exceptional situation so as to include relevant information (such as stack trace data).
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * A throwable contains a snapshot of the execution stack. It can also contain a message string that gives more information about the error. Over time, a throwable can suppress other throwables from being propagated. Finally, the throwable can also contain a cause: another throwable that caused this throwable to be constructed. The recording of this causal information is referred to as the chained exception facility, as the cause can, itself, have a cause, and so on, leading to a "chain" of exceptions, each caused by another.
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.Throwable.prototype */ {
  name: "class js.lang.Throwable extends Object",

  /** 
   * @name js.lang.Throwable.prototype.name
   * @private
   * @property {js.lang.String} the name of the error
   */
  "private name": "js.lang.Throwable",

  /** 
   * @name js.lang.Throwable.prototype.number
   * @private
   * @property {js.lang.Number} the code no. of the error
   */
  "private number": null,

  /** 
   * @name js.lang.Throwable.prototype.message
   * @private
   * @property {js.lang.String} Optional. Human-readable description of the error
   */
  "private message": null,

  /** 
   * @name js.lang.Throwable.prototype.description
   * @private
   * @property {js.lang.String} Optional. Error description. Similar to message.
   */
  "private description": null,

  /** 
   * @name js.lang.Throwable.prototype.fileName
   * @private
   * @property {js.lang.String} Optional. The name of the file containing the code that caused the exception
   */
  "private fileName": null, // 错误发生的文件( Only in FF )

  /** 
   * @name js.lang.Throwable.prototype.lineNumber
   * @private
   * @property {js.lang.String} Optional. The line number of the code that caused the exception
   */
  "private lineNumber": null,

  /** 
   * @name js.lang.Throwable.prototype.stack
   * @private
   * @property {js.lang.String} Stack trace.
   */
  "private stack": null, // 错误发生时的调用堆栈 FF Only 属性

  Throwable: function(message, fileName, lineNumber, stack, description) {
    this.message = message;
    this.fileName = fileName;
    this.stack = stack;
    this.lineNumber = lineNumber;
    this.description = description;
  },

  /** 
   * @function
   * @public 
   * @summary get the name of the error.
   * @description get the name of the error.
   *
   * @return {js.lang.String} the name of the error.
   */
  getName: function() {
    return this.name;
  },

  /** 
   * @function
   * @public 
   * @summary get the code no. of the error.
   * @description get the code no. of the error.
   *
   * @return {js.lang.String} the code no. of the error
   */
  getNumber: function() {
    return this.number;
  },

  /** 
   * @function
   * @public 
   * @summary get human-readable description of the error.
   * @description get human-readable description of the error.
   *
   * @return {js.lang.String} human-readable description of the error
   */
  getMessage: function() {
    return this.message;
  },

  /** 
   * @function
   * @public 
   * @summary get the error description(Similar to message).
   * @description get the error description(Similar to message).
   *
   * @return {js.lang.String} error description(Similar to message)
   */
  getDescription: function() {
    return this.description;
  },

  /** 
   * @function
   * @public 
   * @summary get the name of the file containing the code that caused the exception.
   * @description get the name of the file containing the code that caused the exception.
   *
   * @return {js.lang.String} Path to file that raised this error
   */
  getFileName: function() {
    return this.fileName;
  },

  /** 
   * @function
   * @public 
   * @summary 
   * @description
   *
   * @return {js.lang.String} Line number in file that raised this error.
   */
  getLineNumber: function() {
    return this.lineNumber;
  },

  /** 
   * @function
   * @public 
   * @summary get the stack trace of the error.
   * @description get the stack trace of the error.
   *
   * @return {js.lang.String} Stack trace.
   */
  getStack: function() {
    return this.stack;
  },

  /** 
   * @function
   * @public 
   * @summary get the stack trace of the error.
   * @description get the stack trace of the error.
   *
   * @return {js.lang.String} Stack trace.
   */
  getStackTrace: function() {
    return this.getStack();
  },

  /** 
   * @function
   * @public 
   * @summary 
   * @description
   *
   * @return {js.lang.String}
   */
  printStackTrace: function(printWriter) {
    if (!printWriter) {
      printWriter = js.lang.System.out;
    }

    if (!(printWriter instanceof js.io.PrintWriter)) {
      throw new js.lang.IllegalArgumentException("You can only print this throwable and its backtrace to the specified print writer.");
    }

    printWriter.println(this.stack);
  }
});