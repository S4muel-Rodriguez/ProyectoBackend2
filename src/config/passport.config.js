import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

// Configuración de la estrategia local (registro y login)
passport.use('register', new LocalStrategy({ 
  usernameField: 'email', 
  passReqToCallback: true 
}, async (req, email, password, done) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return done(null, false, { message: 'El usuario ya existe' });
    }
    const hashedPassword = bcrypt.hashSync(password, 10); // Hashea la contraseña
    const newUser = new User({
      email,
      password: hashedPassword,
      ...req.body, // Otros campos como nombre, etc.
    });
    const savedUser = await newUser.save();
    return done(null, savedUser);
  } catch (err) {
    return done(err);
  }
}));

passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false, { message: 'Usuario no encontrado' });
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return done(null, false, { message: 'Contraseña incorrecta' });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

// Configuración de la estrategia JWT
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'secret', // Usa tu clave secreta o la variable de entorno
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

passport.use(strategy);

// Exportamos la función para inicializar Passport
export default function initializePassport() {
  passport.use('register', passport._strategies['register']);
  passport.use('login', passport._strategies['login']);
  passport.use(strategy);
}
