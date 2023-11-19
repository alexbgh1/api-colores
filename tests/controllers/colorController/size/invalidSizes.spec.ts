import { test, expect } from "@playwright/test";
import { API_URL } from "../../../constants";
import { INVALID_SIZES } from "./constants";

INVALID_SIZES.forEach((stringValue) => {
  test(`INVALID INPUT | GET api/${stringValue}`, async ({ request }) => {
    // 1. GET Request API_URL
    const response = await request.get(`${API_URL}/api/${stringValue}`);

    // 2. [Status] Assert that the status code is 400
    expect(response.status()).toBe(400);

    // 3. [Content-Type] Assert that the response Content-Type is correct (application/json)
    expect(response.headers()["content-type"]).toContain("application/json");

    // 4. [Body] Assert that the response body is correct (type: JSON)
    const responseBody = await response.json();
    expect(responseBody).toEqual({
      error: `Invalid literal for int() with base 10: '${stringValue}'`,
    });
  });
});
