import { AppState } from "../AppState.js"
import { TicketProfile } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class TicketsService {
    async createTicket(ticketData) {
        const response = await api.post('api/tickets', ticketData)
        logger.log("Creating a ticket🎟", response.data)
        const newProfile = new TicketProfile(response.data)
        AppState.eventProfiles.push(newProfile)
        AppState.activeTowerEvent.ticketCount++
        AppState.activeTowerEvent.capacity--
    }

}

export const ticketsService = new TicketsService()