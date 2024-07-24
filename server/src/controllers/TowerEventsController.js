
import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { towerEventsService } from "../services/TowerEventsService.js";



export class TowerEventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAllTowerEvents)
            .get('/:eventId', this.getTowerEventById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTowerEvent)
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