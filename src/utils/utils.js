export const procesaErrores = (error, res) => {
    if (error.name === "ValidationError") {
        // Manejo de errores de validación
        const mensajes = Object.values(error.errors).map((err) => err.message);
        return res.status(400).json({ error: "Error de validación", detalles: mensajes });
    }

    if (error.code === 11000) {
        // Manejo de duplicación de clave única
        const campoDuplicado = Object.keys(error.keyValue).join(", ");
        return res.status(409).json({ error: `El campo ${campoDuplicado} ya existe.` });
    }

    // Errores generales
    console.error("Error no manejado:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
};
