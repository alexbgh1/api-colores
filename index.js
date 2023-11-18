"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const colorRoutes_1 = __importDefault(require("./routes/colorRoutes"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config(); // Lee las variables de entorno del archivo .env
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Permite que la aplicación entienda JSON
const PORT = process.env.PORT || 4000;
app.use(express_1.default.static(path_1.default.join(__dirname, "web")));
app.use("/api", colorRoutes_1.default);
app.get("/", (_req, res) => {
    const pathHTML = path_1.default.join(__dirname, "web", "index.html");
    res.sendFile(pathHTML);
});
app.listen(PORT, () => {
    console.log(`La aplicación está escuchando en el puerto ${PORT}`);
});
