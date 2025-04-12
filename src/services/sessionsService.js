const User = require("../models/User");
const bcrypt = require("bcrypt");

const registerUser = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) throw new Error("Usuario ya registrado");

  const user = new User(userData);
  return await user.save();
};

const validateUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Usuario no encontrado");

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw new Error("Contraseña incorrecta");

  return user;
};

module.exports = { registerUser, validateUser };
