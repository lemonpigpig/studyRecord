export class Person {
    constructor({ name, age, sex }) {
        this.className = 'Person'
        this.name = name
        this.age = age
        this.sex = sex
    }
    getName() {
        return this.name
    }
}
export class Apple {
    constructor({ model }) {
        this.className = 'Apple'
        this.model = model
    }
    getModel() {
        return this.model
    }
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            // writable default false and the value prop can be overwrited when it is true
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0,
                "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps),
            Constructor;
    };
}()

var Person = function() {
    function Person(_ref) {
        var name = _ref.name,
            age = _ref.age,
            sex = _ref.sex;
        _classCallCheck(this, Person);

        this.className = 'Person';
        this.name = name;
        this.age = age;
        this.sex = sex;
    }

    _createClass(Person, [{
        key: 'getName',
        value: function getName() {
            return this.name;
        }
    }]);
    return Person;
}();