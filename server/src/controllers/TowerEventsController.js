
import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { towerEventService } from "../services/TowerEventService.js";



export class TowerEventsController extends BaseController {
    constructor(){
        super('api/events')
        this.router 
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTowerEvent)
    }

async createTowerEvent(request, response, next){
    try {
        const user = request.userInfo
        const towerEventData = request.body
        towerEventData.creatorId = user.id
        const towerEvent = await towerEventService.createTowerEvent(towerEventData)
        response.send(towerEvent)
    } catch (error) {
      next(error)  
    }
}    
}