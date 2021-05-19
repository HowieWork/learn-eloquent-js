'use strict';

// Chpt.6 - METHODS
function normalize() {
  // NOTE Arrow functions do NOT bind their own THIS but can the THIS binding of the scope aroung them
  console.log(this.coords.map(n => n / this.length));
  /*
  console.log(this.coords.map(function(n){return n / this.length});
  // -> Error: this.length is undefined
  */
}
// normalize.call({ coords: [0, 2, 3], length: 5 });
///////////////////////////////////////////////////////
// Chpt.6 - PROTOTYPES / CLASSES / CLASS NOTATION / OVERRIDING DERIVED PROPERTIES
// How to write class before ES6? *classes are constructor functions with a prototype property
// function Rabbit(type) {
//   this.type = type;
// }
// Rabbit.prototype.speak = function (line) {
//   console.log(`The ${this.type} rabbit says '${line}'`);
// };

// let weirdRabbit = new Rabbit('weird');

// IMPORTANT Class Notation
class Rabbit {
  constructor(type) {
    this.type = type;
  }
  speak(line) {
    console.log(`The ${this.type} rabit says '${line}'`);
  }
}

let killerRabbit = new Rabbit('Killer');

// toString methods appear different between Object.prototype and Array.prototype
// console.log(Object.prototype.toString.call([1, 2]));
// -> [object Array]
// console.log(Array.prototype.toString.call([1, 2]));
// -> 1,2
///////////////////////////////////////////////////////
// Chpt.6 - MAPS
// Check what keys one object owns by itself *Object.keys
// console.log(Object.keys({ x: 1 }));
// Check whether one object has its own property *in & hasOwnProperty()
// console.log('x' in { x: 1 });
// console.log({ x: 1 }.hasOwnProperty('x'));
///////////////////////////////////////////////////////
// Chpt.6 - SYMBOLS (source: Colt Steele)
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
// Chpt.6 - ITERATORS
let okIterator = 'OK'[Symbol.iterator]();
// console.log(okIterator.next());
// console.log(okIterator.next());
// console.log(okIterator.next());
