'use strict';

const SCRIPTS = require('./scripts');
////////////////////////////////////////////
// Chpt.5 Higher-Order Functions - Examples
// #1 filter(arr, callback)
function filter(arr, test) {
  let passed = [];
  for (let el of arr) {
    if (test(el)) passed.push(el);
  }
  return passed;
}

// #2 map(arr, callback)
function map(arr, transform) {
  let mapped = [];
  for (let el of arr) {
    mapped.push(transform(el));
  }
  return mapped;
}

// #3 reduce()
function reduce(arr, combine, start) {
  let current = start;
  for (let el of arr) {
    current = combine(current, el);
  }
  return current;
}

// #4 Work with SCRIPTS
// 4.1 Use reduce(twice) to find the script with the most characters
const charCount = script => {
  return script.ranges.reduce((count, [from, to]) => {
    return count + (to - from);
  }, 0);
};
SCRIPTS.reduce((a, b) => {
  return charCount(a) > charCount(b) ? a : b;
});

// 4.2 Find the average year of origin for living and dead scripts
const average = arr => {
  return arr.reduce((a, b) => a + b) / arr.length;
};
// Average year of living scripts
average(SCRIPTS.filter(script => script.living).map(script => script.year));
// Average year of dead scripts
average(SCRIPTS.filter(script => !script.living).map(script => script.year));

// 4.3 Recognizing text
// textScripts('英国的狗说"woof", 俄罗斯的狗说"тяв"')

// Step 1: Given a character code, find the corresponding script (if any)
const characterScript = code => {
  for (let script of SCRIPTS) {
    if (
      script.ranges.some(([from, to]) => {
        return code >= from && code < to;
      })
    ) {
      return script;
    }
  }
  return null;
};
// console.log(characterScript(121));

// Step 2: Take an array and a callback(test), return a new array of objects, which include NAME and COUNT properties (object format: {name: ..., count: ...})
const countBy = (arr, test) => {
  let newArr = [];
  for (let item of arr) {
    let name = test(item);
    let known = newArr.findIndex(el => el.name == name);
    if (known == -1) {
      newArr.push({ name, count: 1 });
    } else {
      newArr[known].count++;
    }
  }
  return newArr;
};
// console.log(countBy([1, 2, 3, 4, 5], (n) => n > 2));
// -> [{name: false, count: 2},{name:true, count:3}]

// Step 3
const textScripts = text => {
  // Count the characters by name
  let scripts = countBy(text, char => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.name : 'none';
  }).filter(({ name }) => name != 'none');

  // Calc total || NOthing found
  let total = scripts.reduce((n, { count }) => n + count, 0);
  if (total == 0) return 'No scripts found';

  return scripts
    .map(({ name, count }) => {
      return `${Math.round((count * 100) / total)}% ${name}`;
    })
    .join(', ');
};

// console.log(textScripts('英国的狗说"woof", 俄罗斯的狗说"тяв"'));
////////////////////////////////////////////
// Chpt.5 Higher-Order Functions - Exercises
// #1 FLATTENING
let arrays = [[1, 2, 3], [4, 5], [6]];
arrays.reduce((a, b) => a.concat(b));
// → [1, 2, 3, 4, 5, 6]
////////////////////////////////////////////
// #2 YOUR OWN LOOP
function loop(value, testFunction, updateFunction, bodyFunction) {
  // testFunction returns true || false
  if (!testFunction(value)) return;
  bodyFunction(value);
  value = updateFunction(value);
  return loop(value, testFunction, updateFunction, bodyFunction);
}

// loop(
//   3,
//   (n) => n > 0,
//   (n) => n - 1,
//   console.log
// );
// → 3
// → 2
// → 1
////////////////////////////////////////////
// #3 EVERYTHING
/*
//ver.1 - loop
function everyV1(arr, test) {
  for(let item of arr){
    if (!test(item)) return false;
  }
  return true;
}

//ver.2 - some method
function everyV2(arr, test) {
  // 1. all pass test -> true (same is like every)
  arr.some((n)=>!test(n)) 
  // 2. partially pass test -> false (same is different from every)
  // IMPORTANT HINT: De Morgan's laws: a && b = !(!a || !b)
  !arr.some((n)=>test(n)) = !arr.some((n)=>!test(n))
  // 3. none pass test -> false (same is like every)
  arr.some((n)=>test(n)) 
}
*/
function everyV1(arr, test) {
  for (let item of arr) {
    if (!test(item)) return false;
  }
  return true;
}
function everyV2(arr, test) {
  return !arr.some(n => !test(n));
}
// console.log(everyV2([1, 3, 5], (n) => n < 10));
// // → true
// console.log(everyV2([2, 4, 16], (n) => n < 10));
// // → false
// console.log(everyV2([], (n) => n < 10));
// // → true

////////////////////////////////////////////
// #4 DOMINANT WRITING DIRECTION
function dominantDirection(text) {
  let counted = countBy(text, char => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.direction : 'none';
  }).filter(({ name }) => name != 'none');
  if (counted.length == 0) return 'ltr';
  return counted.reduce((a, b) => (a.count > b.count ? a : b)).name;
}

// console.log(dominantDirection("Hello!"));
// // → ltr
// console.log(dominantDirection("Hey, مساء الخير"));
// // → rtl
