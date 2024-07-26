import { dbContext } from "../db/DbContext.js"



class TicketsService {
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