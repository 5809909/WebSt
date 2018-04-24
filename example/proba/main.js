function funcDec(a, b) {
    return a + b;
}

var funcExp = function (a, b) {
    console.log(this);
    return a + b;
}
console.log(funcDec(22, 7));
console.log(funcExp(7, 22));


function func1() {
    function funcExample() {
        return 'one';
    }

    return funcExample();

    function funcExample() {
        return 'two';
    }
};

function func2() {
    var funcExample = function () {
        return 'one';
    };

    return funcExample();

    var funcExample = function () {
        return 'two';
    }
}

console.log(func1());
console.log(func2());

//функции обратного вызова

var func = function (callback) {
    var name = "Vik";
    return callback(name);
};
console.log(func(function (n) {
    return "Hello " + n;

}));

//возвращение функции
var func1 = function () {
    return function () {
        console.log('Привет');
    }
};
console.log(func1());
func1()();

//Анонимная самовызывающаяся функция
var prop1 = 1;
(function () {
    var prop2 = 2;
    console.log('Привет от ананимной самовызывающейся функции');
    console.log(prop1);
})();
//console.log(prop2);  //не видна

var funcArgs = function () {
    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum;
};

console.log(funcArgs(5, 8, 8, 8, 8, 8));


var MYAPP = {
    func: function (a, b) {
        console.log(this);
        return a + b;
    }
};
console.log(MYAPP.func(3, 6));

var MYAPPPrivate = (function () {

    var funcPr = function (a, b) {
        console.log(this);
        return a + b;
    };
    console.log(funcPr(6, 6));
    return {
        func: function (a, b) {
            console.log(this);
            var that = this;
            var helperFunc = function (c, d) {
                console.log(this);
                console.log(that);
                that.multiply = c * d;
            }
            helperFunc(a, b);
            return a + b;
        },
        funcPublic: funcPr
    };


})();
console.log(MYAPPPrivate.func(6, 9));
//console.log(MYAPPPrivate.func(6, 6));  //не видит
console.log(MYAPPPrivate.funcPublic(8, 8));
console.log(MYAPPPrivate.multiply);


var arr = [3, 5];
var add = function (a, b) {
    console.log(this.func(8, 4));
    return a + b;
}

// var sum=add.apply(null,arr);
// console.log(sum);

var sum2 = add.apply(MYAPP, arr);
console.log(sum2);


var Man = function (name) {
    this.name = name;
    this.canSpeak = true;
    this.sayHello = function () {
        return'Привет меня зовут '+ this.name;

    }
};
var vanya = new Man('Ваня');

console.log(vanya);
console.log(vanya.name);
console.log(vanya.canSpeak);
console.log(vanya.sayHello());
console.log(vanya.constructor);
