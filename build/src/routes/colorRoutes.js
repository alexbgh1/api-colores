"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const colorController_1 = require("../controllers/colorController");
const router = (0, express_1.Router)();
// Lo que quiero hacer es primero definir una "caja vacía"
// /api/:size/:hexColor
router.get("/:size", colorController_1.getColor);
router.get("/:size/:hexColor?", colorController_1.getColor);
exports.default = router;
