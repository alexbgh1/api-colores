"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function badPathHandler(req, res, next) {
    let err = null;
    try {
        decodeURIComponent(req.path);
        console.log(req.path);
    }
    catch (e) {
        err = e;
    }
    if (err) {
        console.log(err, req.url);
        res.status(400).json({ error: `Bad request, path is not valid: '${req.url}'` });
    }
    next();
}
exports.default = badPathHandler;
