export const autorizarRol = (rolesPermitidos) => (req, res, next) => {
    const { usuario } = req;
    if (!usuario || !rolesPermitidos.includes(usuario.rol)) {
      return res.status(403).json({ error: "Acceso denegado" });
    }
    next();
  };
  