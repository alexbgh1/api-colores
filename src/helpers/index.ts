import { createCanvas, Canvas } from "canvas";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (_, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

const contrastLetters = (hex: string): string => {
  const rgb = hexToRgb(hex);
  if (rgb) {
    const { r, g, b } = rgb;
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 125 ? "#000000" : "#ffffff";
  }
  return "#000000";
};

// CREATE CANVAS
function createCustomCanvas(
  width: number,
  height: number,
  text: string,
  fillColorHEX: string,
  contrastColorHEX: string
): Buffer {
  const canvas: Canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Dibujamos el fondo
  ctx.fillStyle = fillColorHEX;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = contrastColorHEX;
  ctx.font = `${width / 5}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, width / 2, height / 2);

  // Convertimos la imagen a Buffer en formato JPEG
  const buffer = canvas.toBuffer("image/jpeg");
  return buffer;
}

export { hexToRgb, contrastLetters, createCustomCanvas };
