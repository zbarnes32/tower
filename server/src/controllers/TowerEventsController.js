
import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import { commentsService } from "../services/CommentsService.js";



export class TowerEventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAllTowerEvents)
            .get('/:eventId', this.getTowerEventById)
            .get('/:eventId/tickets', this.getTicketsByEventId)
            .get('/:eventId/comments', this.getEventComments)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTowerEvent)
            .put('/:eventId', this.editTowerEvent)
            .delete('/:eventId', this.destroyEvent)
            
    }
    async getEventComments(request, response, next) {
        try{
            const eventId = request.params.eventId
            const comments = await commentsService.getEventComments(eventId)
            response.send(comments)
        } catch(error){
            next(error)
        }
    }

    async getTicketsByEventId(request, response, next) {
        try {
            const eventId =  request.params.eventId
            const tickets = await ticketsService.getTicketsByEventId(eventId)
            response.send(tickets)
        } catch (error) {
            next(error)
        }
    }

    async destroyEvent(request, response, next) {
        try {
            const user = request.userInfo
            const eventId = request.params.eventId
            const message = await towerEventsService.destroyEvent(eventId, user.id)
            response.send(message)
        } catch (error) {
            next(error)
        }
    }
    async editTowerEvent(request, response, next) {
        try {
            const user = request.userInfo
            const eventId = request.params.eventId
            const updatedData = request.body
            const towerEvent = await towerEventsService.editTowerEvent(eventId, updatedData, user.id)
            response.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }

    async createTowerEvent(request, response, next) {
        try {
            const user = request.userInfo
            const towerEventData = request.body
            towerEventData.creatorId = user.id
            const towerEvent = await towerEventsService.createTowerEvent(towerEventData)
            response.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }

    async getAllTowerEvents(request, response, next) {
        try {
            const towerEvents = await towerEventsService.getAllTowerEvents()
            response.send(towerEvents)
        } catch (error) {
            next(error)
        }
    }

    async getTowerEventById(request, response, next) {
        try {
            const eventId = request.params.eventId
            const towerEvent = await towerEventsService.getTowerEventById(eventId)
            response.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }

}