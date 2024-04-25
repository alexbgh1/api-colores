import express from "express";
import dotenv from "dotenv";
import colorRoutes from "./routes/colorRoutes";
import badPathHandler from "./exception/badPathHandler";
import path from "path";

dotenv.config(); // Lee las variables de entorno del archivo .env

const app = express();
app.disable('x-powered-by');

// Middlewares
app.use(express.json()); // Permite que la aplicación entienda JSON
app.use(express.static(path.join(__dirname, "web"))); // Permite servir archivos estáticos

const PORT = process.env.PORT || 4000;

// Handler de rutas inválidas
app.use(badPathHandler); //

// Routes
app.use("/api", colorRoutes);
app.get("/", (_req, res) => {
  const pathHTML = path.join(__dirname, "web", "index.html");
  res.sendFile(pathHTML);
});

app.listen(PORT, () => {
  console.log(`La aplicación está escuchando en el puerto ${PORT}`);
});
