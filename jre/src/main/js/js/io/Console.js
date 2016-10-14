/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 14, 2014
 */

/** 
 * @class js.io.Console 
 * @extends {js.io.PrintWriter}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The Console object provides access to the browser's debugging console (e.g., the Web Console in Firefox). The specifics of how it works vary from browser to browser, but there is a de facto set of features that are typically provided.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The Console object can be accessed from any global object, Window on browsing scopes, WorkerGlobalScope, and its specific variants in workers via property console. It's exposed as Window.console, and can be referenced as simply console.
 * </p><br/>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.io.Console.prototype */ {
  name: "class js.io.Console extends js.io.PrintWriter",

  Console: function(writer) {
    if (writer && writer.log && typeof writer.log != 'function') {
      this._ie = true;
    }
    this._writer = writer;
  },

  "private unsupport": function() {
    var msg = null;
    if (arguments.length <= 0) {
      msg = "Your browser console don\'t support the output instruction. Please check your browser version:\"" + js.lang.System.getEnv("userAgent") + "\"";
    } else {
      msg = Array.prototype.slice.call(arguments).join(' ; ');
    }
    alert(msg);
  },

  /** 
   * @function
   * @public 
   * @summary Prints a character.
   * @description 
   *
   * @param {js.lang.Array|js.lang.String} buf - The characters array or a string to be printed
   * @param {js.lang.Number} off - Offset from which to start writing characters
   * @param {js.lang.Number} len - Number of characters to write
   * @param {js.lang.Boolean} ln - Whether to add a newline or not
   */
  print: function(buf, off, len, ln) {
    var cbuf = buf;
    if (!Object.isEmpty(cbuf)) {
      if (!Object.isString(cbuf) && !Object.isArray(cbuf)) {
        cbuf = cbuf.toString();
      }
      var str = null;
      if (!off || off < 0)
        off = 0;
      if (!len) {
        len = cbuf.length - off;
      } else if (off + len > cbuf.length)
        len = cbuf.length - off;

      if (Object.isString(cbuf)) {
        str = cbuf.substring(off, len + off);
      } else {
        str = cbuf.slice(off, len + off);
      }
      this.log("%s", ln ? str + "\n" : str);
    }
  },

  /** 
   * @function
   * @public 
   * @summary Writes an error message to the console if the assertion is false. If the assertion is true, nothing happens.
   * @description 
   *
   * @param {js.lang.Boolean} assertion - Any boolean expression. If the assertion is false, the message is written to the console.
   * @param {js.lang.Object} obj1 ... objN - A list of JavaScript objects to output. The string representations of each of these objects are appended together in the order listed and output.
   * @param {js.lang.String} msg - A JavaScript string containing zero or more substitution strings.
   * @param {js.lang.String} subst1 ... substN - JavaScript objects with which to replace substitution strings within msg. This parameter gives you additional control over the format of the output.
   */
  assert: function() {
    return (this._writer.assert || this.unsupport).apply(
      this._writer, arguments);
  },

  /** 
   * @function
   * @public 
   * @summary Outputs a message to the Web Console.
   * @description 打印日志信息，支持printf风格的占位符。只支持字符（%s）、整数（%d或%i）、浮点数（%f）和对象（%o）四种。 比如，log("%d年%d月%d日",2011,3,26); log("圆周率是%f",3.1415926);
   *
   * @param {js.lang.Object} obj1 ... objN - A list of JavaScript objects to output. The string representations of each of these objects are appended together in the order listed and output.
   * @param {js.lang.String} msg - A JavaScript string containing zero or more substitution strings. 
   * @param {js.lang.String} subst1 ... substN - JavaScript objects with which to replace substitution strings within msg. This gives you additional control over the format of the output.
   */
  log: function() {
    if (this._ie && this._writer.log) {
      if (arguments.length === 1) {
        this._writer.log(arguments[0]);
      } else if (arguments.length > 1) {
        this._writer.log(arguments[0], arguments[1]);
      }
      return;
    }

    return (this._writer.log || this.unsupport).apply(this._writer,
      arguments);
  },

  /** 
   * @function
   * @public 
   * @summary Outputs an informational message to the Web Console. In Firefox and Chrome, a small "i" icon is displayed next to these items in the Web Console's log.
   * @description 打印一般信息，支持printf风格的占位符。
   *
   * @param {js.lang.Object} obj1 ... objN - A list of JavaScript objects to output. The string representations of each of these objects are appended together in the order listed and output.
   * @param {js.lang.String} msg - A JavaScript string containing zero or more substitution strings.
   * @param {js.lang.String} subst1 ... substN - JavaScript objects with which to replace substitution strings within msg. This gives you additional control over the format of the output.
   */
  info: function() {

    if (this._ie && this._writer.info) {
      if (arguments.length === 1) {
        this._writer.info(arguments[0]);
      } else if (arguments.length > 1) {
        this._writer.info(arguments[0], arguments[1]);
      }
      return;
    }

    return (this._writer.info || this.unsupport).apply(
      this._writer, arguments);
  },

  /** 
   * @function
   * @public 
   * @summary Outputs a warning message to the Web Console.
   * @description 打印警告提示，支持printf风格的占位符。
   *
   * @param {js.lang.Object} obj1 ... objN - A list of JavaScript objects to output. The string representations of each of these objects are appended together in the order listed and output.
   * @param {js.lang.String} msg - A JavaScript string containing zero or more substitution strings.
   * @param {js.lang.String} subst1 ... substN - JavaScript objects with which to replace substitution strings within msg. This gives you additional control over the format of the output.
   */
  warn: function() {

    if (this._ie && this._writer.warn) {
      if (arguments.length === 1) {
        this._writer.warn(arguments[0]);
      } else if (arguments.length > 1) {
        this._writer.warn(arguments[0], arguments[1]);
      }
      return;
    }

    return (this._writer.warn || this.unsupport).apply(
      this._writer, arguments);
  },

  /** 
   * @function
   * @public 
   * @summary Outputs an error message to the Web Console.
   * @description 打印误提示，支持printf风格的占位符。
   *
   * @param {js.lang.Object} obj1 ... objN - A list of JavaScript objects to output. The string representations of each of these objects are appended together in the order listed and output.
   * @param {js.lang.String} msg - A JavaScript string containing zero or more substitution strings.
   * @param {js.lang.String} subst1 ... substN - JavaScript objects with which to replace substitution strings within msg. This gives you additional control over the format of the output.
   */
  error: function() {

    if (this._ie && this._writer.error) {
      if (arguments.length === 1) {
        this._writer.error(arguments[0]);
      } else if (arguments.length > 1) {
        this._writer.error(arguments[0], arguments[1]);
      }
      return;
    }

    return (this._writer.error || this.unsupport).apply(
      this._writer, arguments);
  },

  /** 
   * @function
   * @public 
   * @summary Displays an interactive list of the properties of the specified JavaScript object. The output is presented as a hierarchical listing with disclosure triangles that let you see the contents of child objects.
   * @description Displays an interactive list of the properties of the specified JavaScript object. The output is presented as a hierarchical listing with disclosure triangles that let you see the contents of child objects.
   *
   * @param {js.lang.Object} object - A JavaScript object whose properties should be output.
   */
  dir: function() {
    return (this._writer.dir || this.unsupport).apply(this._writer,
      arguments);
  },

  /** 
   * @function
   * @public 
   * @summary Starts recording a performance profile.
   * @description 
   * <p>
   * Starts recording a performance profile (for example, the Firefox performance tool).
   * </p><p>
   * You can optionally supply an argument to name the profile and this then enables you to stop only that profile if multiple profiles being recorded. See Console.profileEnd() to see how this argument is interpreted.
   * </p><p>
   * To stop recording call Console.profileEnd().
   * </p>
   *
   * @param {js.lang.String} profileName - The name to give the profile. Optional.
   */
  profile: function() {
    return (this._writer.profile || this.unsupport).apply(
      this._writer, arguments);
  },

  /** 
   * @function
   * @public 
   * @summary The profileEnd method stops recording a profile previously started with Console.profile().
   * @description 
   * <p>
   * The profileEnd method stops recording a profile previously started with Console.profile().
   * </p><p>
   * You can optionally supply an argument to name the profile. Doing so enables you to stop only that profile if you have multiple profiles being recorded.
   * </p><p><ul>
   * <li>if Console.profileEnd() is passed a profile name, and it matches the name of a profile being recorded, then that profile is stopped.</li>
   * <li>if Console.profileEnd() is passed a profile name and it does not match the name of a profile being recorded, no changes will be made.</li>
   * <li>if Console.profileEnd() is not passed a profile name, the most recently started profile is stopped.</li>
   * </ul></p>
   *
   * @param {js.lang.String} profileName - The name to give the profile. This parameter is optional.
   */
  profileEnd: function() {
    return (this._writer.profileEnd || this.unsupport).apply(
      this._writer, arguments);
  },

  /** 
   * @function
   * @public 
   * @summary Clears the console.
   * @description 
   * <p>
   * Clears the console.
   * </p><p>
   * The Console's contents will be replaced with an informational message like "Console was cleared".
   * </p><p>
   * Note that in Google Chrome, console.clear() has no effect if the user has selected "Preserve log upon navigation" in the settings.
   * </p>
   */
  clear: function() {
    if (this._ie && this._writer.clear) {
      return this._writer.clear();
    }
    return (this._writer.clear || this.unsupport).apply(
      this._writer, arguments);
  },

  /**
   * 用来追踪函数的调用轨迹。
   * 
   * 
   * 比如，有一个加法器函数。
   * 
   * <pre>
   * function add(a, b) {
   * 	return a + b;
   * }
   * </pre>
   * 
   * 如果想知道这个函数是如何被调用的，在其中加入console.trace()方法就可以了。
   * 
   * <pre>
   * function add(a, b) {
   * 	console.trace();
   * 	return a + b;
   * }
   * </pre>
   * 
   * 假定这个函数的调用代码如下：
   * 
   * <pre>
   * var x = add3(1, 1);
   * function add3(a, b) {
   * 	return add2(a, b);
   * }
   * function add2(a, b) {
   * 	return add1(a, b);
   * }
   * function add1(a, b) {
   * 	return add(a, b);
   * }
   * </pre>
   * 
   * 运行后，会显示add()的调用轨迹，从上到下依次为add()、add1()、add2()、add3()。
   * 
   */
  /** 
   * @function
   * @public 
   * @summary Outputs a stack trace to the Web Console.
   * @description Outputs a stack trace to the Web Console.
   */
  trace: function() {
    return (this._writer.trace || this.unsupport).apply(
      this._writer, arguments);
  },

  /** 
   * @function
   * @public 
   * @summary Outputs a debug message to the Web Console.
   * @description 打印调试信息，支持printf风格的占位符。
   *
   * @param {js.lang.Object} obj1 ... objN - A list of JavaScript objects to output. The string representations of each of these objects are appended together in the order listed and output.
   * @param {js.lang.String} msg - A JavaScript string containing zero or more substitution strings.
   * @param {js.lang.String} subst1 ... substN - JavaScript objects with which to replace substitution strings within msg. This gives you additional control over the format of the output.
   */
  debug: function() {
    return (this._writer.debug || this.unsupport).apply(
      this._writer, arguments);
  },

  /** 
   * @function
   * @public 
   * @summary 用来显示网页的某个节点（node）所包含的html/xml代码。比如，先获取一个表格节点，然后，显示该节点包含的代码。dirxml(document.getElementById("ID"));
   * @description Displays an interactive tree of the descendant elements of the specified XML/HTML element. If it is not possible to display as an element the JavaScript Object view is shown instead. The output is presented as a hierarchical listing of expandable nodes that let you see the contents of child nodes.
   *
   * @param {js.lang.Object} object - A JavaScript object whose properties should be output.
   */
  dirxml: function() {
    return (this._writer.dirxml || this.unsupport).apply(
      this._writer, arguments);
  },

  /** 
   * @function
   * @public 
   * @summary Creates a new inline group in the Web Console log.
   * @description Creates a new inline group in the Web Console log. This indents all following output by an additional level, until console.groupEnd() is called.
   */
  group: function() {
    if (this._ie) {
      return this.println(arguments[0] || "***************start*****************");
    }
    return (this._writer.group || this.unsupport).apply(
      this._writer, arguments);
  },

  /** 
   * @function
   * @public 
   * @summary Exits the current inline group in the Web Console. 
   * @description Exits the current inline group in the Web Console. See Using groups in the console in the console documentation for details and examples.
   */
  groupCollapsed: function() {
    return (this._writer.groupCollapsed || this.unsupport).apply(
      this._writer, arguments);
  },

  /** 
   * @function
   * @public 
   * @summary Creates a new inline group in the Web Console.
   * @description Creates a new inline group in the Web Console. Unlike console.group(), however, the new group is created collapsed. The user will need to use the disclosure button next to it to expand it, revealing the entries created in the group. Call console.groupEnd() to back out to the parent group. See Using groups in the console in the console documentation for details and examples.
   */
  groupEnd: function() {
    if (this._ie) {
      return this.println(arguments[0] || "***************end*****************");
    }
    return (this._writer.groupEnd || this.unsupport).apply(
      this._writer, arguments);
  },

  /** 
   * @function
   * @public 
   * @summary 
   * @description 
   */
  markTimeline: function() {
    return (this._writer.markTimeline || this.unsupport).apply(
      this._writer, arguments);
  },

  /**
   * time()和timeEnd()，用来显示代码的运行时间。
   * 
   * time("计时器一"); ----待检测的代码---- timeEnd("计时器一");
   */
  /** 
   * @function
   * @public 
   * @summary Starts a timer you can use to track how long an operation takes.
   * @description Starts a timer you can use to track how long an operation takes. You give each timer a unique name, and may have up to 10,000 timers running on a given page. When you call console.timeEnd() with the same name, the browser will output the time, in milliseconds, that elapsed since the timer was started.
   *
   * @param {js.lang.String} label - The name to give the new timer. This will identify the timer; use the same name when calling console.timeEnd() to stop the timer and get the time output to the console.
   */
  time: function() {
    return (this._writer.time || this.unsupport).apply(
      this._writer, arguments);
  },

  /** 
   * @function
   * @public 
   * @summary Stops a timer that was previously started by calling console.time().
   * @description Stops a timer that was previously started by calling console.time().
   *
   * @param {js.lang.String} label - The name of the timer to stop. Once stopped, the elapsed time is automatically displayed in the Web Console.
   */
  timeEnd: function() {
    return (this._writer.timeEnd || this.unsupport).apply(
      this._writer, arguments);
  },

  /** 
   * @function
   * @public 
   * @summary Adds a single marker to the browser's Timeline or Waterfall tool.
   * @description 
   * <p>
   * Adds a single marker to the browser's Timeline or Waterfall tool. This lets you correlate a point in your code with the other events recorded in the timeline, such as layout and paint events.
   * </p><p>
   * You can optionally supply an argument to label the timestamp, and this label will then be shown alongside the marker.
   * </p>
   *
   * @param {}
   * @return {} 
   */
  timeStamp: function() {
    return (this._writer.timeStamp || this.unsupport).apply(
      this._writer, arguments);
  },

  /** 
   * @function
   * @public 
   * @summary Logs the number of times that this particular call to count() has been called.
   * @description 
   * <p>
   * Logs the number of times that this particular call to count() has been called. This function takes an optional argument label.
   * </p><p>
   * Note: This feature is available in Web Workers.
   * </p><p>
   * If label is supplied, this function logs the number of times count() has been called with that particular label.
   * </p><p>
   * If label is omitted, the function logs the number of times count() has been called at this particular line.
   * </p>
   *
   * @param {js.lang.String} label - A string. If this is supplied, count() outputs the number of times it has been called at this line and with that label.
   */
  count: function() {
    return (this._writer.count || this.unsupport).apply(
      this._writer, arguments);
  },

  /** 
   * @function
   * @public 
   * @summary Displays tabular data as a table.
   * @description 
   * <p>
   * Displays tabular data as a table.
   * </p><p>
   * This function takes one mandatory argument data, which must be an array or an object, and one additional optional parameter columns.
   * </p><p>
   * It logs data as a table. Each element in the array (or enumerable property if data is an object) will be a row in the table.
   * </p><p>
   * The first column in the table will be labeled (index). If data is an array, then its values will be the array indices. If data is an object, then its values will be the property names. Note that (in Firefox) console.table is limited to displaying 1000 rows (first row is the labeled index).
   * </p>
   *
   * @param {js.lang.Object} data - The data to display. This must be either an array or an object.
   * @param {js.lang.Array} columns - An array containing the names of columns to include in the output.
   */
  table: function() {
    return (this._writer.table || this.unsupport).apply(
      this._writer, arguments);
  }
});