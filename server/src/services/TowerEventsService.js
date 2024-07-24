import { dbContext } from "../db/DbContext.js"


class TowerEventsService {
    async getTowerEventById(eventId) {
        const towerEvent = (await dbContext.TowerEvents.findById(eventId)).populate('creator')
        if (towerEvent == null) {
            throw new Error(`Unable to find the event based off of the id of ${towerEvent}`)
        }
        return towerEvent
    }
    async getAllTowerEvents() {
        const towerEvents = await dbContext.TowerEvents.find().populate('creator')
        return towerEvents
    }
    async createTowerEvent(towerEventData) {
        const towerEvent = await dbContext.TowerEvents.create(towerEventData)
        await towerEvent.populate('creator')
        return towerEvent
    }

}

export const towerEventsService = new TowerEventsService()