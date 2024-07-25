import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ticketService } from "../services/TicketsService.js";



export class TicketsController extends BaseController {
    constructor(){
        super('api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTicket)
    }
    async createTicket(request, response, next) {
        try {
           const user = request.userInfo
           const ticketData = request.body
            ticketData.accountId = user.id
            const ticket = await ticketService.createTicket(ticketData)
            response.send(ticket)
        } catch (error) {
            next(error)
        }
    }
}