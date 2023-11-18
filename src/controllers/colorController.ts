import { Request, Response } from "express";
import Color from "../models/color";
import { DEFAULT_COLOR, DEFAULT_TEXT_COLOR, SIZE_LIMIT } from "../constants";
import { hexToRgb, contrastLetters, createCustomCanvas } from "../helpers";

const getColor = async (req: Request, res: Response) => {
  // /api/:size
  const { size, hexColor } = req.params;
  // /api/size?text="hola mundo"
  const text = (req.query.text as string) || `${size}x${size}`;
  // /api/size?json=true
  const isJson = req.query.json || "false";

  // ===================== Validaciones Size =====================
  // Validamos: size debe ser un número
  if (isNaN(Number(size))) {
    return res.status(400).json({ error: `Invalid literal for int() with base 10: '${size}'` });
  }
  const sizeNumber = Math.floor(Number(size));

  // Validamos: size debe ser mayor a 0
  if (sizeNumber <= 0 || sizeNumber > SIZE_LIMIT) {
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

  const fillColorHEX = hexColor ? `#${hexColor}` : DEFAULT_COLOR;
  const contrastColorHEX = contrastLetters(fillColorHEX) || DEFAULT_TEXT_COLOR;
  const fillColorRGB = hexToRgb(fillColorHEX);
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
    const responseObject: Color = {
      meta,
      data: {
        size: sizeNumber,
        colorSpaces,
      },
    };
    return res.json(responseObject);
  }

  // Retornamos una "imágen" de size x size
  const sizeImageBuffer: Buffer = createCustomCanvas(sizeNumber, sizeNumber, text, fillColorHEX, contrastColorHEX);
  res.set("Content-Type", "image/jpeg");
  return res.send(sizeImageBuffer);
};

export { getColor };
