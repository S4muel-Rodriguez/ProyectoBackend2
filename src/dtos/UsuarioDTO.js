import UsuarioDTO from "../dtos/UsuarioDTO.js";

export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioService.getAllUsuarios();
    const usuariosDTO = usuarios.map(usuario => new UsuarioDTO(usuario));
    res.status(200).json(usuariosDTO);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};
