import dotenv from "dotenv";
dotenv.config();

const API_URL = `http://localhost:${process.env.PORT}`;
const VALID_SIZES = [1, 1.5, 243, 359, 1000];
const INVALID_SIZES_OUT_OF_RANGE = [-1000, -1, 0, 1001];
const INVALID_SIZES = [
  "a",
  "1a",
  "a1",
  "1,1",
  "1.1.1",
  "1,1,1",
  "{}",
  "[]",
  "true",
  "false",
  "null",
  "undefined",
  "~",
  "!",
  "@",
  "$",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "-",
  "=",
  "+",
  "[",
  "]",
  "{",
  "}",
  "|",
  ";",
  ":",
  "'",
  '"',
  ",",
  "<",
  ">",
];

const INVALID_SIZES_SPECIAL = ["%"]; // '?','#','.', '/', '\\' ... are not allowed in the URL to test

export { API_URL, VALID_SIZES, INVALID_SIZES_OUT_OF_RANGE, INVALID_SIZES, INVALID_SIZES_SPECIAL };
