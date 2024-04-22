import { Request, Response, NextFunction } from "express";

function badPathHandler(req: Request, res: Response, next: NextFunction) {
  try {
    // Intentar decodificar el componente de la URL
    decodeURIComponent(req.path);
    next(); // Pasar al siguiente middleware si la decodificación fue exitosa
  } catch (e) {
    // Si ocurre un error al decodificar, responder con un error 400
    if (e instanceof URIError) res.status(400).json({ error: `Bad request, path is not valid: '${req.url}'` });
    else res.status(500).json({ error: "Internal server error" });
  }
}
export default badPathHandler;
