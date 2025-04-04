import { Router } from 'express';
import passport from 'passport';
import { authMiddleware } from '../middlewares/auth.js';

const router = Router();

router.get('/current', authMiddleware, (req, res) => {
    res.json({ status: 'success', user: req.user });
});

export default router;

