import { test, expect } from "@playwright/test";
import { API_URL } from "../../../constants";
import { VALID_QUERIES_JSON } from "./constants";
import { Meta, ColorSpaces, Color } from "../../../models/color";
import { hexToRgb } from "../../../helpers";

// All valid sizes should return a 200 status code, a Content-Type of image/jpeg, a Content-Length > 0 and a Buffer body
VALID_QUERIES_JSON.forEach((stringValue) => {
  ["ff0000", "232", "fff", "931000"].forEach((hexColor) => {
    const size = 100;
    test(`INVALID INPUT | GET api/${size}/${hexColor}${stringValue}`, async ({ request }) => {
      // 1. GET Request API_URL
      const response = await request.get(`${API_URL}/api/${size}/${hexColor}${stringValue}`);

      // 2. [Status] Assert that the status code is 200
      expect(response.status()).toBe(200);

      // 3. [Content-Type] Assert that the response Content-Type is correct (application/json)
      expect(response.headers()["content-type"]).toContain("application/json");

      // 4. [Body] Assert that the response body is correct (type: JSON)
      const responseBody = await response.json();

      // 5. [Body] Assert that the response body is correct (type: JSON)
      const meta: Meta = {
        json: true,
        size,
        text: `${size}x${size}`,
      };
      const colorSpaces: ColorSpaces = {
        hex: `#${hexColor}`,
        rgb: hexToRgb(hexColor),
      };
      const data = {
        colorSpaces,
        size,
      };

      const color: Color = {
        meta,
        data,
      };

      expect(responseBody).toStrictEqual(color);
    });
  });
});
