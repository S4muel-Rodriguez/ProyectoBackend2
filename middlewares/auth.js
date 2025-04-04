import passport from 'passport';

export const authMiddleware = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({ message: 'No autorizado. Token inválido o no proporcionado.' });
        }
        req.user = user; // Guardamos el usuario en la request
        next();
    })(req, res, next);
};
