import TicketDAO from '../daos/ticket.dao.js';

class TicketRepository {
  create(ticketData) {
    return TicketDAO.createTicket(ticketData);
  }

  findById(ticketId) {
    return TicketDAO.getTicketById(ticketId);
  }

  findAll() {
    return TicketDAO.getAllTickets();
  }
}

export default new TicketRepository();
