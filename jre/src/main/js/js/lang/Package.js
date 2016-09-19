Class.forName({
  name: "public final class js.lang.Package extends Object",
  "private _name": null,
  "private _value": null,

  Package: function(name, value) {
    this._name = name;
    this._value = value;
  },

  getName: function() {
    return this._name;
  },

  getValue: function() {
    return this._value;
  }

});