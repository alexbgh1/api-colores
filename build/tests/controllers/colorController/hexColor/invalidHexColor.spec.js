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
const constants_1 = require("../../../constants");
const constants_2 = require("./constants");
// All valid sizes should return a 200 status code, a Content-Type of image/jpeg, a Content-Length > 0 and a Buffer body
constants_2.INVALID_HEX_COLORS.forEach((stringValue) => {
    const size = 100;
    (0, test_1.test)(`INVALID INPUT | GET api/${size}/${stringValue}`, ({ request }) => __awaiter(void 0, void 0, void 0, function* () {
        // 1. GET Request API_URL
        const response = yield request.get(`${constants_1.API_URL}/api/${size}/${stringValue}`);
        // 2. [Status] Assert that the status code is 200
        (0, test_1.expect)(response.status()).toBe(400);
        // 3. [Content-Type] Assert that the response Content-Type is correct (application/json)
        (0, test_1.expect)(response.headers()["content-type"]).toContain("application/json");
        // 4. [Body] Assert that the response body is correct (type: JSON)
        const responseBody = yield response.json();
        (0, test_1.expect)(responseBody).toEqual({
            error: `Invalid value for 'hexColor': '${stringValue}'`,
        });
    }));
});
