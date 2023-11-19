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
// All invalid sizes (special characters like '%') should return a 400 status code, a Content-Type of application/json and a JSON body
constants_2.INVALID_SIZES_SPECIAL.forEach((stringValue) => {
    (0, test_1.test)(`INVALID INPUT | GET api/${stringValue}`, ({ request }) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get(`${constants_1.API_URL}/api/${stringValue}`);
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
