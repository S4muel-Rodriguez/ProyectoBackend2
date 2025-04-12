const { getCartByUserId, addToCart, removeFromCart } = require("../services/cartsService");

const getCart = async (req, res) => {
  try {
    const cart = await getCartByUserId(req.user.id);
    res.send(cart || { message: "Carrito vacío" });
  } catch (error) {
    res.status(500).send({ message: "Error al obtener el carrito", error: error.message });
  }
};

const addItemToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await addToCart(req.user.id, productId, quantity);
    res.send({ message: "Producto añadido al carrito", cart });
  } catch (error) {
    res.status(400).send({ message: "Error al añadir al carrito", error: error.message });
  }
};

const removeItemFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const cart = await removeFromCart(req.user.id, productId);
    res.send({ message: "Producto eliminado del carrito", cart });
  } catch (error) {
    res.status(400).send({ message: "Error al eliminar del carrito", error: error.message });
  }
};

module.exports = { getCart, addItemToCart, removeItemFromCart };
