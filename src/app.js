import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Rutas
import sessionRouter from "./routes/sessions.routes.js";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import ticketRouter from "./routes/ticket.routes.js";
import usuariosRouter from "./routes/usuarios.routes.js"; // Agregado
import negociosRouter from "./routes/negocios.routes.js"; // Agregado

dotenv.config(); // Cargar variables de entorno

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Conexión exitosa a MongoDB"))
  .catch((error) => console.error("❌ Error conectándose a MongoDB:", error));

// Rutas
app.use("/api/sessions", sessionRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/tickets", ticketRouter);
app.use("/api/usuarios", usuariosRouter); // Agregado
app.use("/api/negocios", negociosRouter); // Agregado

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Error interno del servidor" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});

export default app;
