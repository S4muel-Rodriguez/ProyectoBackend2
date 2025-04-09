import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { hashPassword, comparePassword } from '../utils/bcrypt.js';

export const register = async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;
        const hashedPassword = hashPassword(password);
        const newUser = new User({ first_name, last_name, email, age, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar usuario', error });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !comparePassword(password, user.password)) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true }).json({ message: 'Login exitoso', token });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
};

export const current = async (req, res) => {
    res.json({ user: req.user });
};
