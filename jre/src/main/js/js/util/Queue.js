/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2015 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 1, 2015
 */
define(function(require, exports, module) {

  require("bootstrap!js.util.Collection");
  require("bootstrap!js.util.NoSuchElementException");

  /** 
   * @abstract
   * @class js.util.Queue 
   * @extends {js.util.Collection}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Queues typically, but do not necessarily, order elements in a FIFO (first-in-first-out) manner. Among the exceptions are priority queues, which order elements according to a supplied comparator, or the elements' natural ordering, and LIFO queues (or stacks) which order the elements LIFO (last-in-first-out). Whatever the ordering used, the head of the queue is that element which would be removed by a call to remove() or poll(). In a FIFO queue, all new elements are inserted at the tail of the queue. Other kinds of queues may use different placement rules. Every Queue implementation must specify its ordering properties.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * The offer method inserts an element if possible, otherwise returning false. This differs from the Collection.add method, which can fail to add an element only by throwing an unchecked exception. The offer method is designed for use when failure is a normal, rather than exceptional occurrence, for example, in fixed-capacity (or "bounded") queues.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * The remove() and poll() methods remove and return the head of the queue. Exactly which element is removed from the queue is a function of the queue's ordering policy, which differs from implementation to implementation. The remove() and poll() methods differ only in their behavior when the queue is empty: the remove() method throws an exception, while the poll() method returns null.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * The element() and peek() methods return, but do not remove, the head of the queue.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * The Queue interface does not define the blocking queue methods, which are common in concurrent programming. These methods, which wait for elements to appear or for space to become available, are defined in the BlockingQueue interface, which extends this interface.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Queue implementations generally do not allow insertion of null elements, although some implementations, such as LinkedList, do not prohibit insertion of null. Even in the implementations that permit it, null should not be inserted into a Queue, as null is also used as a special return value by the poll method to indicate that the queue contains no elements.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Queue implementations generally do not define element-based versions of methods equals and hashCode but instead inherit the identity based versions from class Object, because element-based equality is not always well-defined for queues with the same elements but different ordering properties.
   * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
   * This interface is a member of the jsrt Collections Framework.
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
  return Class.forName( /** @lends js.util.Queue.prototype */ {
    name: "abstract class js.util.Queue extends js.util.Collection",

    /** 
     * @function
     * @public 
     * @summary Inserts the specified element into this queue if it is possible to do so immediately without violating capacity restrictions, returning true upon success and throwing an IllegalStateException if no space is currently available.
     * @description 
     * <p>Inserts the specified element into this queue if it is possible to do so
     * immediately without violating capacity restrictions, returning
     * <tt>true</tt> upon success and throwing an <tt>IllegalStateException</tt>
     * if no space is currently available.</p>
     *
     * @param {js.lang.Object} e - the element to add
     * @return {js.lang.Boolean} <tt>true</tt> (as specified by {@link Collection#add})
     * @throws IllegalStateException if the element cannot be added at this
     *         time due to capacity restrictions
     * @throws ClassCastException if the class of the specified element
     *         prevents it from being added to this queue
     * @throws NullPointerException if the specified element is null and
     *         this queue does not permit null elements
     * @throws IllegalArgumentException if some property of this element
     *         prevents it from being added to this queue
     */
    "add": function(e) {
      if (this.offer(e))
        return true;
      else
        throw new js.lang.IllegalStateException("Queue full");
    },

    /** 
     * @name js.util.Queue.prototype.offer
     * @abstract
     * @function
     * @public 
     * @summary 
     * @description 
     * <p>Inserts the specified element into this queue if it is possible to do
     * so immediately without violating capacity restrictions.
     * When using a capacity-restricted queue, this method is generally
     * preferable to {@link #add}, which can fail to insert an element only
     * by throwing an exception.</p>
     *
     * @param {js.lang.Object} e - the element to add
     * @return {js.lang.Boolean} <tt>true</tt> if the element was added to this queue, else
     *         <tt>false</tt>
     * @throws ClassCastException if the class of the specified element
     *         prevents it from being added to this queue
     * @throws NullPointerException if the specified element is null and
     *         this queue does not permit null elements
     * @throws IllegalArgumentException if some property of this element
     *         prevents it from being added to this queue
     */
    "abstract offer": function(e) {},

    /**
     * @function
     * @public 
     * @summary Retrieves and removes the head of this queue. 
     * @description 
     * <p>Retrieves and removes the head of this queue. This method differs
     * from {@link #poll poll} only in that it throws an exception if this
     * queue is empty.</p>
     *
     * @return {js.lang.Object} the head of this queue
     * @throws {js.lang.NoSuchElementException} if this queue is empty
     */
    "remove": function() {
      var x = this.poll();
      if (!Object.isNull(x))
        return x;
      else
        throw new js.util.NoSuchElementException();
    },

    /**
     * @function
     * @public 
     * @summary Retrieves, but does not remove, the head of this queue.
     * @description 
     * <p>Retrieves, but does not remove, the head of this queue.  This method
     * differs from {@link #peek peek} only in that it throws an exception
     * if this queue is empty.</p>
     *
     * @return the head of this queue
     * @throws NoSuchElementException if this queue is empty
     */
    "element": function() {
      var x = this.peek();
      if (!Object.isNull(x))
        return x;
      else
        throw new js.util.NoSuchElementException();
    },

    /**
     * @name js.util.Queue.prototype.peek
     * @abstract
     * @function
     * @public 
     * @summary Retrieves, but does not remove, the head of this queue, or returns null if this queue is empty.
     * @description 
     * <p>Retrieves, but does not remove, the head of this queue,
     * or returns <tt>null</tt> if this queue is empty.</p>
     *
     * @return {js.lang.Object} the head of this queue, or <tt>null</tt> if this queue is empty
     */
    "abstract peek": function() {},

    /**
     * @name js.util.Queue.prototype.poll
     * @abstract
     * @function
     * @public 
     * @summary Retrieves and removes the head of this queue, or returns null if this queue is empty.
     * @description 
     * <p>Retrieves and removes the head of this queue, or returns <tt>null</tt> if this queue is empty.<p>
     *
     * @return {js.lang.Object} the head of this queue, or <tt>null</tt> if this queue is empty
     */
    "abstract poll": function() {},

    /** 
     * @function
     * @public 
     * @summary Removes all of the elements from this queue.
     * @description Removes all of the elements from this queue.
     */
    "clear": function() {
      while (!Object.isNull(this.poll()));
    },

    /**
     * @function
     * @public 
     * @summary
     * @description 
     * <p>Adds all of the elements in the specified collection to this
     * queue.  Attempts to addAll of a queue to itself result in
     * <tt>IllegalArgumentException</tt>. Further, the behavior of
     * this operation is undefined if the specified collection is
     * modified while the operation is in progress.</p>
     * <p>This implementation iterates over the specified collection,
     * and adds each element returned by the iterator to this
     * queue, in turn.  A runtime exception encountered while
     * trying to add an element (including, in particular, a
     * <tt>null</tt> element) may result in only some of the elements
     * having been successfully added when the associated exception is
     * thrown.</p>
     *
     * @param {js.lang.Collection} c - collection containing elements to be added to this queue
     * @return {js.lang.Boolean} <tt>true</tt> if this queue changed as a result of the call
     * @throws ClassCastException if the class of an element of the specified
     *         collection prevents it from being added to this queue
     * @throws NullPointerException if the specified collection contains a
     *         null element and this queue does not permit null elements,
     *         or if the specified collection is null
     * @throws IllegalArgumentException if some property of an element of the
     *         specified collection prevents it from being added to this
     *         queue, or if the specified collection is this queue
     * @throws IllegalStateException if not all the elements can be added at
     *         this time due to insertion restrictions
     * @see #add(Object)
     */
    "addAll": function(c) {
      if (Object.isNull(c))
        throw new js.lang.NullPointerException();
      if (c == this)
        throw new js.lang.IllegalArgumentException();
      var modified = false,
        itr = c.iterator();
      while (itr.hasNext())
        if (add(itr.next()))
          modified = true;
      return modified;
    }
  }).getClassConstructor();
});