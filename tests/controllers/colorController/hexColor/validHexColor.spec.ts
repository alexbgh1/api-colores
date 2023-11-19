import { test, expect } from "@playwright/test";
import { API_URL } from "../../../constants";
import { VALID_HEX_COLORS } from "./constants";

// All valid sizes should return a 200 status code, a Content-Type of image/jpeg, a Content-Length > 0 and a Buffer body
VALID_HEX_COLORS.forEach((stringValue) => {
  const size = 100;
  test(`VALID INPUT | GET api/${size}/${stringValue}`, async ({ request }) => {
    // 1. GET Request API_URL
    const response = await request.get(`${API_URL}/api/${size}/${stringValue}`);

    // 2. [Status] Assert that the status code is 200
    expect(response.status()).toBe(200);

    // 3. [Content-Type] Assert that the response Content-Type is correct (image/jpeg)
    expect(response.headers()["content-type"]).toBe("image/jpeg");

    // 4. [Content-Length] Assert that the response Content-Length is > 0
    expect(Number(response.headers()["content-length"])).toBeGreaterThan(0);

    // 5. [Body] Assert that the response body is correct (type: Buffer)
    const responseBody = await response.body();
    expect(responseBody).toBeInstanceOf(Buffer);
  });
});
