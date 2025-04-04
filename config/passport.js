import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/User.js';
import cookieExtractor from '../utils/cookieExtractor.js';

const opts = {
    jwtFromRequest: cookieExtractor, // Extrae el token de la cookie
    secretOrKey: 'secretKey' // Usa una clave segura en producción
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await User.findById(jwt_payload.id);
        if (user) return done(null, user);
        return done(null, false);
    } catch (err) {
        return done(err, false);
    }
}));

export default passport;
