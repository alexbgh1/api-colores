import { Router } from "express";

import { getColor } from "../controllers/colorController";

const router = Router();

// Lo que quiero hacer es primero definir una "caja vacía"
// /api/:size/:hexColor

router.get("/:size", getColor);
router.get("/:size/:hexColor?", getColor);

export default router;
