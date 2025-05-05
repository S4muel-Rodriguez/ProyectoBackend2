import { procesaErrores } from "../utils.js";
import User from "../models/user.model.js"; // Asegúrate de importar tu modelo de usuario
import { isValidObjectId } from "mongoose";

// Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await User.find(); // Obtiene todos los usuarios desde la base de datos
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ usuarios });
    } catch (error) {
        return procesaErrores(error, res);
    }
};

// Obtener un usuario por ID
export const getUsuarioById = async (req, res) => {
    const { uid } = req.params;

    if (!isValidObjectId(uid)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `ID inválido de MongoDB` });
    }

    try {
        const usuario = await User.findById(uid); // Busca el usuario por ID
        if (!usuario) {
            return res.status(404).json({ error: `Usuario no encontrado` });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ usuario });
    } catch (error) {
        return procesaErrores(error, res);
    }
};

// Crear un nuevo usuario
export const createUser = async (req, res) => {
    const { nombre, email, password, role } = req.body;

    if (!nombre || !email || !password) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `nombre, email y password son requeridos` });
    }

    try {
        // Verifica si ya existe un usuario con el mismo email
        const existeUsuario = await User.findOne({ email });
        if (existeUsuario) {
            return res.status(409).json({ error: `El email ya está registrado` });
        }

        const nuevoUsuario = await User.create({ nombre, email, password, role });
        res.setHeader('Content-Type', 'application/json');
        return res.status(201).json({ message: `Usuario creado con éxito`, nuevoUsuario });
    } catch (error) {
        return procesaErrores(error, res);
    }
};
