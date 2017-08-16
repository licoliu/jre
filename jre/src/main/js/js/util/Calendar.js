/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Sep 23, 2014
 */
define(function(require, exports, module) {

  /** 
   * @abstract
   * @class js.util.Calendar
   * @extends {js.lang.Object}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * The Calendar class is an abstract class that provides methods for converting between a specific instant in time and a set of calendar fields such as YEAR, MONTH, DAY_OF_MONTH, HOUR, and so on, and for manipulating the calendar fields, such as getting the date of the next week. An instant in time can be represented by a millisecond value that is an offset from the Epoch, January 1, 1970 00:00:00.000 GMT (Gregorian).
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * The class also provides additional fields and methods for implementing a concrete calendar system outside the package. Those fields and methods are defined as protected.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Like other locale-sensitive classes, Calendar provides a class method, getInstance, for getting a generally useful object of this type. Calendar's getInstance method returns a Calendar object whose calendar fields have been initialized with the current date and time:
   * <code>
   *      Calendar rightNow = Calendar.getInstance();
   * </code>
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * A Calendar object can produce all the calendar field values needed to implement the date-time formatting for a particular language and calendar style (for example, Japanese-Gregorian, Japanese-Traditional). Calendar defines the range of values returned by certain calendar fields, as well as their meaning. For example, the first month of the calendar system has value MONTH == JANUARY for all calendars. Other values are defined by the concrete subclass, such as ERA. See individual field documentation and subclass documentation for details.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Getting and Setting Calendar Field Values
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * The calendar field values can be set by calling the set methods. Any field values set in a Calendar will not be interpreted until it needs to calculate its time value (milliseconds from the Epoch) or values of the calendar fields. Calling the get, getTimeInMillis, getTime, add and roll involves such calculation.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Leniency
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Calendar has two modes for interpreting the calendar fields, lenient and non-lenient. When a Calendar is in lenient mode, it accepts a wider range of calendar field values than it produces. When a Calendar recomputes calendar field values for return by get(), all of the calendar fields are normalized. For example, a lenient GregorianCalendar interprets MONTH == JANUARY, DAY_OF_MONTH == 32 as February 1.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * When a Calendar is in non-lenient mode, it throws an exception if there is any inconsistency in its calendar fields. For example, a GregorianCalendar always produces DAY_OF_MONTH values between 1 and the length of the month. A non-lenient GregorianCalendar throws an exception upon calculating its time or calendar field values if any out-of-range field value has been set.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * First Week
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Calendar defines a locale-specific seven day week using two parameters: the first day of the week and the minimal days in first week (from 1 to 7). These numbers are taken from the locale resource data when a Calendar is constructed. They may also be specified explicitly through the methods for setting their values.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * When setting or getting the WEEK_OF_MONTH or WEEK_OF_YEAR fields, Calendar must determine the first week of the month or year as a reference point. The first week of a month or year is defined as the earliest seven day period beginning on getFirstDayOfWeek() and containing at least getMinimalDaysInFirstWeek() days of that month or year. Weeks numbered ..., -1, 0 precede the first week; weeks numbered 2, 3,... follow it. Note that the normalized numbering returned by get() may be different. For example, a specific Calendar subclass may designate the week before week 1 of a year as week n of the previous year.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Calendar Fields Resolution
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * When computing a date and time from the calendar fields, there may be insufficient information for the computation (such as only year and month with no day of month), or there may be inconsistent information (such as Tuesday, July 15, 1996 (Gregorian) -- July 15, 1996 is actually a Monday). Calendar will resolve calendar field values to determine the date and time in the following way.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * If there is any conflict in calendar field values, Calendar gives priorities to calendar fields that have been set more recently. The following are the default combinations of the calendar fields. The most recent combination, as determined by the most recently set single field, will be used.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * For the date fields:
   *  YEAR + MONTH + DAY_OF_MONTH
   *  YEAR + MONTH + WEEK_OF_MONTH + DAY_OF_WEEK
   *  YEAR + MONTH + DAY_OF_WEEK_IN_MONTH + DAY_OF_WEEK
   *  YEAR + DAY_OF_YEAR
   *  YEAR + DAY_OF_WEEK + WEEK_OF_YEAR
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * For the time of day fields:
   *  HOUR_OF_DAY
   *  AM_PM + HOUR
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp; 
   * If there are any calendar fields whose values haven't been set in the selected field combination, Calendar uses their default values. The default value of each field may vary by concrete calendar systems. For example, in GregorianCalendar, the default of a field is the same as that of the start of the Epoch: i.e., YEAR = 1970, MONTH = JANUARY, DAY_OF_MONTH = 1, etc.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Note: There are certain possible ambiguities in interpretation of certain singular times, which are resolved in the following ways:
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * 23:59 is the last minute of the day and 00:00 is the first minute of the next day. Thus, 23:59 on Dec 31, 1999 < 00:00 on Jan 1, 2000 < 00:01 on Jan 1, 2000.
   * Although historically not precise, midnight also belongs to "am", and noon belongs to "pm", so on the same day, 12:00 am (midnight) < 12:01 am, and 12:00 pm (noon) < 12:01 pm
   * The date or time format strings are not part of the definition of a calendar, as those must be modifiable or overridable by the user at runtime. Use DateFormat to format dates.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Field Manipulation
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * The calendar fields can be changed using three methods: set(), add(), and roll().
   * set(f, value) changes calendar field f to value. In addition, it sets an internal member variable to indicate that calendar field f has been changed. Although calendar field f is changed immediately, the calendar's time value in milliseconds is not recomputed until the next call to get(), getTime(), getTimeInMillis(), add(), or roll() is made. Thus, multiple calls to set() do not trigger multiple, unnecessary computations. As a result of changing a calendar field using set(), other calendar fields may also change, depending on the calendar field, the calendar field value, and the calendar system. In addition, get(f) will not necessarily return value set by the call to the set method after the calendar fields have been recomputed. The specifics are determined by the concrete calendar class.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Example: Consider a GregorianCalendar originally set to August 31, 1999. Calling set(Calendar.MONTH, Calendar.SEPTEMBER) sets the date to September 31, 1999. This is a temporary internal representation that resolves to October 1, 1999 if getTime()is then called. However, a call to set(Calendar.DAY_OF_MONTH, 30) before the call to getTime() sets the date to September 30, 1999, since no recomputation occurs after set() itself.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * add(f, delta) adds delta to field f. This is equivalent to calling set(f, get(f) + delta) with two adjustments:
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Add rule 1. The value of field f after the call minus the value of field f before the call is delta, modulo any overflow that has occurred in field f. Overflow occurs when a field value exceeds its range and, as a result, the next larger field is incremented or decremented and the field value is adjusted back into its range.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Add rule 2. If a smaller field is expected to be invariant, but it is impossible for it to be equal to its prior value because of changes in its minimum or maximum after field f is changed or other constraints, such as time zone offset changes, then its value is adjusted to be as close as possible to its expected value. A smaller field represents a smaller unit of time. HOUR is a smaller field than DAY_OF_MONTH. No adjustment is made to smaller fields that are not expected to be invariant. The calendar system determines what fields are expected to be invariant.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * In addition, unlike set(), add() forces an immediate recomputation of the calendar's milliseconds and all fields.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Example: Consider a GregorianCalendar originally set to August 31, 1999. Calling add(Calendar.MONTH, 13) sets the calendar to September 30, 2000. Add rule 1 sets the MONTH field to September, since adding 13 months to August gives September of the next year. Since DAY_OF_MONTH cannot be 31 in September in a GregorianCalendar, add rule 2 sets the DAY_OF_MONTH to 30, the closest possible value. Although it is a smaller field, DAY_OF_WEEK is not adjusted by rule 2, since it is expected to change when the month changes in a GregorianCalendar.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * roll(f, delta) adds delta to field f without changing larger fields. This is equivalent to calling add(f, delta) with the following adjustment:
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Roll rule. Larger fields are unchanged after the call. A larger field represents a larger unit of time. DAY_OF_MONTH is a larger field than HOUR.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Example: See GregorianCalendar.roll(int, int).
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Usage model. To motivate the behavior of add() and roll(), consider a user interface component with increment and decrement buttons for the month, day, and year, and an underlying GregorianCalendar. If the interface reads January 31, 1999 and the user presses the month increment button, what should it read? If the underlying implementation uses set(), it might read March 3, 1999. A better result would be February 28, 1999. Furthermore, if the user presses the month increment button again, it should read March 31, 1999, not March 28, 1999. By saving the original date and using either add() or roll(), depending on whether larger fields should be affected, the user interface can behave as most users will intuitively expect. 
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
  return Class
    .forName( /** @lends js.util.Calendar.prototype */ {
      name: "abstract class js.util.Calendar extends Object",

      "private static final FIELD_NAMES": ["ERA", "YEAR",
        "MONTH", "WEEK_OF_YEAR", "WEEK_OF_MONTH", "DAY_OF_MONTH",
        "DAY_OF_YEAR", "DAY_OF_WEEK", "DAY_OF_WEEK_IN_MONTH",
        "AM_PM", "HOUR", "HOUR_OF_DAY", "MINUTE", "SECOND",
        "MILLISECOND", "ZONE_OFFSET", "DST_OFFSET"
      ],

      /** 
       * @name js.util.Calendar.YEAR
       * @public
       * @static
       * @constant
       * @property {js.lang.Number} Field number for get and set indicating the year.
       */
      "public final static YEAR": 1,

      /** 
       * @name js.util.Calendar.MONTH
       * @public
       * @static
       * @constant
       * @property {js.lang.Number} Field number for <code>get</code> and <code>set</code> indicating the month. This is a calendar-specific value. The first month of the year in the Gregorian and Julian calendars is <code>JANUARY</code> which is 0, the last depends on the number of months in a year.
       *
       * @see #JANUARY
       * @see #FEBRUARY
       * @see #MARCH
       * @see #APRIL
       * @see #MAY
       * @see #JUNE
       * @see #JULY
       * @see #AUGUST
       * @see #SEPTEMBER
       * @see #OCTOBER
       * @see #NOVEMBER
       * @see #DECEMBER
       * @see #UNDECIMBER
       */
      "public final static MONTH": 2,

      /** 
       * @name js.util.Calendar.WEEK_OF_YEAR
       * @public
       * @static
       * @constant
       * @property {js.lang.Number} Field number for <code>get</code> and <code>set</code> indicating the week number within the current year. The first week of the year, as defined by <code>getFirstDayOfWeek()</code> and <code>getMinimalDaysInFirstWeek()</code>, has value 1. Subclasses define the value of <code>WEEK_OF_YEAR</code> for days before the first week of the year.
       *
       * @see #getFirstDayOfWeek
       * @see #getMinimalDaysInFirstWeek
       */
      "public final static WEEK_OF_YEAR": 3,

      /** 
       * @name js.util.Calendar.WEEK_OF_MONTH
       * @public
       * @static
       * @constant
       * @property {js.lang.Number} Field number for <code>get</code> and <code>set</code> indicating the week number within the current month. The first week of the month, as defined by <code>getFirstDayOfWeek()</code> and <code>getMinimalDaysInFirstWeek()</code>, has value 1. Subclasses define the value of <code>WEEK_OF_MONTH</code> for days before the first week of the month.
       *
       * @see #getFirstDayOfWeek
       * @see #getMinimalDaysInFirstWeek
       */
      "public final static WEEK_OF_MONTH": 4,

      /** 
       * @name js.util.Calendar.DATE
       * @public
       * @static
       * @constant
       * @property {js.lang.Number} Field number for <code>get</code> and <code>set</code> indicating the day of the month. This is a synonym for <code>DAY_OF_MONTH</code>. The first day of the month has value 1.
       *
       * @see #DAY_OF_MONTH
       */
      "public final static DATE": 5,

      /** 
       * @name js.util.Calendar.DAY_OF_MONTH
       * @public
       * @static
       * @constant
       * @property {js.lang.Number} Field number for <code>get</code> and <code>set</code> indicating the day of the month. This is a synonym for <code>DATE</code>. The first day of the month has value 1.
       *
       * @see #DATE
       */
      "public final static DAY_OF_MONTH": 5,

      /** 
       * @name js.util.Calendar.DAY_OF_YEAR
       * @public
       * @static
       * @constant
       * @property {js.lang.Number} Field number for <code>get</code> and <code>set</code> indicating the day number within the current year. The first day of the year has value 1.
       */
      "public final static DAY_OF_YEAR": 6,

      /** 
       * @name js.util.Calendar.DAY_OF_WEEK
       * @public
       * @static
       * @constant
       * @property {js.lang.Number} Field number for <code>get</code> and <code>set</code> indicating the day of the week. This field takes values <code>SUNDAY</code>, <code>MONDAY</code>, <code>TUESDAY</code>, <code>WEDNESDAY</code>, <code>THURSDAY</code>, <code>FRIDAY</code>, and <code>SATURDAY</code>.
       *
       * @see #SUNDAY
       * @see #MONDAY
       * @see #TUESDAY
       * @see #WEDNESDAY
       * @see #THURSDAY
       * @see #FRIDAY
       * @see #SATURDAY
       */
      "public final static DAY_OF_WEEK": 7,

      /** 
       * @name js.util.Calendar.DAY_OF_WEEK_IN_MONTH
       * @public
       * @static
       * @constant
       * @property {js.lang.Number} * Field number for <code>get</code> and <code>set</code>
       * indicating the ordinal number of the day of the week within the
       * current month. Together with the <code>DAY_OF_WEEK</code>
       * field, this uniquely specifies a day within a month. Unlike
       * <code>WEEK_OF_MONTH</code> and <code>WEEK_OF_YEAR</code>,
       * this field's value does <em>not</em> depend on
       * <code>getFirstDayOfWeek()</code> or
       * <code>getMinimalDaysInFirstWeek()</code>.
       * <code>DAY_OF_MONTH 1</code> through <code>7</code> always
       * correspond to <code>DAY_OF_WEEK_IN_MONTH
       * 1</code>,
       * <code>8</code> through <code>14</code> correspond to
       * <code>DAY_OF_WEEK_IN_MONTH 2</code>, and so on.
       * <code>DAY_OF_WEEK_IN_MONTH 0</code> indicates the week before
       * <code>DAY_OF_WEEK_IN_MONTH 1</code>. Negative values count
       * back from the end of the month, so the last Sunday of a month is
       * specified as
       * <code>DAY_OF_WEEK = SUNDAY, DAY_OF_WEEK_IN_MONTH = -1</code>.
       * Because negative values count backward they will usually be
       * aligned differently within the month than positive values. For
       * example, if a month has 31 days,
       * <code>DAY_OF_WEEK_IN_MONTH -1</code> will overlap
       * <code>DAY_OF_WEEK_IN_MONTH 5</code> and the end of
       * <code>4</code>.
       *
       * @see #DAY_OF_WEEK
       * @see #WEEK_OF_MONTH
       */
      "public final static DAY_OF_WEEK_IN_MONTH": 8,

      /** 
       * @name js.util.Calendar.AM_PM
       * @public
       * @static
       * @constant
       * @property {js.lang.Number} Field number for <code>get</code> and <code>set</code> indicating whether the <code>HOUR</code> is before or after noon. E.g., at 10:04:15.250 PM the <code>AM_PM</code> is <code>PM</code>.
       *
       * @see #AM
       * @see #PM
       * @see #HOUR
       */
      "public final static AM_PM": 9,

      /** 
       * @name js.util.Calendar.HOUR
       * @public
       * @static
       * @constant
       * @property {js.lang.Number} Field number for <code>get</code> and <code>set</code> indicating the hour of the morning or afternoon. <code>HOUR</code> is used for the 12-hour clock (0 - 11). Noon and midnight are represented by 0, not by 12. E.g., at 10:04:15.250 PM the <code>HOUR</code> is 10.
       *
       * @see #AM_PM
       * @see #HOUR_OF_DAY
       */
      "public final static HOUR": 10,

      /** 
       * @name js.util.Calendar.HOUR_OF_DAY
       * @public
       * @static
       * @constant
       * @property {js.lang.Number} Field number for <code>get</code> and <code>set</code> indicating the hour of the day. <code>HOUR_OF_DAY</code> is used for the 24-hour clock. E.g., at 10:04:15.250 PM the <code>HOUR_OF_DAY</code> is 22.
       *
       * @see #HOUR
       */
      "public final static HOUR_OF_DAY": 11,

      /** 
       * @name js.util.Calendar.MINUTE
       * @public
       * @static
       * @constant
       * @property {js.lang.Number} Field number for <code>get</code> and <code>set</code> indicating the minute within the hour. E.g., at 10:04:15.250 PM the <code>MINUTE</code> is 4.
       */
      "public final static MINUTE": 12,

      /** 
       * @name js.util.Calendar.SECOND
       * @public
       * @static
       * @constant
       * @property {js.lang.Number} Field number for <code>get</code> and <code>set</code> indicating the second within the minute. E.g., at 10:04:15.250 PM the <code>SECOND</code> is 15.
       */
      "public final static SECOND": 13,

      /** 
       * @name js.util.Calendar.MILLISECOND
       * @public
       * @static
       * @constant
       * @property {js.lang.Number} Field number for <code>get</code> and <code>set</code> indicating the millisecond within the second. E.g., at 10:04:15.250 PM the <code>MILLISECOND</code> is 250.
       */
      "public final static MILLISECOND": 14,

      /** 
       * @name js.util.Calendar.ZONE_OFFSET
       * @public
       * @static
       * @constant
       * @property {js.lang.Number} Field number for <code>get</code> and <code>set</code> indicating the raw offset from GMT in milliseconds. This field reflects the correct GMT offset value of the time zone of this <code>Calendar</code> if the <code>TimeZone</code> implementation subclass supports historical GMT offset changes.
       */
      "public final static ZONE_OFFSET": 15,

      /** 
       * @name js.util.Calendar.DST_OFFSET
       * @public
       * @static
       * @constant
       * @property {js.lang.Number} Field number for <code>get</code> and <code>set</code> indicating the daylight saving offset in milliseconds. This field reflects the correct daylight saving offset value of the time zone of this <code>Calendar</code> if the <code>TimeZone</code> implementation subclass supports historical Daylight Saving Time schedule changes.
       */
      "public final static DST_OFFSET": 16,

      /** 
       * @name js.util.Calendar.FIELD_COUNT
       * @public
       * @static
       * @constant
       * @property {js.lang.Number} The number of distinct fields recognized by <code>get</code> and <code>set</code>. Field numbers range from <code>0..FIELD_COUNT-1</code>.
       */
      "public final static FIELD_COUNT": 17,

      /** 
       * @name js.util.Calendar.SUNDAY
       * @public
       * @static
       * @constant
       * @property {js.lang.Number} Value of the {@link #DAY_OF_WEEK} field indicating Sunday.
       */
      "public final static SUNDAY": 1,

      /** 
       * @name js.util.Calendar.MONDAY
       * @public
       * @static
       * @constant
       * @property {js.lang.Number} Value of the {@link #DAY_OF_WEEK} field indicating Monday.
       */
      "public final static MONDAY": 2,

      /** 
       * @name js.util.Calendar.TUESDAY
       * @public
       * @static
       * @constant
       * @property {js.lang.Number} Value of the {@link #DAY_OF_WEEK} field indicating Tuesday.
       */
      "public final static TUESDAY": 3,

      /** 
       * @name js.util.Calendar.WEDNESDAY
       * @public
       * @static
       * @constant
       * @property {js.lang.Number} Value of the {@link #DAY_OF_WEEK} field indicating Wednesday.
       */
      "public final static WEDNESDAY": 4,

      /** 
       * @name js.util.Calendar.THURSDAY
       * @public
       * @static
       * @constant
       * @property {js.lang.Number} Value of the {@link #DAY_OF_WEEK} field indicating Thursday.
       */
      "public final static THURSDAY": 5,

      /** 
       * @name js.util.Calendar.FRIDAY
       * @public
       * @static
       * @constant
       * @property {js.lang.Number} Value of the {@link #DAY_OF_WEEK} field indicating Friday.
       */
      "public final static FRIDAY": 6,

      /** 
       * @name js.util.Calendar.SATURDAY
       * @public
       * @static
       * @constant
       * @property {js.lang.Number} Value of the {@link #DAY_OF_WEEK} field indicating Saturday.
       */
      "public final static SATURDAY": 7,

      /** 
       * @name js.util.Calendar.JANUARY
       * @public
       * @static
       * @constant
       * @property {js.lang.Number} Value of the {@link #MONTH} field indicating the first month of the year in the Gregorian and Julian calendars.
       */
      "public final static JANUARY": 0,

      /** 
       * @name js.util.Calendar.FEBRUARY
       * @public
       * @static
       * @constant
       * @property {js.lang.Number} Value of the {@link #MONTH} field indicating the second month of the year in the Gregorian and Julian calendars.
       */
      "public final static FEBRUARY": 1,

      /** 
       * @name js.util.Calendar.MARCH
       * @public
       * @static
       * @constant
       * @property {js.lang.Number} Value of the {@link #MONTH} field indicating the third month of the year in the Gregorian and Julian calendars.
       */
      "public final static MARCH": 2,

      /** 
       * @name js.util.Calendar.APRIL
       * @public
       * @static
       * @constant
       * @property {js.lang.Number} Value of the {@link #MONTH} field indicating the fourth month of the year in the Gregorian and Julian calendars.
       */
      "public final static APRIL": 3,

      /** 
       * @name js.util.Calendar.MAY
       * @public
       * @static
       * @constant
       * @property {js.lang.Number} Value of the {@link #MONTH} field indicating the fifth month of the year in the Gregorian and Julian calendars.
       */
      "public final static MAY": 4,

      /** 
       * @name js.util.Calendar.JUNE
       * @public
       * @static
       * @constant
       * @property {js.lang.Number} Value of the {@link #MONTH} field indicating the sixth month of the year in the Gregorian and Julian calendars.
       */
      "public final static JUNE": 5,

      /** 
       * @name js.util.Calendar.JULY
       * @public
       * @static
       * @constant
       * @property {js.lang.Number} Value of the {@link #MONTH} field indicating the seventh month of the year in the Gregorian and Julian calendars.
       */
      "public final static JULY": 6,

      /** 
       * @name js.util.Calendar.AUGUST
       * @public
       * @static
       * @constant
       * @property {js.lang.Number} Value of the {@link #MONTH} field indicating the eighth month of the year in the Gregorian and Julian calendars.
       */
      "public final static AUGUST": 7,

      /** 
       * @name js.util.Calendar.SEPTEMBER
       * @public
       * @static
       * @constant
       * @property {js.lang.Number} Value of the {@link #MONTH} field indicating the ninth month of the year in the Gregorian and Julian calendars.
       */
      "public final static SEPTEMBER": 8,

      /** 
       * @name js.util.Calendar.OCTOBER
       * @public
       * @static
       * @constant
       * @property {js.lang.Number} Value of the {@link #MONTH} field indicating the tenth month of the year in the Gregorian and Julian calendars.
       */
      "public final static OCTOBER": 9,

      /** 
       * @name js.util.Calendar.NOVEMBER
       * @public
       * @static
       * @constant
       * @property {js.lang.Number} Value of the {@link #MONTH} field indicating the eleventh month of the year in the Gregorian and Julian calendars.
       */
      "public final static NOVEMBER": 10,

      /** 
       * @name js.util.Calendar.DECEMBER
       * @public
       * @static
       * @constant
       * @property {js.lang.Number} Value of the {@link #MONTH} field indicating the twelfth month of the year in the Gregorian and Julian calendars.
       */
      "public final static DECEMBER": 11,

      /** 
       * @name js.util.Calendar.UNDECIMBER
       * @public
       * @static
       * @constant
       * @property {js.lang.Number} Value of the {@link #MONTH} field indicating the thirteenth month of the year. Although <code>GregorianCalendar</code> does not use this value, lunar calendars do.
       */
      "public final static UNDECIMBER": 12,

      /** 
       * @name js.util.Calendar.AM
       * @public
       * @static
       * @constant
       * @property {js.lang.Number} Value of the {@link #AM_PM} field indicating the period of the day from midnight to just before noon.
       */
      "public final static AM": 0,

      /** 
       * @name js.util.Calendar.PM
       * @public
       * @static
       * @constant
       * @property {js.lang.Number} Value of the {@link #AM_PM} field indicating the period of the day from noon to just before midnight.
       */
      "public final static PM": 1,

      /**
       * @protected
       * @property {js.lang.Array} The calendar field values for the currently set time for this calendar. This is an array of <code>FIELD_COUNT</code> integers, with index values <code>ERA</code> through <code>DST_OFFSET</code>.
       * @serial
       */
      "protected fields": [],

      /**
       * The flags which tell if a specified calendar field for the
       * calendar is set. A new object has no fields set. After the first
       * call to a method which generates the fields, they all remain set
       * after that. This is an array of <code>FIELD_COUNT</code>
       * booleans, with index values <code>ERA</code> through
       * <code>DST_OFFSET</code>.
       *
       * @serial
       */
      "protected isFieldsSet": [],

      /**
       * Pseudo-time-stamps which specify when each field was set. There
       * are two special values, UNSET and COMPUTED. Values from
       * MINIMUM_USER_SET to Integer.MAX_VALUE are legal user set values.
       */
      "transient private int stamp": [],

      "protected time": 0,
      "protected isTimeSet": false,

      "protected areFieldsSet": false,

      /**
       * True if all fields have been set.
       *
       * @serial
       */
      "protected areAllFieldsSet": false,

      Calendar: function() {
        this.fields = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0
        ];
        this.stamp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0
        ];
        this.isFieldsSet = [false, false, false, false, false, false,
          false, false, false, false, false, false, false, false,
          false, false, false
        ];
      },

      /** 
       * @name js.util.Calendar.prototype.add
       * @function
       * @abstract 
       * @public 
       * @summary Adds or subtracts the specified amount of time to the given calendar field, based on the calendar's rules.
       * @description Adds or subtracts the specified amount of time to the given calendar field, based on the calendar's rules. For example, to subtract 5 days from the current time of the calendar, you can achieve it by calling:
       *
       * @param {js.lang.Number} field - the calendar field.
       * @param {js.lang.Number} amount - the amount of date or time to be added to the field.
       */
      "abstract add": function(field, amount) {},

      /** 
       * @function
       * @public 
       * @summary Returns whether this Calendar represents a time after the time represented by the specified Object.
       * @description 
       * <p>
       * Returns whether this Calendar represents a time after the time represented by the specified Object. This method is equivalent to:
       * </p><p>
       *          compareTo(when) > 0
       *  </p><p>
       * if and only if when is a Calendar instance. Otherwise, the method returns false.
       * </p>
       *
       * @param {js.lang.Object} when - the Object to be compared
       * @return {js.lang.Boolean} true if the time of this Calendar is after the time represented by when; false otherwise.
       */
      "after": function(when) {
        return this.compareTo(when) > 0;
      },

      /** 
       * @function
       * @public 
       * @summary Returns whether this Calendar represents a time before the time represented by the specified Object.
       * @description 
       * <p>
       * Returns whether this Calendar represents a time after the time represented by the specified Object. This method is equivalent to:
       * </p><p>
       *          compareTo(when) < 0
       * </p><p>
       * if and only if when is a Calendar instance. Otherwise, the method returns false.
       * </p>
       *
       * @param {js.lang.Object} when - the Object to be compared
       * @return {js.lang.Boolean} true if the time of this Calendar is before the time represented by when; false otherwise.
       */
      "before": function(when) {
        return this.compareTo(when) < 0;
      },

      /** 
       * @function
       * @public 
       * @summary Sets all the calendar field values and the time value (millisecond offset from the Epoch) of this Calendar undefined.
       * @description Sets all the calendar field values and the time value (millisecond offset from the Epoch) of this Calendar undefined. This means that isSet() will return false for all the calendar fields, and the date and time calculations will treat the fields as if they had never been set. A Calendar implementation class may use its specific default field values for date/time calculations. For example, GregorianCalendar uses 1970 if the YEAR field value is undefined.
       */
      "clear": function(field) {
        if (field) {
          this.fields[field] = 0;
          this.isFieldsSet[field] = false;
          this.stamp[field] = 0;
          this.areAllFieldsSet = this.areFieldsSet = false;
          this.isTimeSet = false;
        } else {
          for (var i = 0; i < this.fields.length;) {
            this.fields[i] = 0;
            this.stamp[i] = 0; // UNSET == 0
            this.isFieldsSet[i++] = false;
          }
          this.areAllFieldsSet = this.areFieldsSet = false;
          this.isTimeSet = false;
        }

      },

      /** 
       * @function
       * @public 
       * @summary Creates and returns a copy of this object.
       * @description Creates and returns a copy of this object.
       *
       * @return {js.util.Calendar} a copy of this object
       */
      "clone": function() {
        var other = this.getClass().newInstance(),
          Calendar = js.util.Calendar,
          names = Calendar.FIELD_NAMES,
          len = names.length;

        for (var i = 0; i < len; i++) {
          other.fields[i] = this.fields[i];
          other.stamp[i] = this.stamp[i];
          other.isFieldsSet[i] = this.isFieldsSet[i];
        }

        other.time = this.time;
        return other;
      },

      /** 
       * @function
       * @public 
       * @summary Compares the time values (millisecond offsets from the Epoch) represented by two Calendar objects.
       * @description Compares the time values (millisecond offsets from the Epoch) represented by two Calendar objects.
       *
       * @param {js.util.Calendar} anotherCalendar - the Calendar to be compared.
       * @return {js.lang.Boolean} the value 0 if the time represented by the argument is equal to the time represented by this Calendar; a value less than 0 if the time of this Calendar is before the time represented by the argument; and a value greater than 0 if the time of this Calendar is after the time represented by the argument.
       */
      "compareTo": function(anotherCalendar) {
        if (!Object.isInstanceof(anotherCalendar, js.util.Calendar)) {
          throw new js.lang.IllegalArgumentException(
            "Parameters of the compareTo method of the js.util.Calendar object to receive only js.util.Calendar type");
        }
        var anotherTime = anotherCalendar.getTimeInMillis();

        return this.time > anotherTime ? 1 : (this.time == anotherTime ? 0 : -1);
      },

      /** 
       * @function
       * @public 
       * @summary Compares this Calendar to the specified Object.
       * @description 
       * <p>
       * Compares this Calendar to the specified Object. The result is true if and only if the argument is a Calendar object of the same calendar system that represents the same time value (millisecond offset from the Epoch) under the same Calendar parameters as this object.
       * </p><p>
       * The Calendar parameters are the values represented by the isLenient, getFirstDayOfWeek, getMinimalDaysInFirstWeek and getTimeZone methods. If there is any difference in those parameters between the two Calendars, this method returns false.
       * </p><p>
       * Use the compareTo method to compare only the time values.
       * </p>
       *
       * @param {js.lang.Object} obj - the object to compare with.
       * @return {js.lang.Boolean} true if this object is equal to obj; false otherwise.
       */
      "equals": function(obj) {
        if (this == obj)
          return true;

        var that = obj;
        return this.compareTo(that) === 0;
      },

      /** 
       * @function
       * @public 
       * @summary Returns the value of the given calendar field.
       * @description Returns the value of the given calendar field. In lenient mode, all calendar fields are normalized. In non-lenient mode, all calendar fields are validated and this method throws an exception if any calendar fields have out-of-range values. The normalization and validation are handled by the complete() method, which process is calendar system dependent.
       *
       * @param {js.lang.Number} field - the given calendar field.
       * @return {js.lang.Boolean} the value for the given calendar field.
       */
      "get": function(field) {
        this.complete();
        return this.internalGet(field);
      },

      "protected final internalGet": function(field) {
        return this.fields[field];
      },

      /** 
       * @function
       * @public 
       * @summary Gets a calendar with the specified time zone and locale.
       * @description Gets a calendar using the default time zone and locale. The Calendar returned is based on the current time in the default time zone with the default FORMAT locale.
       *
       * @return {js.util.Calendar} a Calendar.
       */
      "static getInstance": function() {
        return new js.util.GregorianCalendar();
      },

      /** 
       * @function
       * @public 
       * @summary Returns a Date object representing this Calendar's time value (millisecond offset from the Epoch").
       * @description Returns a Date object representing this Calendar's time value (millisecond offset from the Epoch").
       *
       * @return {js.lang.Number} a Date representing the time value.
       */
      "getTime": function() {
        return new Date(this.getTimeInMillis());
      },

      /**
       * Recomputes the time and updates the status fields isTimeSet and
       * areFieldsSet. Callers should check isTimeSet and only call this
       * method if isTimeSet is false.
       */
      "private void updateTime": function() {
        this.computeTime();
        // The areFieldsSet and areAllFieldsSet values are no longer controlled here (as of 1.5).
        this.isTimeSet = true;
      },

      /**
       * Converts the current calendar field values in
       * {@link #fields fields[]} to the millisecond time value
       * {@link #time}.
       *
       * @see #complete()
       * @see #computeFields()
       */
      "protected abstract computeTime": function() {},

      "protected abstract computeFields": function() {},

      "protected void complete": function() {
        if (!this.isTimeSet)
          this.updateTime();
        if (!this.areFieldsSet || !this.areAllFieldsSet) {
          this.computeFields();
          // fills in unset fields
          this.areAllFieldsSet = this.areFieldsSet = true;
        }
      },

      /** 
       * @function
       * @public 
       * @summary Returns this Calendar's time value in milliseconds.
       * @description Returns this Calendar's time value in milliseconds.
       *
       * @return {js.lang.Number} the current time as UTC milliseconds from the epoch.
       */
      "getTimeInMillis": function() {
        if (!this.isTimeSet) {
          this.updateTime();
        }
        return this.time;
      },

      /** 
       * @function
       * @public 
       * @summary Sets the given calendar field to the given value.
       * @description Sets the given calendar field to the given value. The value is not interpreted by this method regardless of the leniency mode.
       *
       * @param {js.lang.Number} field - the given calendar field.
       * @param {js.lang.Number} value - the value to be set for the given calendar field.
       */
      "set": function(field, value) {
        // If the fields are partially normalized, calculate all the
        // fields before changing any fields.
        if (this.areFieldsSet && !this.areAllFieldsSet) {
          this.computeFields();
        }
        this.internalSet(field, value);
        this.isTimeSet = false;
        this.areFieldsSet = false;
        this.isFieldsSet[field] = true;
        this.areAllFieldsSet = false;
        this.stamp[field] = 2;
      },

      "final internalSet": function(field, value) {
        this.fields[field] = value;
      },

      /**
       * Determines if the given calendar field has a value set, including
       * cases that the value has been set by internal fields calculations
       * triggered by a <code>get</code> method call.
       *
       * @return <code>true</code> if the given calendar field has a
       *         value set; <code>false</code> otherwise.
       */
      "public final isFieldSet": function(field) {
        return this.stamp[field] > 1;
      },

      /** 
       * @function
       * @public 
       * @summary Determines if the given calendar field has a value set, including cases that the value has been set by internal fields calculations triggered by a get method call.
       * @description Determines if the given calendar field has a value set, including cases that the value has been set by internal fields calculations triggered by a get method call.
       *
       * @param {js.lang.Number} field - the calendar field to test
       * @return {js.lang.Boolean} true if the given calendar field has a value set; false otherwise.
       */
      "public final boolean isSet": function(field) {
        return this.stamp[field] !== 0;
      },

      /** 
       * @function
       * @public 
       * @summary Sets the values for the fields YEAR, MONTH, DAY_OF_MONTH, HOUR_OF_DAY, MINUTE, and SECOND.
       * @description Sets the values for the fields YEAR, MONTH, DAY_OF_MONTH, HOUR_OF_DAY, MINUTE, and SECOND. Previous values of other fields are retained. If this is not desired, call clear() first.
       * @param {js.lang.Number} year - the value used to set the YEAR calendar field.
       * @param {js.lang.Number} month - the value used to set the MONTH calendar field. Month value is 0-based. e.g., 0 for January.
       * @param {js.lang.Number} date - the value used to set the DAY_OF_MONTH calendar field.
       * @param {js.lang.Number} hourOfDay - the value used to set the HOUR_OF_DAY calendar field.
       * @param {js.lang.Number} minute - the value used to set the MINUTE calendar field.
       * @param {js.lang.Number} second - the value used to set the SECOND calendar field.
       */
      "setDate": function(year, month, date, hourOfDay, minute, second) {
        var Calendar = js.util.Calendar;
        this.set(Calendar.YEAR, year);
        this.set(Calendar.MONTH, month);
        this.set(Calendar.DATE, date);
        this.set(Calendar.HOUR_OF_DAY, hourOfDay);
        this.set(Calendar.MINUTE, minute);
        this.set(Calendar.SECOND, second);
      },

      /** 
       * @function
       * @public 
       * @summary Sets this Calendar's time with the given Date.
       * @description Sets this Calendar's time with the given Date. Note: Calling setTime() with Date(Long.MAX_VALUE) or Date(Long.MIN_VALUE) may yield incorrect field values from get().
       *
       * @param {js.util.Date} date - the given Date.
       */
      "setTime": function(date) {
        if (!Object.isDate(date)) {
          throw new js.lang.IllegalArgumentException(
            "Parameters of the setTime method of the js.util.Calendar object to receive only Date type");
        }
        this.setTimeInMillis(date.getTime());
      },

      /** 
       * @function
       * @public 
       * @summary Sets this Calendar's current time from the given value.
       * @description Sets this Calendar's current time from the given value.
       *
       * @param {js.lang.Number} millis - the new time in UTC milliseconds from the epoch.
       */
      "setTimeInMillis": function(millis) {
        if (this.time == millis && this.isTimeSet && this.areFieldsSet && this.areAllFieldsSet) {
          return;
        }
        this.time = millis;
        this.isTimeSet = true;
        this.areFieldsSet = false;
        this.computeFields();
        this.areAllFieldsSet = this.areFieldsSet = true;
      },

      "final setFieldsComputed": function() {
        for (var i = 0; i < this.fields.length; i++) {
          this.stamp[i] = 1;
          this.isSet[i] = true;
        }
        this.areFieldsSet = this.areAllFieldsSet = true;
      },

      "final setFieldsNormalized": function() {
        for (var i = 0; i < this.fields.length; i++) {
          this.stamp[i] = this.fields[i] = 0; // UNSET == 0
          this.isSet[i] = false;
        }
        // Some or all of the fields are in sync with the
        // milliseconds, but the stamp values are not normalized yet.
        this.areFieldsSet = true;
        this.areAllFieldsSet = false;
      },

      /** 
       * @function
       * @public 
       * @summary Return a string representation of this calendar.
       * @description Return a string representation of this calendar. This method is intended to be used only for debugging purposes, and the format of the returned string may vary between implementations. The returned string may be empty but may not be null.
       *
       * @return {js.lang.String} a string representation of this calendar.
       */
      "toString": function() {
        var buffer = new js.lang.StringBuffer(),
          Calendar = js.util.Calendar,
          names = Calendar.FIELD_NAMES;
        buffer.append(this.getClass().getFullName()).append('[');
        buffer.append("time=").append(this.time);
        buffer.append(",areFieldsSet=").append(this.areFieldsSet);
        buffer.append(",areAllFieldsSet=").append(this.areAllFieldsSet);

        for (var i = 0, len = names.length; i < len; ++i) {
          buffer.append(',');
          buffer.append(names[i]).append("=").append(this.fields[i]);
        }
        buffer.append(']');
        return buffer.toString();
      }
    }).getClassConstructor();
});