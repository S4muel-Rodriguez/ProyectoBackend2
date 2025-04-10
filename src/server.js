import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import authRoutes from './routes/auth.routes.js';
import sessionRouter from './routes/session.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URL; //mongodb+srv://samurodriguez565:samu@backendii-proyect.bn4x9xw.mongodb.net/?retryWrites=true&w=majority&appName=BackendII-Proyect

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
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error conectando a MongoDB:', error.message);
  });
