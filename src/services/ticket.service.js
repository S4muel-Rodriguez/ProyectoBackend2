import TicketRepository from '../repositories/ticket.repository.js';

class TicketService {
  async createTicket(data) {
    return TicketRepository.create(data);
  }

  async getTicketById(ticketId) {
    return TicketRepository.findById(ticketId);
  }

  async getAllTickets() {
    return TicketRepository.findAll();
  }
}

export default new TicketService();
