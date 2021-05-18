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
