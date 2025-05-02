import CartDAO from '../daos/cart.dao.js';

class CartRepository {
  create(cartData) {
    return CartDAO.createCart(cartData);
  }

  findById(cartId) {
    return CartDAO.getCartById(cartId);
  }

  update(cartId, updateData) {
    return CartDAO.updateCart(cartId, updateData);
  }

  delete(cartId) {
    return CartDAO.deleteCart(cartId);
  }
}

export default new CartRepository();
