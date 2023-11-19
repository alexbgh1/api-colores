import { test, expect } from "@playwright/test";
import { API_URL } from "../../../constants";
import { INVALID_HEX_COLORS_SPECIAL } from "./constants";

// All valid sizes should return a 200 status code, a Content-Type of image/jpeg, a Content-Length > 0 and a Buffer body
INVALID_HEX_COLORS_SPECIAL.forEach((stringValue) => {
  const size = 100;
  test(`INVALID INPUT | GET api/${size}/${stringValue}`, async ({ request }) => {
    // 1. GET Request API_URL
    const response = await request.get(`${API_URL}/api/${size}/${stringValue}`);

    // 2. [Status] Assert that the status code is 200
    expect(response.status()).toBe(400);

    // 3. [Content-Type] Assert that the response Content-Type is correct (application/json)
    expect(response.headers()["content-type"]).toContain("application/json");

    // 4. [Body] Assert that the response body is correct (type: JSON)
    const responseBody = await response.json();
    expect(responseBody).toEqual({
      error: `Bad request, path is not valid: '/api/100/${stringValue}'`,
    });
  });
});
