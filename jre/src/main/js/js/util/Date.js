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
   * @class js.util.Date
   * @extends {js.lang.Object}
   * @alias Date
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * The class Date represents a specific instant in time, with millisecond precision.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * The class Date had two additional functions. It allowed the interpretation of dates as year, month, day, hour, minute, and second values. It also allowed the formatting and parsing of date strings. Unfortunately, the API for these functions was not amenable to internationalization. The Calendar class should be used to convert between dates and time fields and the DateFormat class should be used to format and parse date strings. The corresponding methods in Date are deprecated.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Although the Date class is intended to reflect coordinated universal time (UTC), it may not do so exactly, depending on the host environment of the Java Virtual Machine. Nearly all modern operating systems assume that 1 day = 24 × 60 × 60 = 86400 seconds in all cases. In UTC, however, about once every year or two there is an extra second, called a "leap second." The leap second is always added as the last second of the day, and always on December 31 or June 30. For example, the last minute of the year 1995 was 61 seconds long, thanks to an added leap second. Most computer clocks are not accurate enough to be able to reflect the leap-second distinction.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Creates a JavaScript Date instance that represents a single moment in time. Date objects are based on a time value that is the number of milliseconds since 1 January, 1970 UTC.
   * </p><p><ul>
   * <li>If no arguments are provided, the constructor creates a JavaScript Date object for the current date and time according to system settings.</li>
   * <li>If at least two arguments are supplied, missing arguments are either set to 1 (if day is missing) or 0 for all others.</li>
   * <li>The JavaScript date is based on a time value that is milliseconds since midnight 01 January, 1970 UTC. A day holds 86,400,000 milliseconds. The JavaScript Date object range is -100,000,000 days to 100,000,000 days relative to 01 January, 1970 UTC.</li>
   * <li>The JavaScript Date object provides uniform behavior across platforms. The time value can be passed between systems to represent the same moment in time and if used to create a local date object, will reflect the local equivalent of the time.</li>
   * <li>The JavaScript Date object supports a number of UTC (universal) methods, as well as local time methods. UTC, also known as Greenwich Mean Time (GMT), refers to the time as set by the World Time Standard. The local time is the time known to the computer where JavaScript is executed.</li>
   * <li>Invoking JavaScript Date as a function (i.e., without the new operator) will return a string representing the current date and time.</li>
   * </ul></p>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
  return Class.forName( /** @lends js.util.Date.prototype */ {
    name: "class Date",
    alias: "js.util.Date",
    Date: function() {},

    /** 
     * @function
     * @public 
     * @summary Compares two dates for equality.
     * @description Compares two dates for equality. The result is true if and only if the argument is not null and is a Date object that represents the same point in time, to the millisecond, as this object. Thus, two Date objects are equal if and only if the getTime method returns the same long value for both.
     *
     * @param {js.lang.Object} obj - the object to compare with.
     * @return {js.lang.Boolean} true if the objects are the same; false otherwise.
     */
    "public equals": function(s) {
      if (Object.isNull(s) || !Object.isInstanceof(s, js.util.Date)) {
        return false;
      }
      return this === s || this.getTime() == s.getTime();
    },

    /** 
     * @function
     * @public 
     * @summary Tests if this date is after the specified date.
     * @description Tests if this date is after the specified date.
     *
     * @param {js.util.Date} when - a date.
     * @return {js.lang.Boolean} true if and only if the instant represented by this Date object is strictly later than the instant represented by when; false otherwise.
     */
    "public after": function(when) {
      return this.compareTo(when) > 0;
    },

    /** 
     * @function
     * @public 
     * @summary Tests if this date is before the specified date.
     * @description Tests if this date is before the specified date.
     *
     * @param {js.util.Date} when - a date.
     * @return {js.lang.Boolean} true if and only if the instant of time represented by this Date object is strictly earlier than the instant represented by when; false otherwise.
     */
    "public before": function(when) {
      return this.compareTo(when) < 0;
    },

    /** 
     * @function
     * @public 
     * @summary Compares two Dates for ordering.
     * @description Compares two Dates for ordering.
     *
     * @param {js.util.Date} anotherDate - the Date to be compared.
     * @return {js.lang.Number} the value 0 if the argument Date is equal to this Date; a value less than 0 if this Date is before the Date argument; and a value greater than 0 if this Date is after the Date argument.
     */
    "public compareTo": function(anotherDate) {
      if (Object.isNull(anotherDate)) {
        throw new js.lang.IllegalArgumentException("Parameters of the compareTo method of the Date object to receive only not null type");
      }
      if (!Object.isDate(anotherDate)) {
        throw new js.lang.IllegalArgumentException("Parameters of the compareTo method of the Date object to receive only Date type");
      }
      var thisTime = this.getTime(),
        anotherTime = anotherDate.getTime();
      return thisTime > anotherTime ? 1 : thisTime == anotherTime ? 0 : -1;
    }

  }).getClassConstructor();
});