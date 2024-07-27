
import { AppState } from "../AppState.js"
import { TicketEvent, TicketProfile } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class TicketsService {
    async getTicketsForEvent(eventId) {
        const response = await api.get(`api/events/${eventId}/tickets`)
        logger.log('Getting all of the tickets for an event', response.data)
        const ticketProfiles = response.data.map(ticketData => new TicketProfile(ticketData))
        AppState.eventProfiles = ticketProfiles
    }
    async getAccountTicketsForEvents() {
      const response = await api.get('account/tickets')
      logger.log("Getting all of the tickets for a single account")
      const eventTickets = response.data.map(ticketData => new TicketEvent(ticketData))
      AppState.accountEvents = eventTickets

    }
    async createTicket(ticketData) {
        const response = await api.post('api/tickets', ticketData)
        logger.log("Creating a ticket🎟", response.data)
        const newProfile = new TicketProfile(response.data)
        AppState.eventProfiles.push(newProfile)
        AppState.activeTowerEvent.ticketCount++
    }

}

export const ticketsService = new TicketsService()