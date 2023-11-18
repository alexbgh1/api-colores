interface ColorSpaces {
  rgb: {
    r: number;
    g: number;
    b: number;
  } | null;
  hex: string;
}
interface Meta {
  size: number;
  text: string;
  json: boolean;
}

export default interface Color {
  meta: Meta;
  data: {
    size: number;
    colorSpaces: ColorSpaces;
  };
}
