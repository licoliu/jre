define(function(require, exports, module) {

  require("bootstrap!org.atomunion.aop.framework.AdvisedSupport");

  require("bootstrap!org.atomunion.web.context.support.GenericWebApplicationContext");

  require("bootstrap!org.atomunion.aop.MethodBeforeAdvice");
  require("bootstrap!org.atomunion.aop.ThrowsAdvice");
  require("bootstrap!org.atomunion.aop.AfterReturningAdvice");

  /** 
   * @class org.atomunion.aop.framework.ProxyFactoryBean
   * @extends {org.atomunion.aop.framework.AdvisedSupport}
   * @description 
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * FactoryBean implementation that builds an AOP proxy based on beans in Spring BeanFactory.
   * </p>
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * MethodInterceptors and Advisors are identified by a list of bean names in the current bean factory, specified through the "interceptorNames" property. The last entry in the list can be the name of a target bean or a TargetSource; however, it is normally preferable to use the "targetName"/"target"/"targetSource" properties instead.
   * </p>
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Global interceptors and advisors can be added at the factory level. The specified ones are expanded in an interceptor list where an "xxx*" entry is included in the list, matching the given prefix with the bean names (e.g. "global*" would match both "globalBean1" and "globalBean2", "*" all defined interceptors). The matching interceptors get applied according to their returned order value, if they implement the Ordered interface.
   * </p>
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * Creates a JDK proxy when proxy interfaces are given, and a CGLIB proxy for the actual target class if not. Note that the latter will only work if the target class does not have final methods, as a dynamic subclass will be created at runtime.
   * </p>
   * <p>&nbsp;&nbsp;&nbsp;&nbsp;
   * It's possible to cast a proxy obtained from this factory to Advised, or to obtain the ProxyFactoryBean reference and programmatically manipulate it. This won't work for existing prototype references, which are independent. However, it will work for prototypes subsequently obtained from the factory. Changes to interception will work immediately on singletons (including existing references). However, to change interfaces or target it's necessary to obtain a new instance from the factory. This means that singleton instances obtained from the factory do not have the same object identity. However, they do have the same interceptors and target, and changing any reference will change all objects.
   * </p><br/>
   *
   * @author lico
   * @version 0.1.1
   * @since 0.0.1
   */
  return Class.forName( /** @lends org.atomunion.aop.framework.ProxyFactoryBean.prototype */ {
    name: "class org.atomunion.aop.framework.ProxyFactoryBean extends org.atomunion.aop.framework.AdvisedSupport",

    "private @Setter targetName": null,
    "private @Setter interceptorNames": [],
    "private @Setter singleton": true,
    "private @Setter @Getter singletonInstance": null,

    ProxyFactoryBean: function(targetName, interceptorNames) {
      this.setTargetName(targetName);
      if (Object.isArray(interceptorNames)) {
        this.setInterceptorNames(interceptorNames);
      }
    },

    /** 
     * @function
     * @public
     * @summary Return a proxy.
     * @description Return a proxy.
     *
     * @return {js.lang.Object} 
     */
    getObject: function() {
      this.initializeAdvisorChain();
      if (this.isSingleton() && this.singletonInstance) {
        return this.getSingletonInstance();
      } else {
        if (this.targetName === null) {
          console.warn("Using non-singleton proxies with singleton targets is often undesirable. " +
            "Enable prototype proxies by setting the 'targetName' property.");
        }
        return this.newPrototypeInstance();
      }
    },

    /** 
     * @function
     * @public
     * @summary Return the type of the proxy.
     * @description Return the type of the proxy.
     *
     * @return {js.lang.Class} 
     */
    getObjectType: function() {
      return this.getObject().getClass();
    },

    /** 
     * @function
     * @public
     * @summary Return a proxy.
     * @description Return a proxy.
     *
     * @return {js.lang.Object} 
     */
    getProxy: function() {
      return this.getObject();
    },

    /** 
     * @function
     * @public
     * @summary Set the name of the target bean.
     * @description Set the name of the target bean.
     *
     * @param {js.lang.String} 
     */
    setTargetName: function(targetName) {
      this.targetName = targetName;
    },

    /** 
     * @function
     * @public
     * @summary Is the object managed by this factory a singleton.
     * @description Is the object managed by this factory a singleton? That is, will FactoryBean.getObject() always return the same object (a reference that can be cached)?
     *
     * @return {js.lang.Boolean} 
     */
    isSingleton: function() {
      return this.singleton;
    },

    "private initializeAdvisorChain": function() {
      var advisor = null;

      for (var i = 0, len = this.interceptorNames.length; i < len; i++) {
        advisor = org.atomunion.web.context.support.GenericWebApplicationContext.getInstance().getBean(this.interceptorNames[i]);
        if (advisor) {
          this.addAdvisor(advisor);
        }
      }
    },

    "private newPrototypeMethod": function(method, befores, afterThrowings, afterReturnings) {
      var f = method.getValue(),
        modifiers = method.getModifiers(),
        isStatic = js.lang.reflect.Modifier.isStatic(modifiers);

      return function() {
        // TODO 判断权限private,default,protected,public
        // TODO 判断是否可以被重写final

        // var thisClass = this.getClass(),
        //   superClass = thisClass.getSuperClass();
        // var $this = isStatic ? thisClass.getClassConstructor() : this;
        // $this.$super = superClass ? (isStatic ? superClass.getClassConstructor() : superClass.getClassConstructor().prototype) : null;

        var args = Array.prototype.slice.call(arguments, 0);

        // before
        if (!Object.isEmpty(befores)) {
          for (var bi = 0, length1 = befores.length; bi < length1; bi++) {
            var before = befores[bi];
            if (Object.isFunction(before)) {
              before.call(this, method, args, this);
            }
          }
        }

        var result = null,
          scope = this;
        try {
          result = (!Object.isEmpty(f) && Object.isFunction(f)) ? f.apply(scope, args) : f;
          if (result && result.$promise && Object.isFunction(result.$promise.then)) {
            result.$promise.then(
              /*function() {
                  if (!Object.isEmpty(afterReturnings)) {
                    for (var ai = 0, length3 = afterReturnings.length; ai < length3; ai++) {
                      var afterReturning = afterReturnings[ai];
                      if (Object.isFunction(afterReturning)) {
                        afterReturning.call(scope, result, method, args, scope);
                      }
                    }
                  }
                }*/
              null,
              function(response) {
                if (!Object.isEmpty(afterThrowings)) {
                  for (var ti = 0, length2 = afterThrowings.length; ti < length2; ti++) {
                    var afterThrowing = afterThrowings[ti];
                    if (Object.isFunction(afterThrowing)) {
                      afterThrowing.call(scope, method, args, scope,
                        new js.lang.AsynchronousCallException("asynchronous " + method.getName() + " call error, server response is \"" + response.statusText + " - " + response.status + "\".",
                          method.getDeclaringClass().getFullName(),
                          null,
                          response.data,
                          response),
                        result);
                    }
                  }
                }
              });
          }
        } catch (e) {
          if (Object.isEmpty(afterThrowings)) {
            throw e;
          } else {
            // throw
            for (var ti = 0, length2 = afterThrowings.length; ti < length2; ti++) {
              var afterThrowing = afterThrowings[ti];
              if (Object.isFunction(afterThrowing)) {
                afterThrowing.call(scope, method, args, scope, e);
              }
            }
          }
        }

        // after
        if (!Object.isEmpty(afterReturnings)) {
          for (var ai = 0, length3 = afterReturnings.length; ai < length3; ai++) {
            var afterReturning = afterReturnings[ai];
            if (Object.isFunction(afterReturning)) {
              afterReturning.call(scope, result, method, args, scope);
            }
          }
        }
        return result;
      };
    },

    "private newPrototypeInstance": function() {
      var context = org.atomunion.web.context.support.GenericWebApplicationContext.getInstance();
      var targetClass = context.getType(this.targetName);

      if (!targetClass) {
        throw new js.lang.IllegalAccessException("");
      }

      var list = this.getAdvisors();
      if (list.length > 0) {
        var afterReturnings = null,
          befores = null,
          afterThrowings = null,
          methods = targetClass.getHeldMethods();
        for (var i = 0, length1 = methods.length; i < length1; i++) {
          var method = methods[i],
            modifiers = method.getModifiers(),
            isProxyable = js.lang.reflect.Modifier.isProxyable(modifiers);

          if (isProxyable) {
            afterReturnings = [];
            befores = [];
            afterThrowings = [];
            for (var l = 0, length2 = list.length; l < length2; l++) {
              var pointcut = list[l].getPointcut();
              if (pointcut.matches(method, targetClass)) {
                var advice = list[l].getAdvice();
                if (Object.isInstanceof(advice, org.atomunion.aop.MethodBeforeAdvice)) {
                  befores.push(advice.before);
                } else if (Object.isInstanceof(advice, org.atomunion.aop.ThrowsAdvice)) {
                  afterThrowings.push(advice.afterThrowing);
                } else if (Object.isInstanceof(advice, org.atomunion.aop.AfterReturningAdvice)) {
                  afterReturnings.push(advice.afterReturning);
                }
              }
            }
            if (!Object.isEmpty(befores) || !Object.isEmpty(afterThrowings) || !Object.isEmpty(afterReturnings)) {
              targetClass.addMethod(new js.lang.reflect.Method(
                method.getName(),
                this.newPrototypeMethod(method, befores, afterThrowings, afterReturnings),
                method.getDeclaringClass(),
                method.getModifiers(),
                method.getDeclaredAnnotations()));
            }
          }
        }
      }

      this.singletonInstance = context.getBean(this.targetName, !this.isSingleton());

      return this.singletonInstance;
    }
  }).getClassConstructor();
});