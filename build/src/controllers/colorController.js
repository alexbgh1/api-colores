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
exports.getColor = void 0;
const constants_1 = require("../constants");
const helpers_1 = require("../helpers");
const getColor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // /api/:size
    const { size, hexColor } = req.params;
    console.log(req.params);
    // /api/size?text="hola mundo"
    const text = req.query.text || `${size}x${size}`;
    // /api/size?json=true
    const isJson = req.query.json || "false";
    // ===================== Validaciones Size =====================
    // Validamos: size debe ser un número
    if (isNaN(Number(size))) {
        return res.status(400).json({ error: `Invalid literal for int() with base 10: '${size}'` });
    }
    const sizeNumber = Math.floor(Number(size));
    // Validamos: size debe ser mayor a 0
    if (sizeNumber <= 0 || sizeNumber > constants_1.SIZE_LIMIT) {
        return res.status(400).json({ error: `Requested size is out of range` });
    }
    // ===================== Validaciones isJson =====================
    // Validamos: isJson debe ser un booleano "true" o "false"
    if (isJson !== "true" && isJson !== "false") {
        return res.status(400).json({ error: `Invalid value for 'json': '${isJson}'` });
    }
    const isJsonBoolean = isJson === "true";
    // ===================== Validaciones hexColor =====================
    if (hexColor && !hexColor.match(/^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
        return res.status(400).json({ error: `Invalid value for 'hexColor': '${hexColor}'` });
    }
    const fillColorHEX = hexColor ? `#${hexColor}` : constants_1.DEFAULT_COLOR;
    const contrastColorHEX = (0, helpers_1.contrastLetters)(fillColorHEX) || constants_1.DEFAULT_TEXT_COLOR;
    const fillColorRGB = (0, helpers_1.hexToRgb)(fillColorHEX);
    const colorSpaces = {
        rgb: fillColorRGB,
        hex: fillColorHEX,
    };
    const meta = {
        size: sizeNumber,
        text: text,
        json: isJsonBoolean,
    };
    // ===================== Respuesta =====================
    if (isJsonBoolean) {
        const responseObject = {
            meta,
            data: {
                size: sizeNumber,
                colorSpaces,
            },
        };
        return res.json(responseObject);
    }
    // Retornamos una "imágen" de size x size
    const sizeImageBuffer = (0, helpers_1.createCustomCanvas)(sizeNumber, sizeNumber, text, fillColorHEX, contrastColorHEX);
    res.set("Content-Type", "image/jpeg");
    return res.send(sizeImageBuffer);
});
exports.getColor = getColor;
