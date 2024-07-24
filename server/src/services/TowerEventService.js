import { dbContext } from "../db/DbContext.js"


class TowerEventService {
    async getAllTowerEvents() {
        const towerEvents = await dbContext.TowerEvent.find().populate('creator')
        return towerEvents
    }
    async createTowerEvent(towerEventData) {
        const towerEvent = await dbContext.TowerEvent.create(towerEventData)
        await towerEvent.populate('creator')
        return towerEvent
    }

}

export const towerEventService = new TowerEventService()