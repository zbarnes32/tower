import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";



export class TicketsController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTicket)
            // TODO reference deleteAlbumMember from postit for delete ticket
            .delete('/:ticketId', this.deleteTicket)

    }
    async deleteTicket(request, response, next) {
        try {
            const ticketId = request.params.ticketId
            const userId = request.userInfo.id
            const message = await ticketsService.deleteTicket(ticketId, userId)
            response.send(message)
        } catch (error) {
            next(error)
        }
    }
    async createTicket(request, response, next) {
        try {
            const user = request.userInfo
            const ticketData = request.body
            ticketData.accountId = user.id
            const ticket = await ticketsService.createTicket(ticketData)
            response.send(ticket)
        } catch (error) {
            next(error)
        }
    }
}