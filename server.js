import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import sessionRouter from './routes/sessions.js'; // Usa extensión .js si es ES Modules
import initializePassport from './config/passport.config.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

initializePassport();
app.use(passport.initialize());

// Tus rutas
app.use('/api/sessions', sessionRouter);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
  })
  .catch((error) => console.error('Error al conectar a MongoDB:', error));
