import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/User.js';


const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'secret',
};

const strategy = new JwtStrategy(opts, async (jwtPayload, done) => {
  try {
    const user = await User.findById(jwtPayload.id);
    if (user) return done(null, user);
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
});

export default function initializePassport() {
  passport.use(strategy);
}

