import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"


class TowerEventsService {
    async destroyEvent(eventId, userId) {
        const eventToDestroy = await this.getTowerEventById(eventId)
        if (userId != eventToDestroy.creatorId) throw new Forbidden('You are unable to delete an event that you did not create.')
        eventToDestroy.isCanceled = !eventToDestroy.isCanceled
        await eventToDestroy.save()
        return `${eventToDestroy.name} has been canceled.`
    }
    async editTowerEvent(eventId, updatedData) {
        const originalEvent = await dbContext.TowerEvents.findById(eventId)
        originalEvent.name = updatedData.name || originalEvent.name
        originalEvent.description = updatedData.description || originalEvent.description
        originalEvent.startDate = updatedData.startDate || originalEvent.startDate
        originalEvent.location = updatedData.location || originalEvent.location
        originalEvent.type = updatedData.type || originalEvent.type
        originalEvent.coverImg = updatedData.coverImg || originalEvent.coverImg
        await originalEvent.save()
        return originalEvent
    }
    async getTowerEventById(eventId) {
        const towerEvent = await dbContext.TowerEvents.findById(eventId).populate('creator')
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