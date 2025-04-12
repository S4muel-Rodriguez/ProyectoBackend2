const Cart = require("../models/cart");
const Product = require("../models/Product");

const getCartByUserId = async (userId) => {
  return await Cart.findOne({ userId }).populate("products.productId");
};

const addToCart = async (userId, productId, quantity) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Producto no encontrado");
  if (product.stock < quantity) throw new Error("Stock insuficiente");

  const cart = await Cart.findOne({ userId }) || new Cart({ userId, products: [] });
  const existingProduct = cart.products.find((item) => item.productId.toString() === productId);

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.products.push({ productId, quantity });
  }

  product.stock -= quantity;
  await product.save();
  await cart.save();
  return cart;
};

const removeFromCart = async (userId, productId) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) throw new Error("Carrito no encontrado");

  cart.products = cart.products.filter((item) => item.productId.toString() !== productId);
  await cart.save();
  return cart;
};

module.exports = { getCartByUserId, addToCart, removeFromCart };
