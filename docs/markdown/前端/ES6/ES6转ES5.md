# ES6 转 ES5

> babel 将代码转换为低版本浏览器可以识别的代码

转换前 ES6

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this._address = '北京';
  }
  say() {
    console.log(`我叫${this.name},今年${this.age}岁`);
  }
}
```

转换后 ES5

```js
// t:Person
// o:Student
// e:[name,age]
// 会通过t创建出一个实例，但是这个实例的原型的constructor指向o
// 会通过Person创建一个实例，但是这个实例的原型指向Student
function _callSuper(t, o, e) {
  return (
    (o = _getPrototypeOf(o)),
    _possibleConstructorReturn(
      t,
      _isNativeReflectConstruct()
        ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor)
        : o.apply(t, e)
    )
  );
}
function _possibleConstructorReturn(t, e) {
  if (e && ('object' == _typeof(e) || 'function' == typeof e)) return e;
  if (void 0 !== e)
    throw new TypeError(
      'Derived constructors may only return object or undefined'
    );
  return _assertThisInitialized(t);
}
function _assertThisInitialized(e) {
  if (void 0 === e)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return e;
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {})
    );
  } catch (t) {}
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
    return !!t;
  })();
}
function _superPropGet(t, o, e, r) {
  var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e);
  return 2 & r && 'function' == typeof p
    ? function (t) {
        return p.apply(e, t);
      }
    : p;
}
function _get() {
  return (
    (_get =
      'undefined' != typeof Reflect && Reflect.get
        ? Reflect.get.bind()
        : function (e, t, r) {
            var p = _superPropBase(e, t);
            if (p) {
              var n = Object.getOwnPropertyDescriptor(p, t);
              return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value;
            }
          }),
    _get.apply(null, arguments)
  );
}
function _superPropBase(t, o) {
  for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t)); );
  return t;
}
function _getPrototypeOf(t) {
  return (
    (_getPrototypeOf = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        }),
    _getPrototypeOf(t)
  );
}
function _inherits(t, e) {
  if ('function' != typeof e && null !== e)
    throw new TypeError('Super expression must either be null or a function');
  (t.prototype = Object.create(e && e.prototype, {
    constructor: { value: t, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(t, 'prototype', { writable: !1 }),
    // 目的是实现静态方法的继承。Students.__proto__ = Person
    e && _setPrototypeOf(t, e);
}
function _setPrototypeOf(t, e) {
  return (
    (_setPrototypeOf = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (t, e) {
          return (t.__proto__ = e), t;
        }),
    _setPrototypeOf(t, e)
  );
}
function _typeof(o) {
  '@babel/helpers - typeof';
  return (
    (_typeof =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (o) {
            return typeof o;
          }
        : function (o) {
            return o &&
              'function' == typeof Symbol &&
              o.constructor === Symbol &&
              o !== Symbol.prototype
              ? 'symbol'
              : typeof o;
          }),
    _typeof(o)
  );
}
function _classCallCheck(a, n) {
  if (!(a instanceof n))
    throw new TypeError('Cannot call a class as a function');
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    (o.enumerable = o.enumerable || !1),
      (o.configurable = !0),
      'value' in o && (o.writable = !0),
      Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return (
    r && _defineProperties(e.prototype, r),
    t && _defineProperties(e, t),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  );
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, 'string');
  return 'symbol' == _typeof(i) ? i : i + '';
}
function _toPrimitive(t, r) {
  if ('object' != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || 'default');
    if ('object' != _typeof(i)) return i;
    throw new TypeError('@@toPrimitive must return a primitive value.');
  }
  return ('string' === r ? String : Number)(t);
}

// /*#__PURE__*/标志为纯函数
// webpack tree-shaking 会优化掉，没有副作用
var Person = /*#__PURE__*/ (function () {
  function Person(name, age) {
    _classCallCheck(this, Person);
    this.name = name;
    this.age = age;
    this._address = '北京';
  }
  return _createClass(Person, [
    {
      key: 'say',
      value: function say() {
        console.log(
          '\u6211\u53EB'
            .concat(this.name, ',\u4ECA\u5E74')
            .concat(this.age, '\u5C81')
        );
      },
    },
  ]);
})();

var Student = /*#__PURE__*/ (function (_Person) {
  function Student(name, age, grade) {
    var _this;
    _classCallCheck(this, Student);
    _this = _callSuper(this, Student, [name, age]);
    _this.grade = grade;
    return _this;
  }
  //   实现之前寄生式继承的方法（多了静态方法的集成）
  _inherits(Student, _Person);
  return _createClass(Student, [
    {
      key: 'say',
      value: function say() {
        _superPropGet(Student, 'say', this, 3)([]);
        console.log(
          '\u6211\u53EB'
            .concat(this.name, ',\u4ECA\u5E74')
            .concat(this.age, '\u5C81')
        );
      },
    },
  ]);
})(Person);
```
