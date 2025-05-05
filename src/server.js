
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import authRoutes from './routes/auth.routes.js';
import sessionRouter from './routes/session.routes.js';
import { errorHandler } from "./middlewares/errorHandler.js";
import dotenv from 'dotenv';
dotenv.config(); // Cargar variables de entorno
console.log('MONGO_URL:', process.env.MONGO_URL); // Verificar URI cargada

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// Inicializar Passport
initializePassport();
app.use(passport.initialize());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRouter);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error conectando a MongoDB:', error.message);
  });
