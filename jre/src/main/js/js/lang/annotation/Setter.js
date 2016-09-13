Class.forName({
  name: "@interface js.lang.annotation.Setter",
  execute: function(self, field, Modifier, Attribute) {
    if (!field || Object.isFunction(field.getValue())) {
      throw new Error("ElemenetType must be field in js.lang.annotation.Setter");
    } else {
      // 属性上的注解
      if (field.getName() && field.getName().length > 1 && field.getName().length != "_") {
        var name = field.getName().indexOf("_") === 0 ? field.getName()
          .substring(1) : field.getName();
        name = name.charAt(0).toUpperCase() + name.substring(1);

        var modifier = Modifier.publicBit + Modifier.writableBit + Modifier.proxyableBit;
        // var modifier = 1 + 256 + 32;

        var setName = "set" + name;
        if (!self.hasMethod(setName)) {
          self.addMethod(new Attribute(setName, function(value) {
            this[field.getName()] = value;
          }, self, modifier, []));
        }
      }
    }
  }
});