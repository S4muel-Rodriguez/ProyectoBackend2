import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import cors from "cors";
import morgan from "morgan";
import initializePassport from "./config/passport.config.js";
import sessionRouter from "./routes/session.routes.js";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import ticketRouter from "./routes/ticket.routes.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));

// Passport
initializePassport();
app.use(passport.initialize());

// Rutas
app.use("/api/sessions", sessionRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/tickets", ticketRouter);

// Middleware de error global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Error interno del servidor" });
});

export default app;

