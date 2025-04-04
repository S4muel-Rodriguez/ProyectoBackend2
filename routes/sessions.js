import express from 'express';
import { login, register, current } from '../controllers/sessionsController.js';
import passport from 'passport';
import { authMiddleware } from '../middlewares/auth.js';

router.get('/current', authMiddleware, current);

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/current', passport.authenticate('jwt', { session: false }), current);

export default router;
