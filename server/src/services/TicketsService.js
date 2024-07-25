import { dbContext } from "../db/DbContext.js"



class TicketService {
    async createTicket(ticketData) {
      const ticket = await dbContext.Tickets.create(ticketData)
      await ticket.populate('profile')
      return ticket
    }

}

export const ticketService = new TicketService()