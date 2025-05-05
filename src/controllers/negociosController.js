import { procesaErrores } from "../utils.js";
import Negocio from "../models/negocio.model.js"; // Asegúrate de importar tu modelo de negocio

// Obtener todos los negocios
export const getNegocios = async (req, res) => {
    try {
        const negocios = await Negocio.find(); // Obtiene todos los negocios desde la base de datos
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ negocios });
    } catch (error) {
        return procesaErrores(error, res);
    }
};

// Crear un nuevo negocio
export const createNegocio = async (req, res) => {
    const { nombre, productos } = req.body;

    if (!nombre || !productos) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `nombre y productos son requeridos` });
    }

    if (!Array.isArray(productos)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `productos debe ser un array` });
    }

    try {
        // Verifica si ya existe un negocio con el mismo nombre
        const existeNegocio = await Negocio.findOne({ nombre });
        if (existeNegocio) {
            return res.status(409).json({ error: `El negocio ya existe` });
        }

        const nuevoNegocio = await Negocio.create({ nombre, productos });
        res.setHeader('Content-Type', 'application/json');
        return res.status(201).json({ message: `Negocio creado con éxito`, nuevoNegocio });
    } catch (error) {
        return procesaErrores(error, res);
    }
};
