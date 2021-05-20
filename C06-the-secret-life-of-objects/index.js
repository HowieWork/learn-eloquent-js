'use strict';

// NOTE Chpt.6 - 1 - METHODS
function normalize() {
  // IMPORTANT Arrow functions do NOT bind their own THIS but can see the THIS binding of the scope aroung them
  console.log(this.coords.map(n => n / this.length));
  /*
  console.log(this.coords.map(function(n){return n / this.length});
  // -> Error: this.length is undefined
  */
}
// normalize.call({ coords: [0, 2, 3], length: 5 });
///////////////////////////////////////////////////////

// NOTE Chpt.6 - 2 - PROTOTYPES / CLASSES / CLASS NOTATION / OVERRIDING DERIVED PROPERTIES

// 2.1 Object.prototype -> Array.prototype -> []
// console.log(Object.getPrototypeOf([]) == Array.prototype);
// console.log(Object.getPrototypeOf(Array.prototype) == Object.prototype);
// console.log(Object.getPrototypeOf(Object.prototype));

// 2.2 Object.create
let protoRabbit = {
  // Below is a shorthand way of defining a method
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  },
};
let crazyRabbit = Object.create(protoRabbit);
crazyRabbit.type = 'crazy';
// crazyRabbit.speak('CRAZY');

// 2.3 Class
// (1) Constructor function
function makeRabbit(type) {
  let rabbit = Object.create(protoRabbit);
  rabbit.type = type;
  return rabbit;
}
let weirdRabbit = makeRabbit('weird');
// weirdRabbit.speak('WEIRD');

// (2) How to write 'class' before ES6? *classes are constructor functions with a prototype property
// function Rabbit(type) {
//   this.type = type;
// }
// Rabbit.prototype.speak = function (line) {
//   console.log(`The ${this.type} rabbit says '${line}'`);
// };
// let calmRabbit = new Rabbit('calm');
// calmRabbit.speak('CALM');

// IMPORTANT (3)
//  A prototype is associated with a constructor (through its PROTOTYPE property)
// console.log(Object.getPrototypeOf(Rabbit) == Function.prototype);
// Objects have a prototype (which can be found with Object.getPrototypeOf)
// console.log(Object.getPrototypeOf(calmRabbit) == Rabbit.prototype);
///////////////////////////////////////////////////////

// NOTE Chpt.6 - 3 - CLASS NOTATION / OVERRIDING DERIVED PROPERTIES
// IMPORTANT Class Notation (starting 2015)
class Rabbit {
  constructor(type) {
    this.type = type;
  }
  speak(line) {
    console.log(`The ${this.type} rabit says '${line}'`);
  }
}

// let happyRabbit = new Rabbit('happy');

// toString methods appear different between Object.prototype and Array.prototype
// console.log(Object.prototype.toString.call([1, 2]));
// -> [object Array]
// console.log(Array.prototype.toString.call([1, 2]));
// -> 1,2
///////////////////////////////////////////////////////

// NOTE Chpt.6 - MAPS
// Check what keys one object owns by itself *Object.keys
// console.log(Object.keys({ x: 1 }));
// Check whether one object has its own property *in & hasOwnProperty()
// console.log('x' in { x: 1 });
// console.log({ x: 1 }.hasOwnProperty('x'));
///////////////////////////////////////////////////////

// NOTE Chpt.6 - SYMBOLS (source: Colt Steele)
// Use Case #1
const BLUE = Symbol('blue');
const RED = Symbol('red');
const GREEN = Symbol('green');
const cat = 'blue';
function alarm(color) {
  switch (color) {
    case RED:
      console.log('Stop');
      break;
    case GREEN:
      console.log('Pass');
      break;
    case BLUE:
      console.log('Pause');
      break;
    default:
      console.log('Undefined');
  }
}
// alarm(cat);
// alarm(RED);

// Use Case #2
const length = Symbol('length');

class Train {
  constructor() {
    this[length] = 0;
  }

  add(car, contents) {
    this[car] = contents;
    this[length]++;
  }
}
let freightTrain = new Train();
freightTrain.add('regrigerator car', 'cattle');
freightTrain.add('flat car', 'articraft parts');
freightTrain.add('tank car', 'milk');
freightTrain.add('hopper car', 'coal');

// Loop object property without length property
// for (let car in freightTrain) {
//   console.log(car, freightTrain[car]);
// }

// IMPORTANT Use Case #3: Use symbols as keys to prevent name clashes or collisions
class AlertService {
  constructor() {
    this.alerts = {};
  }
  addAlert(symbol, alertText) {
    this.alerts[symbol] = alertText;
    this.renderAlerts();
  }
  removeAlert(symbol) {
    delete this.alerts[symbol];
  }
  renderAlerts() {}
}

const alertService = new AlertService();

class MyComponent {
  constructor(thing) {
    this.componentId = Symbol(thing);
  }
  errorHandler(msg) {
    alertService.addAlert(this.componentId, msg);
    setTimeout(() => {
      alertService.removeAlert(this.componentId);
      console.log('Removed alert', this.componentId);
    }, 5000);
  }
}

let list = new MyComponent('listComponent');
let list2 = new MyComponent('listComponent');
let form = new MyComponent('inputComponent');

// list.errorHandler('Problem 1');
// list2.errorHandler('Uh Oh!');
///////////////////////////////////////////////////////

// NOTE Chpt.6 - ITERATORS
let okIterator = 'OK'[Symbol.iterator]();
// console.log(okIterator.next());
// console.log(okIterator.next());
// console.log(okIterator.next());

// IMPORTANT Build a Matrix class *acting as a two-dimensional array
class Matrix {
  constructor(width, height, element = (x, y) => undefined) {
    this.width = width;
    this.height = height;
    this.content = [];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        this.content[y * width + x] = element(x, y);
      }
    }
  }

  get(x, y) {
    return this.content[y * this.width + x];
  }

  set(x, y, value) {
    this.content[y * this.width + x] = value;
  }
}
let matrix = new Matrix(3, 3, (x, y) => `value ${x},${y}`);
// console.log(matrix);

///////////////////////////////////////////////////////

// NOTE Chpt.6 - Getters, setters and statics
// IMPORTANT Build a Temperature class, which only stores Celsius internally and automatically converts to and from Clesius in the fahrenheit getter and setter
class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }
  get fahrenheit() {
    return this.celsius * 1.8 + 32;
  }
  set fahrenheit(value) {
    this.celsius = (value - 32) / 1.8;
  }
  static fromFahrenheit(value) {
    return new Temperature((value - 32) / 1.8);
  }
}

let temp = Temperature.fromFahrenheit(100);
// console.log(temp);
