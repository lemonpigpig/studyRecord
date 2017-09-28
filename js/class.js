// javascript定义class的三种方法

// 1
function Cat() {
  this.color = 'white';
}
var cat1 = new Cat();
console.log(cat1.color);

// q: 怎样扩展类
Cat.prototype.makeSound = function () {
  alert('喵喵喵！');
}

// 2 类就是一个对象
var Cat = {
  name: '打毛',
  makeSound = function () {
    alert('喵喵喵！');
  }
};
var cat1 = Object.create(Cat)
console.log(cat1.name, cat1.makeSound())

// compatibale for old browser
if (!Object.create) {
  Object.create = function (o) {
    function f () {}
    f.prototype = o;
    return new f();
  }
}
// 缺点不能实现私有属性和方法，仅仅是按照这个模板进行复制， 实例对象之间不能共享数据

// 3.极简模式封装

var Cat = {
  createNew: function() {
    var cat = {};
    cat.name = 'lalacat';
    cat.makeSound = function () {
      alert('喵喵喵！');
    }
    return cat;
  }
}
var cat1 = Cat.createNew();
cat1.makeSound();

// 运用极简模式谈论继承
var Animal = {
  createNew: function() {
    var animal = {};
    animal.sleep = function () {
      alert('sleeping sleeping');
    };
    return animal;
  }
}

var Cat = {
  createNew: function () {
    var cat = Animal.createNew();
    cat.name = 'lalacat';
    cat.makeSound = function () {
      alert('llllll');
    }
    return cat;
  }
}
var cat1 = Cat.createNew();
cat1.sleep();

// add私有属性和方法