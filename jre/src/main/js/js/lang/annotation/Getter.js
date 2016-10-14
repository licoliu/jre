/** 
 * @abstract
 * @class js.lang.annotation.Getter
 * @extends {js.lang.Object}
 * @description 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * This is a field-level annotation.
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * Dynamic add a get method for this class, which to be named after the field property name. The get method is a pattern of data encapsulation. Instead of accessing the field directly, we define get methods to access it.
 * </p>
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;
 * The get method follows the following rules:
 * <ul>
 * <li>To convert the first letter of the field property name to uppercase, then prepend get to construct the read method name;</li>
 * <li>If the field property name starts with "_", ignore it;</li>
 * </ul>
 * </p><p>&nbsp;&nbsp;&nbsp;&nbsp;
 * For example:
 * <code>
 * Class.forName({
 *   name: "class GetterTest",
 *   "@Getter private name": "getter",
 *   "@Getter private _alias": "alias"
 * });
 * var test = new GetterTest();
 * test.getName();   //return value is "getter".
 * test.getAlias();  //return value is "alias".
 * </code>
 * </p><br/>
 *
 * @author lico
 * @version 0.1.1
 * @since 0.0.1
 */
Class.forName( /** @lends js.lang.annotation.Getter.prototype */ {
  name: "@interface js.lang.annotation.Getter",
  execute: function(self, field, Modifier, Attribute) {
    if (!field || Object.isFunction(field.getValue())) {
      throw new Error("ElemenetType must be field in js.lang.annotation.Getter");
    } else {
      // 属性上的注解
      if (field.getName() && field.getName().length > 1 && field.getName().length != "_") {
        var name = field.getName().indexOf("_") === 0 ? field.getName()
          .substring(1) : field.getName();
        name = name.charAt(0).toUpperCase() + name.substring(1);

        var modifier = Modifier.publicBit + Modifier.writableBit + Modifier.proxyableBit;
        // var modifier = 1 + 256 + 32;

        var getName = "get" + name;
        if (!self.hasMethod(getName)) {
          self.addMethod(new Attribute(getName, function() {
            return this[field.getName()];
          }, self, modifier, []));
        }
      }
    }
  }
});