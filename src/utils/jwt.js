const jwt = require("jsonwebtoken");
const SECRET = "mi_secreto"; // Cambiar por una variable de entorno en producción.

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email, role: user.role }, SECRET, { expiresIn: "1h" });
};

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send({ message: "No autenticado" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).send({ message: "Token inválido", error: error.message });
  }
};

module.exports = { generateToken, authMiddleware };
