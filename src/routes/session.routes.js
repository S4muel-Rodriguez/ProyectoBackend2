import express from 'express';
import passport from 'passport';

const router = express.Router();
 
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.status(200).json({ user: req.user });
});

export default router;
