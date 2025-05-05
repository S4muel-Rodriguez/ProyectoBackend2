import TicketDAO from "../daos/ticket.dao.js";
import ProductDAO from "../daos/product.dao.js";

const generateTicket = async (cart, email) => {
  let totalAmount = 0;

  for (const item of cart.products) {
    const product = await ProductDAO.getProductById(item.productId);

    if (product.stock < item.quantity) {
      throw new Error(`No hay suficiente stock para el producto: ${product.name}`);
    }

    product.stock -= item.quantity;
    await ProductDAO.updateProduct(product);
    totalAmount += product.price * item.quantity;
  }

  const ticket = await TicketDAO.createTicket({
    email,
    products: cart.products,
    total: totalAmount,
  });

  return ticket;
};

export default { generateTicket };
