/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 13, 2014
 */

/**
 * @class js.lang.System 
 * @extends {js.lang.Object}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The System class contains several useful class fields and methods. It cannot be instantiated.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Among the facilities provided by the System class are standard input, standard output, and error output streams; access to externally defined properties and environment variables; a means of loading files and libraries; and a utility method for quickly copying a portion of an array.
 * </p>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.System.prototype */ {
  name: "class js.lang.System extends Object",

  /**
   * @name js.lang.System.err
   * @public
   * @static
   * @property {js.io.PrintWriter} 
   * @summary The "standard" error output stream. 
   * @description The "standard" error output stream. This stream is already open and ready to accept output data. Typically this stream corresponds to display output or another output destination specified by the host environment or user. By convention, this output stream is used to display error messages or other information that should come to the immediate attention of a user even if the principal output stream, the value of the variable out, has been redirected to a file or other destination that is typically not continuously monitored.
   */
  "static err": null, // 错误流

  /**
   * @name js.lang.System.out
   * @public
   * @static
   * @property {js.io.PrintWriter} 
   * @summary The "standard" output stream. 
   * @description The "standard" output stream. This stream is already open and ready to accept output data. Typically this stream corresponds to display output or another output destination specified by the host environment or user.
   */
  "static out": null, // 输出流

  "private static properties": {},

  "private static _env": (function() {
    var userAgent = navigator.userAgent,
      ua = userAgent.toLowerCase(),
      check = function(r) {
        return r.test(ua);
      },
      DOC = document,
      docMode = DOC.documentMode,
      isStrict = DOC.compatMode === "CSS1Compat",
      isOpera = check(/opera/),
      isChrome = check(/\bchrome\b/),
      isWebKit = check(/webkit/),
      isSafari = !isChrome && check(/safari/),
      isSafari2 = isSafari && check(/applewebkit\/4/), // unique to Safari 2
      isSafari3 = isSafari && check(/version\/3/),
      isSafari4 = isSafari && check(/version\/4/),
      isIE = !isOpera && check(/msie/),
      isIE7 = isIE && (check(/msie 7/) || docMode === 7),
      isIE8 = isIE && (check(/msie 8/) && docMode !== 7),
      isIE6 = isIE && !isIE7 && !isIE8,
      isGecko = !isWebKit && check(/gecko/),
      isGecko2 = isGecko && check(/rv:1\.8/),
      isGecko3 = isGecko && check(/rv:1\.9/),
      isBorderBox = isIE && !isStrict,
      isWindows = check(/windows|win32/),
      isMac = check(/macintosh|mac os x/),
      isAir = check(/adobeair/),
      isLinux = check(/linux/),
      isSecure = /^https/i.test(location.protocol),
      isIE9 = isIE && (check(/msie 9/) || docMode === 7),
      isIE10 = isIE && (check(/msie 10/) || docMode === 7),
      isIETrident = /(msie\s|trident.*rv:)([\w.]+)/.exec(ua);

    return {
      userAgent: userAgent,
      isStrict: isStrict,
      isOpera: isOpera,
      isChrome: isChrome,
      isWebkit: isWebKit,

      isSafari: isSafari,
      safariVersion: isSafari4 ? '4' : (isSafari3 ? '3' : (isSafari2 ? '2' : null)),

      isIE: isIE || !!isIETrident,
      ieVersion: isIE6 ? '6' : (isIE7 ? '7' : (isIE8 ? '8' : (isIE9 ? '9' : (isIE10 ? '10' : (!!isIETrident && Object.isArray(isIETrident) && isIETrident.length > 2 ? isIETrident[2] : null))))),

      isGecko: isGecko,
      geckoVesion: isGecko3 ? '3' : (isGecko2 ? '2' : (isGecko ? '1' : null)),

      isBorderBox: isBorderBox,
      isWindows: isWindows,
      isMac: isMac,
      isAir: isAir,
      isLinux: isLinux,
      isSecure: isSecure
    };
  })(),

  /**
   * @name js.lang.System.getEnv
   * @function
   * @public
   * @static
   * @summary 
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Gets the value of the specified environment variable, or returns an unmodifiable string map view of the current system environment.
   * </p>
   *
   * @param {js.lang.String} env - Optional. the name of the environment variable
   * @return {js.lang.Object} 
   */
  "static getEnv": function(env) {
    return (env) ? this._env[env] : this._env;
  },

  /**
   * @name js.lang.System.setOut
   * @function
   * @public
   * @static
   * @summary Reassigns the "standard" output stream.
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Reassigns the "standard" output stream.
   * </p>
   *
   * @param {js.io.PrintWriter} out - the new standard output stream 
   */
  "static setOut": function(out) {
    js.lang.System.out = out;
  },

  /**
   * @name js.lang.System.setError
   * @function
   * @public
   * @static
   * @summary Reassigns the "standard" error output stream.
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Reassigns the "standard" error output stream.
   * </p>
   *
   * @param {js.io.PrintWriter} err - the new standard error output stream.
   */
  "static setError": function(err) {
    js.lang.System.err = err;
  },

  /**
   * @name js.lang.System.currentTimeMillis
   * @function
   * @public
   * @static
   * @summary Returns the current time in milliseconds.
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Returns the current time in milliseconds. Note that while the unit of time of the return value is a millisecond, the granularity of the value depends on the underlying operating system and may be larger. For example, many operating systems measure time in units of tens of milliseconds.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;See the description of the class Date for a discussion of slight discrepancies that may arise between "computer time" and coordinated universal time (UTC).
   * </p>
   *
   * @param {Number} the difference, measured in milliseconds, between the current time and midnight, January 1, 1970 UTC.
   */
  "public static currentTimeMillis": function() {
    return new Date().getTime();
  },

  /**
   * @name js.lang.System.arraycopy
   * @function
   * @public
   * @static
   * @summary Copies an array from the specified source array, beginning at the specified position, to the specified position of the destination array.
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Copies an array from the specified source array, beginning at the specified position, to the specified position of the destination array. A subsequence of array components are copied from the source array referenced by src to the destination array referenced by dest. The number of components copied is equal to the length argument. The components at positions srcPos through srcPos+length-1 in the source array are copied into positions destPos through destPos+length-1, respectively, of the destination array.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * If the src and dest arguments refer to the same array object, then the copying is performed as if the components at positions srcPos through srcPos+length-1 were first copied to a temporary array with length components and then the contents of the temporary array were copied into positions destPos through destPos+length-1 of the destination array.
   * </p>
   *
   * @param {Array} src - the source array.
   * @param {Number} srcPos - starting position in the source array.
   * @param {Number} dest - the destination array.
   * @param {Number} destPos - starting position in the destination data.
   * @param {Number} length - the number of array elements to be copied.
   */
  "public static arraycopy": function(src, srcPos, dest, destPos, length) {
    var parameter = Array.prototype.slice.call(src, srcPos, srcPos + length);
    Array.prototype.splice.call(parameter, 0, 0, destPos, 0);
    Array.prototype.splice.apply(dest, parameter);
  },

  /**
   * @name js.lang.System.setProperty
   * @function
   * @public
   * @static
   * @summary Sets the system property indicated by the specified key.
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Sets the system property indicated by the specified key.
   * </p>
   *
   * @param {js.lang.String} key - the name of the system property.
   * @param {js.lang.String} value - the value of the system property.
   */
  "public static setProperty": function(name, value) {
    js.lang.System.properties[name] = value;
  },

  /**
   * @name js.lang.System.getProperty
   * @function
   * @public
   * @static
   * @summary Gets the system property indicated by the specified key.
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Gets the system property indicated by the specified key.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * If there is no current set of system properties, a set of system properties is first created and initialized in the same manner as for the getProperties method.
   * </p>
   *
   * @param {js.lang.String} key - the name of the system property.
   * @return {js.lang.String} the string value of the system property, or null if there is no property with that key.
   */
  "public static getProperty": function(key) {
    return js.lang.System.properties[key];
  },

  /**
   * @name js.lang.System.setProperties
   * @function
   * @public
   * @static
   * @summary Sets the system properties to the Properties argument.
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Sets the system properties to the Properties argument. 
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * The argument becomes the current set of system properties for use by the getProperty(String) method. If the argument is null, then the current set of system properties is forgotten.
   * </p>
   *
   * @param {js.lang.Object} props - the new system properties.
   */
  "public static setProperties": function(props) {
    js.lang.System.properties = props;
  },

  /**
   * @name js.lang.System.getProperties
   * @function
   * @public
   * @static
   * @summary Determines the current system properties.
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Determines the current system properties.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * The current set of system properties for use by the getProperty(String) method is returned as a Properties object. If there is no current set of system properties, a set of system properties is first created and initialized. This set of system properties always includes values for the following keys:
   * <ul>
   * <li>atom.root.dirs - project root path</li>
   * <li>atom.bootstrap.class.path - jre class path</li>
   * <li>js.ext.dirs - List of paths to search when loading libraries</li>
   * <li>js.class.path - project class path</li>
   * <li>js.test.dirs - project test class path</li>
   * <li>css.bootstrap.dirs - jre css path</li>
   * <li>css.ext.dirs - List of css paths to search when loading libraries</li>
   * <li>css.class.path - project css path</li>
   * <li>css.skin.path - project skin path</li>
   * <li>template.bootstrap.dirs - jre template path</li>
   * <li>template.ext.dirs - List of template paths to search when loading libraries</li>
   * <li>template.class.path - project template path</li>
   * <li>main - project main class path</li>
   * <li>debug - project debug switch</li>
   * <li>version - project version</li>
   * <li>loglevel - project log level</li>
   * <li>target - project runtime target</li>
   * <li>servletPath - project servlet path</li>
   * <li>skin - project skin name</li>
   * <li>immediately - if execute main class immediately or not</li>
   * </ul>
   * </p>
   *
   * @return {js.lang.Object} the system properties
   */
  "public static Properties getProperties": function() {
    return js.lang.System.properties;
  }
});