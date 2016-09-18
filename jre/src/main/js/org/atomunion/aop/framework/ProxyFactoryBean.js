define(function(require, exports, module) {

  require("bootstrap!org.atomunion.aop.framework.AdvisedSupport");

  require("bootstrap!org.atomunion.web.context.support.GenericWebApplicationContext");

  require("bootstrap!org.atomunion.aop.advice.MethodBeforeAdvice");
  require("bootstrap!org.atomunion.aop.advice.ThrowsAdvice");
  require("bootstrap!org.atomunion.aop.advice.AfterReturningAdvice");

  return Class.forName({
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

    getObject: function() {
      this.initializeAdvisorChain();
      if (this.isSingleton() && this.singletonInstance) {
        return this.getSingletonInstance();
      } else {
        if (this.targetName == null) {
          console.warn("Using non-singleton proxies with singleton targets is often undesirable. " +
            "Enable prototype proxies by setting the 'targetName' property.");
        }
        return this.newPrototypeInstance();
      }
    },

    getObjectType: function() {
      return this.getObject().getClass();
    },

    getProxy: function() {
      return this.getObject();
    },

    setTargetName: function(targetName) {
      this.targetName = targetName;
    },

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
          for (var bi = 0, length = befores.length; bi < length; bi++) {
            var before = befores[bi];
            if (Object.isFunction(before)) {
              before.call(this, method, args, this);
            }
          }
        }

        var result = null;
        try {
          result = (!Object.isEmpty(f) && Object.isFunction(f)) ? f.apply(this, arguments) : f;
        } catch (e) {
          if (Object.isEmpty(afterThrowings)) {
            throw e;
          } else {
            // throw
            for (var ti = 0, length = afterThrowings.length; ti < length; ti++) {
              var afterThrowing = afterThrowings[ti];
              if (Object.isFunction(afterThrowing)) {
                afterThrowing.call(this, method, args, this, e);
              }
            }
          }
        }

        // after
        if (!Object.isEmpty(afterReturnings)) {
          for (var ai = 0, length = afterReturnings.length; ai < length; ai++) {
            var afterReturning = afterReturnings[ai];
            if (Object.isFunction(afterReturning)) {
              afterReturning.call(this, result, method, args, this);
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
        var afterReturnings = [],
          befores = [],
          afterThrowings = [];

        for (var j = 0, len = list.length; j < len; j++) {
          var advice = list[j].getAdvice();
          if (Object.isInstanceof(advice, org.atomunion.aop.advice.MethodBeforeAdvice)) {
            befores.push(advice.before);
          } else if (Object.isInstanceof(advice, org.atomunion.aop.advice.ThrowsAdvice)) {
            afterThrowings.push(advice.afterThrowing);
          } else if (Object.isInstanceof(advice, org.atomunion.aop.advice.AfterReturningAdvice)) {
            afterReturnings.push(advice.afterReturning);
          }
        }

        if (!Object.isEmpty(befores) || !Object.isEmpty(afterThrowings) || !Object.isEmpty(afterReturnings)) {
          var methods = targetClass.getDeclaredMethods();
          for (var i = 0, length = methods.length; i < length; i++) {
            var method = methods[i],
              modifiers = method.getModifiers(),
              isProxyable = js.lang.reflect.Modifier.isProxyable(modifiers);

            if (isProxyable) {
              for (var j = 0, len = list.length; j < len; j++) {
                var pointcut = list[j].getPointcut();
                if (pointcut.matches(method, targetClass)) {
                  targetClass.addMethod(new js.lang.reflect.Method(method.getName(),
                    this.newPrototypeMethod(method, befores, afterThrowings, afterReturnings),
                    method.getDeclaringClass,
                    method.getModifiers(),
                    method.getAnnotations));
                  break;
                }
              }
            }
          }
        }
      }

      this.singletonInstance = context.getBean(this.targetName);

      return this.singletonInstance;
    }
  }).getClassConstructor();
});