"use strict";
// Chpt.2 Program Structure
// #1 Looping a triangle
// My solution
let startingLine = "";
for (let i = 0; i < 7; i++) {
  startingLine += "#";
  console.log(startingLine);
}
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
