"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Permite que la aplicación entienda JSON
dotenv_1.default.config(); // Lee las variables de entorno desde .env
const PORT = process.env.PORT || 4000; // Define el puerto, usa 4005 si no se especifica en las variables de entorno
app.get("/", (_req, res) => {
    res.send("¡Hola, mundo!");
});
app.listen(PORT, () => {
    console.log(`La aplicación está escuchando en el puerto ${PORT}`);
});
