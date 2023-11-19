"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INVALID_QUERIES_JSON = exports.VALID_QUERIES_JSON = exports.INVALID_HEX_COLORS_SPECIAL = exports.INVALID_HEX_COLORS = exports.VALID_HEX_COLORS = void 0;
// ========= api/:size/: | hexColor =========
const VALID_HEX_COLORS = [
    "000000",
    "ffffff",
    "ff0000",
    "00ff00",
    "0000ff",
    "ffff00",
    "00ffff",
    "ff00ff",
    "c0c0c0",
    "#eee",
    "#fff",
    "#a50",
];
exports.VALID_HEX_COLORS = VALID_HEX_COLORS;
const INVALID_HEX_COLORS = [
    "ewqewq",
    "ff000",
    "00ff0",
    "00x",
    "lalala",
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
exports.INVALID_HEX_COLORS = INVALID_HEX_COLORS;
const INVALID_HEX_COLORS_SPECIAL = ["%", "%2", "%5", "%6", "%7", "%8", "%9", "%d", "%e", "%f", "%3"]; // '?','#','.', '/', '\\' ... are not allowed in the URL to test
exports.INVALID_HEX_COLORS_SPECIAL = INVALID_HEX_COLORS_SPECIAL;
const VALID_QUERIES_JSON = ["?json=true"];
exports.VALID_QUERIES_JSON = VALID_QUERIES_JSON;
const INVALID_QUERIES_JSON = [
    "?json=1",
    "?json=0",
    "?json=",
    "?json=undefined",
    "?json=null",
    "?json=NaN",
    "?json=string",
    "?json=object",
    "?json=array",
];
exports.INVALID_QUERIES_JSON = INVALID_QUERIES_JSON;
