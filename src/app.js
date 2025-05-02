import express from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';
 import app from './server.js';
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());

// Rutas
app.use('/api/sessions', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

export default app;
