"use strict";
// Chpt.2 Program Structure - Exercises
// #1 Looping a triangle
// My solution
// let startingLine = "";
// for (let i = 0; i < 7; i++) {
//   startingLine += "#";
//   console.log(startingLine);
// }

// Answer
// for (let line = "#"; line.length < 8; line += "#") console.log(line);

// #2 FIZZBUZZ
// My solution
/*
num: 1-100;
if (num%3===0 && num%5===0) "FizzBuzz";
if (num%3===0) "Fizz";
if (num%5===0) "Buzz";
*/
// for (let i = 0; i <= 100; i++) {
//   if (i % 3 === 0 && i % 5 === 0) {
//     console.log("FizzBuzz");
//   } else if (i % 3 === 0) {
//     console.log("Fizz");
//   } else if (i % 5 === 0) {
//     console.log("Buzz");
//   } else {
//     console.log(i);
//   }
// }

// IMPORTANT Answer
// for (let n = 1; n <= 100; n++) {
//   let output = "";
//   if (n % 3 === 0) output += "Fizz";
//   if (n % 5 === 0) output += "Buzz";
//   console.log(output || n);
// }

// #3 CHESSBOARD
// My solution
const generateChessBoard = function (n, m) {
  let chessBoard = "";
  // n === even ? starting with #: starting with " ";
  for (let i = 0; i < n; i++) {
    if (i % 2 !== 0) {
      for (let j = 0; j < m; j++) {
        if (j % 2 !== 0) {
          chessBoard += " ";
        } else {
          chessBoard += "#";
        }
      }
      chessBoard += "\n";
    } else {
      for (let j = 0; j < m; j++) {
        if (j % 2 !== 0) {
          chessBoard += "#";
        } else {
          chessBoard += " ";
        }
      }
      chessBoard += "\n";
    }
  }
  return chessBoard;
};

// Revision inspired by answer
const generateChessBoard_v2 = function (x, y) {
  let chessBoard = "";
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      if ((i + j) % 2 !== 0) {
        chessBoard += " ";
      } else {
        chessBoard += "#";
      }
    }
    chessBoard += "\n";
  }
  return chessBoard;
};
const chessBoard8_8 = generateChessBoard(8, 8);
// console.log(chessBoard8_8);

// Chpt.3 Functions - Examples
// IMPORTANT #1 Use recursive to find how a number is produced by multiply 3 or add 5 (one or more times)
/*
13 -> 1*3+5+5; 24 -> 1*3*3+5+5+5
*/
const mulThreeAddFive = function (num) {
  function recursive(history, current) {
    if (current === num) {
      return history;
    } else if (current > num) {
      // IMPORTANT Return null here
      // console.log("Not an ideal number!");
      return null;
    } else {
      return (
        recursive(`${history}*3`, current * 3) ||
        recursive(`(${history}+5)`, current + 5)
      );
    }
  }
  return recursive("1", 1);
};
// console.log(mulThreeAddFive(13));

// Chpt.3 Functions - Exercises
// #1 MINIMUM
const getMin = (n, m) => (n > m ? n : m);

// IMPORTANT #2 RECURSION
const isEven = (num) => {
  if (num < 0) {
    return isEven(-num);
  } else if (num === 1) {
    return false;
  } else if (num === 0) {
    return true;
  } else {
    return isEven(num - 2);
  }
};
// console.log(isEven(72));
// console.log(isEven(-1));

// #3 BEAN COUNTING
// const countBs = (string) => {
//   let count = 0;
//   for (let i = 0; i < string.length; i++) if (string[i] === "B") count++;
//   return count;
// };

const countChar = (string, char) => {
  let count = 0;
  for (let i = 0; i < string.length; i++) if (string[i] === char) count++;
  return count;
};

const countBs = (string) => {
  return countChar(string, "B");
};

// Chpt.4 Data Structures: Objects and Arrays - Exercises
// #1 THE SUM OF A RANGE
const range = (start, end) => {
  let arr = [];
  for (let i = start; i <= end; i++) arr.push(i);
  return arr;
};
const sum = (arr) => {
  let sum = 0;
  // IMPORTANT 'let i of arr' vs. 'let i in arr'
  for (let i of arr) sum += Number(i);
  return sum;
};
// console.log(sum(range(1, 10)));

// #2 REVERSING AN ARRAY
const reverse = (arr) => {
  let newArr = [];
  for (let i of arr) newArr.unshift(i);
  return newArr;
};
const reverseArrayInPlace = (arr) => {
  let newArr = [];
  for (let i of arr) newArr.unshift(i);
  arr = newArr;
  return arr;
};
// console.log(reverseArrayInPlace([1, 2, 3]));

// IMPORTANT #3 A LIST
const arrayToList = ([...arr]) => {
  let list = null;
  for (let i = arr.length - 1; i >= 0; i--) {
    list = { value: arr[i], rest: list };
  }
  return list;
};
const listToArray = (list) => {
  let arr = [];
  for (let node = list; node; node = node.rest) {
    arr.push(node.value);
  }
  return arr;
};
const testingList = arrayToList([1, 2, 3]);
// console.log(listToArray(testingList));

const prepend = (value, list) => {
  return { value, rest: list };
};
// console.log(prepend(10, prepend(20, null)));

const nth = (list, n) => {
  if (!list) return undefined;
  else if (n === 0) return list.value;
  else return nth(list.rest, n - 1);
};
// console.log(nth(arrayToList([1, 2, 3]), 0));

// IMPORTANT #4 DEEP COMPARISON
const deepEqual = (m, n) => {
  if (m === n) return true;
  if (typeof m != "object" || typeof n != "object" || m == null || n == null)
    return false;
  let mKeys = Object.keys(m),
    nKeys = Object.keys(n);
  if (mKeys.length != nKeys.length) return false;
  for (let key of mKeys) {
    if (!nKeys.includes(key) || !deepEqual(m[key], n[key])) return false;
  }
};
// let obj = { here: { is: "an" }, object: 2 };
// console.log(deepEqual(obj, obj));
// console.log(deepEqual(obj, { here: 1, object: 2 }));
// console.log(deepEqual(obj, { here: { is: "an" }, object: 2 }));

// Chpt.5 Higher-Order Functions - Exercises
