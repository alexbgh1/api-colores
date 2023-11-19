import { test, expect } from "@playwright/test";
import { API_URL, VALID_SIZES, INVALID_SIZES_OUT_OF_RANGE, INVALID_SIZES, INVALID_SIZES_SPECIAL } from "./constants";

// All valid sizes should return a 200 status code, a Content-Type of image/jpeg, a Content-Length > 0 and a Buffer body
VALID_SIZES.forEach((intValue) => {
  test(`VALID INPUT | GET api/${intValue}`, async ({ request }) => {
    // 1. GET Request API_URL
    const response = await request.get(`${API_URL}/api/${intValue}`);

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

//
INVALID_SIZES_OUT_OF_RANGE.forEach((intValue) => {
  test(`INVALID INPUT | GET api/${intValue}`, async ({ request }) => {
    // 1. GET Request API_URL
    const response = await request.get(`${API_URL}/api/${intValue}`);

    // 2. [Status] Assert that the status code is 400
    expect(response.status()).toBe(400);

    // 3. [Content-Type] Assert that the response Content-Type is correct (application/json)
    expect(response.headers()["content-type"]).toContain("application/json");

    // 4. [Body] Assert that the response body is correct (type: JSON)
    const responseBody = await response.json();
    expect(responseBody).toEqual({
      error: `Requested size is out of range`,
    });
  });
});

// All invalid sizes should return a 400 status code, a Content-Type of application/json and a JSON body
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

// All invalid sizes (special characters like '%') should return a 400 status code, a Content-Type of application/json and a JSON body
INVALID_SIZES_SPECIAL.forEach((stringValue) => {
  test(`INVALID INPUT | GET api/${stringValue}`, async ({ request }) => {
    const response = await request.get(`${API_URL}/api/${stringValue}`);

    // 2. [Status] Assert that the status code is 400
    expect(response.status()).toBe(400);

    // 3. [Content-Type] Assert that the response Content-Type is correct (application/json)
    expect(response.headers()["content-type"]).toContain("application/json");

    // 4. [Body] Assert that the response body is correct (type: JSON)
    const responseBody = await response.json();
    expect(responseBody).toEqual({
      error: `Bad request, path is not valid: '/api/${stringValue}'`,
    });
  });
});
