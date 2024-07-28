import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"



class TicketsService {
    async deleteTicket(ticketId, userId) {
        const ticketToDelete = await dbContext.Tickets.findById(ticketId)
        if(userId != ticketToDelete.accountId) throw new Forbidden('You are unable to delete if you are not the owner of the ticket.')
        await ticketToDelete.deleteOne()
        return 'Ticket to this event has been deleted.'
    }
    async getTicketsByEventId(eventId) {
       const tickets = await dbContext.Tickets.find({eventId}).populate('profile')
       return tickets 
    }
    async getTicketsByAccountId(accountId) {
        const tickets = await dbContext.Tickets.find({ accountId }).populate('event')
        return tickets
    }
    async createTicket(ticketData) {
        const ticket = await dbContext.Tickets.create(ticketData)
        await ticket.populate('profile')
        return ticket
    }

}

export const ticketsService = new TicketsService()