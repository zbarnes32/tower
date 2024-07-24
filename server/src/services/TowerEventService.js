import { dbContext } from "../db/DbContext.js"


class TowerEventService {
    async createTowerEvent(towerEventData) {
        const towerEvent = await dbContext.TowerEvent.create(towerEventData)
        await towerEvent.populate('creator')
        return towerEvent
    }

}

export const towerEventService = new TowerEventService()