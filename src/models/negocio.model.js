import mongoose from "mongoose";

const negocioSchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true },
    productos: { type: [String], required: true }
});

const Negocio = mongoose.model("Negocio", negocioSchema);
export default Negocio;
