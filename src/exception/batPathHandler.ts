import { Request, Response, NextFunction } from "express";
function badPathHandler(req: Request, res: Response, next: NextFunction) {
  let err = null;
  try {
    decodeURIComponent(req.path);
    console.log(req.path);
  } catch (e) {
    err = e;
  }
  if (err) {
    console.log(err, req.url);
    res.status(400).json({ error: `Bad request, path is not valid: '${req.url}'` });
  }
  next();
}

export default badPathHandler;
