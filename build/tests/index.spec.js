"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const constants_1 = require("./constants");
(0, test_1.test)("Load index.html", ({ page }) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. Go to API_URL
    yield page.goto(constants_1.API_URL);
    // 2. Assert that the title is correct
    yield (0, test_1.expect)(page.title()).resolves.toMatch("Api colores");
    // 3. Assert that the heading is correct
    yield (0, test_1.expect)(page.textContent("h1")).resolves.toMatch("Api colores");
}));
