/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 16, 2014
 */
define(function(require, exports, module) {

  require("bootstrap!js.text.Format");

  /** 
   * @abstract
   * @class js.text.DateFormat
   * @extends {js.text.Format}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * DateFormat is an abstract class for date/time formatting subclasses which formats and parses dates or time in a language-independent manner. The date/time formatting subclass, such as SimpleDateFormat, allows for formatting (i.e., date → text), parsing (text → date), and normalization. The date is represented as a Date object or as the milliseconds since January 1, 1970, 00:00:00 GMT.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * DateFormat provides many class methods for obtaining default date/time formatters based on the default or a given locale and a number of formatting styles. The formatting styles include FULL, LONG, MEDIUM, and SHORT. More detail and examples of using these styles are provided in the method descriptions.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * DateFormat helps you to format and parse dates for any locale. Your code can be completely independent of the locale conventions for months, days of the week, or even the calendar format: lunar vs. solar.
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
  return Class.forName( /** @lends js.text.DateFormat.prototype */ {
    name: "abstract class js.text.DateFormat extends js.text.Format",

    '@Gatter @Setter protected calendar': null,

    /** 
     * @name js.text.DateFormat.ERA_FIELD
     * @public
     * @static
     * @constant
     * @property {js.lang.Number} Useful constant for ERA field alignment. Used in FieldPosition of date/time formatting.
     */
    "public final static int ERA_FIELD": 0,

    /** 
     * @name js.text.DateFormat.YEAR_FIELD
     * @public
     * @static
     * @constant
     * @property {js.lang.Number} Useful constant for YEAR field alignment. Used in FieldPosition of date/time formatting.
     */
    "public final static int YEAR_FIELD": 1,

    /** 
     * @name js.text.DateFormat.MONTH_FIELD
     * @public
     * @static
     * @constant
     * @property {js.lang.Number} Useful constant for MONTH field alignment. Used in FieldPosition of date/time formatting.
     */
    "public final static int MONTH_FIELD": 2,

    /** 
     * @name js.text.DateFormat.DATE_FIELD
     * @public
     * @static
     * @constant
     * @property {js.lang.Number} Useful constant for DATE field alignment. Used in FieldPosition of date/time formatting.
     */
    "public final static int DATE_FIELD": 3,

    /** 
     * @name js.text.DateFormat.HOUR_OF_DAY1_FIELD
     * @public
     * @static
     * @constant
     * @property {js.lang.Number} Useful constant for one-based HOUR_OF_DAY field alignment. Used in FieldPosition of date/time formatting. HOUR_OF_DAY1_FIELD is used for the one-based 24-hour clock. For example, 23:59 + 01:00 results in 24:59.
     */
    "public final static int HOUR_OF_DAY1_FIELD": 4,

    /** 
     * @name js.text.DateFormat.HOUR_OF_DAY0_FIELD
     * @public
     * @static
     * @constant
     * @property {js.lang.Number} Useful constant for zero-based HOUR_OF_DAY field alignment. Used in FieldPosition of date/time formatting. HOUR_OF_DAY0_FIELD is used for the zero-based 24-hour clock. For example, 23:59 + 01:00 results in 00:59.
     */
    "public final static int HOUR_OF_DAY0_FIELD": 5,

    /** 
     * @name js.text.DateFormat.MINUTE_FIELD
     * @public
     * @static
     * @constant
     * @property {js.lang.Number} Useful constant for MINUTE field alignment. Used in FieldPosition of date/time formatting.
     */
    "public final static int MINUTE_FIELD": 6,

    /** 
     * @name js.text.DateFormat.SECOND_FIELD
     * @public
     * @static
     * @constant
     * @property {js.lang.Number} Useful constant for SECOND field alignment. Used in FieldPosition of date/time formatting.
     */
    "public final static int SECOND_FIELD": 7,

    /** 
     * @name js.text.DateFormat.MILLISECOND_FIELD
     * @public
     * @static
     * @constant
     * @property {js.lang.Number} Useful constant for MILLISECOND field alignment. Used in FieldPosition of date/time formatting.
     */
    "public final static int MILLISECOND_FIELD": 8,

    /** 
     * @name js.text.DateFormat.DAY_OF_WEEK_FIELD
     * @public
     * @static
     * @constant
     * @property {js.lang.Number} Useful constant for DAY_OF_WEEK field alignment. Used in FieldPosition of date/time formatting.
     */
    "public final static int DAY_OF_WEEK_FIELD": 9,

    /** 
     * @name js.text.DateFormat.DAY_OF_YEAR_FIELD
     * @public
     * @static
     * @constant
     * @property {js.lang.Number} Useful constant for DAY_OF_YEAR field alignment. Used in FieldPosition of date/time formatting.
     */
    "public final static int DAY_OF_YEAR_FIELD": 10,

    /** 
     * @name js.text.DateFormat.DAY_OF_WEEK_IN_MONTH_FIELD
     * @public
     * @static
     * @constant
     * @property {js.lang.Number} Useful constant for DAY_OF_WEEK_IN_MONTH field alignment. Used in FieldPosition of date/time formatting.
     */
    "public final static int DAY_OF_WEEK_IN_MONTH_FIELD": 11,

    /** 
     * @name js.text.DateFormat.WEEK_OF_YEAR_FIELD
     * @public
     * @static
     * @constant
     * @property {js.lang.Number} Useful constant for WEEK_OF_YEAR field alignment. Used in FieldPosition of date/time formatting.
     */
    "public final static int WEEK_OF_YEAR_FIELD": 12,

    /** 
     * @name js.text.DateFormat.WEEK_OF_MONTH_FIELD
     * @public
     * @static
     * @constant
     * @property {js.lang.Number} Useful constant for WEEK_OF_MONTH field alignment. Used in FieldPosition of date/time formatting.
     */
    "public final static int WEEK_OF_MONTH_FIELD": 13,

    /** 
     * @name js.text.DateFormat.AM_PM_FIELD
     * @public
     * @static
     * @constant
     * @property {js.lang.Number} Useful constant for AM_PM field alignment. Used in FieldPosition of date/time formatting.
     */
    "public final static int AM_PM_FIELD": 14,

    /** 
     * @name js.text.DateFormat.HOUR1_FIELD
     * @public
     * @static
     * @constant
     * @property {js.lang.Number} Useful constant for one-based HOUR field alignment. Used in FieldPosition of date/time formatting. HOUR1_FIELD is used for the one-based 12-hour clock. For example, 11:30 PM + 1 hour results in 12:30 AM.
     */
    "public final static int HOUR1_FIELD": 15,

    /** 
     * @name js.text.DateFormat.HOUR0_FIELD
     * @public
     * @static
     * @constant
     * @property {js.lang.Number} Useful constant for zero-based HOUR field alignment. Used in FieldPosition of date/time formatting. HOUR0_FIELD is used for the zero-based 12-hour clock. For example, 11:30 PM + 1 hour results in 00:30 AM.
     */
    "public final static int HOUR0_FIELD": 16,

    /** 
     * @name js.text.DateFormat.TIMEZONE_FIELD
     * @public
     * @static
     * @constant
     * @property {js.lang.Number} Useful constant for TIMEZONE field alignment. Used in FieldPosition of date/time formatting.
     */
    "public final static int TIMEZONE_FIELD": 17,

    DateFormat: function() {},

    /** 
     * @function
     * @public 
     * @summary Formats a Date into a date/time string.
     * @description Formats a Date into a date/time string.
     *
     * @param {js.util.Date|js.lang.Number} date - the time value to be formatted into a time string.
     * @return {js.lang.String} the formatted time string.
     */
    'final format': function(obj) {

      if (Object.isDate(obj))
        return this.formatDate(obj).toString();
      else if (Object.isNumber(obj))
        return this.formatDate(new Date(obj)).toString();
      else
        throw new js.lang.IllegalArgumentException(
          "Cannot format given Object as a Date");
    },

    /** 格式化一个对象以生成一个字符串。 */
    'abstract formatDate': function(date) {},

    /** 
     * @function
     * @public 
     * @abstract
     * @summary Parses text from the beginning of the given string to produce a date.
     * @description Parses text from the beginning of the given string to produce a date.
     *
     * @param {js.lang.String} source - A String whose beginning should be parsed.
     * @return {js.util.Date} A Date parsed from the string.
     */
    'abstract parse': function(source) {}

  }).getClassConstructor();
});