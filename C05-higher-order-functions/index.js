"use strict";

const SCRIPTS = require("./scripts");

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
const charCount = (script) => {
  return script.ranges.reduce((count, [from, to]) => {
    return count + (to - from);
  }, 0);
};
SCRIPTS.reduce((a, b) => {
  return charCount(a) > charCount(b) ? a : b;
});

// 4.2 Find the average year of origin for living and dead scripts
const average = (arr) => {
  return arr.reduce((a, b) => a + b) / arr.length;
};
// Average year of living scripts
average(SCRIPTS.filter((script) => script.living).map((script) => script.year));
// Average year of dead scripts
average(
  SCRIPTS.filter((script) => !script.living).map((script) => script.year)
);
