import express from 'express';
import mongoose from 'mongoose';
import passport from './config/passport.js';
import sessionRoutes from './routes/sessions.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Rutas
app.use('/api/sessions', sessionRoutes);

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('🟢 Conectado a MongoDB'))
    .catch(err => console.error('🔴 Error conectando a MongoDB:', err));

app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
