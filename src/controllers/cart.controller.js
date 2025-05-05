import CartRepository from "../repositories/cart.repository.js";
import TicketService from "../services/ticket.service.js";

export const purchaseCart = async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await CartRepository.getCartById(cid);
    if (!cart) return res.status(404).send("Carrito no encontrado.");

    const ticket = await TicketService.generateTicket(cart, req.user.email);
    res.status(200).send(ticket);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
