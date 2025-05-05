import jwt from "jsonwebtoken";

export const currentUser = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("No estás autenticado.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send("Token inválido.");
  }
};

export const adminAuth = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).send("Acceso denegado.");
  }
  next();
};
