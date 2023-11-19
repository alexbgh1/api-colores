"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.INVALID_SIZES_SPECIAL = exports.INVALID_SIZES = exports.INVALID_SIZES_OUT_OF_RANGE = exports.VALID_SIZES = exports.API_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const API_URL = `http://localhost:${process.env.PORT}`;
exports.API_URL = API_URL;
const VALID_SIZES = [1, 1.5, 243, 359, 1000];
exports.VALID_SIZES = VALID_SIZES;
const INVALID_SIZES_OUT_OF_RANGE = [-1000, -1, 0, 1001];
exports.INVALID_SIZES_OUT_OF_RANGE = INVALID_SIZES_OUT_OF_RANGE;
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
exports.INVALID_SIZES = INVALID_SIZES;
const INVALID_SIZES_SPECIAL = ["%"]; // '?','#','.', '/', '\\' ... are not allowed in the URL to test
exports.INVALID_SIZES_SPECIAL = INVALID_SIZES_SPECIAL;
