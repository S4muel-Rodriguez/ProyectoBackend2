import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import sessionRouter from './routes/sessions.js';
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Inicializar Passport
initializePassport();
app.use(passport.initialize());

// Rutas
app.use('/api/sessions', sessionRouter);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(PORT, () => console.log(`🚀 Servidor en puerto ${PORT}`));
  })
  .catch((error) => {
    console.error('❌ Error conectando a MongoDB:', error.message);
  });
