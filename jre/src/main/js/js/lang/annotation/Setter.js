/** 
 * @abstract
 * @class js.lang.annotation.Setter
 * @extends {js.lang.Object}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * This is a field-level annotation.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Dynamic add a set method for this class, which to be named after the field property name. The set method is a pattern of data encapsulation. Instead of accessing the field directly, we define set methods to modify it.
 * </p>
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The set method follows the following rules:
 * <ul>
 * <li>To convert the first letter of the field property name to uppercase, then prepend set to construct the write method name;</li>
 * <li>If the field property name starts with "_", ignore it;</li>
 * </ul>
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * For example:
 * <code>
 * Class.forName({
 * name: "class SetterTest",
 *   "@Setter private name": "setter",
 *   "@Setter private _alias": "alias"
 * });
 * var test = new SetterTest();
 * test.setName();   //return value is "setter".
 * test.setAlias();  //return value is "alias".
 * </code>
 * </p><br/>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
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