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
// All valid sizes should return a 200 status code, a Content-Type of image/jpeg, a Content-Length > 0 and a Buffer body
constants_1.VALID_SIZES.forEach((intValue) => {
    (0, test_1.test)(`VALID INPUT | GET api/${intValue}`, ({ request }) => __awaiter(void 0, void 0, void 0, function* () {
        // 1. GET Request API_URL
        const response = yield request.get(`${constants_1.API_URL}/api/${intValue}`);
        // 2. [Status] Assert that the status code is 200
        (0, test_1.expect)(response.status()).toBe(200);
        // 3. [Content-Type] Assert that the response Content-Type is correct (image/jpeg)
        (0, test_1.expect)(response.headers()["content-type"]).toBe("image/jpeg");
        // 4. [Content-Length] Assert that the response Content-Length is > 0
        (0, test_1.expect)(Number(response.headers()["content-length"])).toBeGreaterThan(0);
        // 5. [Body] Assert that the response body is correct (type: Buffer)
        const responseBody = yield response.body();
        (0, test_1.expect)(responseBody).toBeInstanceOf(Buffer);
    }));
});
//
constants_1.INVALID_SIZES_OUT_OF_RANGE.forEach((intValue) => {
    (0, test_1.test)(`INVALID INPUT | GET api/${intValue}`, ({ request }) => __awaiter(void 0, void 0, void 0, function* () {
        // 1. GET Request API_URL
        const response = yield request.get(`${constants_1.API_URL}/api/${intValue}`);
        // console.log(response);
        // 2. [Status] Assert that the status code is 400
        (0, test_1.expect)(response.status()).toBe(400);
        // 3. [Content-Type] Assert that the response Content-Type is correct (application/json)
        (0, test_1.expect)(response.headers()["content-type"]).toContain("application/json");
        // 4. [Body] Assert that the response body is correct (type: JSON)
        const responseBody = yield response.json();
        (0, test_1.expect)(responseBody).toEqual({
            error: `Requested size is out of range`,
        });
    }));
});
// All invalid sizes should return a 400 status code, a Content-Type of application/json and a JSON body
constants_1.INVALID_SIZES.forEach((stringValue) => {
    (0, test_1.test)(`INVALID INPUT | GET api/${stringValue}`, ({ request }) => __awaiter(void 0, void 0, void 0, function* () {
        // 1. GET Request API_URL
        const response = yield request.get(`${constants_1.API_URL}/api/${stringValue}`);
        // console.log(response);
        // 2. [Status] Assert that the status code is 400
        (0, test_1.expect)(response.status()).toBe(400);
        // 3. [Content-Type] Assert that the response Content-Type is correct (application/json)
        (0, test_1.expect)(response.headers()["content-type"]).toContain("application/json");
        // 4. [Body] Assert that the response body is correct (type: JSON)
        const responseBody = yield response.json();
        (0, test_1.expect)(responseBody).toEqual({
            error: `Invalid literal for int() with base 10: '${stringValue}'`,
        });
    }));
});
// All invalid sizes (special characters like '%') should return a 400 status code, a Content-Type of application/json and a JSON body
constants_1.INVALID_SIZES_SPECIAL.forEach((stringValue) => {
    (0, test_1.test)(`INVALID INPUT | GET api/${stringValue}`, ({ request }) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get(`${constants_1.API_URL}/api/${stringValue}`);
        // console.log(response);
        // 2. [Status] Assert that the status code is 400
        (0, test_1.expect)(response.status()).toBe(400);
        // 3. [Content-Type] Assert that the response Content-Type is correct (application/json)
        (0, test_1.expect)(response.headers()["content-type"]).toContain("application/json");
        // 4. [Body] Assert that the response body is correct (type: JSON)
        const responseBody = yield response.json();
        (0, test_1.expect)(responseBody).toEqual({
            error: `Bad request, path is not valid: '/api/${stringValue}'`,
        });
    }));
});
