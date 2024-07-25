import { AppState } from "../AppState.js"
import { TowerEvent } from "../models/TowerEvent.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class TowerEventsService {
  async cancelEvent(eventId) {
    const response = await api.delete(`api/events/${eventId}`)
    logger.log('Cancelling the event', response.data)
    AppState.activeTowerEvent.isCanceled = !AppState.activeTowerEvent.isCanceled
    
  }
  async createTowerEvent(towerEventData) {
    const response = await api.post('api/events', towerEventData)
    logger.log('Creating an event', response.data)
    const newTowerEvent = new TowerEvent(response.data)
    AppState.towerEvents.push(newTowerEvent)
    return newTowerEvent
  }
  async getTowerEventById(eventId) {
      AppState.activeTowerEvent = null
      const response = await api.get(`api/events/${eventId}`)
      logger.log("Are we able to get the single event", response.data)
      const towerEvent = new TowerEvent(response.data)
      AppState.activeTowerEvent = towerEvent
  }
  async getAllTowerEvents() {
    const response = await api.get('api/events')
    // logger.log("Am I getting the events?", response.data) ✅
    const towerEvents = response.data.map(eventData => new TowerEvent(eventData))
    AppState.towerEvents = towerEvents

  }

}

export const towerEventsService = new TowerEventsService()