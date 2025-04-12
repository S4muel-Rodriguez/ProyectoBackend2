const Product = require("../models/Product");

/**
 * Obtener todos los productos.
 */
const getAllProducts = async () => {
  return await Product.find();
};

/**
 * Obtener un producto por su ID.
 */
const getProductById = async (productId) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Producto no encontrado");
  return product;
};

/**
 * Crear un nuevo producto.
 */
const createProduct = async (data) => {
  const product = new Product(data);
  return await product.save();
};

/**
 * Actualizar un producto.
 */
const updateProduct = async (productId, updateData) => {
  const product = await Product.findByIdAndUpdate(productId, updateData, { new: true });
  if (!product) throw new Error("Producto no encontrado para actualizar");
  return product;
};

/**
 * Actualizar el stock de un producto.
 */
const updateProductStock = async (productId, quantity) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Producto no encontrado");

  if (quantity < 0 && Math.abs(quantity) > product.stock) {
    throw new Error("Stock insuficiente para reducir");
  }

  product.stock += quantity;
  return await product.save();
};

/**
 * Eliminar un producto.
 */
const deleteProduct = async (productId) => {
  const product = await Product.findByIdAndDelete(productId);
  if (!product) throw new Error("Producto no encontrado para eliminar");
  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  updateProductStock,
  deleteProduct,
};
